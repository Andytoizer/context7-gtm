import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const lastVerified = "2026-05-28";

const entries = [
  {
    name: "Salesforce",
    aliases: ["salesforce crm", "sfdc"],
    canonicalUrl: "https://www.salesforce.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "unknown", "unknown", "yes", "unknown", "yes"],
    auth: "OAuth 2.0, Connected Apps, and bearer tokens. Hosted MCP uses Salesforce auth and user permissions.",
    objects: "Account, Contact, Lead, Opportunity, Task/Event, Campaign, Case, custom sObjects, Flow/Apex actions",
    rateLimits: "Org/license-based API limits; common allocation cited as 1,000 requests per user license per 24h, Developer Edition 15,000/org/day.",
    pagination: "REST query locators/nextRecordsUrl; SOQL LIMIT/OFFSET; GraphQL cursor pagination.",
    risk: "high",
    sources: ["https://developer.salesforce.com/docs/platform/hosted-mcp-servers/references/reference/servers-reference.html", "https://github.com/salesforcecli/mcp", "https://developer.salesforce.com/tools/salesforcecli/", "https://help.salesforce.com/s/articleView?id=000389027&language=en_US&type=1", "https://help.salesforce.com/s/articleView?id=release-notes.rn_api_rest.htm&language=en_US&release=236&type=5"]
  },
  {
    name: "Monaco",
    canonicalUrl: "https://www.monaco.com/",
    status: "needs-review",
    score: 1,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Unknown.",
    objects: "Public site only: TAM/accounts, signals, sequences, interactions, pipeline, calls/meetings/messages",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "unknown",
    review: "Confirm Monaco is the revenue-engine product at monaco.com and whether private API/MCP docs exist.",
    sources: ["https://www.monaco.com/", "https://www.monaco.com/company"]
  },
  {
    name: "Clarify",
    aliases: ["clarify crm"],
    canonicalUrl: "https://www.clarify.ai/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "unknown", "yes", "unknown", "unknown"],
    auth: "OAuth for API/MCP; API keys not yet provided per docs.",
    objects: "Companies, people, deals, meetings, tasks, users, lists, campaigns, lead finder, custom objects/fields",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    sources: ["https://docs.clarify.ai/en/articles/13367278-clarify-mcp", "https://docs.clarify.ai/the-clarify-api", "https://docs.clarify.ai/introduction", "https://mcp.pipedream.com/app/clarify"]
  },
  {
    name: "Pipedrive",
    canonicalUrl: "https://www.pipedrive.com/",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "API token or OAuth 2.0 bearer tokens.",
    objects: "Deals, leads, persons, organizations, products, activities, notes, pipelines/stages, users",
    rateLimits: "Token-based burst limits; Search API 10 requests/2 sec; headers include x-ratelimit-* and daily write quota.",
    pagination: "Cursor-based pagination for many list endpoints; older endpoints vary.",
    risk: "high",
    sources: ["https://developers.pipedrive.com/docs/api/v1", "https://pipedrive.readme.io/docs/core-api-concepts-rate-limiting", "https://pipedrive.readme.io/docs/core-api-concepts-pagination", "https://github.com/pipedrive", "https://www.apideck.com/mcp-server/pipedrive"]
  },
  {
    name: "Close",
    aliases: ["close crm"],
    canonicalUrl: "https://www.close.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API key via Basic Auth; OAuth 2.0 supported for apps/MCP; MCP supports read, safe-write, and destructive scopes.",
    objects: "Leads, contacts, opportunities, activities, emails, calls, SMS, tasks, users, custom objects, webhooks",
    rateLimits: "Rate limits apply to all endpoints; numeric public limit not found in official overview.",
    pagination: "_skip/_limit and cursor-based pagination depending on endpoint.",
    risk: "high",
    sources: ["https://help.close.com/docs/mcp-server", "https://developer.close.com/api/overview", "https://api.close.com/api/openapi.json", "https://developer.close.com/api/overview/api-clients", "https://github.com/closeio/closeio-api"]
  },
  {
    name: "GoHighLevel",
    aliases: ["highlevel", "ghl"],
    canonicalUrl: "https://www.gohighlevel.com/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "OAuth 2.0 for marketplace apps; Private Integration Tokens; bearer JWT scoped by company/location.",
    objects: "Contacts, conversations/messages, calendars, appointments, opportunities/pipelines, payments/products, locations, workflows, webhooks",
    rateLimits: "V2 public APIs: 100 requests/10 sec per app per resource; 200,000/day per app per resource.",
    pagination: "Endpoint-specific list/search pagination; needs per-endpoint handling.",
    risk: "high",
    sources: ["https://marketplace.gohighlevel.com/docs/", "https://help.gohighlevel.com/support/solutions/articles/155000005741-how-to-use-the-highlevel-mcp-server", "https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api", "https://marketplace.gohighlevel.com/docs/sdk/GettingStartedSDK/index.html", "https://mcp.localbosses.org/"]
  },
  {
    name: "Lightfield",
    canonicalUrl: "https://www.lightfield.app/",
    status: "published",
    score: 4,
    surfaces: ["yes", "yes", "yes", "unknown", "unknown", "yes", "unknown", "no", "unknown"],
    auth: "Scoped bearer API key, sk_lf_..., with Lightfield-Version header.",
    objects: "Accounts, contacts, lists, meetings, notes, opportunities, tasks, members, workflow runs, files, custom objects",
    rateLimits: "Unknown.",
    pagination: "limit/offset; max limit 25; list results served from a possibly stale search index.",
    risk: "medium",
    sources: ["https://docs.lightfield.app/api", "https://docs.lightfield.app/getting-started/http-quickstart/", "https://docs.lightfield.app/using-the-api/list-endpoints", "https://lightfield.app/blog/skills-knowledge-mcp-performance-improvements"]
  },
  {
    name: "Instantly",
    aliases: ["instantly.ai"],
    canonicalUrl: "https://instantly.ai/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "yes", "unknown", "unknown", "unknown", "unknown"],
    auth: "Bearer API keys with scopes; multiple revocable keys.",
    objects: "Accounts/mailboxes, campaigns, leads, lead lists, emails/unibox, blocklists, webhooks, analytics, workspaces, API keys, background jobs",
    rateLimits: "Publicly announced 100 req/sec and 6,000 req/min; endpoint exceptions include email list 20/min and test email 10/min.",
    pagination: "Cursor pagination with starting_after / next_starting_after; limits often 1-100.",
    risk: "high",
    sources: ["https://developer.instantly.ai/api-reference/introduction", "https://developer.instantly.ai/llms.txt", "https://help.instantly.ai/en/articles/12980002-instantly-mcp-model-context-protocol", "https://developer.instantly.ai/api-reference/lead/list-leads", "https://www.linkedin.com/posts/instantlyapp_building-on-instantly-just-got-a-lot-better-activity-7437528536367878144-qkdz"]
  },
  {
    name: "Outreach",
    canonicalUrl: "https://www.outreach.io/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "OAuth 2.0 bearer tokens with Outreach API access/scopes.",
    objects: "Prospects, accounts, sequences, sequence states, tasks, calls, mailings, opportunities, users, stages",
    rateLimits: "Generally 10,000 requests/hour per user.",
    pagination: "Cursor-based page[size] with links.next; offset pagination deprecated, max offset 10,000, page limit max 1,000.",
    risk: "high",
    sources: ["https://developers.outreach.io/api/getting-started", "https://developers.outreach.io/api/making-requests", "https://support.outreach.io/hc/en-us/articles/46458159059227-Connect-to-Outreach-MCP-Server-using-CLI-or-Config-Tools"]
  },
  {
    name: "Salesloft",
    canonicalUrl: "https://www.salesloft.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["announced", "no", "yes", "unknown", "unknown", "unknown", "yes", "unknown", "yes"],
    auth: "OAuth authorization code for partners; client credentials for private apps; API keys for customers; scoped access.",
    objects: "Accounts, people, cadences, cadence memberships, steps/actions, calls, emails, tasks, opportunities, notes, users, webhooks",
    rateLimits: "600 cost/minute team-level; higher page numbers add cost; x-ratelimit headers.",
    pagination: "page / per_page, default 25, max 100; docs recommend updated_at cursor poller for deep syncs.",
    risk: "high",
    review: "Confirm whether the announced Clari+Salesloft MCP Server has public setup/reference docs yet.",
    sources: ["https://developers.salesloft.com/docs/api/", "https://developers.salesloft.com/docs/platform/api-basics/", "https://developer.salesloft.com/docs/platform/api-basics/rate-limits/", "https://developers.salesloft.com/docs/platform/api-basics/filtering-paging-sorting/", "https://www.salesloft.com/company/newsroom/clari-salesloft-forecasting-execution-mcp-server", "https://cdn.cdata.com/help/KBM/mcp"]
  },
  {
    name: "Amplemarket",
    canonicalUrl: "https://www.amplemarket.com/",
    status: "published",
    score: 4,
    surfaces: ["yes", "unknown", "yes", "unknown", "unknown", "unknown", "yes", "unknown", "yes"],
    auth: "Official MCP uses OAuth per user with account permissions. API access appears governed by Amplemarket data-as-a-service API terms.",
    objects: "People search, company search, enrichments, lead lists, sequences, buying signals, prospect activity",
    rateLimits: "Official MCP docs state 100 requests per minute per user.",
    pagination: "MCP search tools return up to 100 results per page.",
    risk: "high",
    sources: ["https://knowledge.amplemarket.com/articles/8022685319-connecting-to-the-amplemarket-mcp-server", "https://www.amplemarket.com/legal/api-terms", "https://www.amplemarket.com/", "https://zapier.com/mcp/amplemarket"]
  },
  {
    name: "Apollo",
    aliases: ["apollo.io"],
    canonicalUrl: "https://www.apollo.io/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "unknown", "unknown", "unknown", "unknown"],
    auth: "API key for REST; OAuth for Apollo CLI/MCP connectors.",
    objects: "People, organizations, contacts, accounts, deals, sequences, email accounts, calls, tasks, users, usage/analytics",
    rateLimits: "Plan-based per endpoint; usage endpoint reports per-minute/hour/day limits.",
    pagination: "page/per_page; People Search max 100/page, 500 pages / 50k display limit.",
    risk: "high",
    sources: ["https://docs.apollo.io/", "https://docs.apollo.io/docs/apollo-cli-overview", "https://www.apollo.io/product/mcp"]
  },
  {
    name: "Lusha",
    canonicalUrl: "https://www.lusha.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "yes", "no", "yes", "unknown", "unknown"],
    auth: "REST uses api_key header; MCP supports OAuth/API-key bearer header depending client.",
    objects: "Contacts, companies, search, enrich, search-and-enrich, prospecting, lookalikes, signals, filters, webhooks, account",
    rateLimits: "Plan-based per minute/hour/day; response headers expose remaining/usage/limits.",
    pagination: "Prospecting uses pagination.page and pagination.size; up to 1,000 pages x 50 results.",
    risk: "medium",
    sources: ["https://docs.lusha.com/apis/openapi/prospecting", "https://docs.lusha.com/mcp-docs", "https://info.lusha.com/en/articles/361329-lusha-model-context-protocol-mcp-server"]
  },
  {
    name: "ContactOut",
    canonicalUrl: "https://contactout.com/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "no", "yes", "unknown", "unknown"],
    auth: "API token in token header.",
    objects: "LinkedIn profile enrich, people search/count, contact info single/bulk, company info/search, decision makers, email verifier, contact checkers, API usage",
    rateLimits: "People Search 60/min; Contact Checker 150/min; other APIs 1000/min; 429 includes retry-after.",
    pagination: "page parameter; responses include metadata.page, page_size, total_results.",
    risk: "low",
    sources: ["https://api.contactout.com/", "https://contactout.com/api-feature", "https://mcp.pipedream.com/app/contactout"]
  },
  {
    name: "Prospeo",
    canonicalUrl: "https://prospeo.io/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "unknown", "yes", "no", "yes", "unknown", "unknown"],
    auth: "X-KEY API key header; MCP hosted OAuth/API key or local PROSPEO_API_KEY.",
    objects: "Enrich person/company, bulk enrich person/company, search person/company, search suggestions, account info",
    rateLimits: "Search Free 1/s 20/min 50/day; Starter 1/s 30/min 1k/day; Growth 2/s 60/min 4k/day; Pro 5/s 180/min 250k/day. Enrich Pro up to 30/s 1,800/min 500k/day.",
    pagination: "Search pages return up to 25 results; MCP docs state up to 1,000 pages.",
    risk: "low",
    sources: ["https://prospeo.io/api-docs", "https://prospeo.io/api-docs/rate-limits", "https://prospeo.io/mcp", "https://prospeo.io/mcp-docs/quick-start"]
  },
  {
    name: "Wiza",
    canonicalUrl: "https://wiza.co/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "yes", "yes", "unknown", "yes", "unknown", "unknown"],
    auth: "Bearer API token.",
    objects: "Individual reveals, credits, company enrichment, prospect search, lists, list contacts, prospect lists, webhooks",
    rateLimits: "Individual Reveal concurrency Starter 5 / Enterprise 15+; queue is 200x concurrency. Help article also states Individual Reveal 15 RPS and list creation 10/min.",
    pagination: "Prospect/list endpoints support paged retrieval; exact prospect pagination needs endpoint-level confirmation.",
    risk: "medium",
    sources: ["https://docs.wiza.co/", "https://docs.wiza.co/overview/usage-limits", "https://feedback.wiza.co/changelog/wiza-mcp", "https://help.wiza.co/en/articles/8392662-wiza-s-api-everything-you-need-to-know"]
  },
  {
    name: "Hunter.io",
    slug: "hunter",
    aliases: ["hunter"],
    canonicalUrl: "https://hunter.io/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "no", "yes", "yes", "yes"],
    auth: "api_key query param for REST; MCP accepts Authorization Bearer or X-API-KEY.",
    objects: "Discover, domain search, email finder, email verifier/count/enrichment, company enrichment, combined enrichment, account, leads, lead lists, custom attributes, email sequences",
    rateLimits: "Domain Search and Email Finder 15 RPS / 500 per minute; Email Verifier 10 RPS / 300 per minute.",
    pagination: "limit/offset; Discover max 100/page; Domain Search default 10 max 100; leads/lists/sequences use limit/offset.",
    risk: "high",
    sources: ["https://hunter.io/api-documentation/v2", "https://help.hunter.io/en/articles/1970956-hunter-api", "https://hunter.io/blog/hunter-mcp-server-bringing-ai-and-b2b-data-together/amp/"]
  },
  {
    name: "RocketReach",
    canonicalUrl: "https://rocketreach.co/",
    status: "needs-review",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "API key; Python SDK uses Gateway(api_key=...); REST commonly uses Api-Key header.",
    objects: "Person search, person lookup, lookup status, company/profile lookup, account",
    rateLimits: "Exact published limits not found; SDK warns tight polling may return 429 with retry wait.",
    pagination: "Python SDK search uses start and size params.",
    risk: "medium",
    review: "Confirm current official REST docs, exact rate limits, and whether an official OpenAPI spec exists.",
    sources: ["https://rocketreach.co/api", "https://pypi.org/project/rocketreach/", "https://github.com/rocketreach/rocketreach_python", "https://glama.ai/mcp/servers/%40Meerkats-Ai/rocketreach-mcp-server/tree"]
  },
  {
    name: "LeadMagic",
    canonicalUrl: "https://leadmagic.io/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "unknown", "no", "no", "unknown"],
    auth: "API key.",
    objects: "B2B enrichment endpoints, email/mobile finding, validation, person/company enrichment, usage/credits",
    rateLimits: "Per-tool limits; responses include headers for credits, rate limits, concurrency, and usage.",
    pagination: "Unknown.",
    risk: "low",
    sources: ["https://leadmagic.io/docs/developer-experience", "https://leadmagic.io/docs/cli/commands", "https://leadmagic.io/solutions/developers", "https://github.com/LeadMagic/leadmagic-mcp"]
  },
  {
    name: "Fastymail",
    canonicalUrl: "unknown",
    status: "needs-review",
    score: 1,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Unknown.",
    objects: "Unknown.",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "unknown",
    review: "Could not verify Fastymail as a GTM data provider; did you mean Findymail?",
    sources: ["https://app.findymail.com/docs/", "https://www.findymail.com/api/"]
  },
  {
    name: "FullEnrich",
    canonicalUrl: "https://fullenrich.com/",
    status: "needs-review",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "yes", "unknown", "unknown", "unknown", "unknown"],
    auth: "Bearer API key.",
    objects: "Async enrich API, async reverse email lookup, sync search API, contacts, companies, exports, credits",
    rateLimits: "Exact limits not found; docs warn polling consumes rate-limit quota and API/integration credit limits can be configured.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm exact API rate limits, Search API pagination model, and whether an official OpenAPI spec is published.",
    sources: ["https://docs.fullenrich.com/api/v2/general/authentication", "https://fullenrich.mintlify.app/api/v2/implement-in-product/getting-started", "https://help.fullenrich.com/en/articles/14190120-mcp-server", "https://help.fullenrich.com/en/articles/9688091-data-provided-by-fullenrich"]
  },
  {
    name: "Clay",
    aliases: ["clay.com"],
    canonicalUrl: "https://www.clay.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Workspace login/API key; table webhooks; enterprise People/Company API access.",
    objects: "Tables, webhooks, enrichments, people, companies, contacts",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm Clay MCP docs apply to Clay.com GTM enrichment workspace, not Clay.earth relationship-manager product lineage.",
    sources: ["https://university.clay.com/docs/using-clay-as-an-api", "https://library.clay.earth/hc/en-us/articles/36405339564315-Clay-MCP-live-Make-integration-improved-Library-and-more", "https://github.com/clay-inc/clay-mcp"]
  },
  {
    name: "Cargo",
    aliases: ["getcargo"],
    canonicalUrl: "https://www.getcargo.ai/",
    status: "published",
    score: 5,
    surfaces: ["unknown", "yes", "yes", "unknown", "yes", "yes", "unknown", "unknown", "unknown"],
    auth: "Bearer API token.",
    objects: "Datasets, models, connectors, actions, segments, tools, workflows, plays, agents, files, MCP server configs",
    rateLimits: "Workspace-level API 429; connector-node limits only.",
    pagination: "Unknown.",
    risk: "high",
    sources: ["https://docs.getcargo.ai/api-reference/introduction", "https://docs.getcargo.ai/cli/overview", "https://docs.getcargo.ai/api-reference/ai--mcp/list-mcp-servers"]
  },
  {
    name: "Unify",
    aliases: ["unifygtm"],
    canonicalUrl: "https://www.unifygtm.com/",
    status: "published",
    score: 5,
    surfaces: ["unknown", "unknown", "yes", "yes", "yes", "yes", "unknown", "unknown", "unknown"],
    auth: "X-Api-Key header.",
    objects: "Objects, attributes, records, company, person, opportunity, intent/events",
    rateLimits: "100000 requests per 5 minutes.",
    pagination: "Unknown.",
    risk: "medium",
    sources: ["https://docs.unifygtm.com/developers/api/data/overview", "https://docs.unifygtm.com/developers/sdks/python-library", "https://docs.unifygtm.com/developers/sdks/typescript-library"]
  },
  {
    name: "CrustData",
    canonicalUrl: "https://crustdata.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "unknown", "yes", "unknown", "yes", "unknown", "yes", "unknown", "unknown"],
    auth: "API key/Bearer token; MCP OAuth 2.1 with API-key pass-through.",
    objects: "Companies, people, jobs, social posts, watchers/webhooks, credits, web search/fetch",
    rateLimits: "Endpoint-specific; web search default 10/min.",
    pagination: "Yes.",
    risk: "medium",
    sources: ["https://docs.crustdata.com/general/mcp", "https://docs.crustdata.com/api-reference/web-apis/web-search", "https://staging.crustdata.com/api-documentation"]
  },
  {
    name: "Ocean.io",
    slug: "ocean",
    aliases: ["ocean"],
    canonicalUrl: "https://ocean.io/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "X-Api-Token header.",
    objects: "Company enrichment, people lookup, discover/search, credit balance",
    rateLimits: "Plan/subscription-specific.",
    pagination: "Yes.",
    risk: "low",
    sources: ["https://docs.ocean.io/", "https://docs.ocean.io/getting-started/authentication", "https://docs.ocean.io/getting-started/rate-limiting", "https://docs.ocean.io/getting-started/pagination"]
  },
  {
    name: "Common Room",
    canonicalUrl: "https://www.commonroom.io/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Core API Bearer JWT; MCP OAuth 2.1.",
    objects: "Contacts/members, organizations, activities, segments, custom fields, signals",
    rateLimits: "Documented 429 responses; numeric limits unknown.",
    pagination: "Unknown.",
    risk: "high",
    sources: ["https://www.commonroom.io/docs/using-common-room/mcp-server/", "https://www.commonroom.io/developers/", "https://api.commonroom.io/docs/community.html"]
  },
  {
    name: "6sense",
    canonicalUrl: "https://6sense.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Authorization: Token API token.",
    objects: "Company identification, company firmographics, lead scoring, people enrichment, people search, API credits",
    rateLimits: "General 100/min; People Enrichment 20 qps; People Search 10 qps.",
    pagination: "pageNo/pageSize; People Search max pageSize 1000.",
    risk: "low",
    sources: ["https://api.6sense.com/docs/"]
  },
  {
    name: "Demandbase",
    canonicalUrl: "https://www.demandbase.com/",
    status: "needs-review",
    score: 4,
    surfaces: ["announced", "unknown", "yes", "yes", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "JWT Bearer token.",
    objects: "Companies, contacts/people, exports, imports, users/admin, subscriptions/webhooks, credit usage, buying groups",
    rateLimits: "Admin API 90/min per HTTP method; other quotas vary.",
    pagination: "Unknown.",
    risk: "high",
    review: "Confirm MCP endpoint and access model; public search surfaced an official support title but not the full MCP docs.",
    sources: ["https://developer.demandbase.com/docs/demandbase-apis", "https://developer.demandbase.com/docs/b2b-overview", "https://developer.demandbase.com/docs/authenticating-with-the-apis", "https://developer.demandbase.com/docs/user-admin-overview"]
  },
  {
    name: "Warmly",
    canonicalUrl: "https://www.warmly.ai/",
    status: "needs-review",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "MCP OAuth; External API auth not found in public docs.",
    objects: "Warm visitors, warm accounts, identified visitors, company context",
    rateLimits: "MCP 60/min free, 120/min paid; shared monthly credits.",
    pagination: "Unknown.",
    risk: "low",
    review: "Need canonical External API reference beyond launch post.",
    sources: ["https://www.warmly.ai/launches/warmly-mcp-and-api-are-live", "https://warmly.ai/"]
  },
  {
    name: "RB2B",
    canonicalUrl: "https://www.rb2b.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "no", "unknown", "no", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Outbound webhook URL; required auth must be embedded as query params.",
    objects: "Identified visitors, company-only profiles, visitor page views, LinkedIn URL, first/last name",
    rateLimits: "Unknown.",
    pagination: "Not applicable for webhook docs.",
    risk: "low",
    review: "Confirm whether partner/OEM API suite has accessible docs.",
    sources: ["https://support.rb2b.com/en/articles/8976614-setup-guide-webhook", "https://support.rb2b.com/en/articles/10551225-how-rb2b-s-integrations-work", "https://www.rb2b.com/partner"]
  },
  {
    name: "Vector.co",
    slug: "vector",
    aliases: ["vector"],
    canonicalUrl: "https://www.vector.co/",
    status: "needs-review",
    score: 1,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Unknown.",
    objects: "Contacts, audiences, segments, site visitors, ad clicks, ad-platform syncs",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Public docs expose product/help content, not source-backed API/CLI/MCP docs.",
    sources: ["https://www.vector.co/", "https://learn.vector.co/articles/5614506055-using-ad-platforms-with-vector"]
  },
  {
    name: "Supabase",
    canonicalUrl: "https://supabase.com",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "MCP OAuth/PAT; Management API Bearer PAT; project APIs use anon/publishable or secret/service keys plus JWT/RLS.",
    objects: "Projects, organizations, databases/tables, migrations, auth users, storage buckets, edge functions, logs, branches",
    rateLimits: "Management API returns X-RateLimit-* headers; Auth has documented endpoint quotas and 429s.",
    pagination: "Management API offset pagination; PostgREST range/limit-offset patterns.",
    risk: "high",
    sources: ["https://supabase.com/docs/guides/getting-started/mcp", "https://supabase.com/docs/reference/api/getting-started", "https://supabase.com/docs/guides/auth/rate-limits"]
  },
  {
    name: "Pinecone",
    canonicalUrl: "https://www.pinecone.io",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "unknown", "yes", "yes", "yes", "unknown", "yes"],
    auth: "API key in Api-Key header; MCP/CLI require Pinecone API key.",
    objects: "Indexes, namespaces, records/vectors, metadata, assistants, rerank models, inference models",
    rateLimits: "Documented data-plane/index limits; 429 on namespace/API operation limits; exponential backoff recommended.",
    pagination: "Vector ID list uses pagination_token; default 100 IDs.",
    risk: "high",
    sources: ["https://docs.pinecone.io/guides/operations/mcp-server", "https://docs.pinecone.io/reference/cli/command-reference", "https://docs.pinecone.io/reference/api/authentication", "https://docs.pinecone.io/reference/list", "https://docs.pinecone.io/reference/api/database-limits"]
  },
  {
    name: "Snowflake",
    canonicalUrl: "https://www.snowflake.com",
    status: "needs-review",
    score: 4,
    surfaces: ["yes", "yes", "yes", "unknown", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "REST APIs use key-pair JWT, OAuth, or PAT; managed MCP uses OAuth 2.0 and Snowflake RBAC.",
    objects: "Databases, schemas, tables, warehouses, roles, users, grants, stages, tasks, Cortex Search/Analyst/Agents",
    rateLimits: "General REST thresholds not clearly published; Cortex REST has RPM/TPM limits and 429 behavior.",
    pagination: "REST resources commonly use token/pageToken-style pagination; SQL API has async result/result-part handling.",
    risk: "high",
    review: "Confirm whether Snowflake publishes first-party OpenAPI specs for REST/SQL APIs and whether docs expose llms.txt.",
    sources: ["https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp", "https://docs.snowflake.com/en/developer-guide/snowflake-cli/command-reference/overview", "https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/reference", "https://docs.snowflake.com/en/developer-guide/sql-api/index", "https://github.com/Snowflake-Labs/mcp"]
  },
  {
    name: "BigQuery",
    aliases: ["google bigquery"],
    canonicalUrl: "https://cloud.google.com/bigquery",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "no", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "OAuth 2.0/IAM/ADC/service accounts; MCP uses OAuth/IAM and does not accept API keys.",
    objects: "Projects, datasets, tables, jobs, routines, models, row access policies, tabledata",
    rateLimits: "BigQuery quotas apply across console, bq CLI, REST, libraries, and MCP; core API requests/day unlimited but method/data limits apply.",
    pagination: "REST list/tabledata methods use maxResults and pageToken; bq supports page_token.",
    risk: "high",
    sources: ["https://docs.cloud.google.com/bigquery/docs/use-bigquery-mcp", "https://cloud.google.com/bigquery/docs/reference/bq-cli-reference", "https://cloud.google.com/bigquery/docs/reference/rest/", "https://docs.cloud.google.com/bigquery/docs/paging-results", "https://docs.cloud.google.com/bigquery/quotas", "https://docs.cloud.google.com/bigquery/docs/reference/libraries-overview"]
  },
  {
    name: "Exa",
    aliases: ["exa.ai"],
    canonicalUrl: "https://exa.ai",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "x-api-key header or Authorization: Bearer; MCP can run hosted or npm with EXA_API_KEY.",
    objects: "Search results, contents, similar pages, answers, research tasks, websets, enrichments",
    rateLimits: "Default API limits include /search 10 QPS, /contents 100 QPS, /answer 10 QPS, legacy research 15 concurrent tasks.",
    pagination: "Search is limit/numResults oriented; no general cursor pagination found in core search docs.",
    risk: "medium",
    sources: ["https://exa.ai/docs/reference/exa-mcp", "https://exa.ai/docs/reference/rate-limits", "https://exa.ai/docs/reference/openapi-spec", "https://exa.ai/docs/sdks/python-sdk", "https://exa.ai/docs/reference/search"]
  },
  {
    name: "Firecrawl",
    canonicalUrl: "https://www.firecrawl.dev",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
    auth: "Authorization: Bearer fc-* API key; CLI login/browser/API-key/env auth; self-host can bypass cloud key.",
    objects: "Scrape jobs, crawl jobs, batch scrape jobs, search results, extracted structured data, maps",
    rateLimits: "Plan-based rate and concurrency limits; 429 on exceeded limits; CLI status shows concurrency and credits.",
    pagination: "Crawl and batch scrape status can return next URL; SDKs can auto-paginate with controls.",
    risk: "medium",
    sources: ["https://docs.firecrawl.dev/api-reference/v2-introduction", "https://docs.firecrawl.dev/cli", "https://github.com/firecrawl/firecrawl-mcp-server", "https://docs.firecrawl.dev/sdks/overview", "https://raw.githubusercontent.com/firecrawl/firecrawl-docs/main/api-reference/v2-openapi.json"]
  },
  {
    name: "Apify",
    canonicalUrl: "https://apify.com",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "unknown", "yes", "yes", "yes", "yes"],
    auth: "Bearer API token; hosted MCP supports OAuth or Bearer token.",
    objects: "Actors, actor runs, tasks, datasets, key-value stores, request queues, webhooks, builds",
    rateLimits: "API global 250,000 req/min; default per-resource 60 req/s; MCP 30 req/s/user; X-RateLimit-Limit returned.",
    pagination: "Offset/limit common; request queues use cursor/exclusiveStartId; endpoints cap max limit.",
    risk: "high",
    sources: ["https://docs.apify.com/platform/integrations/mcp", "https://docs.apify.com/api/v2/", "https://docs.apify.com/cli", "https://docs.apify.com/api/v2/getting-started", "https://docs.apify.com/api/v2/request-queue-requests-get"]
  },
  {
    name: "Google Places API",
    slug: "google-places",
    aliases: ["places api", "google places"],
    canonicalUrl: "https://developers.google.com/maps/documentation/places/web-service",
    status: "needs-review",
    score: 3,
    surfaces: ["no", "no", "yes", "no", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API key or OAuth token; billing must be enabled; field masks required/recommended for cost control.",
    objects: "Places, place photos, autocomplete sessions, text search, nearby search, place details",
    rateLimits: "Places usage limit shown as 6,000 QPM; billable SKU and quota controls in Cloud Console.",
    pagination: "Text/Nearby Search use pageSize/pageToken with nextPageToken; usually 20/page, max 60 results/query.",
    risk: "low",
    review: "Decide whether to include community MCP wrappers or only official Google REST/client-library docs.",
    sources: ["https://developers.google.com/maps/documentation/places/web-service/reference/rest", "https://developers.google.com/maps/documentation/places/web-service/usage-and-billing", "https://developers.google.com/maps/faq", "https://developers.google.com/maps/documentation/places/web-service/text-search", "https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places/searchText"]
  },
  {
    name: "Logo.dev",
    slug: "logodev",
    aliases: ["logo.dev"],
    canonicalUrl: "https://www.logo.dev",
    status: "needs-review",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "yes", "no", "yes", "unknown", "yes"],
    auth: "Image API uses publishable token query param; Describe/Brand API uses Bearer secret key.",
    objects: "Domain logos, brand search results, stock ticker logos, crypto logos, brand describe records",
    rateLimits: "Monthly request limits by plan; no per-second/minute burst limit; proactive/soft enforcement.",
    pagination: "No pagination found for image lookup; search/describe pagination unclear.",
    risk: "low",
    review: "Confirm whether an official OpenAPI spec exists and whether third-party MCP listings are acceptable.",
    sources: ["https://docs.logo.dev/", "https://www.logo.dev/docs/platform/rate-limits", "https://docs.logo.dev/logo-images/get", "https://docs.logo.dev/describe/introduction", "https://mcp.pipedream.com/app/logo_dev", "https://composio.dev/toolkits/logo_dev/framework/ai-sdk"]
  },
  {
    name: "unavatar.io",
    slug: "unavatar",
    aliases: ["unavatar"],
    canonicalUrl: "https://unavatar.io",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "yes", "no", "no", "no", "unknown", "unknown", "yes"],
    auth: "Anonymous GET requests allowed; PRO uses x-api-key header.",
    objects: "Avatar/logo lookups by provider, provider routes, cached image redirects, JSON metadata",
    rateLimits: "Anonymous 25 requests/day/IP; authenticated origin 50 free/day then metered; x-rate-limit-* headers.",
    pagination: "None; single-resource lookup API.",
    risk: "low",
    review: "Confirm current official repo/docs alignment and whether lack of MCP/OpenAPI is acceptable for catalog inclusion.",
    sources: ["https://unavatar.io/docs", "https://github.com/microlinkhq/unavatar"]
  },
  {
    name: "Gong",
    canonicalUrl: "https://www.gong.io/",
    status: "needs-review",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "API access key/secret as basic auth; OAuth for published apps.",
    objects: "Calls, transcripts, users, scorecards, stats, Engage flows",
    rateLimits: "3 calls/sec and 10,000 calls/day; 429 with Retry-After.",
    pagination: "Cursor, commonly 100 records/page.",
    risk: "medium",
    review: "Confirm whether Gong exposes a downloadable OpenAPI spec or official SDK behind authenticated developer docs.",
    sources: ["https://help.gong.io/docs/receive-access-to-the-api", "https://help.gong.io/docs/what-the-gong-api-provides", "https://visioneers.gong.io/developers-79/gong-api-pagination-limit-1036"]
  },
  {
    name: "Sybill",
    canonicalUrl: "https://www.sybill.ai/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "MCP OAuth; REST API key/rate-limit shared with MCP.",
    objects: "Conversations, deals, accounts, participants, CRM metadata",
    rateLimits: "60/min, 1,000/hour, 10,000/day per API key.",
    pagination: "Cursor, limit 1-50.",
    risk: "low",
    sources: ["https://api.sybill.ai/docs/mcp.html", "https://api.sybill.ai/docs/rate-limiting.html"]
  },
  {
    name: "Fathom",
    canonicalUrl: "https://fathom.ai/",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "unknown", "yes", "yes", "yes", "unknown", "yes"],
    auth: "X-Api-Key header; user-scoped access to owned/shared/team meetings.",
    objects: "Meetings, recordings, teams, team members, webhooks, transcripts, summaries, action items",
    rateLimits: "60 calls per 60-second window.",
    pagination: "List endpoints expose item collections; cursor/next semantics need endpoint-level verification.",
    risk: "medium",
    sources: ["https://docs.fathom.ai/", "https://developers.fathom.ai/quickstart", "https://developers.fathom.ai/webhooks", "https://developers.fathom.ai/sdks/available-methods", "https://github.com/Dot-Fun/fathom-mcp"]
  },
  {
    name: "Fireflies.ai",
    slug: "fireflies",
    aliases: ["fireflies", "firefiles"],
    canonicalUrl: "https://fireflies.ai/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "no", "yes", "no", "yes", "unknown", "yes"],
    auth: "MCP OAuth or bearer API key; GraphQL bearer token.",
    objects: "Transcripts, summaries, users, usergroups, channels, soundbites, meetings",
    rateLimits: "Free/Pro 50/day; Business/Enterprise 60/min; endpoint-specific limits exist.",
    pagination: "GraphQL list/query pagination; MCP search/fetch patterns.",
    risk: "high",
    sources: ["https://docs.fireflies.ai/getting-started/mcp-configuration", "https://docs.fireflies.ai/mcp-tools/overview", "https://docs.fireflies.ai/introduction", "https://docs.fireflies.ai/fundamentals/limits", "https://docs.fireflies.ai/graphql-api/mutation/delete-transcript", "https://github.com/props-labs/fireflies-mcp"]
  },
  {
    name: "Granola",
    canonicalUrl: "https://www.granola.ai/",
    status: "needs-review",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "yes", "unknown", "unknown", "unknown", "yes"],
    auth: "MCP browser OAuth only; API keys for Business/Enterprise API.",
    objects: "Notes, transcripts, folders, action items, decisions, calendar-linked meetings",
    rateLimits: "Unknown; API key count limit recently raised to 25/workspace and 25/user.",
    pagination: "Unknown.",
    risk: "low",
    review: "Find the public Granola API reference for exact endpoints, pagination, and rate limits.",
    sources: ["https://docs.granola.ai/help-center/sharing/integrations/mcp", "https://docs.granola.ai/article/integrations-with-granola", "https://docs.granola.ai/help-center/changelog"]
  },
  {
    name: "Pylon",
    canonicalUrl: "https://usepylon.com/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "MCP OAuth; REST bearer API token.",
    objects: "Users, contacts, accounts, issues, messages, teams, KB articles, audit logs, training data",
    rateLimits: "Often 60/min read, 20/min write/search; endpoint-specific.",
    pagination: "Cursor; audit logs max page size 999; search limits up to 1000 on users.",
    risk: "high",
    sources: ["https://support.usepylon.com/articles/2407390554-connecting-to-the-pylon-mcp-server", "https://docs.usepylon.com/pylon-docs/developer/api/api-reference/users", "https://support.usepylon.com/articles/1797406754-exporting-audit-logs-to-a-siem", "https://docs.arcade.dev/en/resources/integrations/customer-support/pylon-api"]
  },
  {
    name: "Intercom",
    canonicalUrl: "https://www.intercom.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "MCP OAuth or bearer token; REST access token/OAuth app auth.",
    objects: "Conversations, contacts, tickets, admins, articles, companies, segments, tags, messages",
    rateLimits: "Default 10,000 API calls/min/app and 25,000/min/workspace.",
    pagination: "Cursor; starting_after for search/list tools.",
    risk: "high",
    sources: ["https://developers.intercom.com/docs/guides/mcp", "https://developers.intercom.com/docs/references/rest-api/api.intercom.io", "https://developers.intercom.com/docs/references/2.13/rest-api/errors/rate-limiting", "https://github.com/intercom/intercom-node"]
  },
  {
    name: "Zendesk",
    canonicalUrl: "https://www.zendesk.com/",
    status: "needs-review",
    score: 4,
    surfaces: ["announced", "yes", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "OAuth, API token/basic for Support APIs; product-specific auth for Messaging/Sunshine.",
    objects: "Tickets, users, organizations, groups, comments, help center articles, conversations, custom objects",
    rateLimits: "Plan/endpoint-specific; headers expose remaining/reset; account-wide spike cap 100,000/min.",
    pagination: "Cursor recommended; offset still supported but limited.",
    risk: "high",
    review: "Locate official Zendesk MCP server docs/config once public after the May 2026 announcement.",
    sources: ["https://developer.zendesk.com/api-reference/", "https://developer.zendesk.com/api-reference/ticketing/introduction/", "https://developer.zendesk.com/documentation/conversations/references/openapi-specification/", "https://developer.zendesk.com/api-reference/introduction/rate-limits/", "https://developer.zendesk.com/api-reference/introduction/pagination/", "https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/", "https://www.techradar.com/pro/zendesk-becomes-the-latest-to-adopt-mcp-to-futureproof-customers-in-the-ai-first-era"]
  },
  {
    name: "Google Drive",
    slug: "google-drive",
    aliases: ["drive", "google workspace drive"],
    canonicalUrl: "https://drive.google.com/",
    status: "needs-review",
    score: 4,
    surfaces: ["announced", "yes", "yes", "no", "unknown", "yes", "yes", "yes", "yes"],
    auth: "OAuth 2.0 scopes; service accounts/domain-wide delegation for workspace admin scenarios.",
    objects: "Files, folders, permissions, comments, revisions, drives, changes, channels",
    rateLimits: "12,000 queries/60s and 12,000 queries/60s/user; 403/429 with backoff.",
    pagination: "pageToken/nextPageToken.",
    risk: "high",
    review: "Confirm public endpoint/config and availability tier for Google's managed Drive/Workspace MCP server.",
    sources: ["https://workspaceupdates.googleblog.com/2026/05/agent-tools-and-security-updates-for-workspace-developers.html", "https://developers.google.com/workspace/drive/api/guides/limits", "https://developers.google.com/drive/api/v2/reference/files/list", "https://developers.google.com/workspace/drive/api/guides/downloads", "https://cloud.google.com/docs/discovery/apis", "https://workspacemcp.com/"]
  },
  {
    name: "Notion",
    canonicalUrl: "https://www.notion.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "unknown", "yes", "yes", "yes", "yes", "yes"],
    auth: "OAuth or internal integration token; MCP OAuth; CLI browser login/keychain or token env.",
    objects: "Pages, blocks, databases/data sources, users, comments, files, workers",
    rateLimits: "Average 3 requests/sec per connection; 429 with Retry-After.",
    pagination: "Cursor, start_cursor, has_more, page_size.",
    risk: "high",
    sources: ["https://developers.notion.com/guides/mcp/mcp", "https://developers.notion.com/cli/get-started/overview", "https://developers.notion.com/reference/request-limits", "https://developers.notion.com/reference/intro", "https://github.com/makenotion/notion-sdk-js"]
  },
  {
    name: "Obsidian",
    canonicalUrl: "https://obsidian.md/",
    status: "published",
    score: 4,
    surfaces: ["no", "yes", "yes", "yes", "unknown", "yes", "yes", "yes", "yes"],
    auth: "Local vault access; official CLI enabled in desktop app; community REST/MCP uses local bearer API key.",
    objects: "Vaults, files/notes, frontmatter, tags, commands, active file, periodic notes, search results",
    rateLimits: "None documented; local app/plugin performance bound.",
    pagination: "Not central; file/search result handling varies by CLI/plugin.",
    risk: "high",
    sources: ["https://obsidian.md/cli", "https://obsidian.md/help/cli", "https://docs.obsidian.md/Home", "https://community.obsidian.md/plugins/obsidian-local-rest-api", "https://github.com/MarkusPfundstein/mcp-obsidian", "https://github.com/cyanheads/obsidian-mcp-server"]
  },
  {
    name: "Webflow",
    canonicalUrl: "https://developers.webflow.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "OAuth 2.0 apps, site/workspace tokens, bearer access tokens.",
    objects: "Sites, pages, collections, collection_items, forms, assets, users, webhooks",
    rateLimits: "Documented per API/app/token in official docs.",
    pagination: "limit/offset style on list endpoints.",
    risk: "high",
    sources: ["https://developers.webflow.com/", "https://developers.webflow.com/mcp/reference/overview", "https://developers.webflow.com/data/reference/rest-introduction", "https://developers.webflow.com/llms.txt", "https://www.npmjs.com/package/@webflow/webflow-cli"]
  },
  {
    name: "Framer",
    canonicalUrl: "https://www.framer.com/developers/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "no", "yes", "no", "yes", "yes", "yes", "unknown", "yes"],
    auth: "Framer API tokens / auth token for Server API.",
    objects: "Sites, projects, pages, redirects, collection_items, folders, locales",
    rateLimits: "Unknown.",
    pagination: "Cursor-style pagination appears in Server API list flows.",
    risk: "medium",
    review: "Confirm whether any Framer MCP is officially maintained; public official docs clearly cover Server API/SDK but not an official MCP install surface.",
    sources: ["https://www.framer.com/developers/server-api-introduction", "https://www.framer.com/developers/server-api-quick-start", "https://www.framer.com/llms.txt", "https://www.npmjs.com/package/framer-api"]
  },
  {
    name: "Pendo",
    canonicalUrl: "https://support.pendo.io/hc/en-us/articles/38099922926875-Pendo-developer-documentation",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "Integration/API key for API; OAuth/service-account style setup for MCP.",
    objects: "Visitors, accounts, guides, segments, reports, features, events, metadata, product_areas",
    rateLimits: "No clear public numeric limits found; docs mention aggregation/report constraints.",
    pagination: "Mixed/endpoint-specific; MCP docs describe paginated product-area retrieval.",
    risk: "high",
    sources: ["https://support.pendo.io/hc/en-us/articles/38099922926875-Pendo-developer-documentation", "https://support.pendo.io/hc/en-us/articles/41102236924955", "https://engageapi.pendo.io/", "https://agent.pendo.io/"]
  },
  {
    name: "PostHog",
    canonicalUrl: "https://posthog.com/docs",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
    auth: "Personal API keys, project API keys/tokens, OAuth for app integrations.",
    objects: "Projects, persons, events, insights, feature_flags, cohorts, experiments, surveys, dashboards, session_recordings",
    rateLimits: "Documented by endpoint/class in API docs; 429 on excess.",
    pagination: "Cursor/next-link pagination in API responses.",
    risk: "high",
    sources: ["https://posthog.com/docs/api", "https://posthog.com/docs/model-context-protocol", "https://posthog.com/docs/data/posthog-cli", "https://posthog.com/docs/libraries", "https://posthog.com/llms.txt"]
  },
  {
    name: "HockeyStack",
    canonicalUrl: "https://docs.hockeystack.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "unknown", "unknown", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "Tracking script/API token surfaces; server API auth not clearly public.",
    objects: "Users, accounts, events, properties, journeys, attribution, campaigns, reports",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "unknown",
    review: "Public docs expose tracking/SDK and AI-docs surfaces, but a stable public server API reference, auth model, pagination, and rate limits need confirmation.",
    sources: ["https://docs.hockeystack.com/", "https://docs.hockeystack.com/llms.txt", "https://hockeystack.com/"]
  },
  {
    name: "Chili Piper",
    canonicalUrl: "https://help.chilipiper.com/hc/en-us",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "API keys / bearer auth; MCP connected through Chili Piper auth.",
    objects: "Users, prospects, meetings, routers, queues, teams, workspaces, calendars, distributions",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific; not enough public evidence for a global model.",
    risk: "high",
    sources: ["https://help.chilipiper.com/hc/en-us", "https://help.chilipiper.com/hc/en-us/articles/360053000654-Chili-Piper-API", "https://help.chilipiper.com/hc/en-us/articles/41186534180115-Chili-Piper-MCP-Server", "https://help.chilipiper.com/hc/en-us/articles/41262073337363-MCP-Server-Tools"]
  },
  {
    name: "Cal.com",
    slug: "calcom",
    aliases: ["cal.com"],
    canonicalUrl: "https://cal.com/docs",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
    auth: "API keys, OAuth apps, platform/managed-user auth.",
    objects: "Users, teams, event_types, bookings, availability, calendars, webhooks, organizations, routing_forms",
    rateLimits: "Documented in API docs; limits vary by auth/product surface.",
    pagination: "limit/offset and cursor-like list behavior depending on endpoint/version.",
    risk: "high",
    sources: ["https://cal.com/docs", "https://cal.com/docs/api-reference/v2", "https://cal.com/docs/mcp", "https://cal.com/docs/llms.txt", "https://www.npmjs.com/package/@calcom/cli", "https://www.npmjs.com/package/@calcom/platform-libraries"]
  },
  {
    name: "Calendly",
    canonicalUrl: "https://developer.calendly.com/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "unknown", "yes", "unknown", "yes"],
    auth: "OAuth 2.0 and personal access tokens.",
    objects: "Users, organizations, event_types, scheduled_events, invitees, memberships, webhooks, routing_forms",
    rateLimits: "Documented; 429 on excess.",
    pagination: "count/page_token style pagination with next_page_token.",
    risk: "medium",
    sources: ["https://developer.calendly.com/", "https://developer.calendly.com/api-docs", "https://developer.calendly.com/getting-started", "https://developer.calendly.com/how-to-embed-calendly", "https://help.calendly.com/hc/en-us/articles/31575909095447-Calendly-MCP-Server"]
  },
  {
    name: "Gamma",
    canonicalUrl: "https://developers.gamma.app/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "no", "yes", "no", "yes", "unknown", "yes"],
    auth: "API key / bearer token; MCP uses Gamma auth setup.",
    objects: "Generations, presentations, themes, folders, exports, images",
    rateLimits: "Documented mostly through usage/credits and 429 behavior; no stable global numeric limit found.",
    pagination: "Limited list endpoints; pagination model not fully clear.",
    risk: "medium",
    sources: ["https://developers.gamma.app/", "https://developers.gamma.app/docs/introduction", "https://developers.gamma.app/docs/api-reference", "https://developers.gamma.app/docs/mcp-server", "https://developers.gamma.app/llms.txt"]
  },
  {
    name: "n8n",
    canonicalUrl: "https://n8n.io",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "unknown", "no", "yes", "yes", "yes"],
    auth: "API key header X-N8N-API-KEY; MCP OAuth2 or bearer token; enterprise scoped API keys.",
    objects: "Workflows, executions, credentials, projects, tags, variables, data tables, users, MCP-exposed workflows/tools",
    rateLimits: "No clear public REST API rate limit found.",
    pagination: "Cursor pagination; default 100, max 250, nextCursor.",
    risk: "high",
    sources: ["https://docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server/", "https://docs.n8n.io/api/api-reference/", "https://docs.n8n.io/api/authentication/", "https://docs.n8n.io/api/pagination/", "https://docs.n8n.io/api/n8n-cli/"]
  },
  {
    name: "Zapier",
    canonicalUrl: "https://zapier.com",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "Zapier account OAuth/connectors; SDK client credentials; Workflow API bearer auth; app connections managed by Zapier.",
    objects: "MCP servers, tools/actions, apps, connections/accounts, zaps/workflows, triggers, action catalog",
    rateLimits: "Workflow API: 60 req/min per IP or 150 req/min per partner; Zap/webhook limits vary by surface.",
    pagination: "Product-specific; app/action APIs vary, embedded triggers expose their own API contract.",
    risk: "high",
    sources: ["https://help.zapier.com/hc/en-us/articles/36265392843917-Use-Zapier-MCP-with-your-client", "https://docs.zapier.com/mcp/clients", "https://docs.zapier.com/sdk", "https://docs.zapier.com/sdk/using-the-cli", "https://docs.zapier.com/platform/build-cli/overview", "https://docs.zapier.com/powered-by-zapier/api-reference/rate-limiting", "https://docs.zapier.com/llms.txt"]
  },
  {
    name: "Make",
    aliases: ["make.com"],
    canonicalUrl: "https://www.make.com",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "User authentication token with scopes for REST API; MCP via OAuth or MCP bearer token.",
    objects: "Scenarios, executions, connections, data stores, webhooks/hooks, teams, organizations, templates",
    rateLimits: "Core 60/min, Pro 120/min, Teams 240/min, Enterprise 1000/min per organization.",
    pagination: "pg[limit], pg[offset], pg[sortBy], pg[sortDir].",
    risk: "high",
    sources: ["https://developers.make.com/mcp-server", "https://help.make.com/make-mcp-server", "https://developers.make.com/api-documentation", "https://developers.make.com/api-documentation/getting-started/rate-limiting", "https://developers.make.com/api-documentation/pagination-sorting-filtering/pagination-and-sorting", "https://help.make.com/the-make-cli-is-now-live", "https://developers.make.com/api-documentation/client-libraries"]
  },
  {
    name: "Relevance AI",
    canonicalUrl: "https://relevanceai.com",
    status: "published",
    score: 4,
    surfaces: ["yes", "unknown", "yes", "unknown", "yes", "yes", "yes", "unknown", "yes"],
    auth: "MCP OAuth per project; API trigger uses Authorization API key; SDK uses RAI_API_KEY/region/project.",
    objects: "Agents, tools, knowledge, workforces, conversations, agent runs, integrations, projects",
    rateLimits: "Plan-based; exact public limits not listed. MCP sync trigger timeout 120s; async trigger/poll pattern available.",
    pagination: "Not clearly documented for public supported API; MCP has async polling for long-running runs.",
    risk: "high",
    sources: ["https://relevanceai.com/docs/integrations/mcp/programmatic-gtm/mcp-server", "https://relevanceai.com/docs/build/agents/build-your-agent/agent-triggers/api-trigger", "https://relevanceai.com/docs/build/agents/build-your-agent/agent-triggers/api", "https://relevanceai.com/docs/llms.txt", "https://github.com/RelevanceAI/relevanceai", "https://github.com/RelevanceAI/relevance-js-sdk"]
  },
  {
    name: "AI Ark",
    canonicalUrl: "https://www.ai-ark.com",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "API key, based on official find/create API key docs.",
    objects: "API endpoints, leads/enrichment workflows, Clay enrichment integration",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm the canonical product URL and whether AI Ark has public endpoint-level API docs beyond the help-center API collection.",
    sources: ["https://help.ai-ark.com/en/collections/30-api"]
  },
  {
    name: "Default",
    canonicalUrl: "https://www.default.com",
    status: "needs-review",
    score: 1,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Unknown.",
    objects: "Likely leads, forms, routing, scheduling, CRM handoff; needs confirmation",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "unknown",
    review: "No reliable public Default developer/API/MCP docs surfaced; confirm whether docs are private/customer-only.",
    sources: ["https://www.default.com"]
  },
  {
    name: "Census",
    canonicalUrl: "https://www.getcensus.com",
    status: "published",
    score: 4,
    surfaces: ["no", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Bearer tokens; workspace API keys for Workspace APIs, personal access tokens for Organization APIs.",
    objects: "Syncs, sources, destinations, models, datasets, workspaces, organizations, custom destinations",
    rateLimits: "Management API limits not clearly published; custom destination default is 50,000 req/sec, overrideable with X-RateLimit-Limit.",
    pagination: "page, per_page max 100, order; pagination object with next_page/last_page; legacy next URL being phased out.",
    risk: "high",
    sources: ["https://developers.getcensus.com/api-reference/introduction/authorization", "https://developers.getcensus.com/api-reference/introduction/pagination", "https://www.postman.com/getcensus/census-api/overview", "https://developers.getcensus.com/custom-destinations/destination-spec"]
  },
  {
    name: "Crunchbase API",
    slug: "crunchbase",
    aliases: ["crunchbase"],
    canonicalUrl: "https://about.crunchbase.com/api-guide/",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Token API key via user_key query parameter or X-cb-user-key header; enterprise/application license required for full API.",
    objects: "Organizations, people, funding rounds, acquisitions, searches, autocomplete, entity lookups",
    rateLimits: "200 calls per minute.",
    pagination: "Search API uses keyset pagination; default/max behavior varies, docs note 50 items/page when limit omitted.",
    risk: "low",
    sources: ["https://data.crunchbase.com/docs/using-the-api", "https://data.crunchbase.com/v4-legacy/docs/using-search-apis", "https://support.crunchbase.com/hc/en-us/articles/32319290128019-Crunchbase-API-FAQ", "https://about.crunchbase.com/api-guide/"]
  },
  {
    name: "PitchBook API",
    slug: "pitchbook",
    aliases: ["pitchbook"],
    canonicalUrl: "https://pitchbook.com",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Standalone API contract; API key or authentication token; access via PitchBook Direct Data/API team.",
    objects: "Companies/entities, financing details, deal stock information, VC exit predictor data, relational endpoints",
    rateLimits: "Unknown/publicly gated.",
    pagination: "Unknown/publicly gated.",
    risk: "low",
    review: "Endpoint overview, pagination, rate limits, and machine-readable specs appear customer-gated; confirm via PitchBook API access.",
    sources: ["https://pitchbook.com/help/PitchBook-api"]
  },
  {
    name: "Trigify",
    canonicalUrl: "https://help.trigify.io",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "unknown", "unknown", "no", "no", "unknown"],
    auth: "API key via x-api-key; MCP endpoint https://api.trigify.io/mcp.",
    objects: "Searches, search_results, workflows, custom_signals, sources, posts, integrations",
    rateLimits: "429 documented; exact public numeric limits not found.",
    pagination: "Unknown.",
    risk: "high",
    sources: ["https://help.trigify.io/articles/1607275-api-docs-scalar-access", "https://help.trigify.io/articles/4012161-cli-and-agent-skills", "https://help.trigify.io/en/articles/7220879-claude-mcp-integration"]
  },
  {
    name: "BuiltWith",
    canonicalUrl: "https://api.builtwith.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "unknown", "yes", "yes", "no", "no", "yes"],
    auth: "API key as KEY query param or Authorization: API/Bearer depending API/MCP surface.",
    objects: "Domains, technologies, technology_lists, relationships, changes, redirects, keywords, trends, products, trust, credits",
    rateLimits: "Domain API documents max 8 concurrent and 10 requests/second, with 429 format.",
    pagination: "Bulk jobs use async job_id/status/result; list pagination varies by endpoint.",
    risk: "medium",
    sources: ["https://api.builtwith.com/", "https://api.builtwith.com/domain-api", "https://github.com/builtwith/builtwith-mcp", "https://github.com/builtwith/builtwith-official-cli", "https://api.builtwith.com/llms.txt"]
  },
  {
    name: "TheirStack",
    slug: "theirstack",
    aliases: ["theirstack", "their stack"],
    canonicalUrl: "https://theirstack.com/en/docs/api-reference",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "unknown", "no", "no", "yes"],
    auth: "Bearer API key; MCP supports OAuth or Authorization: Bearer.",
    objects: "Jobs, companies, technographics, buying_intents, catalogs, company_lists, saved_searches, webhooks, credits",
    rateLimits: "Free 4/sec, 10/min, 50/hour, 400/day on core search endpoints; paid 4/sec.",
    pagination: "page+limit and offset+limit; optional include_total_results.",
    risk: "medium",
    sources: ["https://theirstack.com/en/docs/api-reference", "https://theirstack.com/en/docs/api-reference/authentication", "https://theirstack.com/en/docs/api-reference/pagination", "https://theirstack.com/en/docs/api-reference/rate-limit", "https://theirstack.com/en/docs/mcp", "https://theirstack.com/en/product-updates/2026-02-13-mcp-server"]
  },
  {
    name: "Sumble",
    canonicalUrl: "https://docs.sumble.com/api",
    status: "needs-review",
    score: 4,
    surfaces: ["yes", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Bearer API key from account API keys.",
    objects: "Organizations, people, jobs, account_lists, technologies, credits",
    rateLimits: "10 requests/second per user across endpoints; 429 on limit.",
    pagination: "limit/offset on people and likely other find endpoints.",
    risk: "medium",
    review: "Confirm whether Sumble publishes OpenAPI/llms.txt and any official SDK or CLI.",
    sources: ["https://docs.sumble.com/api", "https://docs.sumble.com/api/people", "https://sumble.com/integrations/mcp", "https://docs.sumble.com/trust-and-security"]
  },
  {
    name: "Braze",
    canonicalUrl: "https://www.braze.com/docs/api/basics",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "unknown", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "Scoped REST API key in request header; MCP recommends dedicated read-only API key plus REST/base URL.",
    objects: "Users, campaigns, canvases, segments, catalogs, templates, content_blocks, subscription_groups, events, purchases, KPIs",
    rateLimits: "Default 250,000 requests/hour for most APIs; endpoint-specific exceptions.",
    pagination: "Endpoint-specific; export/list endpoints support list-style retrieval.",
    risk: "high",
    sources: ["https://www.braze.com/docs/api/basics", "https://www.braze.com/docs/api/api_limits", "https://www.braze.com/resources/articles/introducing-braze-mcp-server", "https://www.braze.com/resources/articles/braze-mcp-claude-desktop", "https://www.braze.com/dev-portal"]
  },
  {
    name: "ActiveCampaign",
    canonicalUrl: "https://developers.activecampaign.com/reference/overview",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "Account API URL + API key; MCP private remote URL from account Developer settings.",
    objects: "Contacts, tags, lists, custom_fields, field_values, campaigns, automations, deals, pipelines, activities, groups",
    rateLimits: "5 requests/second/account; 429 includes Retry-After and rate headers.",
    pagination: "limit/offset, page-number, and cursor patterns documented.",
    risk: "high",
    sources: ["https://developers.activecampaign.com/reference/overview", "https://developers.activecampaign.com/page/mcp", "https://developers.activecampaign.com/page/mcp-available-tools/", "https://developers.activecampaign.com/reference/rate-limits", "https://github.com/ActiveCampaign/activecampaign-api-php"]
  },
  {
    name: "Mailchimp",
    canonicalUrl: "https://mailchimp.com/developer/marketing/docs/fundamentals/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "API key or OAuth 2; Basic or Bearer auth; data-center-specific base URL.",
    objects: "Audiences, contacts/members, campaigns, reports, automations, ecommerce stores/orders/products, batches, webhooks, transactional messages",
    rateLimits: "10 simultaneous Marketing API connections/user; 120-second timeout; batch endpoint recommended for long-running work.",
    pagination: "count/offset plus partial-response capabilities.",
    risk: "high",
    sources: ["https://mailchimp.com/developer/marketing/docs/fundamentals/", "https://mailchimp.com/developer/marketing/docs/errors/", "https://mailchimp.com/developer/transactional/guides/how-to-use-mailchimps-transactional-messaging-mcp/", "https://github.com/mailchimp", "https://mailchimp.com/developer/release-notes/new-client-libraries-marketing-transactional-apis/"]
  },
  {
    name: "ZeroBounce",
    canonicalUrl: "https://www.zerobounce.net/docs/api-dashboard",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "API key; regional endpoints for US/EU/global.",
    objects: "Validations, batch_validations, credits, API_usage, email_finder, activity_data, domain_search",
    rateLimits: "Examples include validate 80,000 requests/10s, getcredits 80,000/hour, getapiusage 800/hour, batch validate 30/min up to 100 emails/request; temporary blocks on abuse.",
    pagination: "Mostly job/batch/download patterns; normal pagination not prominent.",
    risk: "medium",
    sources: ["https://www.zerobounce.net/docs/api-dashboard", "https://www.zerobounce.net/docs/zerobounce-api-wrappers", "https://zerobounce-mcp.com/"]
  },
  {
    name: "NeverBounce",
    canonicalUrl: "https://developers.neverbounce.com/v4.1/reference",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "API key; standard API should not be exposed client-side.",
    objects: "Account, single_verification, jobs, POE/widget, job_results",
    rateLimits: "Dashboard-configurable throttling; bulk guidance says avoid more than 10 jobs per 100k items/hour and 25MB payload cap.",
    pagination: "Job create/parse/start/status/result flow; result pagination endpoint details need endpoint-level scrape.",
    risk: "medium",
    sources: ["https://developers.neverbounce.com/v4.1/reference", "https://developers.neverbounce.com/v4.1/reference/jobs-create", "https://github.com/NeverBounce/NeverBounceApi-Go", "https://zapier.com/mcp/neverbounce", "https://composio.dev/toolkits/neverbounce/framework/open-ai-agents-sdk"]
  }
];

