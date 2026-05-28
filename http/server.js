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
  if (!wantsJson(req, reqUrl)) {
    sendHtml(res, renderToolDocsPage({ tool, files, sources, topic, result }));
    return;
  }

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

function renderHomepage() {
  const tools = publishedTools.map(homeTool);
  const toolsJson = JSON.stringify(tools).replaceAll("<", "\\u003c");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GTM Docs Registry</title>
  <meta name="description" content="Search source-backed API, MCP, CLI, OpenAPI, SDK, and agent docs for GTM tools.">
  <style>
    :root {
      color-scheme: light;
      --ink: #15181f;
      --muted: #5f6878;
      --line: #dce2ea;
      --paper: #f7f5ef;
      --panel: #ffffff;
      --green: #17785f;
      --blue: #2457a6;
      --amber: #a95d12;
      --slate: #243140;
      --soft: #edf2f7;
      --shadow: 0 18px 55px rgba(21, 24, 31, .1);
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--ink);
      background: var(--paper);
      letter-spacing: 0;
    }

    a { color: inherit; }

    .shell {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
    }

    header {
      border-bottom: 1px solid rgba(36, 49, 64, .12);
      background: rgba(247, 245, 239, .92);
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(12px);
    }

    .nav {
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 760;
      font-size: 16px;
      text-decoration: none;
    }

    .mark {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: var(--ink);
      color: white;
      display: grid;
      place-items: center;
      font-size: 13px;
      font-weight: 780;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 16px;
      color: var(--muted);
      font-size: 14px;
    }

    .nav-links a {
      text-decoration: none;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 38px;
      padding: 0 14px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: var(--panel);
      color: var(--ink);
      font-weight: 650;
      text-decoration: none;
      box-shadow: 0 1px 0 rgba(21, 24, 31, .04);
      white-space: nowrap;
    }

    .button.primary {
      background: var(--ink);
      color: white;
      border-color: var(--ink);
    }

    main {
      padding: 56px 0 70px;
    }

    .hero {
      display: grid;
      gap: 28px;
      align-items: start;
    }

    .eyebrow {
      color: var(--green);
      font-weight: 760;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: .08em;
    }

    h1 {
      margin: 12px 0 0;
      max-width: 880px;
      font-size: clamp(42px, 6vw, 78px);
      line-height: .96;
      letter-spacing: 0;
    }

    .lede {
      max-width: 760px;
      margin: 20px 0 0;
      color: #3f4856;
      font-size: 19px;
      line-height: 1.55;
    }

    .search-wrap {
      margin-top: 28px;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .search-bar {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--line);
    }

    input[type="search"] {
      width: 100%;
      min-height: 54px;
      border: 1px solid #cfd7e2;
      border-radius: 7px;
      padding: 0 16px;
      color: var(--ink);
      background: #fbfcfd;
      font: inherit;
      font-size: 17px;
      outline: none;
    }

    input[type="search"]:focus {
      border-color: var(--blue);
      box-shadow: 0 0 0 3px rgba(36, 87, 166, .14);
    }

    .count {
      color: var(--muted);
      font-size: 14px;
      white-space: nowrap;
    }

    .quick {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 16px 16px;
    }

    .chip {
      border: 1px solid var(--line);
      background: #f8fafc;
      color: #344051;
      border-radius: 999px;
      padding: 7px 10px;
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 20px;
    }

    .stat {
      background: rgba(255, 255, 255, .72);
      border: 1px solid rgba(36, 49, 64, .12);
      border-radius: 8px;
      padding: 15px;
    }

    .stat strong {
      display: block;
      font-size: 23px;
      line-height: 1.1;
    }

    .stat span {
      display: block;
      margin-top: 6px;
      color: var(--muted);
      font-size: 13px;
    }

    .section-head {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      align-items: end;
      margin: 58px 0 18px;
    }

    .section-head h2 {
      margin: 0;
      font-size: 28px;
      letter-spacing: 0;
    }

    .section-head p {
      margin: 7px 0 0;
      color: var(--muted);
    }

    .catalog {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(21, 24, 31, .06);
    }

    .tool-row {
      display: grid;
      grid-template-columns: minmax(210px, 1.1fr) minmax(190px, .8fr) minmax(210px, .9fr) 82px;
      gap: 16px;
      align-items: center;
      min-height: 76px;
      padding: 14px 16px;
      border-top: 1px solid var(--line);
    }

    .tool-row:first-child { border-top: 0; }

    .tool-name {
      font-weight: 730;
      font-size: 16px;
    }

    .tool-id {
      margin-top: 4px;
      color: var(--muted);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
    }

    .surface-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .surface {
      border-radius: 999px;
      padding: 5px 8px;
      font-size: 12px;
      font-weight: 680;
      border: 1px solid transparent;
    }

    .yes { color: #0f624d; background: #e9f6f1; border-color: #bfe4d6; }
    .announced { color: #7a4a0b; background: #fff4df; border-color: #f4d7a8; }
    .unknown { color: #596477; background: #f2f5f8; border-color: #dfe5ec; }
    .no { display: none; }

    .score {
      justify-self: end;
      width: 44px;
      height: 44px;
      border-radius: 8px;
      display: grid;
      place-items: center;
      background: #f4f0e7;
      color: var(--slate);
      font-weight: 780;
      border: 1px solid #e5dbc9;
    }

    .tool-link {
      color: var(--blue);
      text-decoration: none;
      font-weight: 690;
      font-size: 14px;
    }

    .api {
      margin-top: 58px;
      display: grid;
      grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
      gap: 20px;
      align-items: stretch;
    }

    .api-copy {
      background: #18202b;
      color: white;
      border-radius: 8px;
      padding: 26px;
    }

    .api-copy h2 { margin: 0; font-size: 28px; }
    .api-copy p { color: #c8d2df; line-height: 1.55; }

    pre {
      margin: 0;
      overflow: auto;
      border-radius: 8px;
      background: #0f141c;
      color: #d9e6f2;
      padding: 22px;
      min-height: 100%;
      font-size: 13px;
      line-height: 1.6;
      border: 1px solid #283445;
    }

    footer {
      padding: 28px 0 46px;
      color: var(--muted);
      font-size: 14px;
    }

    @media (max-width: 820px) {
      main { padding-top: 34px; }
      .nav { align-items: flex-start; flex-direction: column; padding: 14px 0; }
      .nav-links { width: 100%; justify-content: space-between; }
      .search-bar { grid-template-columns: 1fr; }
      .hero-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .section-head { display: block; }
      .tool-row {
        grid-template-columns: 1fr;
        gap: 10px;
      }
      .score { justify-self: start; }
      .api { grid-template-columns: 1fr; }
      h1 { font-size: 42px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="shell nav">
      <a class="brand" href="/">
        <span class="mark">G</span>
        <span>GTM Docs Registry</span>
      </a>
      <nav class="nav-links">
        <a href="#catalog">Catalog</a>
        <a href="#api">API</a>
        <a href="https://github.com/Andytoizer/gtm-docs-registry">GitHub</a>
        <a class="button" href="/registry">Registry JSON</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="shell hero">
      <div>
        <div class="eyebrow">Source-backed docs retrieval for agents</div>
        <h1>GTM Docs Registry</h1>
        <p class="lede">Search GTM tools by name and give agents the source-backed MCP, API, CLI, OpenAPI, SDK, auth, rate-limit, pagination, and caveat context they need to build safely.</p>
      </div>

      <div class="search-wrap" aria-label="Tool catalog search">
        <div class="search-bar">
          <input id="search" type="search" autocomplete="off" placeholder="Search HubSpot, Clay, Apollo, Snowflake, Gong...">
          <div class="count"><strong id="visible-count">${tools.length}</strong> of ${tools.length} tools</div>
        </div>
        <div class="quick" aria-label="Quick searches">
          <button class="chip" data-query="mcp">MCP</button>
          <button class="chip" data-query="api">API</button>
          <button class="chip" data-query="cli">CLI</button>
          <button class="chip" data-query="openapi">OpenAPI</button>
          <button class="chip" data-query="llms">llms.txt</button>
          <button class="chip" data-query="sdk">SDK</button>
        </div>
      </div>

      <div class="hero-grid">
        <div class="stat"><strong>${tools.length}</strong><span>published GTM tool docs</span></div>
        <div class="stat"><strong>${tools.filter((tool) => tool.surfaces.mcp === "yes").length}</strong><span>official MCP surfaces</span></div>
        <div class="stat"><strong>${tools.filter((tool) => tool.surfaces.api === "yes").length}</strong><span>official API surfaces</span></div>
        <div class="stat"><strong>${tools.filter((tool) => tool.score >= 5).length}</strong><span>high-readiness profiles</span></div>
      </div>
    </section>

    <section id="catalog" class="shell">
      <div class="section-head">
        <div>
          <h2>Catalog</h2>
          <p>Only published, source-backed profiles appear here.</p>
        </div>
        <a class="button primary" href="#api">Try the API</a>
      </div>
      <div class="catalog" id="catalog-list"></div>
    </section>

    <section id="api" class="shell api">
      <div class="api-copy">
        <h2>Built for agents, usable by humans.</h2>
        <p>Resolve tool names, fetch focused docs by topic, inspect sources, or search across the catalog over HTTP. The same retrieval layer powers the local CLI and MCP server.</p>
        <a class="button" href="https://github.com/Andytoizer/gtm-docs-registry">View on GitHub</a>
      </div>
      <pre><code>curl "https://gtm-docs-registry.vercel.app/tools/resolve?query=hubspot"

curl "https://gtm-docs-registry.vercel.app/tools/monaco/docs?topic=mcp&format=json"

curl "https://gtm-docs-registry.vercel.app/tools/search?q=openapi&limit=10"</code></pre>
    </section>
  </main>

  <footer>
    <div class="shell">Open-source GTM docs retrieval for agent builders.</div>
  </footer>

  <script type="application/json" id="tool-data">${toolsJson}</script>
  <script>
    const tools = JSON.parse(document.getElementById("tool-data").textContent);
    const list = document.getElementById("catalog-list");
    const input = document.getElementById("search");
    const visibleCount = document.getElementById("visible-count");

    function labelFor(key) {
      return ({ mcp: "MCP", api: "API", cli: "CLI", openapi: "OpenAPI", llms: "llms.txt", sdk: "SDK" })[key] || key;
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

    function toolText(tool) {
      return [tool.name, tool.id, tool.slug, ...(tool.aliases || []), ...Object.entries(tool.surfaces).filter(([, value]) => value === "yes" || value === "announced").map(([key]) => key)].join(" ").toLowerCase();
    }

    function render(query = "") {
      const q = query.trim().toLowerCase();
      const matches = q ? tools.filter((tool) => toolText(tool).includes(q)) : tools;
      visibleCount.textContent = String(matches.length);
      list.innerHTML = matches.map((tool) => {
        const surfaces = Object.entries(tool.surfaces)
          .filter(([, value]) => value === "yes" || value === "announced")
          .map(([key, value]) => '<span class="surface ' + value + '">' + escapeHtml(labelFor(key)) + '</span>')
          .join("");
        const aliases = tool.aliases && tool.aliases.length ? tool.aliases.slice(0, 3).join(", ") : "Verified source profile";
        return '<article class="tool-row">' +
          '<div><div class="tool-name">' + escapeHtml(tool.name) + '</div><div class="tool-id">' + escapeHtml(tool.id) + '</div></div>' +
          '<div><a class="tool-link" href="/tools/' + encodeURIComponent(tool.slug) + '/docs">Open docs</a><div class="tool-id">' + escapeHtml(aliases) + '</div></div>' +
          '<div class="surface-list">' + surfaces + '</div>' +
          '<div class="score" title="Agent readiness score">' + escapeHtml(tool.score) + '</div>' +
        '</article>';
      }).join("") || '<article class="tool-row"><div><div class="tool-name">No tools found</div><div class="tool-id">Try another GTM product name or interface type.</div></div></article>';
    }

    input.addEventListener("input", () => render(input.value));
    document.querySelectorAll("[data-query]").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = button.dataset.query;
        render(input.value);
        input.focus();
      });
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
  const surfaceHtml = Object.entries(home.surfaces)
    .filter(([, value]) => value === "yes" || value === "announced")
    .map(([key, value]) => `<span class="surface ${escapeHtml(value)}">${escapeHtml(surfaceLabel(key))}</span>`)
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="Human-readable and agent-readable docs for ${escapeHtml(tool.name)}.">
  <style>
    :root {
      color-scheme: light;
      --ink: #15181f;
      --muted: #5f6878;
      --line: #dce2ea;
      --paper: #f7f5ef;
      --panel: #ffffff;
      --green: #17785f;
      --blue: #2457a6;
      --slate: #243140;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--ink);
      background: var(--paper);
      letter-spacing: 0;
    }
    a { color: inherit; }
    .shell { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
    header {
      border-bottom: 1px solid rgba(36, 49, 64, .12);
      background: rgba(247, 245, 239, .92);
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(12px);
    }
    .nav {
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 760;
      font-size: 16px;
      text-decoration: none;
    }
    .mark {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: var(--ink);
      color: white;
      display: grid;
      place-items: center;
      font-size: 13px;
      font-weight: 780;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 14px;
      color: var(--muted);
      font-size: 14px;
    }
    .nav-links a { text-decoration: none; }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 38px;
      padding: 0 14px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: var(--panel);
      color: var(--ink);
      font-weight: 650;
      text-decoration: none;
      white-space: nowrap;
    }
    .button.primary {
      background: var(--ink);
      color: white;
      border-color: var(--ink);
    }
    main { padding: 46px 0 70px; }
    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 260px;
      gap: 28px;
      align-items: start;
      margin-bottom: 28px;
    }
    .eyebrow {
      color: var(--green);
      font-weight: 760;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: .08em;
    }
    h1 {
      margin: 10px 0 0;
      font-size: clamp(40px, 6vw, 68px);
      line-height: 1;
      letter-spacing: 0;
    }
    .lede {
      max-width: 760px;
      margin: 18px 0 0;
      color: #3f4856;
      font-size: 18px;
      line-height: 1.55;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 22px;
    }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 12px 40px rgba(21, 24, 31, .06);
      min-width: 0;
    }
    .meta {
      display: grid;
      gap: 14px;
    }
    .meta-item span {
      display: block;
      color: var(--muted);
      font-size: 12px;
      margin-bottom: 4px;
    }
    .meta-item strong {
      font-size: 15px;
    }
    .surface-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .surface {
      border-radius: 999px;
      padding: 5px 8px;
      font-size: 12px;
      font-weight: 680;
      border: 1px solid transparent;
    }
    .yes { color: #0f624d; background: #e9f6f1; border-color: #bfe4d6; }
    .announced { color: #7a4a0b; background: #fff4df; border-color: #f4d7a8; }
    .content-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 300px;
      gap: 24px;
      align-items: start;
    }
    .doc {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 28px;
      line-height: 1.62;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .doc h2 {
      margin: 32px 0 12px;
      font-size: 25px;
      letter-spacing: 0;
    }
    .doc h2:first-child { margin-top: 0; }
    .doc h3 {
      margin: 24px 0 10px;
      font-size: 19px;
    }
    .doc p { margin: 0 0 14px; color: #2f3846; }
    .doc ul { margin: 0 0 18px; padding-left: 22px; }
    .doc li { margin: 7px 0; }
    .doc a { color: var(--blue); }
    .doc code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: .92em;
      background: #f2f5f8;
      border: 1px solid #e1e7ef;
      border-radius: 5px;
      padding: 1px 5px;
    }
    .doc pre {
      overflow: auto;
      border-radius: 8px;
      background: #0f141c;
      color: #d9e6f2;
      padding: 18px;
      border: 1px solid #283445;
    }
    .doc pre code {
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
    }
    .aside {
      display: grid;
      gap: 14px;
      position: sticky;
      top: 86px;
    }
    .aside h2 {
      margin: 0 0 10px;
      font-size: 17px;
    }
    .source-list {
      display: grid;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .source-list a {
      color: var(--blue);
      font-weight: 650;
      text-decoration: none;
      overflow-wrap: anywhere;
    }
    .source-type {
      display: block;
      margin-top: 3px;
      color: var(--muted);
      font-size: 12px;
    }
    .topic-note {
      margin-bottom: 18px;
      padding: 14px 16px;
      border: 1px solid #cfe0d9;
      border-radius: 8px;
      background: #eef8f4;
      color: #214b40;
    }
    @media (max-width: 860px) {
      .nav { align-items: flex-start; flex-direction: column; padding: 14px 0; }
      .nav-links { width: 100%; justify-content: space-between; }
      .hero,
      .content-grid { grid-template-columns: 1fr; }
      .aside { position: static; }
      .doc { padding: 20px; }
      h1 { font-size: 42px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="shell nav">
      <a class="brand" href="/">
        <span class="mark">G</span>
        <span>GTM Docs Registry</span>
      </a>
      <nav class="nav-links">
        <a href="/#catalog">Catalog</a>
        <a href="/#api">API</a>
        <a href="https://github.com/Andytoizer/gtm-docs-registry">GitHub</a>
        <a class="button" href="${escapeHtml(jsonHref)}">Agent JSON</a>
      </nav>
    </div>
  </header>
  <main class="shell">
    <section class="hero">
      <div>
        <div class="eyebrow">Tool docs profile</div>
        <h1>${escapeHtml(tool.name)}</h1>
        <p class="lede">Human-readable profile for review and exploration. Agents can fetch the same source-backed retrieval content as structured JSON.</p>
        <div class="actions">
          <a class="button primary" href="${escapeHtml(jsonHref)}">Agent JSON</a>
          <a class="button" href="/tools/${encodeURIComponent(tool.slug)}/sources">Sources JSON</a>
          <a class="button" href="/#catalog">Back to catalog</a>
        </div>
      </div>
      <aside class="panel meta" aria-label="Tool metadata">
        <div class="meta-item"><span>ID</span><strong>${escapeHtml(tool.id)}</strong></div>
        <div class="meta-item"><span>Readiness</span><strong>${escapeHtml(tool.agentReadinessScore)} / 5</strong></div>
        <div class="meta-item"><span>Last verified</span><strong>${escapeHtml(tool.lastVerified || "unknown")}</strong></div>
        <div class="surface-list">${surfaceHtml}</div>
      </aside>
    </section>
    <section class="content-grid">
      <article class="doc">
        ${topic ? `<div class="topic-note">Showing focused retrieval results for <strong>${escapeHtml(topic)}</strong>. <a href="/tools/${encodeURIComponent(tool.slug)}/docs${escapeHtml(topicParam)}&format=json">Open the agent JSON response.</a></div>` : ""}
        ${docsHtml}
        ${referenceHtml ? `<h2>Reference Details</h2>${referenceHtml}` : ""}
      </article>
      <aside class="aside">
        <section class="panel">
          <h2>Agent Access</h2>
          <p class="lede" style="font-size:14px;margin:0 0 12px;">Use JSON for agents, MCP servers, scripts, and retrieval calls.</p>
          <a class="button primary" href="${escapeHtml(jsonHref)}">Open JSON</a>
        </section>
        <section class="panel">
          <h2>Sources</h2>
          ${sourceHtml}
        </section>
      </aside>
    </section>
  </main>
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

    if (pathKey === "/") {
      handleHome(res);
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
