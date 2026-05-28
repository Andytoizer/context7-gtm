#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const STALE_UNKNOWN_OR_NO = new Set(["unknown", "no", "missing"]);

const SURFACE_RULES = [
  {
    surface: "officialMcp",
    indicator: "MCP",
    pattern: /\bmcp\b|model context protocol/i,
    staleValues: STALE_UNKNOWN_OR_NO,
    severity: "high",
    recommendation: "Review officialMcp; source evidence mentions MCP.",
  },
  {
    surface: "openApiSpec",
    indicator: "OpenAPI",
    pattern: /\bopenapi\b|\bswagger\b|open-api|open_api/i,
    staleValues: STALE_UNKNOWN_OR_NO,
    severity: "high",
    recommendation: "Review openApiSpec; source evidence appears to point at OpenAPI/Swagger material.",
  },
  {
    surface: "llmsDocs",
    indicator: "llms.txt",
    pattern: /\bllms(?:\.txt)?\b|llms-full\.txt/i,
    staleValues: STALE_UNKNOWN_OR_NO,
    severity: "medium",
    recommendation: "Review llmsDocs; source evidence mentions llms.txt or LLM-ready docs.",
  },
  {
    surface: "officialCli",
    indicator: "CLI",
    pattern: /\bcli\b|command[- ]line|npmjs\.com\/package\/.*cli|github\.com\/[^/]+\/[^/]*cli/i,
    staleValues: STALE_UNKNOWN_OR_NO,
    severity: "medium",
    recommendation: "Review officialCli; source evidence mentions a CLI.",
  },
  {
    surface: "officialSdk",
    indicator: "SDK",
    pattern: /\bsdk\b|client librar(?:y|ies)|github\.com\/[^/]+\/[^/]*(?:sdk|client|node|python|ruby|go|java)/i,
    staleValues: STALE_UNKNOWN_OR_NO,
    severity: "medium",
    recommendation: "Review officialSdk; source evidence mentions an SDK or client library.",
  },
  {
    surface: "officialApi",
    indicator: "API",
    pattern: /\bapi\b|developer(?:s)?\./i,
    staleValues: new Set(["unknown", "missing"]),
    severity: "low",
    recommendation: "Review officialApi; source evidence mentions API/developer docs.",
  },
  {
    surface: "changelog",
    indicator: "changelog",
    pattern: /changelog|release notes|updates/i,
    staleValues: new Set(["unknown", "no", "missing"]),
    severity: "info",
    recommendation: "Consider tracking changelog availability in metadata if this project adopts that surface.",
  },
];

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}

const registry = readJson(path.join(root, "registry.json"));
const profiles = collectProfiles(registry);
const findings = profiles.flatMap((profile) => detectProfileDrift(profile));
const summary = summarize(findings, profiles.length);

if (options.json) {
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), summary, findings }, null, 2));
} else {
  console.log(renderMarkdown(summary, findings));
}

if (options.strict && findings.length > 0) {
  process.exit(1);
}

