#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatDocsResult,
  formatFullDocsResult,
  loadToolFiles,
  parseSources,
  resolveTool,
  retrieveDocs,
  searchTools
} from "../lib/retrieval.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));
const port = Number.parseInt(process.env.PORT || "8787", 10);
const publishedTools = registry.tools.filter((tool) => tool.status === "published");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400"
};

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    ...CORS_HEADERS,
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(body),
    ...extraHeaders
  });
  res.end(body);
}

function sendError(res, statusCode, message, details) {
  sendJson(res, statusCode, {
    error: {
      message,
      ...(details ? { details } : {})
    }
  });
}

function sendHtml(res, html) {
  res.writeHead(200, {
    ...CORS_HEADERS,
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=300",
    "Content-Length": Buffer.byteLength(html)
  });
  res.end(html);
}

function sendText(res, statusCode, text, contentType = "text/plain; charset=utf-8", extraHeaders = {}) {
  res.writeHead(statusCode, {
    ...CORS_HEADERS,
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=300",
    "Content-Length": Buffer.byteLength(text),
    ...extraHeaders
  });
  res.end(text);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function parseLimit(value, fallback = 10, max = 25) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return Math.min(parsed, max);
}

function decodeSegment(segment) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function toolFromPath(segments, terminalSegment) {
  const terminalIndex = segments.lastIndexOf(terminalSegment);
  if (segments[0] !== "tools" || terminalIndex < 2) return null;
  return segments.slice(1, terminalIndex).map(decodeSegment).join("/");
}

function publicTool(tool) {
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    status: tool.status,
    path: tool.path,
    aliases: tool.aliases || [],
    agentReadinessScore: tool.agentReadinessScore,
    lastVerified: tool.lastVerified
  };
}

function homeTool(tool) {
  const toolRoot = path.join(root, tool.path);
  let meta = {};
  try {
    meta = JSON.parse(fs.readFileSync(path.join(toolRoot, "tool.json"), "utf8"));
  } catch {
    meta = {};
  }
  const surfaces = meta.surfaces || meta.interfaces || {};
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.slug,
    aliases: tool.aliases || [],
    score: tool.agentReadinessScore,
    lastVerified: tool.lastVerified,
    canonicalUrl: meta.canonicalUrl || "",
    surfaces: {
      mcp: normalizeSurface(surfaces.officialMcp),
      api: normalizeSurface(surfaces.officialApi),
      cli: normalizeSurface(surfaces.officialCli),
      openapi: normalizeSurface(surfaces.openApiSpec || surfaces.openApi),
      llms: normalizeSurface(surfaces.llmsDocs || surfaces.llmsTxt),
      sdk: normalizeSurface(surfaces.officialSdk)
    }
  };
}

function normalizeSurface(value) {
  if (value === true) return "yes";
  if (value === false) return "no";
  return String(value || "unknown").toLowerCase();
}

function handleHome(res) {
  sendHtml(res, renderHomepage());
}

function handleLlms(res, full = false) {
  sendText(res, 200, renderLlmsTxt({ full }));
}

function handleOpenApi(res) {
  sendJson(res, 200, buildOpenApiSpec());
}

function handleHealth(res) {
  sendJson(res, 200, {
    ok: true,
    service: "gtm-docs-registry-http",
    registryUpdatedAt: registry.updatedAt,
    toolCount: registry.tools.length
  });
}

function handleRegistry(res) {
  sendJson(res, 200, registry);
}

function handleCatalog(res) {
  sendJson(res, 200, {
    count: publishedTools.length,
    tools: publishedTools.map(homeTool)
  });
}

function handleMcpInfo(res) {
  sendJson(res, 200, {
    name: "gtm-docs-registry",
    description: "Hosted JSON-RPC endpoint exposing GTM Docs Registry retrieval tools.",
    endpoint: "/mcp",
    transport: "http-json-rpc",
    protocol: "modelcontextprotocol-compatible",
    methods: ["initialize", "tools/list", "tools/call", "resources/list", "resources/read"],
    tools: mcpToolDefinitions().map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema
    }))
  });
}

function wantsJson(req, reqUrl) {
  const format = String(reqUrl.searchParams.get("format") || "").toLowerCase();
  if (format === "json") return true;
  if (format === "html") return false;
  const accept = String(req.headers.accept || "");
  return !accept.includes("text/html");
}

function handleSearch(reqUrl, res) {
  const query = String(reqUrl.searchParams.get("q") || "").trim();
  if (!query) {
    sendError(res, 400, "Missing required query parameter: q");
    return;
  }

  const limit = parseLimit(reqUrl.searchParams.get("limit"));
  if (limit === null) {
    sendError(res, 400, "Invalid limit. Use an integer from 1 to 25.");
    return;
  }

  const results = searchTools({ root, registry, query, limit }).map(({ tool, score }) => ({
    tool: publicTool(tool),
    score: Number(score.toFixed(2))
  }));

  sendJson(res, 200, {
    query,
    limit,
    count: results.length,
    results
  });
}

function handleResolve(reqUrl, res) {
  const query = String(reqUrl.searchParams.get("query") || "").trim();
  if (!query) {
    sendError(res, 400, "Missing required query parameter: query");
    return;
  }

  const tool = resolveTool(registry, query);
  if (!tool) {
    sendError(res, 404, `No tool found for: ${query}`);
    return;
  }

  sendJson(res, 200, {
    query,
    tool: publicTool(tool)
  });
}

function handleDocs(req, reqUrl, res, slugOrId) {
  if (!slugOrId) {
    sendError(res, 400, "Missing tool slug or ID.");
    return;
  }

  const tool = resolveTool(registry, slugOrId);
  if (!tool) {
    sendError(res, 404, `No tool found for: ${slugOrId}`);
    return;
  }

  const topic = String(reqUrl.searchParams.get("topic") || "").trim();
  const files = loadToolFiles(root, tool);
  const sources = parseSources(files.sourcesText);

  if (!topic) {
    if (!wantsJson(req, reqUrl)) {
      sendHtml(res, renderToolDocsPage({ tool, files, sources, topic: null }));
      return;
    }

    sendJson(res, 200, docsPayload(tool, files));
    return;
  }

  const result = retrieveDocs({ ...files, topic });
  if (!wantsJson(req, reqUrl)) {
    sendHtml(res, renderToolDocsPage({ tool, files, sources, topic, result }));
    return;
  }

  sendJson(res, 200, docsPayload(tool, files, topic));
}

function handleSources(res, slugOrId) {
  if (!slugOrId) {
    sendError(res, 400, "Missing tool slug or ID.");
    return;
  }

  const tool = resolveTool(registry, slugOrId);
  if (!tool) {
    sendError(res, 404, `No tool found for: ${slugOrId}`);
    return;
  }

  const { sourcesText } = loadToolFiles(root, tool);
  sendJson(res, 200, {
    tool: publicTool(tool),
    sources: parseSources(sourcesText)
  });
}

function docsPayload(tool, files, topic = "") {
  const sources = parseSources(files.sourcesText);
  if (!topic) {
    return {
      tool: publicTool(tool),
      topic: null,
      text: formatFullDocsResult(files),
      hasReference: files.hasReference,
      sources
    };
  }

  const result = retrieveDocs({ ...files, topic });
  return {
    tool: publicTool(tool),
    topic,
    hasReference: files.hasReference,
    text: formatDocsResult(result),
    sections: result.selected,
    fallback: result.fallback,
    sources: result.relatedSources
  };
}

