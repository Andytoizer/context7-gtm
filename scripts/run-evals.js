import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const casesPath = path.join(root, "evals", "cases.json");
const registryPath = path.join(root, "registry.json");

const evals = readJson(casesPath);
const registry = readJson(registryPath);
const catalog = loadCatalog(registry);
const failures = [];

for (const testCase of evals.cases || []) {
  const resolved = resolveTool(testCase.query, catalog);

  if (testCase.expectedToolId && resolved?.tool.id !== testCase.expectedToolId) {
    failures.push(
      `${testCase.name}: expected query "${testCase.query}" to resolve to ${testCase.expectedToolId}, got ${resolved?.tool.id || "none"}`
    );
    continue;
  }

  for (const assertion of testCase.assertions || []) {
    const error = runAssertion(assertion, resolved, catalog, evals);
    if (error) failures.push(`${testCase.name}: ${error}`);
  }
}

if (failures.length) {
  console.error("Eval failures:");
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Passed ${evals.cases.length} eval cases against ${catalog.length} tools.`);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadCatalog(registryData) {
  return (registryData.tools || []).map((entry) => {
    const dir = path.join(root, entry.path);
    return {
      registry: entry,
      tool: readJson(path.join(dir, "tool.json")),
      docs: fs.readFileSync(path.join(dir, "docs.md"), "utf8"),
      sources: normalizeSources(readJson(path.join(dir, "sources.json")))
    };
  });
}

function resolveTool(query, entries) {
  if (!query) return null;

  const normalizedQuery = normalize(query);
  let best = null;

  for (const entry of entries) {
    const candidates = [
      entry.tool.id,
      entry.tool.name,
      entry.tool.slug,
      entry.registry.name,
      entry.registry.slug,
      ...(entry.tool.aliases || []),
      ...(entry.registry.aliases || [])
    ].filter(Boolean);

    const score = candidates.reduce((total, candidate) => {
      const normalizedCandidate = normalize(candidate);
      if (!normalizedCandidate) return total;
      if (normalizedQuery === normalizedCandidate) return total + 100;
      if (normalizedQuery.includes(normalizedCandidate)) return total + 60;
      if (normalizedCandidate.includes(normalizedQuery)) return total + 40;
      return total + tokenOverlap(normalizedQuery, normalizedCandidate);
    }, 0);

    if (!best || score > best.score) best = { ...entry, score };
  }

  return best?.score > 0 ? best : null;
}

function runAssertion(assertion, resolved, entries, evalConfig) {
  switch (assertion.type) {
    case "fieldEquals": {
      const actual = getPath(assertion.path, resolved);
      return actual === assertion.value
        ? null
        : `expected ${assertion.path} to equal ${JSON.stringify(assertion.value)}, got ${JSON.stringify(actual)}`;
    }
    case "fieldIncludes": {
      const actual = getPath(assertion.path, resolved);
      return includesText(actual, assertion.value)
        ? null
        : `expected ${assertion.path} to include ${JSON.stringify(assertion.value)}, got ${JSON.stringify(actual)}`;
    }
    case "arrayIncludes": {
      const actual = getPath(assertion.path, resolved);
      return Array.isArray(actual) && actual.some((item) => normalize(item) === normalize(assertion.value))
        ? null
        : `expected ${assertion.path} to include ${JSON.stringify(assertion.value)}`;
    }
    case "docsInclude":
      return includesText(resolved?.docs, assertion.value)
        ? null
        : `expected docs to include ${JSON.stringify(assertion.value)}`;
    case "sourcesIncludeUrl":
      return (resolved?.sources || []).some((source) => includesText(source.url, assertion.value))
        ? null
        : `expected sources to include URL fragment ${JSON.stringify(assertion.value)}`;
    case "needsReviewCountAtLeast": {
      const minimum = assertion.value ?? evalConfig.minimumNeedsReviewCount ?? 1;
      const count = entries.filter((entry) => entry.tool.needsHumanReview === true).length;
      return count >= minimum ? null : `expected at least ${minimum} needs-review entries, got ${count}`;
    }
    case "allNeedsReviewHaveReasons": {
      const missing = entries
        .filter((entry) => entry.tool.needsHumanReview === true && !String(entry.tool.reviewReason || "").trim())
        .map((entry) => entry.tool.id);
      return missing.length ? `needs-review entries missing reviewReason: ${missing.join(", ")}` : null;
    }
    case "allPublishedHaveSources": {
      const missing = entries
        .filter((entry) => entry.tool.status === "published" && (!Array.isArray(entry.sources) || entry.sources.length === 0))
        .map((entry) => entry.tool.id);
      return missing.length ? `published entries missing sources: ${missing.join(", ")}` : null;
    }
    case "allSourcesHaveValidUrls": {
      const invalid = [];
      for (const entry of entries) {
        for (const source of entry.sources || []) {
          if (!isValidHttpUrl(source.url)) invalid.push(`${entry.tool.id}: ${source.url || "missing url"}`);
        }
      }
      return invalid.length ? `invalid source URLs: ${invalid.join(", ")}` : null;
    }
    default:
      return `unknown assertion type ${assertion.type}`;
  }
}

function getPath(selector, context) {
  return selector.split(".").reduce((value, key) => value?.[key], context);
}

function includesText(value, expected) {
  return String(value || "").toLowerCase().includes(String(expected).toLowerCase());
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^\/gtm\//, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenOverlap(a, b) {
  const aTokens = new Set(a.split(" ").filter(Boolean));
  const bTokens = new Set(b.split(" ").filter(Boolean));
  let score = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) score += 10;
  }
  return score;
}

function normalizeSources(value) {
  const values = Array.isArray(value)
    ? value
    : value && typeof value === "object"
      ? Object.values(value).flat()
      : [];

  return values.filter((source) => source && typeof source === "object" && "url" in source);
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
