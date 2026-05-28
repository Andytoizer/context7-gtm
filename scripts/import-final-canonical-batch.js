import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const lastVerified = "2026-05-28";

const entries = [
  {
    name: "Findymail",
    slug: "findymail",
    aliases: ["fastymail", "findy mail"],
    canonicalUrl: "https://www.findymail.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "yes", "unknown", "yes", "unknown", "unknown", "unknown"],
    auth: "Bearer token from the Findymail API page.",
    objects: "Email verification, contacts, contact lists, email finder searches, reverse email, companies, employees, phone search, credits",
    rateLimits: "Official docs state all endpoints have a concurrent rate limit of 300 simultaneous requests unless stated otherwise.",
    pagination: "List/search pagination is endpoint-specific; inspect the OpenAPI document and endpoint reference before bulk retrieval.",
    risk: "medium",
    sources: [
      "https://app.findymail.com/docs/",
      "https://www.findymail.com/api/"
    ]
  },
  {
    name: "Otter.ai",
    slug: "otter-ai",
    aliases: ["otter", "otterai"],
    canonicalUrl: "https://otter.ai/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Bearer API key created from the Integrations > Developer tab. Public API is beta and must be enabled for the workspace.",
    objects: "Channels, conversations, transcripts, audio, action items, insights, outlines, workspace details, webhooks",
    rateLimits: "Enterprise plan users are limited to 10 requests per second in the public beta docs.",
    pagination: "Cursor-based pagination with meta.has_more and meta.next_cursor on list endpoints.",
    risk: "medium",
    review: "Public API is beta and may require account-manager enablement; verify workspace access and current endpoint coverage before implementation.",
    sources: [
      "https://help.otter.ai/hc/en-us/articles/36130822688279-Otter-ai-Public-API-beta"
    ]
  },
  {
    name: "Mixpanel",
    slug: "mixpanel",
    aliases: [],
    canonicalUrl: "https://mixpanel.com/",
    status: "published",
    score: 5,
    surfaces: ["unknown", "unknown", "yes", "yes", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "Service account Basic auth for query/export APIs; project tokens or SDK credentials for event ingestion and profile updates depending API surface.",
    objects: "Events, user profiles, group profiles, cohorts, funnels, retention, insights, annotations, schemas, lookup tables, projects",
    rateLimits: "Endpoint-specific. Raw event export documents 60 queries per hour, 3 queries per second, and 100 concurrent queries; other endpoints have separate documented limits.",
    pagination: "Endpoint-specific. Export streams raw events by date range; query/reference endpoints use their own paging, cursor, or limit parameters.",
    risk: "high",
    sources: [
      "https://developer.mixpanel.com/reference/overview",
      "https://developer.mixpanel.com/reference",
      "https://developer.mixpanel.com/reference/limits",
      "https://developer.mixpanel.com/reference/raw-event-export",
      "https://developer.mixpanel.com/llms.txt",
      "https://github.com/mixpanel/docs",
      "https://mixpanel.github.io/mixpanel-python/",
      "https://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html"
    ]
  },
  {
    name: "WordPress",
    slug: "wordpress",
    aliases: ["wp", "wp-cli", "wordpress.com"],
    canonicalUrl: "https://wordpress.org/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "unknown", "unknown", "yes", "yes", "yes", "yes"],
    auth: "Depends on surface: WordPress REST API uses cookies/nonces, application passwords, OAuth/plugin auth, or host-specific auth; WP-CLI uses local site/server credentials; WordPress.com MCP uses account authorization.",
    objects: "Posts, pages, media, comments, users, taxonomies, terms, plugins, themes, settings, sites, multisite networks, blocks, revisions",
    rateLimits: "Self-hosted WordPress REST API rate limits are host/plugin-specific; WordPress.com APIs and MCP access are plan/account controlled.",
    pagination: "REST API collection endpoints use page/per_page headers and links; WP-CLI supports output formats and command-specific filters.",
    risk: "high",
    sources: [
      "https://developer.wordpress.org/rest-api/",
      "https://developer.wordpress.org/rest-api/reference/",
      "https://developer.wordpress.org/cli/commands/",
      "https://wordpress.org/cli/",
      "https://wordpress.com/support/mcp/",
      "https://github.com/WP-API/docs"
    ]
  },
  {
    name: "PhantomBuster",
    slug: "phantombuster",
    aliases: ["phantom buster", "pb"],
    canonicalUrl: "https://phantombuster.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "X-Phantombuster-Key header with an API key created in workspace settings.",
    objects: "Agents/Phantoms, containers/launches, console output, results, scripts, workspace storage, LinkedIn leads, lead lists, companies",
    rateLimits: "Current docs require testing in the built-in API reference and handling throttling; exact public limits should be confirmed per workspace/endpoint.",
    pagination: "Endpoint-specific; results and storage endpoints should be checked in the API reference before bulk retrieval.",
    risk: "high",
    sources: [
      "https://support.phantombuster.com/hc/en-us/articles/4401916698130-Get-started-with-the-PhantomBuster-API",
      "https://hub.phantombuster.com/docs/api",
      "https://support.phantombuster.com/hc/en-us/sections/27979945401106-Use-the-PhantomBuster-API-to-Build-Custom-Workflows"
    ]
  },
  {
    name: "Typeform",
    slug: "typeform",
    aliases: [],
    canonicalUrl: "https://www.typeform.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "Personal access tokens or OAuth 2.0 bearer tokens; EU data-center accounts use EU API base URLs.",
    objects: "Forms/typeforms, fields, themes, images, responses, webhooks, workspaces, teams, applications, embeds",
    rateLimits: "Create and Responses APIs document two requests per second per Typeform account.",
    pagination: "Responses and list endpoints use endpoint-specific parameters such as page_size, before/after tokens, or form-specific query filters.",
    risk: "high",
    sources: [
      "https://www.typeform.com/developers/",
      "https://www.typeform.com/developers/get-started/",
      "https://www.typeform.com/developers/get-started/applications/",
      "https://www.typeform.com/developers/create/",
      "https://github.com/Typeform/js-api-client",
      "https://github.com/Typeform/embed"
    ]
  },
  {
    name: "Tally",
    slug: "tally",
    aliases: ["tally.so", "tally forms"],
    canonicalUrl: "https://tally.so/",
    status: "published",
    score: 5,
    surfaces: ["yes", "unknown", "yes", "yes", "yes", "unknown", "unknown", "unknown", "unknown"],
    auth: "Bearer API key for REST API, or OAuth/API-key authentication for the official remote MCP server.",
    objects: "Forms, blocks/fields, submissions, workspaces, webhooks, published form metadata",
    rateLimits: "Public docs describe API availability but do not expose a single global rate limit; handle 429s and verify limits before high-volume sync.",
    pagination: "Submissions and list endpoints use endpoint-specific pagination/filter parameters in the API reference.",
    risk: "high",
    sources: [
      "https://tally.so/help/api",
      "https://developers.tally.so/api-reference/introduction",
      "https://developers.tally.so/api-reference/api-keys",
      "https://developers.tally.so/api-reference/versioning",
      "https://developers.tally.so/api-reference/mcp",
      "https://developers.tally.so/llms.txt",
      "https://tally.so/help/mcp-server",
      "https://tally.so/help/webhooks"
    ]
  }
];

function sourceTitle(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function renderDocs(entry) {
  const objects = entry.objects.split(", ").map((object) => `- ${object}`).join("\n");
  const [officialMcp, officialCli, officialApi, openApiSpec, llmsDocs, officialSdk, communityMcp, communityCli, communitySdkOrIntegration] = entry.surfaces;
  return `# ${entry.name}

## Agent Summary

${entry.name} is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: ${entry.score}/5.

## Available Surfaces

- Official MCP: ${officialMcp}
- Official CLI: ${officialCli}
- Official API: ${officialApi}
- OpenAPI/spec: ${openApiSpec}
- llms/AI docs: ${llmsDocs}
- Official SDK: ${officialSdk}
- Community MCP: ${communityMcp}
- Community CLI: ${communityCli}
- Community SDK / integration: ${communitySdkOrIntegration}

## Auth

${entry.auth}

## Main Objects

${objects}

## Rate Limits

${entry.rateLimits}

## Pagination

${entry.pagination}

## Agent Caveats

- Destructive action risk: ${entry.risk}.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
${entry.review ? `\n## Needs Human Review\n\n${entry.review}\n` : ""}
## Sources

${entry.sources.map((source) => `- ${source}`).join("\n")}
`;
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

fs.rmSync(path.join(root, "tools", "fastymail"), { recursive: true, force: true });

for (const entry of entries) {
  const dir = path.join(root, "tools", entry.slug);
  fs.mkdirSync(dir, { recursive: true });

  const [officialMcp, officialCli, officialApi, openApiSpec, llmsDocs, officialSdk, communityMcp, communityCli, communitySdkOrIntegration] = entry.surfaces;
  const tool = {
    id: `/gtm/${entry.slug}`,
    name: entry.name,
    slug: entry.slug,
    status: entry.status,
    aliases: entry.aliases,
    lastVerified,
    agentReadinessScore: entry.score,
    canonicalUrl: entry.canonicalUrl,
    surfaces: {
      officialMcp,
      officialCli,
      officialApi,
      openApiSpec,
      llmsDocs,
      officialSdk,
      communityMcp,
      communityCli,
      communitySdkOrIntegration
    },
    auth: {
      notes: entry.auth
    },
    objects: entry.objects.split(", "),
    rateLimits: entry.rateLimits,
    pagination: entry.pagination,
    destructiveActionRisk: entry.risk,
    notes: [
      "Generated from the final canonical seed-list completion batch.",
      "Use source links to refresh endpoint-level details before implementation."
    ],
    needsHumanReview: entry.status === "needs-review",
    ...(entry.review ? { reviewReason: entry.review } : {})
  };

  writeJson(path.join(dir, "tool.json"), tool);
  fs.writeFileSync(path.join(dir, "docs.md"), renderDocs(entry));
  writeJson(path.join(dir, "sources.json"), entry.sources.map((url) => ({
    title: sourceTitle(url),
    url,
    type: "official"
  })));
}

const registryPath = path.join(root, "registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const batchSlugs = new Set(entries.map((entry) => entry.slug));
registry.updatedAt = lastVerified;
registry.tools = registry.tools
  .filter((tool) => tool.slug !== "fastymail" && tool.id !== "/gtm/fastymail" && !batchSlugs.has(tool.slug))
  .concat(entries.map((entry) => ({
    id: `/gtm/${entry.slug}`,
    name: entry.name,
    slug: entry.slug,
    status: entry.status,
    path: `tools/${entry.slug}`,
    aliases: entry.aliases,
    agentReadinessScore: entry.score,
    lastVerified
  })));

writeJson(registryPath, registry);
console.log(`Imported ${entries.length} final canonical tools. Registry now has ${registry.tools.length} tools.`);