function parseArgs(args) {
  const parsed = { json: false, strict: false, help: false };
  for (const arg of args) {
    if (arg === "--json") parsed.json = true;
    else if (arg === "--strict") parsed.strict = true;
    else if (arg === "--help" || arg === "-h") parsed.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/detect-surface-drift.js [options]

Scans registry profiles for source and metadata evidence that may be ahead of
surface flags. This script reports only; it never edits profiles.

Options:
  --json      Emit machine-readable JSON.
  --strict    Exit 1 when any drift finding is detected.
  --help      Show this help.
`);
}

function collectProfiles(registryJson) {
  const entries = [];
  const seenDirs = new Set();

  for (const entry of registryJson.tools || []) {
    const dir = path.join(root, entry.path || `tools/${entry.slug}`);
    seenDirs.add(path.resolve(dir));
    entries.push({ entry, dir });
  }

  for (const dir of listAllToolDirs()) {
    if (seenDirs.has(path.resolve(dir))) continue;
    const slug = path.basename(dir);
    entries.push({ entry: { id: `/gtm/${slug}`, slug, path: path.relative(root, dir) }, dir });
  }

  return entries.map(({ entry, dir }) => {
    const profileDir = dir || path.join(root, entry.path || `tools/${entry.slug}`);
    const toolJsonPath = path.join(profileDir, "tool.json");
    const sourcesPath = path.join(profileDir, "sources.json");
    const toolJson = fs.existsSync(toolJsonPath) ? readJson(toolJsonPath) : {};
    const sourcesJson = fs.existsSync(sourcesPath) ? readJson(sourcesPath) : {};
    const meta = { ...entry, ...toolJson };

    return {
      id: entry.id || toolJson.id || "",
      name: entry.name || toolJson.name || entry.slug || "Unknown",
      slug: entry.slug || toolJson.slug || path.basename(profileDir),
      path: path.relative(root, profileDir),
      meta,
      surfaces: normalizeSurfaces(meta),
      sources: flattenSourcesJson(sourcesJson, path.relative(root, sourcesPath)),
      metadataSignals: collectMetadataStrings(meta),
    };
  });
}

function listAllToolDirs() {
  const toolsDir = path.join(root, "tools");
  if (!fs.existsSync(toolsDir)) return [];

  return fs
    .readdirSync(toolsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(toolsDir, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, "tool.json")) || fs.existsSync(path.join(dir, "sources.json")));
}

function detectProfileDrift(profile) {
  const evidence = [
    ...profile.sources.flatMap((source) => sourceEvidence(source)),
    ...profile.metadataSignals.flatMap((signal) => metadataEvidence(signal)),
  ];

  const findings = [];
  for (const rule of SURFACE_RULES) {
    const matches = evidence.filter((item) => rule.pattern.test(item.text));
    if (matches.length === 0) continue;

    const value = profile.surfaces[rule.surface];
    if (!rule.staleValues.has(value)) continue;

    findings.push({
      toolId: profile.id,
      toolName: profile.name,
      slug: profile.slug,
      path: profile.path,
      severity: rule.severity,
      surface: rule.surface,
      currentValue: value,
      indicator: rule.indicator,
      recommendation: rule.recommendation,
      evidence: compactEvidence(matches),
    });
  }

  return findings;
}

function normalizeSurfaces(meta) {
  const surfaces = meta.surfaces || meta.interfaces || {};
  return {
    officialMcp: normalizeSurface(surfaces.officialMcp ?? meta.officialMcp),
    officialCli: normalizeSurface(surfaces.officialCli ?? meta.officialCli),
    officialApi: normalizeSurface(surfaces.officialApi ?? meta.officialApi),
    openApiSpec: normalizeSurface(surfaces.openApiSpec ?? surfaces.openApi ?? meta.openApiSpec ?? meta.openApi),
    llmsDocs: normalizeSurface(surfaces.llmsDocs ?? surfaces.llmsTxt ?? meta.llmsDocs ?? meta.llmsTxt),
    officialSdk: normalizeSurface(surfaces.officialSdk ?? meta.officialSdk),
    changelog: normalizeSurface(surfaces.changelog ?? meta.changelog),
  };
}

function normalizeSurface(value) {
  if (value === true) return "yes";
  if (value === false) return "no";
  if (typeof value === "string" && value.trim()) return value.trim().toLowerCase();
  return "missing";
}

function flattenSourcesJson(sourcesJson, origin) {
  if (Array.isArray(sourcesJson)) {
    return sourcesJson.flatMap((source, index) => normalizeSource(source, "sources", origin, index));
  }

  if (!sourcesJson || typeof sourcesJson !== "object") return [];

  return Object.entries(sourcesJson)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([section, items]) => items.flatMap((source, index) => normalizeSource(source, section, origin, index)));
}

function normalizeSource(source, section, origin, index) {
  if (typeof source === "string") {
    return [{ title: `${section}[${index}]`, url: source, section, origin }];
  }

  if (!source || typeof source !== "object") return [];

  const url = source.url || source.href || "";
  if (!url) return [];

  return [
    {
      title: source.label || source.title || source.name || `${section}[${index}]`,
      url,
      section,
      origin,
    },
  ];
}

function sourceEvidence(source) {
  return [
    {
      kind: "source",
      location: source.origin,
      label: source.title,
      url: source.url,
      text: `${source.title} ${source.url}`,
    },
  ];
}

function metadataEvidence(signal) {
  return [
    {
      kind: "metadata",
      location: signal.path,
      label: signal.path,
      url: "",
      text: signal.value,
    },
  ];
}

function collectMetadataStrings(meta) {
  const skipPaths = new Set([
    "id",
    "name",
    "slug",
    "status",
    "lastVerified",
    "agentReadinessScore",
    "interfaces",
    "surfaces",
    "sourceQuality",
  ]);
  const strings = [];

  walk(meta, [], (value, trail) => {
    if (typeof value !== "string") return;
    if (trail.some((part, index) => index === 0 && skipPaths.has(part))) return;
    strings.push({ path: trail.join("."), value });
  });

  return strings;
}

function walk(value, trail, visit) {
  visit(value, trail);

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, [...trail, String(index)], visit));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    walk(child, [...trail, key], visit);
  }
}

function compactEvidence(matches) {
  const seen = new Set();
  const compact = [];

  for (const match of matches) {
    const key = `${match.kind}:${match.location}:${match.label}:${match.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    compact.push({
      kind: match.kind,
      location: match.location,
      label: match.label,
      url: match.url,
    });
    if (compact.length >= 3) break;
  }

  return compact;
}

function summarize(findings, profileCount) {
  return {
    profilesScanned: profileCount,
    findingCount: findings.length,
    affectedProfiles: new Set(findings.map((finding) => finding.toolId)).size,
    bySeverity: countBy(findings, (finding) => finding.severity),
    bySurface: countBy(findings, (finding) => finding.surface),
  };
}

function renderMarkdown(summary, findings) {
  const lines = [
    "# Surface Drift Detection",
    "",
    `Scanned ${summary.profilesScanned} profiles.`,
    "",
    `- Findings: ${summary.findingCount}`,
    `- Affected profiles: ${summary.affectedProfiles}`,
    "",
    "## Findings By Surface",
    "",
    ...Object.entries(summary.bySurface)
      .sort(([a], [b]) => a.localeCompare(b, "en"))
      .map(([surface, count]) => `- ${surface}: ${count}`),
  ];

  if (findings.length === 0) {
    lines.push("", "No surface drift indicators found.");
    return `${lines.join("\n")}\n`;
  }

  lines.push("", "## Actionable Findings", "", "| Tool | Surface | Current | Indicator | Evidence | Recommendation |", "| --- | --- | --- | --- | --- | --- |");

  for (const finding of findings.sort(sortFindings)) {
    lines.push(
      `| ${escapeCell(finding.toolName)} | ${escapeCell(finding.surface)} | ${escapeCell(
        finding.currentValue,
      )} | ${escapeCell(finding.indicator)} | ${escapeCell(renderEvidence(finding.evidence))} | ${escapeCell(
        finding.recommendation,
      )} |`,
    );
  }

  return `${lines.join("\n")}\n`;
}

function renderEvidence(evidence) {
  return evidence.map((item) => `${item.label}${item.url ? ` (${item.url})` : ""}`).join("; ");
}

function sortFindings(a, b) {
  return severityRank(a.severity) - severityRank(b.severity) || a.toolName.localeCompare(b.toolName, "en");
}

function severityRank(severity) {
  return { high: 0, medium: 1, low: 2, info: 3 }[severity] ?? 4;
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeCell(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}
