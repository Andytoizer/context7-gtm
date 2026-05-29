#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const options = parseArgs(process.argv.slice(2));
const runDir = path.join(root, options.runDir);
const manifest = readJson(path.join(runDir, "manifest.json"));
const registryPath = path.join(root, "registry.json");
const registry = readJson(registryPath);
const verifiedDate = /^\d{4}-\d{2}-\d{2}$/.test(manifest.runId) ? manifest.runId : new Date().toISOString().slice(0, 10);
const qaFiles = listJson(path.join(runDir, "qa-verdicts"));
const applied = [];
const skipped = [];
let changed = false;

const registryById = new Map((registry.tools || []).map((tool) => [tool.id, tool]));

for (const qaFile of qaFiles) {
  const batch = readJson(qaFile);
  for (const verdict of batch.verdicts || []) {
    const registryTool = registryById.get(verdict.toolId);
    if (!registryTool) {
      skipped.push({ toolId: verdict.toolId, reason: "Tool not found in registry." });
      continue;
    }

    const toolJsonPath = path.join(root, registryTool.path, "tool.json");
    const sourcesPath = path.join(root, registryTool.path, "sources.json");
    const toolJson = readJson(toolJsonPath);
    const sourcesJson = readJson(sourcesPath);
    let toolChanged = false;

    if (["approved", "no-change"].includes(verdict.verdict)) {
      toolChanged = setLastVerified({ registryTool, toolJson, sourcesJson, verifiedDate }) || toolChanged;
    }

    for (const finding of verdict.approvedFindings || []) {
      const result = applyFinding({ finding, registryTool, toolJson });
      if (result.applied) {
        toolChanged = true;
        applied.push({ toolId: verdict.toolId, field: finding.field, value: finding.proposed });
      } else {
        skipped.push({ toolId: verdict.toolId, field: finding.field || "", reason: result.reason });
      }
    }

    if (toolChanged) {
      changed = true;
      writeJson(toolJsonPath, toolJson);
      writeJson(sourcesPath, sourcesJson);
    }
  }
}

if (changed) {
  registry.updatedAt = verifiedDate;
  writeJson(registryPath, registry);
}

const output = {
  runId: manifest.runId,
  appliedAt: new Date().toISOString(),
  verifiedDate,
  applied,
  skipped,
};

writeJson(path.join(runDir, "applied-changes.json"), output);
console.log(`Applied ${applied.length} approved metadata findings; skipped ${skipped.length}.`);

function parseArgs(args) {
  const parsed = { runDir: "" };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--run-dir") parsed.runDir = args[++index] || "";
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!parsed.runDir) throw new Error("--run-dir is required");
  return parsed;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function listJson(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => path.join(dir, file));
}

function setLastVerified({ registryTool, toolJson, sourcesJson, verifiedDate }) {
  let changedLocal = false;
  if (registryTool.lastVerified !== verifiedDate) {
    registryTool.lastVerified = verifiedDate;
    changedLocal = true;
  }
  if (toolJson.lastVerified !== verifiedDate) {
    toolJson.lastVerified = verifiedDate;
    changedLocal = true;
  }
  if (sourcesJson && typeof sourcesJson === "object" && !Array.isArray(sourcesJson) && sourcesJson.lastVerified !== verifiedDate) {
    sourcesJson.lastVerified = verifiedDate;
    changedLocal = true;
  }
  return changedLocal;
}

function applyFinding({ finding, registryTool, toolJson }) {
  if (!finding || typeof finding !== "object") return { applied: false, reason: "Finding is not an object." };
  if (finding.requiresHumanReview) return { applied: false, reason: "Finding requires human review." };
  if (!finding.field) return { applied: false, reason: "Finding has no field." };
  if (!Object.prototype.hasOwnProperty.call(finding, "proposed")) return { applied: false, reason: "Finding has no proposed value." };
  if (!["high", "medium"].includes(finding.confidence)) return { applied: false, reason: "Finding confidence is too low for automatic application." };

  if (finding.field.startsWith("registry.")) {
    const fieldPath = finding.field.slice("registry.".length);
    if (!isAllowedRegistryField(fieldPath)) return { applied: false, reason: "Registry field is not allowlisted." };
    setPath(registryTool, fieldPath, finding.proposed);
    return { applied: true };
  }

  const fieldPath = finding.field.startsWith("tool.") ? finding.field.slice("tool.".length) : finding.field;
  if (!isAllowedToolField(fieldPath)) return { applied: false, reason: "Tool field is not allowlisted." };
  setPath(toolJson, fieldPath, finding.proposed);
  return { applied: true };
}

function isAllowedRegistryField(fieldPath) {
  return ["status", "agentReadinessScore", "lastVerified"].includes(fieldPath);
}

function isAllowedToolField(fieldPath) {
  return (
    ["status", "agentReadinessScore", "lastVerified", "needsHumanReview", "reviewReason"].includes(fieldPath) ||
    fieldPath.startsWith("interfaces.") ||
    fieldPath.startsWith("sourceQuality.")
  );
}

function setPath(target, selector, value) {
  const parts = selector.split(".").filter(Boolean);
  let cursor = target;
  while (parts.length > 1) {
    const part = parts.shift();
    if (!cursor[part] || typeof cursor[part] !== "object" || Array.isArray(cursor[part])) cursor[part] = {};
    cursor = cursor[part];
  }
  cursor[parts[0]] = value;
}
