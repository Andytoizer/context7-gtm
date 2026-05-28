#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}

const registry = readJson(path.join(root, "registry.json"));
const sources = collectSources(registry);
const uniqueChecks = uniqueBy(sources, (source) => source.url).map((source) => source.url);

const startedAt = new Date();
const checks = await mapLimit(uniqueChecks, options.concurrency, async (url) => [url, await checkUrl(url, options)]);
const byUrl = new Map(checks);
const results = sources.map((source) => ({ ...source, ...byUrl.get(source.url) }));
const summary = summarize(results, options);

if (options.json) {
  console.log(JSON.stringify({ generatedAt: startedAt.toISOString(), options, summary, results }, null, 2));
} else {
  console.log(renderMarkdown(summary, results, options));
}

if (options.strict && summary.problemCount > 0) {
  process.exit(1);
}

if (summary.clearBrokenCount >= summary.clearBrokenExitThreshold) {
  process.exit(1);
}

function parseArgs(args) {
  const parsed = {
    concurrency: 8,
    timeoutMs: 10_000,
    json: false,
    strict: false,
    clearBrokenThreshold: 0.2,
    minClearBroken: 10,
    help: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--json") parsed.json = true;
    else if (arg === "--strict") parsed.strict = true;
    else if (arg === "--help" || arg === "-h") parsed.help = true;
    else if (arg === "--timeout-ms") parsed.timeoutMs = readNumber(args[++index], "--timeout-ms");
    else if (arg === "--concurrency") parsed.concurrency = readNumber(args[++index], "--concurrency");
    else if (arg === "--broken-threshold") parsed.clearBrokenThreshold = readNumber(args[++index], "--broken-threshold");
    else if (arg === "--min-broken") parsed.minClearBroken = readNumber(args[++index], "--min-broken");
    else throw new Error(`Unknown argument: ${arg}`);
  }

  parsed.concurrency = Math.max(1, Math.floor(parsed.concurrency));
  parsed.timeoutMs = Math.max(1_000, Math.floor(parsed.timeoutMs));
  parsed.minClearBroken = Math.max(1, Math.floor(parsed.minClearBroken));
  return parsed;
}

function readNumber(value, flag) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${flag} requires a number`);
  return number;
}

function printHelp() {
  console.log(`Usage: node scripts/verify-sources.js [options]