function mcpToolDefinitions() {
  return [
    {
      name: "resolve-tool-id",
      description: "Resolve a GTM product name, slug, alias, or /gtm/<slug> ID to registry metadata.",
      inputSchema: {
        type: "object",
        properties: {
          toolName: { type: "string", description: "Tool name, alias, slug, or /gtm/<slug> ID." }
        },
        required: ["toolName"],
        additionalProperties: false
      }
    },
    {
      name: "get-tool-docs",
      description: "Get source-backed retrieval docs for a GTM tool, optionally filtered by topic.",
      inputSchema: {
        type: "object",
        properties: {
          toolId: { type: "string", description: "Tool name, slug, alias, or /gtm/<slug> ID." },
          topic: { type: "string", description: "Optional retrieval topic such as auth, MCP, pagination, contacts API." }
        },
        required: ["toolId"],
        additionalProperties: false
      }
    },
    {
      name: "get-tool-sources",
      description: "Get source metadata for a GTM tool.",
      inputSchema: {
        type: "object",
        properties: {
          toolId: { type: "string", description: "Tool name, slug, alias, or /gtm/<slug> ID." }
        },
        required: ["toolId"],
        additionalProperties: false
      }
    },
    {
      name: "search-tools",
      description: "Search GTM tool names, aliases, and docs text for ranked matches.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query." },
          limit: { type: "integer", minimum: 1, maximum: 25, default: 10 }
        },
        required: ["query"],
        additionalProperties: false
      }
    }
  ];
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function handleMcpPost(req, res) {
  let message;
  try {
    const body = await readRequestBody(req);
    message = JSON.parse(body || "{}");
  } catch {
    sendJson(res, 400, mcpError(null, -32700, "Parse error"));
    return;
  }

  if (Array.isArray(message)) {
    sendJson(res, 200, message.map((entry) => handleMcpMessage(entry)).filter(Boolean));
    return;
  }

  const response = handleMcpMessage(message);
  if (!response) {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }
  sendJson(res, 200, response);
}

function handleMcpMessage(message) {
  const id = Object.prototype.hasOwnProperty.call(message || {}, "id") ? message.id : null;
  const method = message?.method;
  const params = message?.params || {};

  if (!id && String(method || "").startsWith("notifications/")) return null;

  try {
    if (method === "initialize") {
      return mcpResult(id, {
        protocolVersion: params.protocolVersion || "2025-06-18",
        capabilities: {
          tools: {},
          resources: {}
        },
        serverInfo: {
          name: "gtm-docs-registry",
          version: "0.1.0"
        }
      });
    }

    if (method === "tools/list") {
      return mcpResult(id, { tools: mcpToolDefinitions() });
    }

    if (method === "tools/call") {
      return mcpResult(id, callMcpTool(params.name, params.arguments || {}));
    }

    if (method === "resources/list") {
      return mcpResult(id, {
        resources: [
          { uri: "gtm://registry", name: "GTM Tool Registry", mimeType: "application/json" },
          ...publishedTools.flatMap((tool) => [
            { uri: `gtm://tool/${tool.slug}/docs`, name: `${tool.name} docs`, mimeType: "text/markdown" },
            { uri: `gtm://tool/${tool.slug}/sources`, name: `${tool.name} sources`, mimeType: "application/json" }
          ])
        ]
      });
    }

    if (method === "resources/read") {
      return mcpResult(id, readMcpResource(params.uri));
    }

    return mcpError(id, -32601, `Method not found: ${method}`);
  } catch (error) {
    return mcpError(id, -32603, error instanceof Error ? error.message : String(error));
  }
}

function mcpResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function mcpError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function callMcpTool(name, args) {
  if (name === "resolve-tool-id") {
    const query = String(args.toolName || "").trim();
    const tool = resolveTool(registry, query);
    if (!tool) return mcpText(`No tool found for ${query}`, true);
    return mcpText(JSON.stringify(publicTool(tool), null, 2));
  }

  if (name === "get-tool-docs") {
    const query = String(args.toolId || "").trim();
    const tool = resolveTool(registry, query);
    if (!tool) return mcpText(`No tool found for ${query}`, true);
    const files = loadToolFiles(root, tool);
    const topic = String(args.topic || "").trim();
    const payload = docsPayload(tool, files, topic);
    return mcpText(payload.text);
  }

  if (name === "get-tool-sources") {
    const query = String(args.toolId || "").trim();
    const tool = resolveTool(registry, query);
    if (!tool) return mcpText(`No tool found for ${query}`, true);
    const { sourcesText } = loadToolFiles(root, tool);
    return mcpText(sourcesText);
  }

  if (name === "search-tools") {
    const query = String(args.query || "").trim();
    const limit = Math.min(Math.max(Number.parseInt(args.limit || "10", 10) || 10, 1), 25);
    const results = searchTools({ root, registry, query, limit });
    const text = results.length
      ? results.map(({ tool, score }) => `${tool.id}\t${tool.name}\tscore=${score.toFixed(1)}`).join("\n")
      : `No tools found for ${query}`;
    return mcpText(text);
  }

  return mcpText(`Unknown tool: ${name}`, true);
}

function mcpText(text, isError = false) {
  return {
    content: [{ type: "text", text }],
    ...(isError ? { isError: true } : {})
  };
}

function readMcpResource(uri) {
  if (uri === "gtm://registry") {
    return {
      contents: [{ uri, mimeType: "application/json", text: JSON.stringify(registry, null, 2) }]
    };
  }

  const match = /^gtm:\/\/tool\/(.+?)\/(docs|sources)$/.exec(String(uri || ""));
  if (!match) return { contents: [{ uri, mimeType: "text/plain", text: `Unknown resource: ${uri}` }] };

  const tool = resolveTool(registry, match[1]);
  if (!tool) return { contents: [{ uri, mimeType: "text/plain", text: `No tool found for ${match[1]}` }] };

  const files = loadToolFiles(root, tool);
  if (match[2] === "sources") {
    return { contents: [{ uri, mimeType: "application/json", text: files.sourcesText }] };
  }

  return {
    contents: [{ uri, mimeType: "text/markdown", text: formatFullDocsResult({ ...files, includeSources: false }) }]
  };
}

function renderLlmsTxt({ full = false } = {}) {
  const baseUrl = "https://gtm-docs-registry.vercel.app";
  const topTools = publishedTools.slice(0, full ? publishedTools.length : 40);
  const lines = [
    "# GTM Docs Registry",
    "",
    "Source-backed docs retrieval for GTM tools. Use this service to resolve GTM product names and fetch agent-ready documentation about MCP, CLI, API, OpenAPI, SDK, auth, pagination, rate limits, webhooks, destructive operations, and source links.",
    "",
    "This is not a buying guide or workflow recipe catalog. Agents should use it as a retrieval layer and compose their own workflows from returned source-backed documentation.",
    "",
    "## Agent Endpoints",
    "",
    `- Homepage and searchable catalog: ${baseUrl}/`,
    `- Published catalog JSON: ${baseUrl}/catalog`,
    `- OpenAPI spec: ${baseUrl}/openapi.json`,
    `- Hosted MCP JSON-RPC endpoint: ${baseUrl}/mcp`,
    `- Registry JSON: ${baseUrl}/registry`,
    `- Search tools: ${baseUrl}/tools/search?q=hubspot&limit=5`,
    `- Resolve tool: ${baseUrl}/tools/resolve?query=hubspot`,
    `- Human docs page: ${baseUrl}/tools/hubspot/docs`,
    `- Agent JSON docs: ${baseUrl}/tools/hubspot/docs?format=json`,
    `- Topic retrieval JSON: ${baseUrl}/tools/hubspot/docs?topic=contacts&format=json`,
    `- Source metadata: ${baseUrl}/tools/hubspot/sources`,
    "",
    "## Hosted MCP JSON-RPC Tools",
    "",
    "- resolve-tool-id: resolve a GTM product name or alias to a /gtm/<slug> ID.",
    "- get-tool-docs: retrieve source-backed tool docs, optionally filtered by topic.",
    "- get-tool-sources: retrieve source metadata for a tool.",
    "- search-tools: search names, aliases, and docs text.",
    "",
    "## Recommended Agent Flow",
    "",
    "1. Call /tools/resolve?query=<name> or MCP resolve-tool-id.",
    "2. Call /tools/<slug>/docs?topic=<topic>&format=json or MCP get-tool-docs.",
    "3. Inspect returned sources before destructive or high-impact actions.",
    "4. Prefer official MCP/API/CLI/OpenAPI/SDK surfaces when present.",
    "",
    `## Published Tools (${publishedTools.length})`,
    "",
    ...topTools.map((tool) => `- ${tool.name}: ${baseUrl}/tools/${tool.slug}/docs?format=json`)
  ];

  if (!full) {
    lines.push("", `For the complete ${publishedTools.length}-tool list, fetch ${baseUrl}/llms-full.txt or ${baseUrl}/catalog.`);
  }

  if (full) {
    lines.push(
      "",
      "## Full Catalog JSON Shape",
      "",
      "/catalog returns { count, tools[] }. Each tool includes id, name, slug, aliases, score, lastVerified, canonicalUrl, and normalized surface flags for mcp, api, cli, openapi, llms, and sdk.",
      "",
      "## JSON-RPC MCP Example",
      "",
      "POST /mcp",
      "",
      "```json",
      JSON.stringify(
        {
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "get-tool-docs",
            arguments: { toolId: "hubspot", topic: "contacts auth" }
          }
        },
        null,
        2
      ),
      "```"
    );
  }

  return `${lines.join("\n")}\n`;
}

