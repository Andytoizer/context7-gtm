#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatDocsResult,
  loadToolFiles,
  resolveTool,
  retrieveDocs,
  searchTools
} from "../lib/retrieval.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));

function printUsage() {
  console.log(`Usage:
  gtm-docs resolve <tool-name>
  gtm-docs docs <tool-id-or-name> [topic]
  gtm-docs sources <tool-id-or-name>
  gtm-docs search <query>
  gtm-docs list`);
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
  const tool = resolveTool(registry, target);
  if (!tool) {
    console.error(`No tool found for: ${target}`);
    process.exit(1);
  }
  console.log(JSON.stringify(tool, null, 2));
  process.exit(0);
}

if (command === "docs") {
  const tool = resolveTool(registry, target);
  if (!tool) {
    console.error(`No tool found for: ${target}`);
    process.exit(1);
  }
  const { docs, sourcesText } = loadToolFiles(root, tool);
  const topic = rest.join(" ").trim();

  if (!topic) {
    console.log(docs);
    process.exit(0);
  }

  const result = retrieveDocs({ docs, sourcesText, topic });
  console.log(formatDocsResult(result));
  process.exit(0);
}

if (command === "sources") {
  const tool = resolveTool(registry, target);
  if (!tool) {
    console.error(`No tool found for: ${target}`);
    process.exit(1);
  }
  const sourcesPath = path.join(root, tool.path, "sources.json");
  console.log(fs.readFileSync(sourcesPath, "utf8"));
  process.exit(0);
}

if (command === "search") {
  const query = [target, ...rest].filter(Boolean).join(" ").trim();
  if (!query) {
    console.error("Search requires a query.");
    process.exit(1);
  }
  const results = searchTools({ root, registry, query });
  if (!results.length) {
    console.log(`No tools found for: ${query}`);
    process.exit(0);
  }
  for (const { tool, score } of results) {
    const aliases = tool.aliases?.length ? ` aliases=${tool.aliases.join(", ")}` : "";
    console.log(`${tool.id}\t${tool.name}\tscore=${score.toFixed(1)}${aliases}`);
  }
  process.exit(0);
}

console.error(`Unknown command: ${command}`);
printUsage();
process.exit(1);
