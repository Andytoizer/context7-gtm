import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));

function normalize(value: string) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9.]+/g, "");
}

function resolveTool(input: string) {
  const normalized = normalize(input.replace(/^\/gtm\//, ""));
  return registry.tools.find((tool: any) => {
    const candidates = [tool.id, tool.slug, tool.name, ...(tool.aliases || [])];
    return candidates.some((candidate: string) => normalize(candidate.replace(/^\/gtm\//, "")) === normalized);
  });
}

const server = new McpServer({
  name: "context7-gtm",
  version: "0.1.0"
});

server.tool(
  "resolve-tool-id",
  "Resolve a GTM product name or alias to a Context7 GTM tool ID.",
  { toolName: z.string() },
  async ({ toolName }) => {
    const tool = resolveTool(toolName);
    if (!tool) {
      return { content: [{ type: "text", text: `No tool found for ${toolName}` }], isError: true };
    }
    return { content: [{ type: "text", text: JSON.stringify(tool, null, 2) }] };
  }
);

server.tool(
  "get-tool-docs",
  "Get retrieval-ready documentation for a GTM tool, optionally filtered by topic.",
  {
    toolId: z.string(),
    topic: z.string().optional()
  },
  async ({ toolId, topic }) => {
    const tool = resolveTool(toolId);
    if (!tool) {
      return { content: [{ type: "text", text: `No tool found for ${toolId}` }], isError: true };
    }
    const docs = fs.readFileSync(path.join(root, tool.path, "docs.md"), "utf8");
    const sourceText = fs.readFileSync(path.join(root, tool.path, "sources.json"), "utf8");
    const query = (topic || "").toLowerCase().trim();
    const sections = docs.split(/\n(?=# )/g);
    const selected = query ? sections.filter((section) => section.toLowerCase().includes(query)) : sections;
    const text = `${(selected.length ? selected : sections).join("\n")}\n\n# Source Metadata\n\n\`\`\`json\n${sourceText}\n\`\`\``;
    return { content: [{ type: "text", text }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

