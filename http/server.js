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

function handleDocs(reqUrl, res, slugOrId) {
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
    sendJson(res, 200, {
      tool: publicTool(tool),
      topic: null,
      text: formatFullDocsResult(files),
      hasReference: files.hasReference,
      sources
    });
    return;
  }

  const result = retrieveDocs({ ...files, topic });
  sendJson(res, 200, {
    tool: publicTool(tool),
    topic,
    hasReference: files.hasReference,
    text: formatDocsResult(result),
    sections: result.selected,
    fallback: result.fallback,
    sources: result.relatedSources
  });
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

function routeRequest(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method !== "GET") {
    sendError(res, 405, "Method not allowed. Use GET.");
    return;
  }

  const reqUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const segments = reqUrl.pathname.split("/").filter(Boolean);
  const pathKey = `/${segments.join("/")}`;

  try {
    if (pathKey === "/health") {
      handleHealth(res);
      return;
    }

    if (pathKey === "/registry") {
      handleRegistry(res);
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
      handleDocs(reqUrl, res, toolFromPath(segments, "docs"));
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

const server = http.createServer(routeRequest);

server.listen(port, () => {
  console.log(`GTM Docs Registry HTTP server listening on http://localhost:${port}`);
});
