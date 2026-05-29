#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const options = parseArgs(process.argv.slice(2));
const registry = readJson(path.join(root, "registry.json"));
const runId = options.runId || today();
const runDir = path.join(root, options.outDir || path.join("maintenance", "runs", runId));
const scoutInputsDir = path.join(runDir, "scout-inputs");

fs.mkdirSync(scoutInputsDir, { recursive: true });

const tools = collectTools(registry).sort(sortByPriority);
const batches = chunk(tools, options.batchSize).map((batchTools, index) => {
  const batchId = `scout-${String(index + 1).padStart(3, "0")}`;
  return {
    batchId,
    index: index + 1,
    toolCount: batchTools.length,
    tools: batchTools,
  };
});

const manifest = {
  schemaVersion: "0.1.0",
  runId,
  generatedAt: new Date().toISOString(),
  batchSize: options.batchSize,
  toolCount: tools.length,
  batchCount: batches.length,
  maxAgentsPerSwarm: options.maxAgents,
  policy: {
    memoryIsEvidence: false,
    scoutsMayEditFiles: false,
    qaMustVerifyCurrentEvidence: true,
    applyOnlyQaApprovedFindings: true,
  },
  batches: batches.map(({ tools: batchTools, ...batch }) => ({
    ...batch,
    toolIds: batchTools.map((tool) => tool.id),
  })),
};

writeJson(path.join(runDir, "manifest.json"), manifest);
for (const batch of batches) {
  writeJson(path.join(scoutInputsDir, `${batch.batchId}.json`), {
    runId,
    batchId: batch.batchId,
    generatedAt: manifest.generatedAt,
    maxAgentsPerSwarm: options.maxAgents,
    promptPath: "maintenance/prompts/scout.md",
    schemaPath: "maintenance/schemas/scout-finding.schema.json",
    tools: batch.tools,
  });
}

const matrix = batches.map((batch) => ({
  batchId: batch.batchId,
  toolCount: batch.toolCount,
}));

if (options.githubOutput) {
  fs.appendFileSync(options.githubOutput, `scout_matrix=${JSON.stringify(matrix)}\n`);
  fs.appendFileSync(options.githubOutput, `run_id=${runId}\n`);
}

console.log(`Created maintenance plan ${runId}: ${tools.length} tools across ${batches.length} scout batches.`);

function parseArgs(args) {
  const parsed = {
    batchSize: 10,
    maxAgents: 6,
    runId: "",
    outDir: "",
    githubOutput: process.env.GITHUB_OUTPUT || "",
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--batch-size") parsed.batchSize = readPositiveInteger(args[++index], arg);
    else if (arg === "--max-agents") parsed.maxAgents = readPositiveInteger(args[++index], arg);
    else if (arg === "--run-id") parsed.runId = readRequired(args[++index], arg);
    else if (arg === "--out-dir") parsed.outDir = readRequired(args[++index], arg);
    else if (arg === "--github-output") parsed.githubOutput = readRequired(args[++index], arg);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

function readPositiveInteger(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) throw new Error(`${flag} requires a positive integer`);
  return number;
}

function readRequired(value, flag) {
  if (!value) throw new Error(`${flag} requires a value`);
  return value;
}

function readJson(filePath, fallback = undefined) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    if (fallback !== undefined && error.code === "ENOENT") return fallback;
    throw error;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function collectTools(registryJson) {
  return (registryJson.tools || []).map((entry) => {
    const dir = path.join(root, entry.path || `tools/${entry.slug}`);
    const toolJson = readJson(path.join(dir, "tool.json"), {});
    const sourcesJson = readJson(path.join(dir, "sources.json"), {});
    const meta = { ...entry, ...toolJson };
    const surfaces = meta.interfaces || meta.surfaces || {};
    const lastVerified = meta.lastVerified || entry.lastVerified || "";

    return {
      id: entry.id || meta.id,
      slug: entry.slug || meta.slug,
      name: entry.name || meta.name,
      path: entry.path || `tools/${entry.slug}`,
      status: meta.status || entry.status || "unknown",
      agentReadinessScore: Number(meta.agentReadinessScore ?? entry.agentReadinessScore ?? 0),
      lastVerified,
      daysSinceVerified: daysSince(lastVerified),
      needsHumanReview: Boolean(meta.needsHumanReview || meta.status === "needs-review"),
      reviewReason: meta.reviewReason || "",
      interfaces: {
        officialMcp: normalizeSurface(surfaces.officialMcp),
        officialCli: normalizeSurface(surfaces.officialCli),
        officialApi: normalizeSurface(surfaces.officialApi),
        openApi: normalizeSurface(surfaces.openApi ?? surfaces.openApiSpec),
        llmsTxt: normalizeSurface(surfaces.llmsTxt ?? surfaces.llmsDocs),
        officialSdk: normalizeSurface(surfaces.officialSdk),
      },
      sourceCounts: countSources(sourcesJson),
      sourceUrls: flattenSources(sourcesJson).slice(0, 12),
    };
  });
}

function normalizeSurface(value) {
  if (value === true) return "yes";
  if (value === false) return "no";
  if (typeof value === "string" && value.trim()) return value.trim().toLowerCase();
  return "unknown";
}

function countSources(sourcesJson) {
  const sources = flattenSources(sourcesJson);
  return {
    total: sources.length,
    official: sources.filter((source) => source.type === "official").length,
    community: sources.filter((source) => source.type === "community").length,
  };
}

function flattenSources(sourcesJson) {
  if (Array.isArray(sourcesJson)) return sourcesJson.filter(Boolean);
  if (!sourcesJson || typeof sourcesJson !== "object") return [];

  return Object.entries(sourcesJson)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([type, values]) =>
      values
        .filter((source) => source && typeof source === "object" && source.url)
        .map((source) => ({ type, title: source.label || source.title || source.name || source.url, url: source.url })),
    );
}

function daysSince(value) {
  if (!value) return 9999;
  const then = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(then.getTime())) return 9999;
  return Math.max(0, Math.floor((Date.now() - then.getTime()) / 86_400_000));
}

function sortByPriority(a, b) {
  return priority(b) - priority(a) || a.name.localeCompare(b.name, "en");
}

function priority(tool) {
  let score = 0;
  if (tool.needsHumanReview || tool.status === "needs-review") score += 100;
  if (tool.sourceCounts.total === 0) score += 80;
  if (tool.daysSinceVerified >= 30) score += 60;
  if (tool.daysSinceVerified >= 14) score += 30;
  if (tool.agentReadinessScore >= 5) score += 10;
  if (Object.values(tool.interfaces).includes("unknown")) score += 5;
  return score;
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
  return chunks;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