Checks URLs from registry.json and tools/*/sources.json.

Options:
  --json                    Emit machine-readable JSON.
  --strict                  Exit 1 for any broken, uncertain, or invalid source.
  --timeout-ms <number>     Per-request timeout. Default: 10000.
  --concurrency <number>    Concurrent URL checks. Default: 8.
  --broken-threshold <n>    Exit 1 when clear broken URLs reach n, or this ratio when <= 1. Default: 0.2.
  --min-broken <number>     Minimum clear broken URLs needed for ratio threshold. Default: 10.
  --help                    Show this help.
`);
}

function collectSources(registryJson) {
  const collected = [];
  const seenSourceFiles = new Set();

  for (const entry of registryJson.tools || []) {
    const dir = path.join(root, entry.path || `tools/${entry.slug}`);
    const toolName = entry.name || entry.slug || entry.id || "unknown";
    const toolId = entry.id || "";
    const slug = entry.slug || path.basename(dir);

    for (const source of collectUrlFields(entry, "registry", "registry.json")) {
      collected.push({ ...source, toolId, toolName, slug });
    }

    const sourcesPath = path.join(dir, "sources.json");
    if (!fs.existsSync(sourcesPath)) continue;
    seenSourceFiles.add(path.resolve(sourcesPath));

    const sourcesJson = readJson(sourcesPath);
    for (const source of flattenSourcesJson(sourcesJson, path.relative(root, sourcesPath))) {
      collected.push({ ...source, toolId, toolName, slug });
    }
  }

  for (const sourcesPath of listAllSourceFiles()) {
    if (seenSourceFiles.has(path.resolve(sourcesPath))) continue;
    const dir = path.dirname(sourcesPath);
    const slug = path.basename(dir);
    const sourcesJson = readJson(sourcesPath);
    for (const source of flattenSourcesJson(sourcesJson, path.relative(root, sourcesPath))) {
      collected.push({ ...source, toolId: `/gtm/${slug}`, toolName: slug, slug });
    }
  }

  return collected.filter((source) => source.url);
}

function listAllSourceFiles() {
  const toolsDir = path.join(root, "tools");
  if (!fs.existsSync(toolsDir)) return [];

  return fs
    .readdirSync(toolsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(toolsDir, entry.name, "sources.json"))
    .filter((sourcePath) => fs.existsSync(sourcePath));
}

function collectUrlFields(value, section, origin, trail = []) {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectUrlFields(item, section, origin, [...trail, String(index)]));
  }

  if (!value || typeof value !== "object") return [];

  const found = [];
  for (const [key, child] of Object.entries(value)) {
    const nextTrail = [...trail, key];
    if (key.toLowerCase().endsWith("url") && typeof child === "string") {
      found.push({
        title: value.label || value.title || value.name || nextTrail.join("."),
        url: child,
        section,
        type: value.type || section,
        origin,
      });
    } else if (child && typeof child === "object") {
      found.push(...collectUrlFields(child, section, origin, nextTrail));
    }
  }
  return found;
}

function flattenSourcesJson(sourcesJson, origin) {
  if (Array.isArray(sourcesJson)) {
    return sourcesJson.flatMap((source, index) => normalizeSource(source, "sources", origin, index));
  }

  if (!sourcesJson || typeof sourcesJson !== "object") return [];

  return Object.entries(sourcesJson)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([section, items]) => items.flatMap((source, index) => normalizeSource(source, section, origin, index)));
}

function normalizeSource(source, section, origin, index) {
  if (typeof source === "string") {
    return [{ title: `${section}[${index}]`, url: source, section, type: section, origin }];
  }

  if (!source || typeof source !== "object") return [];

  const url = source.url || source.href;
  if (!url) return [];

  return [
    {
      title: source.label || source.title || source.name || `${section}[${index}]`,
      url,
      section,
      type: source.type || section,
      origin,
    },
  ];
}

async function checkUrl(url, opts) {
  const parsed = parseHttpUrl(url);
  if (!parsed.ok) {
    return {
      ok: false,
      problem: true,
      clearBroken: true,
      method: "none",
      status: null,
      finalUrl: url,
      category: "invalid-url",
      error: parsed.error,
    };
  }

  const head = await requestUrl(url, "HEAD", opts);
  if (head.ok || !shouldFallbackToGet(head)) return classifyResponse(head);

  const get = await requestUrl(url, "GET", opts);
  return classifyResponse({ ...get, headStatus: head.status, headError: head.error });
}

function parseHttpUrl(url) {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { ok: false, error: `Unsupported protocol: ${parsed.protocol}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

async function requestUrl(url, method, opts) {
  const headers = {
    "user-agent": "gtm-docs-registry-source-verifier/0.1",
    accept: method === "HEAD" ? "*/*" : "text/html,application/json,text/plain,*/*",
  };
  if (method === "GET") headers.range = "bytes=0-0";

  try {
    const response = await fetch(url, {
      method,
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(opts.timeoutMs),
    });
    await response.body?.cancel();
    return {
      ok: response.ok,
      method,
      status: response.status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type") || "",
      error: "",
    };
  } catch (error) {
    return {
      ok: false,
      method,
      status: null,
      finalUrl: url,
      contentType: "",
      error: error.name === "TimeoutError" ? `Timeout after ${opts.timeoutMs}ms` : error.message,
    };
  }
}

function shouldFallbackToGet(result) {
  return !result.ok;
}

function classifyResponse(result) {
  if (result.ok) {
    return { ...result, problem: false, clearBroken: false, category: "ok" };
  }

  if ([404, 410].includes(result.status)) {
    return { ...result, problem: true, clearBroken: true, category: `broken-${result.status}` };
  }

  if ([400, 414].includes(result.status)) {
    return { ...result, problem: true, clearBroken: true, category: `bad-request-${result.status}` };
  }

  if (result.status === null && /ENOTFOUND|getaddrinfo|Invalid URL/i.test(result.error || "")) {
    return { ...result, problem: true, clearBroken: true, category: "unreachable-host" };
  }

  if (result.status === null) {
    return { ...result, problem: true, clearBroken: false, category: "request-failed" };
  }

  if ([401, 403, 429].includes(result.status)) {
    return { ...result, problem: true, clearBroken: false, category: `restricted-${result.status}` };
  }

  if (result.status >= 500 && result.status <= 599) {
    return { ...result, problem: true, clearBroken: false, category: `server-${result.status}` };
  }

  return { ...result, problem: true, clearBroken: false, category: `unexpected-${result.status}` };
}

function summarize(results, opts) {
  const total = results.length;
  const uniqueTotal = new Set(results.map((result) => result.url)).size;
  const okCount = results.filter((result) => result.category === "ok").length;
  const problemCount = results.filter((result) => result.problem).length;
  const clearBrokenCount = results.filter((result) => result.clearBroken).length;
  const categories = countBy(results, (result) => result.category);
  const ratioThreshold =
    opts.clearBrokenThreshold <= 1 ? Math.ceil(total * opts.clearBrokenThreshold) : Math.floor(opts.clearBrokenThreshold);
  const clearBrokenExitThreshold = Math.max(opts.minClearBroken, ratioThreshold);

  return {
    total,
    uniqueTotal,
    okCount,
    problemCount,
    clearBrokenCount,
    clearBrokenExitThreshold,
    categories,
  };
}

function renderMarkdown(summary, results, opts) {
  const problemRows = results
    .filter((result) => result.problem)
    .sort((a, b) => Number(b.clearBroken) - Number(a.clearBroken) || a.toolName.localeCompare(b.toolName, "en"))
    .slice(0, 80);

  const lines = [
    "# Source Verification",
    "",
    `Checked ${summary.total} source references (${summary.uniqueTotal} unique URLs).`,
    "",
    `- OK: ${summary.okCount}`,
    `- Problems: ${summary.problemCount}`,
    `- Clear broken: ${summary.clearBrokenCount}`,
    `- Default failure threshold: ${summary.clearBrokenExitThreshold} clear broken sources`,
    `- Strict mode: ${opts.strict ? "on" : "off"}`,
    "",
    "## Categories",
    "",
    ...Object.entries(summary.categories)
      .sort(([a], [b]) => a.localeCompare(b, "en"))
      .map(([category, count]) => `- ${category}: ${count}`),
  ];

  if (problemRows.length > 0) {
    lines.push("", "## Problem Sources", "", "| Tool | Source | Status | Category | URL |", "| --- | --- | ---: | --- | --- |");
    for (const result of problemRows) {
      lines.push(
        `| ${escapeCell(result.toolName)} | ${escapeCell(result.title)} | ${result.status ?? "-"} | ${escapeCell(
          result.category,
        )} | ${escapeCell(result.url)} |`,
      );
    }
    if (summary.problemCount > problemRows.length) {
      lines.push("", `_Showing first ${problemRows.length} of ${summary.problemCount} problem sources._`);
    }
  }

  return `${lines.join("\n")}\n`;
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  const unique = [];
  for (const item of items) {
    const key = getKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeCell(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}
