#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9.]+/g, "");
}

function resolveTool(input) {
  const normalized = normalize(input.replace(/^\/gtm\//, ""));
  return registry.tools.find((tool) => {
    const candidates = [tool.id, tool.slug, tool.name, ...(tool.aliases || [])];
    return candidates.some((candidate) => normalize(candidate.replace(/^\/gtm\//, "")) === normalized);
  });
}

function printUsage() {
  console.log(`Usage:
  gtm7 resolve <tool-name>
  gtm7 docs <tool-id-or-name> [topic]
  gtm7 list`);
}

const [command, target, ...rest] = process.argv.slice(2);

if (!command || command === "help" || command === "--help") {
  printUsage();
  process.exit(0);
}

if (command === "list") {
  for (const tool of registry.tools) {
    console.log(`${tool.id}\t${tool.name}\t${tool.status}\tscore=${tool.agentReadinessScore}`);
  }
  process.exit(0);
}

if (command === "resolve") {
  const tool = resolveTool(target);
  if (!tool) {
    console.error(`No tool found for: ${target}`);
    process.exit(1);
  }
  console.log(JSON.stringify(tool, null, 2));
  process.exit(0);
}

if (command === "docs") {
  const tool = resolveTool(target);
  if (!tool) {
    console.error(`No tool found for: ${target}`);
    process.exit(1);
  }
  const docsPath = path.join(root, tool.path, "docs.md");
  const docs = fs.readFileSync(docsPath, "utf8");
  const topic = rest.join(" ").trim().toLowerCase();

  if (!topic) {
    console.log(docs);
    process.exit(0);
  }

  const sections = docs.split(/\n(?=# )/g);
  const matching = sections.filter((section) => section.toLowerCase().includes(topic));
  console.log((matching.length ? matching : sections).join("\n"));
  process.exit(0);
}

console.error(`Unknown command: ${command}`);
printUsage();
process.exit(1);

