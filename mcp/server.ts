import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  formatDocsResult,
  formatFullDocsResult,
  loadToolFiles,
  resolveTool,
  retrieveDocs,
  searchTools
} from "../lib/retrieval.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));

const server = new McpServer({
  name: "gtm-docs-registry",
  version: "0.1.0"
});

server.tool(
  "resolve-tool-id",
  "Resolve a GTM product name or alias to a GTM Docs Registry tool ID.",
  { toolName: z.string() },
  async ({ toolName }) => {
    const tool = resolveTool(registry, toolName);
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
    const tool = resolveTool(registry, toolId);
    if (!tool) {
      return { content: [{ type: "text", text: `No tool found for ${toolId}` }], isError: true };
    }
    const files = loadToolFiles(root, tool);
    const result = retrieveDocs({ ...files, topic });
    const text = topic ? formatDocsResult(result) : formatFullDocsResult(files);
    return { content: [{ type: "text", text }] };
  }
);

server.tool(
  "get-tool-sources",
  "Get source metadata for a GTM Docs Registry tool.",
  { toolId: z.string() },
  async ({ toolId }) => {
    const tool = resolveTool(registry, toolId);
    if (!tool) {
      return { content: [{ type: "text", text: `No tool found for ${toolId}` }], isError: true };
    }
    const sourceText = fs.readFileSync(path.join(root, tool.path, "sources.json"), "utf8");
    return { content: [{ type: "text", text: sourceText }] };
  }
);

server.tool(
  "search-tools",
  "Search GTM tool names, aliases, and docs text for ranked matches.",
  {
    query: z.string(),
    limit: z.number().int().min(1).max(25).optional()
  },
  async ({ query, limit }) => {
    const results = searchTools({ root, registry, query, limit: limit || 10 });
    const text = results.length
      ? results
          .map(({ tool, score }: any) => `${tool.id}\t${tool.name}\tscore=${score.toFixed(1)}`)
          .join("\n")
      : `No tools found for ${query}`;
    return { content: [{ type: "text", text }] };
  }
);

server.resource(
  "registry",
  "gtm://registry",
  {
    title: "GTM Tool Registry",
    description: "All GTM tool metadata.",
    mimeType: "application/json"
  },
  async (uri) => ({
    contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(registry, null, 2) }]
  })
);

server.resource(
  "tool-docs",
  new ResourceTemplate("gtm://tool/{tool}/docs", {
    list: async () => ({
      resources: registry.tools.map((tool: any) => ({
        uri: `gtm://tool/${tool.slug}/docs`,
        name: `${tool.name} docs`,
        mimeType: "text/markdown"
      }))
    }),
    complete: {
      tool: async (value) =>
        registry.tools
          .map((tool: any) => tool.slug)
          .filter((slug: string) => slug.startsWith(value))
          .slice(0, 20)
    }
  }),
  {
    title: "GTM Docs Registry Tool Docs",
    description: "Retrieval-ready docs for an individual GTM tool.",
    mimeType: "text/markdown"
  },
  async (uri, variables) => {
    const tool = resolveTool(registry, String(variables.tool));
    if (!tool) {
      return { contents: [{ uri: uri.href, mimeType: "text/plain", text: `No tool found for ${variables.tool}` }] };
    }
    const files = loadToolFiles(root, tool);
    return { contents: [{ uri: uri.href, mimeType: "text/markdown", text: formatFullDocsResult({ ...files, includeSources: false }) }] };
  }
);

server.resource(
  "tool-sources",
  new ResourceTemplate("gtm://tool/{tool}/sources", {
    list: async () => ({
      resources: registry.tools.map((tool: any) => ({
        uri: `gtm://tool/${tool.slug}/sources`,
        name: `${tool.name} sources`,
        mimeType: "application/json"
      }))
    }),
    complete: {
      tool: async (value) =>
        registry.tools
          .map((tool: any) => tool.slug)
          .filter((slug: string) => slug.startsWith(value))
          .slice(0, 20)
    }
  }),
  {
    title: "GTM Docs Registry Tool Sources",
    description: "Source metadata for an individual GTM tool.",
    mimeType: "application/json"
  },
  async (uri, variables) => {
    const tool = resolveTool(registry, String(variables.tool));
    if (!tool) {
      return { contents: [{ uri: uri.href, mimeType: "text/plain", text: `No tool found for ${variables.tool}` }] };
    }
    const { sourcesText } = loadToolFiles(root, tool);
    return { contents: [{ uri: uri.href, mimeType: "application/json", text: sourcesText }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