function buildOpenApiSpec() {
  return {
    openapi: "3.1.0",
    info: {
      title: "GTM Docs Registry API",
      version: "0.1.0",
      description: "Source-backed docs retrieval for GTM tools."
    },
    servers: [{ url: "https://gtm-docs-registry.vercel.app" }],
    paths: {
      "/health": {
        get: {
          summary: "Health check",
          responses: { 200: { description: "Service health" } }
        }
      },
      "/catalog": {
        get: {
          summary: "Published tool catalog",
          responses: { 200: { description: "Published tools only" } }
        }
      },
      "/registry": {
        get: {
          summary: "Full registry",
          responses: { 200: { description: "All registry entries including non-published statuses" } }
        }
      },
      "/tools/search": {
        get: {
          summary: "Search tools",
          parameters: [
            { name: "q", in: "query", required: true, schema: { type: "string" } },
            { name: "limit", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 25, default: 10 } }
          ],
          responses: { 200: { description: "Ranked tool search results" }, 400: { description: "Invalid query" } }
        }
      },
      "/tools/resolve": {
        get: {
          summary: "Resolve a tool name or alias",
          parameters: [{ name: "query", in: "query", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Resolved tool" }, 404: { description: "Tool not found" } }
        }
      },
      "/tools/{tool}/docs": {
        get: {
          summary: "Get tool docs",
          parameters: [
            { name: "tool", in: "path", required: true, schema: { type: "string" } },
            { name: "topic", in: "query", required: false, schema: { type: "string" } },
            { name: "format", in: "query", required: false, schema: { type: "string", enum: ["json", "html"] } }
          ],
          responses: {
            200: {
              description: "Human-readable HTML or agent JSON docs depending on Accept header/format query"
            },
            404: { description: "Tool not found" }
          }
        }
      },
      "/tools/{tool}/sources": {
        get: {
          summary: "Get tool source metadata",
          parameters: [{ name: "tool", in: "path", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Source metadata" }, 404: { description: "Tool not found" } }
        }
      },
      "/mcp": {
        get: {
          summary: "Hosted MCP endpoint metadata",
          responses: { 200: { description: "Endpoint and tool metadata" } }
        },
        post: {
          summary: "Hosted MCP JSON-RPC endpoint",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { type: "object" }
              }
            }
          },
          responses: { 200: { description: "JSON-RPC response" }, 204: { description: "Notification accepted" } }
        }
      },
      "/llms.txt": {
        get: {
          summary: "Agent discovery file",
          responses: { 200: { description: "Short llms.txt" } }
        }
      },
      "/llms-full.txt": {
        get: {
          summary: "Full agent discovery file",
          responses: { 200: { description: "Full llms.txt with all published tools" } }
        }
      },
      "/openapi.json": {
        get: {
          summary: "OpenAPI specification",
          responses: { 200: { description: "OpenAPI 3.1 document" } }
        }
      }
    }
  };
}

