import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const usage = `Usage:
  node scripts/create-draft-profile.js <input.json> [--force]

Creates draft-profiles/<slug>/tool.json, docs.md, sources.json, and reference.md
when llmsTxtUrl or openApiUrl is supplied. Drafts are never added to registry.json.`;

const SOURCE_LABELS = {
  canonicalUrl: "Official website",
  llmsTxtUrl: "llms.txt / AI docs",
  openApiUrl: "OpenAPI/spec"
};

function fail(message) {
  console.error(`Error: ${message}\n\n${usage}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const inputPath = args.find((arg) => !arg.startsWith("-"));
  const force = args.includes("--force");
  const unknownFlags = args.filter((arg) => arg.startsWith("-") && arg !== "--force");

  if (unknownFlags.length) fail(`unknown option ${unknownFlags.join(", ")}`);
  if (!inputPath) fail("missing input JSON file");

  return { inputPath, force };
}

function readJson(inputPath) {
  const absolutePath = path.resolve(process.cwd(), inputPath);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    fail(`could not read valid JSON from ${absolutePath}: ${error.message}`);
  }
}

function assertString(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${field} must be a non-empty string`);
  }
  return value.trim();
}

function assertOptionalString(value, field) {
  if (value === undefined || value === null || value === "") return undefined;
  return assertString(value, field);
}

function assertUrl(value, field) {
  const url = assertString(value, field);
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      fail(`${field} must be an http(s) URL`);
    }
  } catch {
    fail(`${field} must be a valid URL`);
  }
  return url;
}

function assertOptionalUrl(value, field) {
  if (value === undefined || value === null || value === "") return undefined;
  return assertUrl(value, field);
}

function assertSlug(value) {
  const slug = assertString(value, "slug").toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail("slug must use lowercase letters, numbers, and single hyphens only");
  }
  return slug;
}

function normalizeStringArray(value, field) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) fail(`${field} must be an array`);
  return value.map((item, index) => assertString(item, `${field}[${index}]`));
}

function normalizeUrlArray(value, field) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${field} must be a non-empty array of URLs`);
  }
  return value.map((item, index) => assertUrl(item, `${field}[${index}]`));
}

function normalizeStatus(value) {
  if (value === "needs-review") return "needs-review";
  return "draft";
}

function uniqueSources(input) {
  const sources = [
    { label: SOURCE_LABELS.canonicalUrl, url: input.canonicalUrl },
    ...input.sourceUrls.map((url, index) => ({
      label: index === 0 ? "Docs homepage" : `Source ${index + 1}`,
      url
    }))
  ];

  if (input.llmsTxtUrl) {
    sources.push({ label: SOURCE_LABELS.llmsTxtUrl, url: input.llmsTxtUrl });
  }
  if (input.openApiUrl) {
    sources.push({ label: SOURCE_LABELS.openApiUrl, url: input.openApiUrl });
  }

  const seen = new Set();
  return sources.filter((source) => {
    if (seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}

function normalizeInput(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    fail("input JSON must be an object");
  }

  const input = {
    name: assertString(raw.name, "name"),
    slug: assertSlug(raw.slug),
    canonicalUrl: assertUrl(raw.canonicalUrl, "canonicalUrl"),
    sourceUrls: normalizeUrlArray(raw.sourceUrls, "sourceUrls"),
    llmsTxtUrl: assertOptionalUrl(raw.llmsTxtUrl, "llmsTxtUrl"),
    openApiUrl: assertOptionalUrl(raw.openApiUrl, "openApiUrl"),
    notes: assertOptionalString(raw.notes, "notes"),
    aliases: normalizeStringArray(raw.aliases, "aliases"),
    status: normalizeStatus(raw.status)
  };

  input.sources = uniqueSources(input);
  return input;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function json(data) {
  return `${JSON.stringify(data, null, 2)}\n`;
}

function sourceBullets(sources) {
  return sources.map((source) => `- ${source.label}: ${source.url}`).join("\n");
}

function todoLine(label, source) {
  return `- ${label}: TODO verify from ${source}.`;
}

function buildToolJson(input, lastVerified) {
  return {
    id: `/gtm/${input.slug}`,
    name: input.name,
    slug: input.slug,
    status: input.status,
    aliases: input.aliases,
    agentReadinessScore: 0,
    lastVerified,
    interfaces: {
      officialMcp: "unknown",
      officialCli: "unknown",
      officialApi: "unknown",
      openApi: input.openApiUrl ? "needs-review" : "unknown",
      llmsTxt: input.llmsTxtUrl ? "needs-review" : "unknown",
      officialSdk: "unknown"
    },
    sourceQuality: {
      official: "needs-review",
      community: "unknown"
    }
  };
}

function buildSourcesJson(input, lastVerified) {
  return {
    lastVerified,
    official: input.sources,
    community: [],
    ingestionAssist: {
      status: input.status,
      notes: input.notes || "",
      registryAction: "Do not add automatically; human review required."
    }
  };
}

function buildDocsMd(input, lastVerified) {
  const primarySource = input.sourceUrls[0];
  const authSource = input.openApiUrl || primarySource;
  const aiSource = input.llmsTxtUrl || primarySource;
  const specSource = input.openApiUrl || primarySource;

  return `# Summary

