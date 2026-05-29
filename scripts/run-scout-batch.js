#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const options = parseArgs(process.argv.slice(2));
const inputPath = path.join(root, options.runDir, "scout-inputs", `${options.batchId}.json`);
const outputPath = path.join(root, options.runDir, "scout-findings", `${options.batchId}.json`);
const promptPath = path.join(root, "maintenance", "prompts", "scout.md");
const input = readJson(inputPath);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const command = process.env.SCOUT_SWARM_COMMAND || "";
if (command && !options.dryRun) {
  runExternal(command, {
    MAINTENANCE_INPUT: inputPath,
    MAINTENANCE_OUTPUT: outputPath,
    MAINTENANCE_PROMPT: promptPath,
    MAINTENANCE_RUN_ID: input.runId,
    MAINTENANCE_BATCH_ID: input.batchId,
  });
  assertJsonFile(outputPath);
} else {
  writeJson(outputPath, buildPendingScoutOutput(input));
}

console.log(`Wrote scout findings for ${input.batchId} to ${path.relative(root, outputPath)}`);

function parseArgs(args) {
  const parsed = { batchId: "", runDir: "", dryRun: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--batch-id") parsed.batchId = args[++index] || "";
    else if (arg === "--run-dir") parsed.runDir = args[++index] || "";
    else if (arg === "--dry-run") parsed.dryRun = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!parsed.batchId) throw new Error("--batch-id is required");
  if (!parsed.runDir) throw new Error("--run-dir is required");
  return parsed;
}

function runExternal(command, extraEnv) {
  const result = spawnSync(command, {
    cwd: root,
    env: { ...process.env, ...extraEnv },
    shell: true,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function assertJsonFile(filePath) {
  const parsed = readJson(filePath);
  if (!parsed || typeof parsed !== "object") throw new Error(`${filePath} did not contain a JSON object`);
}

function buildPendingScoutOutput(batch) {
  return {
    runId: batch.runId,
    batchId: batch.batchId,
    checkedAt: new Date().toISOString(),
    status: "pending-run",
    note: "No SCOUT_SWARM_COMMAND was configured, so this batch wrote instructions instead of live scout findings.",
    tools: batch.tools.map((tool) => ({
      toolId: tool.id,
      slug: tool.slug,
      name: tool.name,
      status: "pending-run",
      summary: "Scout swarm not configured for this run.",
      findings: [],
    })),
  };
}

