import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const ids = new Set();
const errors = [];

for (const tool of registry.tools || []) {
  if (!tool.id || !tool.id.startsWith("/gtm/")) errors.push(`${tool.name || "unknown"} missing /gtm/ id`);
  if (!tool.name) errors.push(`${tool.id} missing name`);
  if (!tool.slug) errors.push(`${tool.id} missing slug`);
  if (!tool.path) errors.push(`${tool.id} missing path`);
  if (ids.has(tool.id)) errors.push(`duplicate id ${tool.id}`);
  ids.add(tool.id);

  const dir = path.join(root, tool.path || "");
  for (const file of ["tool.json", "docs.md", "sources.json"]) {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) errors.push(`${tool.id} missing ${file}`);
  }

  const toolJsonPath = path.join(dir, "tool.json");
  if (fs.existsSync(toolJsonPath)) {
    const meta = JSON.parse(fs.readFileSync(toolJsonPath, "utf8"));
    if (meta.id !== tool.id) errors.push(`${tool.id} id mismatch in tool.json`);
    if (meta.status !== tool.status) errors.push(`${tool.id} status mismatch in tool.json`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${registry.tools.length} tools.`);