${input.name} is a draft GTM docs profile generated from vendor documentation inputs. This file is intentionally unfinished and must be source-verified before it is moved into \`tools/\` or added to \`registry.json\`.

- Official website: ${input.canonicalUrl}
- Primary docs/source: ${primarySource}
- Last verified: ${lastVerified}
- Draft status: ${input.status}
${input.notes ? `- Intake notes: ${input.notes}\n` : ""}
# Agent Interface

${todoLine("Official MCP", aiSource)}
${todoLine("Official CLI", primarySource)}
${todoLine("Official API", specSource)}
${todoLine("OpenAPI/spec", input.openApiUrl || "the supplied docs sources")}
${todoLine("llms.txt / AI docs", input.llmsTxtUrl || "the supplied docs sources")}
${todoLine("Official SDK", primarySource)}
${todoLine("Official GitHub", primarySource)}
${todoLine("Community MCP/CLI/SDK", "community sources if they are intentionally added")}
${todoLine("Wrapper support", "official docs and ecosystem evidence")}

# Operational Context

- Auth model: TODO verify supported auth methods, token placement, OAuth flows, and scope names from ${authSource}.
- Required scopes or permissions: TODO identify write/read scopes per object and endpoint from ${authSource}.
- Key objects: TODO list GTM-relevant objects such as contacts, companies, accounts, deals, campaigns, messages, users, lists, events, or custom objects from ${primarySource}.
- Key actions: TODO summarize supported read/write/search/bulk/webhook operations from ${primarySource}.
- Required fields: TODO capture create/update required fields per object from ${specSource}.
- Common field mappings: TODO map external names to GTM concepts from ${primarySource}.
- Rate limits: TODO verify public limits, headers, retry guidance, and plan-based constraints from ${specSource}.
- Pagination: TODO verify cursor/page/offset model, max page sizes, and deep-sync caveats from ${specSource}.
- Webhooks: TODO verify availability, event names, signing, retries, and replay behavior from ${primarySource}.
- Destructive operations: TODO identify delete, overwrite, bulk mutation, merge, unsubscribe, or irreversible operations from ${primarySource}.
- Pricing/API access constraints: TODO verify plan, entitlement, approval, and beta/private API constraints from ${input.canonicalUrl}.
- Known caveats: TODO record ambiguous docs, stale references, source conflicts, or human-review blockers.

# Endpoint Table TODO

| Area | Endpoint/tool | Method | Auth/scopes | Objects | Pagination | Rate limit | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TODO | TODO | TODO | TODO | TODO | TODO | TODO | ${specSource} |

# Sources

${sourceBullets(input.sources)}
`;
}

function buildReferenceMd(input) {
  const sections = [];

  if (input.llmsTxtUrl) {
    sections.push(`## llms.txt / AI Docs

- Source: ${input.llmsTxtUrl}
- TODO summarize AI-consumable docs coverage.
- TODO note whether endpoint references, examples, and auth guidance are complete enough for agent retrieval.`);
  }

  if (input.openApiUrl) {
    sections.push(`## OpenAPI / API Spec

- Source: ${input.openApiUrl}
- TODO inspect spec freshness, versioning, auth schemes, server URLs, tags, and schema coverage.
- TODO extract GTM-relevant endpoint groups into the endpoint table below.

| Tag/group | Endpoint | Method | Object | Required fields | Pagination | Rate limit | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |`);
  }

  if (!sections.length) return undefined;

  return `# Reference Notes

This draft reference file points reviewers at machine-readable or AI-oriented source inputs. It is not source-verified yet.

${sections.join("\n\n")}
`;
}

function writeDraft(input, force) {
  const lastVerified = today();
  const draftDir = path.join(root, "draft-profiles", input.slug);
  const relativeDraftDir = path.relative(root, draftDir);

  if (fs.existsSync(draftDir) && !force) {
    fail(`${relativeDraftDir} already exists; rerun with --force to overwrite generated files`);
  }

  fs.mkdirSync(draftDir, { recursive: true });

  const files = {
    "tool.json": json(buildToolJson(input, lastVerified)),
    "docs.md": buildDocsMd(input, lastVerified),
    "sources.json": json(buildSourcesJson(input, lastVerified))
  };

  const referenceMd = buildReferenceMd(input);
  if (referenceMd) files["reference.md"] = referenceMd;

  for (const [file, contents] of Object.entries(files)) {
    fs.writeFileSync(path.join(draftDir, file), contents);
  }

  return {
    draftDir,
    relativeDraftDir,
    files: Object.keys(files).map((file) => path.join(relativeDraftDir, file))
  };
}

function printNextSteps(input, result) {
  console.log(`Created draft profile: ${result.relativeDraftDir}`);
  console.log("");
  console.log("Files:");
  for (const file of result.files) console.log(`- ${file}`);
  console.log("");
  console.log("Next steps:");
  console.log("- Review every TODO against the listed sources.");
  console.log("- Fill endpoint/auth/object/rate-limit/pagination details with source-backed notes.");
  console.log("- Keep status draft or needs-review until human review is complete.");
  console.log(`- When approved, move ${result.relativeDraftDir} to tools/${input.slug} and then add a registry.json entry manually.`);
  console.log("- Run npm run validate after any registry.json change.");
}

const { inputPath, force } = parseArgs(process.argv);
const input = normalizeInput(readJson(inputPath));
const result = writeDraft(input, force);
printNextSteps(input, result);
