import fs from "node:fs";
import path from "node:path";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "from",
  "get",
  "gtm",
  "how",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "tool",
  "with"
]);

const TOPIC_SYNONYMS = new Map([
  ["auth", ["authentication", "oauth", "token", "key", "scope", "permission"]],
  ["authentication", ["auth", "oauth", "token", "key", "scope", "permission"]],
  ["contacts", ["contact", "crm", "object", "record"]],
  ["contact", ["contacts", "crm", "object", "record"]],
  ["companies", ["company", "account", "domain"]],
  ["company", ["companies", "account", "domain"]],
  ["mcp", ["server", "agent", "remote", "local"]],
  ["cli", ["command", "tooling", "terminal"]],
  ["webhook", ["webhooks", "event", "events"]],
  ["webhooks", ["webhook", "event", "events"]],
  ["pagination", ["paging", "cursor", "after", "page"]],
  ["rate", ["limit", "limits", "429", "quota"]],
  ["limits", ["rate", "limit", "429", "quota"]],
  ["sdk", ["client", "library", "libraries"]]
]);

export function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9.]+/g, "");
}

export function tokenize(value) {
  const tokens = String(value || "")
    .toLowerCase()
    .replace(/\/gtm\//g, " ")
    .match(/[a-z0-9][a-z0-9.+-]*/g);
  return [...new Set((tokens || []).filter((token) => token.length > 1 && !STOP_WORDS.has(token)))];
}

function queryTerms(query) {
  const base = tokenize(query);
  const expanded = new Set(base);
  for (const token of base) {
    for (const synonym of TOPIC_SYNONYMS.get(token) || []) {
      expanded.add(synonym);
    }
  }
  return { base, expanded: [...expanded] };
}

export function resolveTool(registry, input) {
  const normalized = normalize(String(input || "").replace(/^\/gtm\//, ""));
  return registry.tools.find((tool) => {
    const candidates = [tool.id, tool.slug, tool.name, ...(tool.aliases || [])];
    return candidates.some((candidate) => normalize(String(candidate).replace(/^\/gtm\//, "")) === normalized);
  });
}

export function loadToolFiles(root, tool) {
  const toolRoot = path.join(root, tool.path);
  return {
    docs: fs.readFileSync(path.join(toolRoot, "docs.md"), "utf8"),
    sourcesText: fs.readFileSync(path.join(toolRoot, "sources.json"), "utf8")
  };
}

export function parseSources(sourcesText) {
  try {
    const parsed = JSON.parse(sourcesText);
    if (Array.isArray(parsed)) return parsed;
    const grouped = [];
    for (const [type, sources] of Object.entries(parsed)) {
      if (Array.isArray(sources)) {
        grouped.push(...sources.map((source) => ({ type, ...source })));
      }
    }
    return grouped;
  } catch {
    return [];
  }
}

function splitSections(docs) {
  const lines = docs.split(/\r?\n/);
  const sections = [];
  let current = null;

  for (const line of lines) {
    const heading = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      if (current) sections.push(current);
      current = {
        level: heading[1].length,
        heading: heading[2],
        lines: [line]
      };
      continue;
    }
    if (!current) {
      current = { level: 0, heading: "Document", lines: [] };
    }
    current.lines.push(line);
  }

  if (current) sections.push(current);
  return sections
    .map((section, index) => ({
      ...section,
      index,
      text: section.lines.join("\n").trim()
    }))
    .filter((section) => section.text);
}

function sourceText(source) {
  return [source.label, source.title, source.url, source.type].filter(Boolean).join(" ");
}

function countTermHits(text, terms) {
  const lower = text.toLowerCase();
  return terms.reduce((score, term) => {
    if (lower.includes(term)) score += 1;
    if (lower.includes(term.replace(/s$/, ""))) score += 0.5;
    return score;
  }, 0);
}

function rankSection(section, query, terms) {
  const heading = section.heading.toLowerCase();
  const body = section.text.toLowerCase();
  let score = 0;

  for (const term of terms.expanded) {
    if (heading.includes(term)) score += 6;
    if (body.includes(term)) score += 2;
  }

  for (const term of terms.base) {
    if (heading.includes(term)) score += 10;
    if (body.includes(term)) score += 8;
  }

  if (body.includes(query.toLowerCase())) score += 8;
  if (
    terms.base.some((term) => ["api", "cli", "mcp", "openapi", "sdk"].includes(term)) &&
    /available surfaces|agent interface/i.test(section.heading)
  ) {
    score += 14;
  }
  if (/source|citation|official|docs|reference|mcp|cli|auth|object|rate|pagination/i.test(section.heading)) {
    score += 0.75;
  }

  return score;
}

function relatedSources(sources, query, terms, sectionText) {
  const sourceScores = sources
    .map((source, index) => {
      const text = sourceText(source);
      const url = String(source.url || "");
      const label = source.label || source.title || url || `Source ${index + 1}`;
      let score = countTermHits(text, terms.expanded) * 2 + countTermHits(text, terms.base) * 3;
      if (sectionText.includes(url)) score += 8;
      if (sectionText.toLowerCase().includes(String(label).toLowerCase())) score += 4;
      if (String(source.type || "").toLowerCase() === "official") score += 0.5;
      if (query && text.toLowerCase().includes(query.toLowerCase())) score += 5;
      return { ...source, label, score };
    })
    .filter((source) => source.score > 0)
    .sort((a, b) => b.score - a.score);

  return sourceScores.slice(0, 5);
}

export function retrieveDocs({ docs, sourcesText, topic, maxSections = 4 }) {
  const sections = splitSections(docs);
  const query = String(topic || "").trim();
  const sources = parseSources(sourcesText);

  if (!query) {
    return {
      query,
      sections,
      selected: sections,
      sources,
      relatedSources: sources.slice(0, 8),
      fallback: false
    };
  }

  const terms = queryTerms(query);
  const ranked = sections
    .map((section) => ({ ...section, score: rankSection(section, query, terms) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const selected = ranked.filter((section) => section.score > 0).slice(0, maxSections);
  const fallback = selected.length === 0;
  const effective = fallback ? sections.slice(0, maxSections) : selected;
  const sourceContext = relatedSources(sources, query, terms, effective.map((section) => section.text).join("\n"));

  return {
    query,
    sections,
    selected: effective,
    sources,
    relatedSources: sourceContext.length ? sourceContext : sources.slice(0, 5),
    fallback
  };
}

export function formatDocsResult(result) {
  const body = result.selected.map((section) => section.text).join("\n\n");
  const notes = [];
  if (result.query) {
    notes.push(`Query: ${result.query}`);
    if (result.fallback) notes.push("No strong section match; showing the highest-context sections.");
  }

  const sourceLines = result.relatedSources
    .map((source) => {
      const label = source.label || source.title || source.url || "Source";
      const type = source.type ? ` (${source.type})` : "";
      return `- ${label}${type}: ${source.url || "no URL"}`;
    })
    .join("\n");

  return [
    notes.length ? `# Retrieval Context\n\n${notes.map((note) => `- ${note}`).join("\n")}` : "",
    body,
    sourceLines ? `# Source Context\n\n${sourceLines}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");
}

function rankTool(tool, docs, query, terms) {
  const aliases = (tool.aliases || []).join(" ");
  const metadata = [tool.id, tool.slug, tool.name, aliases, tool.status, tool.agentReadinessScore].filter(Boolean).join(" ");
  const normalizedQuery = normalize(query);
  let score = 0;

  for (const candidate of [tool.id, tool.slug, tool.name, ...(tool.aliases || [])]) {
    const normalized = normalize(String(candidate).replace(/^\/gtm\//, ""));
    if (normalized === normalizedQuery) score += 80;
    if (normalized.includes(normalizedQuery) || normalizedQuery.includes(normalized)) score += 24;
  }

  score += countTermHits(metadata, terms.base) * 12;
  score += countTermHits(metadata, terms.expanded) * 5;
  score += countTermHits(docs.slice(0, 12000), terms.base) * 2;
  score += countTermHits(docs.slice(0, 12000), terms.expanded);
  score += Number(tool.agentReadinessScore || 0) / 10;

  return score;
}

export function searchTools({ root, registry, query, limit = 10, includeDocs = true }) {
  const terms = queryTerms(query);
  return registry.tools
    .map((tool) => {
      let docs = "";
      if (includeDocs) {
        try {
          docs = fs.readFileSync(path.join(root, tool.path, "docs.md"), "utf8");
        } catch {
          docs = "";
        }
      }
      return { tool, score: rankTool(tool, docs, query, terms) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, limit);
}