const surfaceKeys = [
  "officialMcp",
  "officialCli",
  "officialApi",
  "openApiSpec",
  "llmsDocs",
  "officialSdk",
  "communityMcp",
  "communityCli",
  "communitySdkOrIntegration"
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\.io\b/g, "")
    .replace(/\.ai\b/g, "")
    .replace(/\.dev\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleFromUrl(url) {
  if (!url || url === "unknown") return "Unknown source";
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "") + parsed.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
}

function splitObjects(value) {
  if (!value || value === "Unknown.") return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function renderDocs(entry, slug, id, surfaces) {
  const sourceLines = entry.sources.map((url) => `- ${url}`).join("\n");
  const review = entry.status === "needs-review"
    ? `\n## Needs Human Review\n\n${entry.review || "This profile has unresolved documentation questions."}\n`
    : "";

  return `# ${entry.name}

## Agent Summary

${entry.name} is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: ${entry.score}/5.

## Available Surfaces

- Official MCP: ${surfaces.officialMcp}
- Official CLI: ${surfaces.officialCli}
- Official API: ${surfaces.officialApi}
- OpenAPI/spec: ${surfaces.openApiSpec}
- llms/AI docs: ${surfaces.llmsDocs}
- Official SDK: ${surfaces.officialSdk}
- Community MCP: ${surfaces.communityMcp}
- Community CLI: ${surfaces.communityCli}
- Community SDK / integration: ${surfaces.communitySdkOrIntegration}

## Auth

${entry.auth}

## Main Objects

${splitObjects(entry.objects).map((object) => `- ${object}`).join("\n") || "- Unknown"}

## Rate Limits

${entry.rateLimits}

## Pagination

${entry.pagination}

## Agent Caveats

- Destructive action risk: ${entry.risk}.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
${review}
## Sources

${sourceLines}
`;
}

const registryPath = path.join(root, "registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const existingById = new Map((registry.tools || []).map((tool) => [tool.id, tool]));

for (const entry of entries) {
  const slug = entry.slug || slugify(entry.name);
  const id = `/gtm/${slug}`;
  const dir = path.join(root, "tools", slug);
  fs.mkdirSync(dir, { recursive: true });

  const surfaces = Object.fromEntries(surfaceKeys.map((key, index) => [key, entry.surfaces[index] || "unknown"]));
  const tool = {
    id,
    name: entry.name,
    slug,
    status: entry.status,
    aliases: entry.aliases || [],
    lastVerified,
    agentReadinessScore: entry.score,
    canonicalUrl: entry.canonicalUrl,
    surfaces,
    auth: {
      notes: entry.auth
    },
    objects: splitObjects(entry.objects),
    rateLimits: entry.rateLimits,
    pagination: entry.pagination,
    destructiveActionRisk: entry.risk,
    notes: [
      "Generated from parallel specialist scout findings.",
      "Use source links to refresh endpoint-level details before implementation."
    ],
    needsHumanReview: entry.status === "needs-review",
    reviewReason: entry.review || ""
  };

  writeJson(path.join(dir, "tool.json"), tool);
  fs.writeFileSync(path.join(dir, "docs.md"), renderDocs(entry, slug, id, surfaces));
  writeJson(path.join(dir, "sources.json"), entry.sources.map((url) => ({
    title: titleFromUrl(url),
    url,
    type: "source"
  })));

  existingById.set(id, {
    id,
    name: entry.name,
    slug,
    status: entry.status,
    path: `tools/${slug}`,
    aliases: entry.aliases || [],
    agentReadinessScore: entry.score,
    lastVerified
  });
}

const existingOrder = (registry.tools || []).map((tool) => tool.id);
const newOrder = entries.map((entry) => `/gtm/${entry.slug || slugify(entry.name)}`);
const orderedIds = [...existingOrder, ...newOrder.filter((id) => !existingOrder.includes(id))];

registry.tools = orderedIds.map((id) => existingById.get(id)).filter(Boolean);
registry.updatedAt = lastVerified;
writeJson(registryPath, registry);

console.log(`Imported ${entries.length} scout findings.`);
console.log(`Registry now contains ${registry.tools.length} tools.`);