function renderHomepage() {
  const tools = publishedTools.map(homeTool);
  const toolsJson = JSON.stringify(tools).replaceAll("<", "\\u003c");
  const mcpCount = tools.filter((tool) => tool.surfaces.mcp === "yes").length;
  const apiCount = tools.filter((tool) => tool.surfaces.api === "yes").length;
  const highReadyCount = tools.filter((tool) => tool.score >= 5).length;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GTM Docs Registry — Source-backed docs for agents</title>
  <meta name="description" content="A catalog of GTM tools with source-backed MCP, API, CLI, OpenAPI, SDK, and llms.txt docs your agents can actually trust.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..700,0..100,0..1;1,9..144,400..700,0..100,0..1&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
  <style>
    :root {
      color-scheme: light;
      --paper: #F6F1E4;
      --paper-2: #FBF7EC;
      --card: #FFFCF3;
      --ink: #16140F;
      --ink-2: #2E2A22;
      --muted: #8A8273;
      --rule: #DFD5BB;
      --rule-soft: #ECE3CA;
      --accent: #C24A26;
      --accent-deep: #9B3514;
      --positive: #2A6A50;
      --positive-soft: #E1ECDF;
      --amber: #A66515;
      --amber-soft: #F2E2BD;
      --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
      --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
    }

    *, *::before, *::after { box-sizing: border-box; }

    html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

    body {
      margin: 0;
      font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
      font-size: 16px;
      color: var(--ink);
      background: var(--paper);
      line-height: 1.5;
      position: relative;
      overflow-x: hidden;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: .55;
      mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.49 0 0 0 0 0.36 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
      background-size: 320px 320px;
    }

    body::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(1200px 600px at 80% -10%, rgba(194, 74, 38, .08), transparent 60%),
                  radial-gradient(900px 480px at -5% 110%, rgba(42, 106, 80, .07), transparent 60%);
    }

    main, header, footer { position: relative; z-index: 1; }

    a { color: inherit; text-decoration: none; }

    ::selection { background: var(--ink); color: var(--paper); }

    .shell {
      width: min(1200px, calc(100% - 40px));
      margin: 0 auto;
    }

    /* ── Header ─────────────────────────────────────────────── */
    header {
      border-bottom: 1px solid var(--rule);
      background: rgba(246, 241, 228, .8);
      position: sticky;
      top: 0;
      z-index: 20;
      backdrop-filter: saturate(140%) blur(14px);
      -webkit-backdrop-filter: saturate(140%) blur(14px);
    }

    .nav {
      min-height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .brand {
      display: inline-flex;
      align-items: baseline;
      gap: 10px;
      font-family: "Fraunces", serif;
      font-weight: 500;
      font-size: 19px;
      letter-spacing: -0.01em;
      font-variation-settings: "opsz" 36, "SOFT" 60, "WONK" 1;
    }

    .brand-mark {
      display: inline-grid;
      place-items: center;
      width: 28px;
      height: 28px;
      background: var(--ink);
      color: var(--paper);
      border-radius: 4px;
      font-family: "Fraunces", serif;
      font-style: italic;
      font-weight: 600;
      font-size: 16px;
      transform: translateY(2px);
      font-variation-settings: "opsz" 36, "SOFT" 100, "WONK" 1;
    }

    .brand em {
      font-style: italic;
      font-weight: 400;
      color: var(--ink-2);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      font-size: 14px;
      color: var(--ink-2);
    }

    .nav-link {
      position: relative;
      padding: 4px 0;
      transition: color 160ms var(--ease-out);
    }

    .nav-link::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 240ms var(--ease-out);
    }

    .nav-link:hover::after { transform: scaleX(1); }

    .button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 38px;
      padding: 0 16px;
      border: 1px solid var(--ink);
      border-radius: 999px;
      background: transparent;
      color: var(--ink);
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 500;
      letter-spacing: 0.01em;
      cursor: pointer;
      transition: transform 160ms var(--ease-out), background 200ms var(--ease-out), color 200ms var(--ease-out);
    }

    .button:active { transform: scale(0.97); }

    .button:hover { background: var(--ink); color: var(--paper); }

    .button.primary {
      background: var(--ink);
      color: var(--paper);
    }
    .button.primary:hover { background: var(--accent); border-color: var(--accent); color: #fff; }

    .button .arrow {
      display: inline-block;
      transition: transform 200ms var(--ease-out);
    }
    .button:hover .arrow { transform: translateX(3px); }

    /* ── Hero ───────────────────────────────────────────────── */
    main { padding: 72px 0 96px; }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
      gap: 72px;
      align-items: end;
    }

    .hero-text > * { opacity: 0; animation: rise 700ms var(--ease-out) forwards; }
    .eyebrow { animation-delay: 60ms; }
    h1 { animation-delay: 140ms; }
    .lede { animation-delay: 240ms; }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11.5px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
    }
    .eyebrow::before {
      content: "";
      width: 22px;
      height: 1px;
      background: currentColor;
    }

    h1 {
      font-family: "Fraunces", serif;
      font-weight: 400;
      font-variation-settings: "opsz" 144, "SOFT" 60, "WONK" 1;
      font-size: clamp(56px, 8vw, 108px);
      line-height: 0.93;
      letter-spacing: -0.025em;
      margin: 22px 0 0;
      color: var(--ink);
    }

    h1 em {
      font-style: italic;
      font-weight: 400;
      color: var(--accent);
      font-variation-settings: "opsz" 144, "SOFT" 100, "WONK" 1;
    }

    h1 .amp {
      font-style: italic;
      font-weight: 400;
      color: var(--ink-2);
      font-variation-settings: "opsz" 144, "SOFT" 100, "WONK" 1;
    }

    .lede {
      max-width: 540px;
      margin: 28px 0 0;
      font-size: 18px;
      line-height: 1.55;
      color: var(--ink-2);
    }

    /* ── Search panel ───────────────────────────────────────── */
    .hero-aside {
      opacity: 0;
      animation: rise 700ms var(--ease-out) 320ms forwards;
    }

    .search-card {
      background: var(--card);
      border: 1px solid var(--rule);
      border-radius: 14px;
      padding: 22px;
      box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 24px 50px -28px rgba(22, 20, 15, .25);
    }

    .search-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 12px;
    }

    .search-label .count {
      color: var(--ink-2);
    }

    .search-input {
      position: relative;
    }

    .search-input svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--muted);
      pointer-events: none;
    }

    input[type="search"] {
      width: 100%;
      height: 54px;
      padding: 0 16px 0 44px;
      border: 1px solid var(--rule);
      border-radius: 10px;
      background: var(--paper-2);
      color: var(--ink);
      font: inherit;
      font-size: 16px;
      outline: none;
      transition: border-color 200ms var(--ease-out), box-shadow 240ms var(--ease-out), background 200ms var(--ease-out);
    }

    input[type="search"]::placeholder { color: var(--muted); font-style: italic; }

    input[type="search"]:focus {
      border-color: var(--ink);
      background: #fff;
      box-shadow: 0 0 0 4px rgba(22, 20, 15, .08);
    }

    .quick {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 14px;
    }

    .chip {
      border: 1px solid var(--rule);
      background: transparent;
      color: var(--ink-2);
      border-radius: 999px;
      padding: 7px 11px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 200ms var(--ease-out), color 200ms var(--ease-out), border-color 200ms var(--ease-out), transform 160ms var(--ease-out);
    }

    .chip:hover {
      border-color: var(--ink);
      color: var(--ink);
      background: rgba(22,20,15,.04);
    }
    .chip:active { transform: scale(0.97); }
    .chip[data-active="true"] {
      background: var(--ink);
      color: var(--paper);
      border-color: var(--ink);
    }

    /* ── Stats strip ────────────────────────────────────────── */
    .stats {
      margin-top: 88px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid var(--rule);
      border-bottom: 1px solid var(--rule);
    }

    .stat {
      padding: 28px 24px 24px;
      border-left: 1px solid var(--rule-soft);
      position: relative;
      overflow: hidden;
    }
    .stat:first-child { border-left: 0; }

    .stat-num {
      display: block;
      font-family: "Fraunces", serif;
      font-weight: 400;
      font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 0;
      font-size: 56px;
      line-height: 1;
      letter-spacing: -0.03em;
      font-feature-settings: "tnum";
      color: var(--ink);
    }

    .stat-label {
      display: block;
      margin-top: 14px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* ── Catalog ────────────────────────────────────────────── */
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 24px;
      margin: 88px 0 28px;
    }

    .section-head h2 {
      margin: 0;
      font-family: "Fraunces", serif;
      font-weight: 400;
      font-variation-settings: "opsz" 144, "SOFT" 50, "WONK" 1;
      font-size: 44px;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .section-head h2 em { font-style: italic; color: var(--accent); }

    .section-head p {
      margin: 10px 0 0;
      max-width: 460px;
      color: var(--muted);
      font-size: 15px;
    }

    .section-head .right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .filter-meta {
      font-family: "IBM Plex Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .catalog {
      border-top: 1px solid var(--ink);
      border-bottom: 1px solid var(--ink);
    }

    .catalog-head, .tool-row {
      display: grid;
      grid-template-columns: minmax(220px, 1.2fr) minmax(220px, 1.6fr) minmax(120px, 0.6fr) 44px;
      gap: 28px;
      align-items: center;
      padding: 20px 4px;
    }

    .catalog-head {
      padding: 14px 4px;
      border-bottom: 1px solid var(--rule);
      font-family: "IBM Plex Mono", monospace;
      font-size: 10.5px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .catalog-head .col-right { text-align: right; }

    .tool-row {
      border-bottom: 1px solid var(--rule-soft);
      transition: background 200ms var(--ease-out);
      position: relative;
      cursor: pointer;
    }
    .tool-row:last-child { border-bottom: 0; }
    .tool-row:hover { background: rgba(22, 20, 15, .035); }
    .tool-row:active { transform: scale(0.997); }

    .tool-row::before {
      content: "";
      position: absolute;
      left: -12px;
      top: 50%;
      width: 4px;
      height: 0%;
      transform: translateY(-50%);
      background: var(--accent);
      transition: height 240ms var(--ease-out);
    }
    .tool-row:hover::before { height: 60%; }

    .tool-name {
      font-family: "Fraunces", serif;
      font-weight: 500;
      font-variation-settings: "opsz" 36, "SOFT" 50, "WONK" 0;
      font-size: 22px;
      letter-spacing: -0.01em;
      color: var(--ink);
      line-height: 1.1;
    }

    .tool-id {
      margin-top: 4px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11.5px;
      color: var(--muted);
      letter-spacing: 0.02em;
    }

    .tool-aliases {
      margin-top: 6px;
      font-family: "Fraunces", serif;
      font-style: italic;
      font-size: 14px;
      color: var(--muted);
      font-variation-settings: "opsz" 14, "SOFT" 100, "WONK" 0;
    }

    .surfaces {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px 8px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11.5px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .surfaces .s {
      display: inline-flex;
      align-items: center;
    }
    .surfaces .sep {
      color: var(--rule);
      font-weight: 400;
    }
    .s-yes { color: var(--positive); font-weight: 500; }
    .s-announced {
      color: var(--amber);
      font-style: italic;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 3px;
    }
    .surfaces-empty {
      color: var(--muted);
      font-family: "Fraunces", serif;
      font-style: italic;
      font-size: 13px;
      text-transform: none;
      letter-spacing: 0;
    }

    .score {
      justify-self: end;
      display: inline-flex;
      align-items: baseline;
      gap: 2px;
      font-family: "Fraunces", serif;
      font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 0;
      font-feature-settings: "tnum";
      font-weight: 400;
      font-size: 32px;
      color: var(--ink);
      line-height: 1;
    }
    .score .denom {
      font-family: "IBM Plex Mono", monospace;
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 0.06em;
    }
    .score[data-low="true"] { color: var(--muted); }

    .row-arrow {
      justify-self: end;
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      color: var(--muted);
      border-radius: 999px;
      transition: color 200ms var(--ease-out), background 200ms var(--ease-out), transform 200ms var(--ease-out);
    }
    .tool-row:hover .row-arrow {
      color: var(--ink);
      background: var(--paper-2);
      transform: translateX(4px);
    }

    /* Stagger only first paint */
    .tool-row[data-enter="true"] {
      opacity: 0;
      transform: translateY(8px);
      animation: rise 600ms var(--ease-out) forwards;
    }
    .tool-row[data-enter="true"]:nth-child(1) { animation-delay: 40ms; }
    .tool-row[data-enter="true"]:nth-child(2) { animation-delay: 80ms; }
    .tool-row[data-enter="true"]:nth-child(3) { animation-delay: 120ms; }
    .tool-row[data-enter="true"]:nth-child(4) { animation-delay: 160ms; }
    .tool-row[data-enter="true"]:nth-child(5) { animation-delay: 200ms; }
    .tool-row[data-enter="true"]:nth-child(6) { animation-delay: 240ms; }
    .tool-row[data-enter="true"]:nth-child(7) { animation-delay: 280ms; }
    .tool-row[data-enter="true"]:nth-child(8) { animation-delay: 320ms; }
    .tool-row[data-enter="true"]:nth-child(n+9) { animation-delay: 360ms; }

    .empty-row {
      padding: 40px 4px;
      text-align: center;
      color: var(--muted);
      font-family: "Fraunces", serif;
      font-style: italic;
      font-size: 18px;
    }

    /* ── API section ────────────────────────────────────────── */
    .api {
      margin-top: 96px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
      gap: 32px;
      align-items: stretch;
    }

    .api-copy h2 {
      font-family: "Fraunces", serif;
      font-weight: 400;
      font-variation-settings: "opsz" 144, "SOFT" 50, "WONK" 1;
      font-size: clamp(36px, 4vw, 52px);
      line-height: 1.02;
      letter-spacing: -0.02em;
      margin: 0;
    }
    .api-copy h2 em { font-style: italic; color: var(--accent); }

    .api-copy p {
      margin: 22px 0 28px;
      color: var(--ink-2);
      font-size: 16px;
      line-height: 1.6;
      max-width: 460px;
    }

    .api-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    pre.api-code {
      margin: 0;
      overflow: auto;
      border-radius: 14px;
      background: #16140F;
      color: #ECE3CA;
      padding: 28px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 13px;
      line-height: 1.75;
      border: 1px solid var(--ink-2);
      position: relative;
      box-shadow: 0 30px 70px -40px rgba(22,20,15,.6);
    }

    .api-code .c { color: #8A8273; }
    .api-code .v { color: #E89370; }
    .api-code .k { color: #F2E2BD; }
    .api-code .s { color: #B8D4B9; }

    .api-code::before {
      content: "";
      position: absolute;
      top: 14px;
      left: 18px;
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--accent);
      box-shadow: 14px 0 0 #A66515, 28px 0 0 #2A6A50;
    }

    /* ── Footer ─────────────────────────────────────────────── */
    footer {
      margin-top: 88px;
      padding: 40px 0 56px;
      border-top: 1px solid var(--rule);
    }
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: 13px;
    }
    .footer-row em {
      font-family: "Fraunces", serif;
      font-style: italic;
      color: var(--ink-2);
      font-size: 15px;
    }

    @keyframes rise {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-delay: 0ms !important;
        transition-duration: 120ms !important;
      }
    }

    @media (max-width: 980px) {
      .hero { grid-template-columns: 1fr; gap: 40px; align-items: start; }
      .hero-aside { width: 100%; }
      .stats { grid-template-columns: repeat(2, 1fr); }
      .stat:nth-child(3) { border-top: 1px solid var(--rule-soft); border-left: 0; }
      .stat:nth-child(4) { border-top: 1px solid var(--rule-soft); }
      .api { grid-template-columns: 1fr; }
      .catalog-head, .tool-row { grid-template-columns: 1fr 36px; gap: 16px; }
      .catalog-head .col-surfaces, .catalog-head .col-score { display: none; }
      .tool-row .surfaces, .tool-row .score { grid-column: 1 / -1; }
      .row-arrow { grid-row: 1; grid-column: 2; align-self: start; }
      .tool-row .tool-info { grid-column: 1; }
      h1 { font-size: clamp(48px, 12vw, 72px); }
    }

    @media (max-width: 640px) {
      main { padding: 40px 0 56px; }
      .nav { min-height: 60px; gap: 12px; }
      .brand { white-space: nowrap; font-size: 17px; min-width: 0; }
      .brand > span:last-child { white-space: nowrap; }
      .brand em { display: none; }
      .nav-links { gap: 12px; font-size: 13px; }
      .nav-links .nav-link { display: none; }
      .nav-links .button { padding: 0 12px; font-size: 12.5px; height: 34px; }
      .stats { grid-template-columns: 1fr 1fr; }
      .stat-num { font-size: 44px; }
      .section-head { flex-direction: column; align-items: flex-start; }
      .section-head .right { width: 100%; justify-content: space-between; }
    }
  </style>
</head>
<body>
  <header>
    <div class="shell nav">
      <a class="brand" href="/">
        <span class="brand-mark">g</span>
        <span>GTM Docs <em>Registry</em></span>
      </a>
      <nav class="nav-links">
        <a class="nav-link" href="#catalog">Catalog</a>
        <a class="nav-link" href="#api">API</a>
        <a class="nav-link" href="https://github.com/Andytoizer/gtm-docs-registry">GitHub</a>
        <a class="button" href="/registry">Registry JSON <span class="arrow">→</span></a>
      </nav>
    </div>
  </header>

  <main>
    <section class="shell hero">
      <div class="hero-text">
        <div class="eyebrow">Source-backed docs for agents</div>
        <h1>Tools your<br>agents <em>can&nbsp;trust</em>,<br><span class="amp">&amp;</span> humans can read.</h1>
        <p class="lede">A curated catalog of GTM products with source-backed MCP, API, CLI, OpenAPI, SDK, llms.txt and caveat docs — the context an agent needs to ship without guessing.</p>
      </div>

      <aside class="hero-aside">
        <div class="search-card" aria-label="Tool catalog search">
          <div class="search-label">
            <span>Search the catalog</span>
            <span class="count"><strong id="visible-count">${tools.length}</strong> · ${tools.length} tools</span>
          </div>
          <div class="search-input">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/></svg>
            <input id="search" type="search" autocomplete="off" placeholder="HubSpot, Clay, Apollo, Snowflake, Gong…">
          </div>
          <div class="quick" aria-label="Quick filters">
            <button class="chip" data-query="mcp">MCP</button>
            <button class="chip" data-query="api">API</button>
            <button class="chip" data-query="cli">CLI</button>
            <button class="chip" data-query="openapi">OpenAPI</button>
            <button class="chip" data-query="llms">llms.txt</button>
            <button class="chip" data-query="sdk">SDK</button>
          </div>
        </div>
      </aside>
    </section>

    <section class="shell stats" aria-label="Registry stats">
      <div class="stat">
        <span class="stat-num">${tools.length}</span>
        <span class="stat-label">Published profiles</span>
      </div>
      <div class="stat">
        <span class="stat-num">${mcpCount}</span>
        <span class="stat-label">Official MCP surfaces</span>
      </div>
      <div class="stat">
        <span class="stat-num">${apiCount}</span>
        <span class="stat-label">Official APIs</span>
      </div>
      <div class="stat">
        <span class="stat-num">${highReadyCount}</span>
        <span class="stat-label">Five-of-five readiness</span>
      </div>
    </section>

    <section id="catalog" class="shell">
      <div class="section-head">
        <div>
          <h2>The <em>catalog</em></h2>
          <p>Every entry below is published, source-backed, and verified against the vendor's own documentation.</p>
        </div>
        <div class="right">
          <span class="filter-meta" id="filter-meta">All tools</span>
          <a class="button primary" href="#api">See the API <span class="arrow">→</span></a>
        </div>
      </div>
      <div class="catalog">
        <div class="catalog-head" role="row">
          <div>Tool</div>
          <div class="col-surfaces">Surfaces</div>
          <div class="col-score col-right">Readiness</div>
          <div></div>
        </div>
        <div id="catalog-list"></div>
      </div>
    </section>

    <section id="api" class="shell api">
      <div class="api-copy">
        <h2>Built for <em>agents</em>,<br>usable by humans.</h2>
        <p>Resolve tool names, fetch focused docs by topic, inspect sources, or search across the catalog over HTTP. The same retrieval layer powers the local CLI and MCP server.</p>
        <div class="api-actions">
          <a class="button primary" href="https://github.com/Andytoizer/gtm-docs-registry">View on GitHub <span class="arrow">→</span></a>
          <a class="button" href="/catalog">Catalog JSON</a>
        </div>
      </div>
      <pre class="api-code"><code><span class="c"># Resolve a tool by name or alias</span>
<span class="k">curl</span> <span class="s">"https://gtm-docs-registry.vercel.app/tools/resolve?query=hubspot"</span>

<span class="c"># Fetch focused docs by topic</span>
<span class="k">curl</span> <span class="s">"…/tools/monaco/docs?topic=mcp&amp;format=json"</span>

<span class="c"># Search across the catalog</span>
<span class="k">curl</span> <span class="s">"…/tools/search?q=openapi&amp;limit=10"</span></code></pre>
    </section>
  </main>

  <footer>
    <div class="shell footer-row">
      <span><em>Open-source</em> docs retrieval for agent builders.</span>
      <span>MIT · maintained on <a href="https://github.com/Andytoizer/gtm-docs-registry" class="nav-link">GitHub</a></span>
    </div>
  </footer>

  <script type="application/json" id="tool-data">${toolsJson}</script>
  <script>
    const tools = JSON.parse(document.getElementById("tool-data").textContent);
    const list = document.getElementById("catalog-list");
    const input = document.getElementById("search");
    const visibleCount = document.getElementById("visible-count");
    const filterMeta = document.getElementById("filter-meta");
    const total = tools.length;
    let firstRender = true;

    const SURFACE_LABELS = { mcp: "MCP", api: "API", cli: "CLI", openapi: "OpenAPI", llms: "llms.txt", sdk: "SDK" };

    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]);
    }

    function toolText(tool) {
      const surfaceWords = Object.entries(tool.surfaces)
        .filter(([, v]) => v === "yes" || v === "announced")
        .map(([k]) => k);
      return [tool.name, tool.id, tool.slug, ...(tool.aliases || []), ...surfaceWords].join(" ").toLowerCase();
    }

    function renderSurfaces(surfaces) {
      const order = ["mcp", "api", "cli", "openapi", "llms", "sdk"];
      const items = order
        .filter((k) => surfaces[k] === "yes" || surfaces[k] === "announced")
        .map((k) => '<span class="s s-' + surfaces[k] + '">' + SURFACE_LABELS[k] + '</span>');
      if (!items.length) return '<span class="surfaces-empty">profile only</span>';
      return items.join('<span class="sep">·</span>');
    }

    function rowHtml(tool, enter) {
      const aliases = tool.aliases && tool.aliases.length
        ? '<div class="tool-aliases">' + escapeHtml(tool.aliases.slice(0, 3).join(" · ")) + '</div>'
        : "";
      const score = Number.isFinite(tool.score) ? tool.score : tool.score;
      const lowAttr = (score !== undefined && Number(score) < 3) ? ' data-low="true"' : "";
      const href = '/tools/' + encodeURIComponent(tool.slug) + '/docs';
      return '<a class="tool-row" data-enter="' + (enter ? "true" : "false") + '" href="' + href + '">' +
        '<div class="tool-info">' +
          '<div class="tool-name">' + escapeHtml(tool.name) + '</div>' +
          '<div class="tool-id">' + escapeHtml(tool.id) + '</div>' +
          aliases +
        '</div>' +
        '<div class="surfaces">' + renderSurfaces(tool.surfaces) + '</div>' +
        '<div class="score"' + lowAttr + '>' + escapeHtml(score) + '<span class="denom">/5</span></div>' +
        '<div class="row-arrow" aria-hidden="true">' +
          '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h8"/><path d="M7.5 3.5 11 7l-3.5 3.5"/></svg>' +
        '</div>' +
      '</a>';
    }

    function render(query = "") {
      const q = query.trim().toLowerCase();
      const matches = q ? tools.filter((tool) => toolText(tool).includes(q)) : tools;
      visibleCount.textContent = String(matches.length);
      filterMeta.textContent = q ? ('Filter · ' + matches.length + '/' + total) : 'All tools · ' + total;
      const shouldStagger = firstRender && !q;
      if (!matches.length) {
        list.innerHTML = '<div class="empty-row">Nothing matches "' + escapeHtml(query) + '" — try a product name or surface (mcp, api, cli, sdk).</div>';
      } else {
        list.innerHTML = matches.map((tool, i) => rowHtml(tool, shouldStagger && i < 9)).join("");
      }
      firstRender = false;
    }

    input.addEventListener("input", () => render(input.value));
    const chips = document.querySelectorAll(".chip");
    chips.forEach((button) => {
      button.addEventListener("click", () => {
        const isActive = button.dataset.active === "true";
        chips.forEach((b) => b.removeAttribute("data-active"));
        if (isActive) {
          input.value = "";
          render("");
        } else {
          button.dataset.active = "true";
          input.value = button.dataset.query;
          render(input.value);
        }
        input.focus({ preventScroll: true });
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && document.activeElement !== input) {
        event.preventDefault();
        input.focus();
      }
    });

    render();
  </script>
</body>
</html>`;
}

function renderToolDocsPage({ tool, files, sources, topic, result }) {
  const home = homeTool(tool);
  const title = `${tool.name} Docs | GTM Docs Registry`;
  const jsonHref = `/tools/${encodeURIComponent(tool.slug)}/docs${topic ? `?topic=${encodeURIComponent(topic)}&format=json` : "?format=json"}`;
  const topicParam = topic ? `?topic=${encodeURIComponent(topic)}` : "";
  const docsHtml = result
    ? result.selected.map((section) => markdownToHtml(section.text)).join("\n")
    : markdownToHtml(files.docs);
  const referenceHtml = !result && files.hasReference ? markdownToHtml(files.referenceText || files.reference) : "";
  const sourceHtml = renderSourceList(result?.relatedSources || sources);
  const surfaceOrder = ["mcp", "api", "cli", "openapi", "llms", "sdk"];
  const surfaceParts = surfaceOrder
    .filter((key) => home.surfaces[key] === "yes" || home.surfaces[key] === "announced")
    .map((key) => `<span class="s s-${escapeHtml(home.surfaces[key])}">${escapeHtml(surfaceLabel(key))}</span>`);
  const surfaceHtml = surfaceParts.length
    ? surfaceParts.join('<span class="sep">·</span>')
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="Source-backed agent and human docs for ${escapeHtml(tool.name)}.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..700,0..100,0..1;1,9..144,400..700,0..100,0..1&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
  <style>
    :root {
      color-scheme: light;
      --paper: #F6F1E4;
      --paper-2: #FBF7EC;
      --card: #FFFCF3;
      --ink: #16140F;
      --ink-2: #2E2A22;
      --muted: #8A8273;
      --rule: #DFD5BB;
      --rule-soft: #ECE3CA;
      --accent: #C24A26;
      --accent-deep: #9B3514;
      --positive: #2A6A50;
      --amber: #A66515;
      --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
    }
    *, *::before, *::after { box-sizing: border-box; }
    html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    body {
      margin: 0;
      font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
      font-size: 16px;
      color: var(--ink);
      background: var(--paper);
      line-height: 1.55;
      position: relative;
      overflow-x: hidden;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: .55;
      mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.49 0 0 0 0 0.36 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
      background-size: 320px 320px;
    }
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(900px 480px at 100% -10%, rgba(194, 74, 38, .06), transparent 60%);
    }
    a { color: inherit; text-decoration: none; }
    ::selection { background: var(--ink); color: var(--paper); }

    main, header, footer { position: relative; z-index: 1; }
    .shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }

    header {
      border-bottom: 1px solid var(--rule);
      background: rgba(246, 241, 228, .8);
      position: sticky;
      top: 0;
      z-index: 20;
      backdrop-filter: saturate(140%) blur(14px);
      -webkit-backdrop-filter: saturate(140%) blur(14px);
    }
    .nav { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
    .brand {
      display: inline-flex;
      align-items: baseline;
      gap: 10px;
      font-family: "Fraunces", serif;
      font-weight: 500;
      font-size: 19px;
      letter-spacing: -0.01em;
      font-variation-settings: "opsz" 36, "SOFT" 60, "WONK" 1;
    }
    .brand-mark {
      display: inline-grid;
      place-items: center;
      width: 28px;
      height: 28px;
      background: var(--ink);
      color: var(--paper);
      border-radius: 4px;
      font-family: "Fraunces", serif;
      font-style: italic;
      font-weight: 600;
      font-size: 16px;
      transform: translateY(2px);
      font-variation-settings: "opsz" 36, "SOFT" 100, "WONK" 1;
    }
    .brand em { font-style: italic; font-weight: 400; color: var(--ink-2); }
    .nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; color: var(--ink-2); }
    .nav-link { position: relative; padding: 4px 0; transition: color 160ms var(--ease-out); }
    .nav-link::after {
      content: "";
      position: absolute; left: 0; right: 0; bottom: 0;
      height: 1px; background: currentColor;
      transform: scaleX(0); transform-origin: left;
      transition: transform 240ms var(--ease-out);
    }
    .nav-link:hover::after { transform: scaleX(1); }

    .button {
      display: inline-flex; align-items: center; gap: 8px;
      height: 38px; padding: 0 16px;
      border: 1px solid var(--ink); border-radius: 999px;
      background: transparent; color: var(--ink);
      font-family: inherit; font-size: 13.5px; font-weight: 500; letter-spacing: 0.01em;
      cursor: pointer;
      transition: transform 160ms var(--ease-out), background 200ms var(--ease-out), color 200ms var(--ease-out);
    }
    .button:active { transform: scale(0.97); }
    .button:hover { background: var(--ink); color: var(--paper); }
    .button.primary { background: var(--ink); color: var(--paper); }
    .button.primary:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
    .button .arrow { display: inline-block; transition: transform 200ms var(--ease-out); }
    .button:hover .arrow { transform: translateX(3px); }

    main { padding: 56px 0 80px; }

    /* ── Hero ─────────────────────────────────────────────────── */
    .crumbs {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11.5px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .crumbs a { color: var(--accent); }
    .crumbs .sep { color: var(--rule); }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr);
      gap: 48px;
      align-items: end;
      padding: 28px 0 56px;
      border-bottom: 1px solid var(--rule);
      margin-bottom: 56px;
    }
    .hero-left > * { opacity: 0; animation: rise 600ms var(--ease-out) forwards; }
    .crumbs { animation-delay: 40ms; }
    h1 { animation-delay: 120ms; }
    .lede { animation-delay: 220ms; }
    .actions { animation-delay: 320ms; }

    h1 {
      font-family: "Fraunces", serif;
      font-weight: 400;
      font-variation-settings: "opsz" 144, "SOFT" 60, "WONK" 1;
      font-size: clamp(48px, 7vw, 92px);
      line-height: 0.95;
      letter-spacing: -0.025em;
      margin: 18px 0 0;
      color: var(--ink);
    }

    .lede {
      max-width: 620px;
      margin: 22px 0 0;
      font-size: 17.5px;
      line-height: 1.55;
      color: var(--ink-2);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 30px;
    }

    .meta-card {
      background: var(--card);
      border: 1px solid var(--rule);
      border-radius: 14px;
      padding: 22px 24px;
      display: grid;
      gap: 18px;
      box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 24px 50px -28px rgba(22, 20, 15, .25);
      opacity: 0;
      animation: rise 700ms var(--ease-out) 280ms forwards;
    }
    .meta-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
    .meta-row + .meta-row { border-top: 1px solid var(--rule-soft); padding-top: 14px; }
    .meta-key {
      font-family: "IBM Plex Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .meta-val {
      font-family: "Fraunces", serif;
      font-variation-settings: "opsz" 36, "SOFT" 50, "WONK" 0;
      font-weight: 500;
      font-size: 18px;
      color: var(--ink);
    }
    .meta-val.score {
      display: inline-flex;
      align-items: baseline;
      gap: 3px;
      font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 0;
      font-size: 36px;
      line-height: 1;
      font-feature-settings: "tnum";
    }
    .meta-val.score .denom {
      font-family: "IBM Plex Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.06em;
      color: var(--muted);
    }

    .surfaces {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px 10px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11.5px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .surfaces .sep { color: var(--rule); }
    .s-yes { color: var(--positive); font-weight: 500; }
    .s-announced {
      color: var(--amber);
      font-style: italic;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-underline-offset: 3px;
    }

    /* ── Content ──────────────────────────────────────────────── */
    .content-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 304px;
      gap: 48px;
      align-items: start;
    }

    .doc {
      min-width: 0;
      font-size: 16.5px;
      line-height: 1.7;
      color: var(--ink-2);
      overflow-wrap: anywhere;
    }

    .topic-note {
      margin-bottom: 26px;
      padding: 14px 18px;
      border: 1px solid var(--rule);
      border-left: 3px solid var(--accent);
      border-radius: 8px;
      background: var(--card);
      font-size: 14.5px;
      color: var(--ink-2);
    }
    .topic-note strong {
      font-family: "Fraunces", serif;
      font-style: italic;
      font-weight: 500;
      color: var(--accent);
    }
    .topic-note a { color: var(--ink); text-decoration: underline; text-underline-offset: 2px; text-decoration-color: var(--rule); }
    .topic-note a:hover { text-decoration-color: var(--ink); }

    .doc h2 {
      margin: 44px 0 14px;
      font-family: "Fraunces", serif;
      font-weight: 400;
      font-variation-settings: "opsz" 144, "SOFT" 50, "WONK" 1;
      font-size: 30px;
      line-height: 1.1;
      letter-spacing: -0.015em;
      color: var(--ink);
      position: relative;
      padding-left: 20px;
    }
    .doc h2::before {
      content: "";
      position: absolute;
      left: 0; top: 14px;
      width: 8px; height: 8px;
      background: var(--accent);
      border-radius: 999px;
    }
    .doc h2:first-child { margin-top: 0; }

    .doc h3 {
      margin: 28px 0 10px;
      font-family: "Fraunces", serif;
      font-weight: 500;
      font-variation-settings: "opsz" 36, "SOFT" 50, "WONK" 0;
      font-size: 21px;
      letter-spacing: -0.01em;
      color: var(--ink);
    }

    .doc p { margin: 0 0 16px; }
    .doc ul { margin: 0 0 20px; padding-left: 22px; }
    .doc li { margin: 8px 0; }
    .doc li::marker { color: var(--accent); }

    .doc a {
      color: var(--ink);
      text-decoration: underline;
      text-decoration-color: var(--accent);
      text-underline-offset: 3px;
      text-decoration-thickness: 1px;
      transition: color 160ms var(--ease-out);
    }
    .doc a:hover { color: var(--accent-deep); }

    .doc code {
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.9em;
      background: var(--paper-2);
      border: 1px solid var(--rule);
      border-radius: 4px;
      padding: 1px 6px;
      color: var(--ink);
    }

    .doc pre {
      overflow: auto;
      border-radius: 12px;
      background: #16140F;
      color: #ECE3CA;
      padding: 22px;
      border: 1px solid var(--ink-2);
      font-family: "IBM Plex Mono", monospace;
      font-size: 13.5px;
      line-height: 1.7;
      margin: 0 0 22px;
      box-shadow: 0 30px 70px -40px rgba(22,20,15,.5);
    }
    .doc pre code {
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font-size: inherit;
    }

    /* ── Aside ───────────────────────────────────────────────── */
    .aside {
      display: grid;
      gap: 20px;
      position: sticky;
      top: 92px;
    }
    .aside-panel {
      background: var(--card);
      border: 1px solid var(--rule);
      border-radius: 14px;
      padding: 20px 22px;
      box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 20px 40px -28px rgba(22, 20, 15, .18);
    }
    .aside-panel h2 {
      margin: 0 0 14px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
      font-weight: 500;
    }
    .aside-blurb {
      margin: 0 0 16px;
      font-family: "Fraunces", serif;
      font-style: italic;
      font-size: 15px;
      line-height: 1.5;
      color: var(--ink-2);
      font-variation-settings: "opsz" 14, "SOFT" 100, "WONK" 0;
    }

    .source-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 14px;
    }
    .source-list li {
      padding-left: 14px;
      border-left: 1px solid var(--rule);
      transition: border-color 200ms var(--ease-out);
    }
    .source-list li:hover { border-left-color: var(--accent); }
    .source-list a {
      display: block;
      font-size: 13.5px;
      line-height: 1.4;
      color: var(--ink);
      overflow-wrap: anywhere;
      transition: color 160ms var(--ease-out);
    }
    .source-list a:hover { color: var(--accent); }
    .source-type {
      display: block;
      margin-top: 4px;
      font-family: "IBM Plex Mono", monospace;
      font-size: 10.5px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
    }

    footer {
      margin-top: 88px;
      padding: 36px 0 56px;
      border-top: 1px solid var(--rule);
    }
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: 13px;
    }
    .footer-row em {
      font-family: "Fraunces", serif;
      font-style: italic;
      color: var(--ink-2);
      font-size: 15px;
    }

    @keyframes rise {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-delay: 0ms !important;
        transition-duration: 120ms !important;
      }
    }

    @media (max-width: 960px) {
      .hero { grid-template-columns: 1fr; gap: 32px; align-items: start; }
      .content-grid { grid-template-columns: 1fr; gap: 32px; }
      .aside { position: static; }
      h1 { font-size: clamp(44px, 11vw, 72px); }
      .meta-card { padding: 18px 20px; }
    }

    @media (max-width: 640px) {
      main { padding: 32px 0 56px; }
      .nav { min-height: 60px; gap: 12px; }
      .brand { white-space: nowrap; font-size: 17px; min-width: 0; }
      .brand > span:last-child { white-space: nowrap; }
      .brand em { display: none; }
      .nav-links { gap: 12px; font-size: 13px; }
      .nav-links .nav-link { display: none; }
      .nav-links .button { padding: 0 12px; font-size: 12.5px; height: 34px; }
      .doc { font-size: 15.5px; }
      .doc h2 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="shell nav">
      <a class="brand" href="/">
        <span class="brand-mark">g</span>
        <span>GTM Docs <em>Registry</em></span>
      </a>
      <nav class="nav-links">
        <a class="nav-link" href="/#catalog">Catalog</a>
        <a class="nav-link" href="/#api">API</a>
        <a class="nav-link" href="https://github.com/Andytoizer/gtm-docs-registry">GitHub</a>
        <a class="button" href="${escapeHtml(jsonHref)}">Agent JSON <span class="arrow">→</span></a>
      </nav>
    </div>
  </header>
  <main class="shell">
    <section class="hero">
      <div class="hero-left">
        <div class="crumbs">
          <a href="/#catalog">Catalog</a>
          <span class="sep">/</span>
          <span>${escapeHtml(tool.name)}</span>
        </div>
        <h1>${escapeHtml(tool.name)}</h1>
        <p class="lede">A human-readable profile for review and exploration. Agents can pull the same source-backed retrieval content as structured JSON.</p>
        <div class="actions">
          <a class="button primary" href="${escapeHtml(jsonHref)}">Agent JSON <span class="arrow">→</span></a>
          <a class="button" href="/tools/${encodeURIComponent(tool.slug)}/sources">Sources JSON</a>
          <a class="button" href="/#catalog">Back to catalog</a>
        </div>
      </div>
      <aside class="meta-card" aria-label="Tool metadata">
        <div class="meta-row">
          <span class="meta-key">ID</span>
          <span class="meta-val" style="font-family:'IBM Plex Mono',monospace;font-size:13.5px;font-weight:500;letter-spacing:.02em;">${escapeHtml(tool.id)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-key">Readiness</span>
          <span class="meta-val score">${escapeHtml(tool.agentReadinessScore)}<span class="denom">/5</span></span>
        </div>
        <div class="meta-row">
          <span class="meta-key">Last verified</span>
          <span class="meta-val" style="font-family:'IBM Plex Mono',monospace;font-size:13.5px;font-weight:500;letter-spacing:.02em;">${escapeHtml(tool.lastVerified || "unknown")}</span>
        </div>
        ${surfaceHtml ? `<div class="meta-row" style="display:block">
          <span class="meta-key" style="display:block;margin-bottom:10px;">Surfaces</span>
          <div class="surfaces">${surfaceHtml}</div>
        </div>` : ""}
      </aside>
    </section>
    <section class="content-grid">
      <article class="doc">
        ${topic ? `<div class="topic-note">Showing focused retrieval results for <strong>${escapeHtml(topic)}</strong>. <a href="/tools/${encodeURIComponent(tool.slug)}/docs${escapeHtml(topicParam)}&format=json">Open the agent JSON response.</a></div>` : ""}
        ${docsHtml}
        ${referenceHtml ? `<h2>Reference details</h2>${referenceHtml}` : ""}
      </article>
      <aside class="aside">
        <section class="aside-panel">
          <h2>Agent access</h2>
          <p class="aside-blurb">JSON for agents, MCP servers, scripts, and retrieval calls.</p>
          <a class="button primary" href="${escapeHtml(jsonHref)}" style="width:100%;justify-content:center;">Open JSON <span class="arrow">→</span></a>
        </section>
        <section class="aside-panel">
          <h2>Sources</h2>
          ${sourceHtml}
        </section>
      </aside>
    </section>
  </main>
  <footer>
    <div class="shell footer-row">
      <span><em>Open-source</em> docs retrieval for agent builders.</span>
      <span>MIT · maintained on <a href="https://github.com/Andytoizer/gtm-docs-registry" class="nav-link">GitHub</a></span>
    </div>
  </footer>
</body>
</html>`;
}

function surfaceLabel(key) {
  return ({ mcp: "MCP", api: "API", cli: "CLI", openapi: "OpenAPI", llms: "llms.txt", sdk: "SDK" })[key] || key;
}

function renderSourceList(sources) {
  const items = (sources || []).slice(0, 12).map((source) => {
    const label = source.label || source.title || source.url || "Source";
    const type = source.type || "source";
    const href = source.url || "#";
    return `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a><span class="source-type">${escapeHtml(type)}</span></li>`;
  });
  return items.length ? `<ul class="source-list">${items.join("")}</ul>` : `<p>No source metadata found.</p>`;
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  const html = [];
  let inList = false;
  let inCode = false;
  let codeLines = [];

  function closeList() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  }

  function closeCode() {
    if (inCode) {
      html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      inCode = false;
      codeLines = [];
    }
  }

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      if (inCode) {
        closeCode();
      } else {
        closeList();
        inCode = true;
        codeLines = [];
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 4);
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = /^[-*]\s+(.+)$/.exec(trimmed);
    if (bullet) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${renderInline(trimmed)}</p>`);
  }

  closeCode();
  closeList();
  return html.join("\n");
}

function renderInline(value) {
  return String(value ?? "")
    .split(/(`[^`]+`)/g)
    .map((part) => {
      if (/^`[^`]+`$/.test(part)) {
        return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      }
      return escapeHtml(part).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');
    })
    .join("");
}

function routeRequest(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const segments = reqUrl.pathname.split("/").filter(Boolean);
  const pathKey = `/${segments.join("/")}`;

  if (req.method === "POST" && pathKey === "/mcp") {
    handleMcpPost(req, res).catch((error) => {
      sendJson(res, 500, mcpError(null, -32603, error instanceof Error ? error.message : String(error)));
    });
    return;
  }

  if (req.method !== "GET") {
    sendError(res, 405, "Method not allowed. Use GET.");
    return;
  }

  try {
    if (pathKey === "/health") {
      handleHealth(res);
      return;
    }

    if (pathKey === "/") {
      handleHome(res);
      return;
    }

    if (pathKey === "/llms.txt") {
      handleLlms(res, false);
      return;
    }

    if (pathKey === "/llms-full.txt") {
      handleLlms(res, true);
      return;
    }

    if (pathKey === "/openapi.json") {
      handleOpenApi(res);
      return;
    }

    if (pathKey === "/mcp") {
      handleMcpInfo(res);
      return;
    }

    if (pathKey === "/registry") {
      handleRegistry(res);
      return;
    }

    if (pathKey === "/catalog") {
      handleCatalog(res);
      return;
    }

    if (pathKey === "/tools/search") {
      handleSearch(reqUrl, res);
      return;
    }

    if (pathKey === "/tools/resolve") {
      handleResolve(reqUrl, res);
      return;
    }

    if (segments[0] === "tools" && segments.at(-1) === "docs") {
      handleDocs(req, reqUrl, res, toolFromPath(segments, "docs"));
      return;
    }

    if (segments[0] === "tools" && segments.at(-1) === "sources") {
      handleSources(res, toolFromPath(segments, "sources"));
      return;
    }

    sendError(res, 404, "Not found.");
  } catch (error) {
    sendError(res, 500, "Internal server error.", error instanceof Error ? error.message : String(error));
  }
}

export { routeRequest };

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = http.createServer(routeRequest);

  server.listen(port, () => {
    console.log(`GTM Docs Registry HTTP server listening on http://localhost:${port}`);
  });
}
