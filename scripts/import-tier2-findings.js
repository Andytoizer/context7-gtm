import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const lastVerified = "2026-05-28";

const entries = [
  {
    name: "Zoho CRM",
    slug: "zoho-crm",
    aliases: ["zoho"],
    canonicalUrl: "https://www.zoho.com/crm/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "OAuth 2.0 access tokens with Zoho account data-center-specific domains.",
    objects: "Leads, Contacts, Accounts, Deals, Tasks, Events, Calls, Campaigns, Products, Quotes, Sales Orders, Invoices, custom modules",
    rateLimits: "Edition and API-credit based limits; concurrency and daily credit limits vary by org and endpoint.",
    pagination: "page/per_page for many list APIs; bulk/read APIs use job-based retrieval.",
    risk: "high",
    sources: ["https://www.zoho.com/crm/developer/docs/api/v8/", "https://www.zoho.com/crm/developer/docs/api/v8/oauth-overview.html", "https://www.zoho.com/crm/developer/docs/server-side-sdks.html", "https://www.zoho.com/crm/developer/docs/api/v8/api-limits.html"]
  },
  {
    name: "Microsoft Dynamics 365 Sales",
    slug: "microsoft-dynamics-365-sales",
    aliases: ["dynamics 365 sales", "dynamics crm"],
    canonicalUrl: "https://www.microsoft.com/en-us/dynamics-365/products/sales",
    status: "published",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "Microsoft Entra ID OAuth 2.0 tokens with Dataverse permissions and security roles.",
    objects: "Accounts, Contacts, Leads, Opportunities, Activities, Cases, Products, Quotes, Orders, Invoices, custom tables",
    rateLimits: "Dataverse service protection limits apply by user, organization, and time window; 429 responses include retry guidance.",
    pagination: "OData nextLink and paging cookies; Dataverse Web API supports $top, $skiptoken, and server-driven paging.",
    risk: "high",
    sources: ["https://learn.microsoft.com/en-us/dynamics365/sales/developer/overview", "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview", "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits", "https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction", "https://github.com/microsoft/PowerPlatformConnectors"]
  },
  {
    name: "Freshsales",
    slug: "freshsales",
    aliases: ["freshworks crm", "freshsales crm"],
    canonicalUrl: "https://www.freshworks.com/crm/sales/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Freshsales API key in Authorization header, scoped to account/domain.",
    objects: "Contacts, Accounts, Deals, Leads, Tasks, Appointments, Notes, Sales Activities, Users, Territories",
    rateLimits: "Plan-based API limits; 429 responses indicate throttling.",
    pagination: "page and per_page parameters on list endpoints.",
    risk: "high",
    sources: ["https://developers.freshworks.com/crm/api/", "https://developers.freshworks.com/crm/api/#authentication", "https://developers.freshworks.com/crm/api/#pagination"]
  },
  {
    name: "Copper",
    canonicalUrl: "https://www.copper.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key and user email headers; OAuth available for integrations.",
    objects: "People, Companies, Opportunities, Tasks, Activities, Projects, Leads, Pipelines, Custom Fields",
    rateLimits: "Public docs describe rate limiting and 429 behavior; exact limits vary by plan and endpoint.",
    pagination: "page_number and page_size style pagination on search/list endpoints.",
    risk: "high",
    sources: ["https://developer.copper.com/", "https://developer.copper.com/requests-and-responses/", "https://developer.copper.com/authentication.html"]
  },
  {
    name: "Nutshell",
    canonicalUrl: "https://www.nutshell.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key with HTTP Basic auth; user-specific access.",
    objects: "Accounts, Contacts, Leads, Activities, Tasks, Products, Users, Pipelines, Custom Fields",
    rateLimits: "Unknown.",
    pagination: "JSON-RPC style pagination and filtering by method.",
    risk: "high",
    sources: ["https://developers.nutshell.com/", "https://developers.nutshell.com/reference"]
  },
  {
    name: "Insightly",
    canonicalUrl: "https://www.insightly.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key in Basic auth; account-specific API access.",
    objects: "Contacts, Organizations, Opportunities, Leads, Projects, Tasks, Events, Notes, Emails, Custom Objects",
    rateLimits: "Plan-based limits with 429 responses when exceeded.",
    pagination: "skip/top style list pagination on REST endpoints.",
    risk: "high",
    sources: ["https://api.insightly.com/v3.1/Help", "https://support.insight.ly/en-us/Knowledge/article/1817/Insightly_API/"]
  },
  {
    name: "Creatio",
    canonicalUrl: "https://www.creatio.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "OAuth 2.0 or Creatio authentication depending product/version and API surface.",
    objects: "Accounts, Contacts, Leads, Opportunities, Activities, Cases, Orders, Products, custom objects",
    rateLimits: "Unknown.",
    pagination: "OData-style pagination and filtering for entity collections.",
    risk: "high",
    review: "Confirm current public API surface and auth model for modern Creatio CRM versus older platform docs.",
    sources: ["https://academy.creatio.com/docs/developer/integrations_and_api", "https://academy.creatio.com/docs/developer/integrations_and_api/data_services/odata"]
  },
  {
    name: "Monday CRM",
    slug: "monday-crm",
    aliases: ["monday sales crm", "monday.com crm"],
    canonicalUrl: "https://monday.com/crm",
    status: "published",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "API token or OAuth app token for monday.com GraphQL API; permissions follow workspace/app scopes.",
    objects: "Boards, Items, Columns, Groups, Updates, Users, Teams, Workspaces, CRM templates, Automations",
    rateLimits: "Complexity, daily, minute, and concurrency limits; GraphQL responses include complexity data.",
    pagination: "Cursor-based pagination with items_page and next_items_page.",
    risk: "high",
    sources: ["https://developer.monday.com/api-reference/docs", "https://developer.monday.com/api-reference/docs/rate-limits", "https://developer.monday.com/api-reference/reference/items-page", "https://developer.monday.com/apps/docs/monday-code-cli", "https://developer.monday.com/apps/docs/mcp"]
  },
  {
    name: "Keap",
    canonicalUrl: "https://keap.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "OAuth 2.0 access tokens for Keap REST API apps.",
    objects: "Contacts, Companies, Tags, Campaigns, Opportunities, Orders, Products, Invoices, Payments, Tasks",
    rateLimits: "Public limits need confirmation; docs reference throttling and OAuth-app usage constraints.",
    pagination: "limit/offset pagination on many list endpoints.",
    risk: "high",
    review: "Confirm current Keap REST API docs, limits, and whether older Infusionsoft references should be treated as legacy.",
    sources: ["https://developer.keap.com/", "https://developer.keap.com/docs/rest/"]
  },
  {
    name: "Teamleader",
    canonicalUrl: "https://www.teamleader.eu/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "OAuth 2.0 authorization code flow with scoped access.",
    objects: "Companies, Contacts, Deals, Activities, Tasks, Invoices, Projects, Users, Custom Fields",
    rateLimits: "Unknown.",
    pagination: "page and size parameters on many list endpoints.",
    risk: "high",
    sources: ["https://developer.teamleader.eu/", "https://developer.teamleader.eu/#/reference/general/api-basics"]
  },
  {
    name: "Hightouch",
    canonicalUrl: "https://hightouch.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API keys and workspace-scoped credentials; CLI uses local/authenticated workspace config.",
    objects: "Models, Syncs, Sources, Destinations, Audiences, Segments, Events, Users, Workspaces",
    rateLimits: "Endpoint-specific limits; 429 behavior should be handled with backoff.",
    pagination: "Cursor or page-style list pagination depending endpoint.",
    risk: "high",
    sources: ["https://hightouch.com/docs/api-reference", "https://hightouch.com/docs/developer-tools/cli", "https://hightouch.com/docs/api-reference/openapi"]
  },
  {
    name: "Fivetran",
    canonicalUrl: "https://www.fivetran.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "API key and secret with Basic auth; OAuth support for selected connector setup flows.",
    objects: "Connectors, Groups, Destinations, Users, Teams, Roles, Webhooks, Logs, Transformations, Certificates",
    rateLimits: "REST API has documented concurrent and per-minute limits; 429 on excess.",
    pagination: "Cursor pagination with next_cursor on list endpoints.",
    risk: "high",
    sources: ["https://fivetran.com/docs/rest-api", "https://fivetran.com/docs/rest-api/getting-started", "https://fivetran.com/docs/cli", "https://github.com/fivetran/mcp-server"]
  },
  {
    name: "Airbyte",
    canonicalUrl: "https://airbyte.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "Bearer tokens for Cloud API; workspace credentials and environment variables for local/OSS.",
    objects: "Workspaces, Sources, Destinations, Connections, Jobs, Streams, Schemas, Connector Definitions",
    rateLimits: "API rate limits vary by deployment/cloud tier; 429 should be retried with backoff.",
    pagination: "limit/offset or tokenized pagination depending API generation/version.",
    risk: "high",
    sources: ["https://reference.airbyte.com/reference/start", "https://docs.airbyte.com/platform/api-documentation", "https://docs.airbyte.com/platform/operator-guides/using-the-airbyte-cli", "https://docs.airbyte.com/platform/mcp-server"]
  },
  {
    name: "dbt Cloud",
    slug: "dbt-cloud",
    aliases: ["dbt"],
    canonicalUrl: "https://www.getdbt.com/product/dbt-cloud",
    status: "needs-review",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "Service tokens or user API tokens; account/project permissions apply.",
    objects: "Accounts, Projects, Environments, Jobs, Runs, Artifacts, Sources, Exposures, Metrics",
    rateLimits: "Rate limits and quotas depend on endpoint and account; retry 429 responses.",
    pagination: "limit/offset pagination for many list endpoints.",
    risk: "high",
    review: "Confirm whether MCP coverage is first-party dbt Labs or community-only for dbt Cloud.",
    sources: ["https://docs.getdbt.com/dbt-cloud/api-v2", "https://docs.getdbt.com/docs/cloud/dbt-cloud-cli-installation", "https://docs.getdbt.com/docs/dbt-cloud-apis/admin-cloud-api"]
  },
  {
    name: "Tray.io",
    slug: "tray",
    aliases: ["tray"],
    canonicalUrl: "https://tray.ai/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "Bearer API tokens for Tray Platform APIs; connector auth varies by service.",
    objects: "Workflows, Solutions, Instances, Authentications, Connectors, Projects, Users, Logs",
    rateLimits: "Endpoint and account-level limits; 429 indicates throttling.",
    pagination: "Cursor or page-style list pagination depending endpoint.",
    risk: "high",
    sources: ["https://developer.tray.io/", "https://developer.tray.io/graphql/", "https://docs.tray.ai/platform/connectors/tray-cli"]
  },
  {
    name: "Workato",
    canonicalUrl: "https://www.workato.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API client tokens and OAuth client credentials for Workato API platform access.",
    objects: "Recipes, Jobs, Connections, Folders, Projects, Packages, Manifests, Users, Roles, Lookup Tables",
    rateLimits: "Account and API endpoint limits apply; 429 responses should be retried.",
    pagination: "Page and per_page list pagination on many endpoints.",
    risk: "high",
    sources: ["https://docs.workato.com/workato-api.html", "https://docs.workato.com/developing-connectors/sdk.html", "https://docs.workato.com/workato-cli.html"]
  },
  {
    name: "Pipedream",
    canonicalUrl: "https://pipedream.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
    auth: "Bearer OAuth/API tokens; connected accounts are managed per app/account.",
    objects: "Workflows, Components, Sources, Connected Accounts, Apps, Projects, Events, Data Stores, MCP Servers",
    rateLimits: "Plan and endpoint-based API limits; 429 on excess.",
    pagination: "Cursor/page-style pagination on API lists.",
    risk: "high",
    sources: ["https://pipedream.com/docs/api/rest/", "https://pipedream.com/docs/cli/", "https://pipedream.com/docs/mcp/", "https://mcp.pipedream.com/"]
  },
  {
    name: "Parabola",
    canonicalUrl: "https://parabola.io/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Unknown for public API; connector auth varies by source/destination.",
    objects: "Flows, Steps, Tables, Runs, Imports, Exports",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm whether Parabola has public API/CLI/MCP docs or only product integrations and webhooks.",
    sources: ["https://parabola.io/", "https://parabola.io/integrations"]
  },
  {
    name: "Saleshandy",
    canonicalUrl: "https://www.saleshandy.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token for public API access.",
    objects: "Prospects, Campaigns, Sequences, Emails, Accounts, Teams, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific list pagination.",
    risk: "high",
    sources: ["https://apidocs.saleshandy.com/"]
  },
  {
    name: "SalesBlink",
    canonicalUrl: "https://salesblink.io/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key for REST access.",
    objects: "Contacts, Campaigns, Tasks, Mailboxes, Templates, Webhooks, Team Members",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific pagination.",
    risk: "high",
    sources: ["https://docs.salesblink.io/"]
  },
  {
    name: "SmartReach.io",
    slug: "smartreach",
    aliases: ["smartreach"],
    canonicalUrl: "https://smartreach.io/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key for REST API.",
    objects: "Prospects, Campaigns, Mailboxes, Teams, Replies, Webhooks, Stats",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific pagination.",
    risk: "high",
    sources: ["https://api.smartreach.io/"]
  },
  {
    name: "Waalaxy",
    canonicalUrl: "https://www.waalaxy.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key or app token depending endpoint/integration.",
    objects: "Prospects, Campaigns, Lists, Messages, LinkedIn actions, Email actions, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific pagination.",
    risk: "high",
    sources: ["https://developers.waalaxy.com/"]
  },
  {
    name: "ReachInbox",
    canonicalUrl: "https://reachinbox.ai/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token.",
    objects: "Campaigns, Leads, Inboxes, Emails, Replies, Analytics, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific pagination.",
    risk: "high",
    sources: ["https://docs.reachinbox.ai/"]
  },
  {
    name: "Emelia",
    canonicalUrl: "https://emelia.io/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token.",
    objects: "Campaigns, Contacts, Companies, Mailboxes, Tasks, Replies, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific pagination.",
    risk: "high",
    sources: ["https://emelia.io/api-doc"]
  },
  {
    name: "La Growth Machine",
    slug: "la-growth-machine",
    aliases: ["lgm"],
    canonicalUrl: "https://www.lagrowthmachine.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key or private app credentials; exact public model needs confirmation.",
    objects: "Leads, Audiences, Campaigns, Sequences, LinkedIn steps, Email steps, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    review: "Confirm canonical public API docs, auth, and rate limits.",
    sources: ["https://lagrowthmachine.com/", "https://intercom.help/lagrowthmachine/en/"]
  },
  {
    name: "QuickMail",
    canonicalUrl: "https://quickmail.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key; exact current API docs need verification.",
    objects: "Prospects, Campaigns, Inboxes, Emails, Tags, Tasks, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    review: "Confirm current QuickMail API docs, pagination, and throttling details.",
    sources: ["https://quickmail.com/", "https://help.quickmail.com/"]
  },
  {
    name: "Outplay",
    canonicalUrl: "https://outplayhq.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token; exact public docs need confirmation.",
    objects: "Prospects, Accounts, Sequences, Tasks, Calls, Emails, Users, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    review: "Confirm official public API reference and whether docs are customer-gated.",
    sources: ["https://outplayhq.com/", "https://support.outplayhq.com/"]
  },
  {
    name: "Autoklose",
    canonicalUrl: "https://www.autoklose.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Unknown.",
    objects: "Contacts, Campaigns, Emails, Templates, Tasks, Teams",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    review: "Confirm whether Autoklose has current public API/CLI/MCP docs.",
    sources: ["https://www.autoklose.com/", "https://help.autoklose.com/"]
  },
  {
    name: "Uptics",
    canonicalUrl: "https://uptics.io/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Unknown.",
    objects: "Contacts, Companies, Campaigns, Outreach, Enrichment, Pipelines",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    review: "Confirm whether Uptics belongs in outbound docs or enrichment, and whether public API docs exist.",
    sources: ["https://uptics.io/"]
  },
  {
    name: "Metadata.io",
    slug: "metadata",
    aliases: ["metadata"],
    canonicalUrl: "https://metadata.io/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key or OAuth depending integration; public auth docs need endpoint-level verification.",
    objects: "Audiences, Campaigns, Accounts, Leads, Ad Channels, Experiments, Reports",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "high",
    sources: ["https://metadata.io/", "https://developers.metadata.io/"]
  },
  {
    name: "RollWorks",
    aliases: ["adroll abm", "rollworks abm"],
    canonicalUrl: "https://www.rollworks.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/OAuth for RollWorks and AdRoll APIs depending product surface.",
    objects: "Accounts, Audiences, Campaigns, Ads, Segments, Reports, Pixels",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "high",
    sources: ["https://developers.nextroll.com/", "https://www.rollworks.com/"]
  },
  {
    name: "PathFactory",
    canonicalUrl: "https://www.pathfactory.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API credentials; customer account permissions apply.",
    objects: "Content Tracks, Assets, Visitors, Accounts, Engagement, Campaigns, Analytics",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://developer.pathfactory.com/", "https://www.pathfactory.com/"]
  },
  {
    name: "Uberflip",
    canonicalUrl: "https://www.uberflip.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key or OAuth/token auth depending API surface.",
    objects: "Hubs, Streams, Items, CTAs, Visitors, Forms, Tags, Analytics",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://developers.uberflip.com/", "https://www.uberflip.com/"]
  },
  {
    name: "Lead Forensics",
    slug: "lead-forensics",
    canonicalUrl: "https://www.leadforensics.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/token; exact public docs should be checked in customer portal.",
    objects: "Visits, Companies, Leads, Website Sessions, Users, CRM Exports",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://www.leadforensics.com/", "https://support.leadforensics.com/"]
  },
  {
    name: "Snitcher",
    canonicalUrl: "https://www.snitcher.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token.",
    objects: "Companies, Visits, Pages, Identified Accounts, Tags, Integrations",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://developers.snitcher.com/", "https://www.snitcher.com/"]
  },
  {
    name: "Dreamdata",
    canonicalUrl: "https://dreamdata.io/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key or warehouse/integration credentials depending surface.",
    objects: "Accounts, Journeys, Touchpoints, Attribution, Revenue, Campaigns, Sources",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://dreamdata.io/", "https://docs.dreamdata.io/"]
  },
  {
    name: "Ruler Analytics",
    slug: "ruler-analytics",
    canonicalUrl: "https://www.ruleranalytics.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/token for reporting/export endpoints.",
    objects: "Visitors, Sessions, Leads, Deals, Revenue, Attribution, Sources, Calls",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://www.ruleranalytics.com/", "https://www.ruleranalytics.com/api/"]
  },
  {
    name: "Influ2",
    canonicalUrl: "https://www.influ2.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Unknown.",
    objects: "Contacts, Accounts, Campaigns, Ads, Engagement, Reports",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm whether Influ2 has public API/CLI/MCP docs or only partner/customer-gated integrations.",
    sources: ["https://www.influ2.com/"]
  },
  {
    name: "Webeo",
    canonicalUrl: "https://www.webeo.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Unknown.",
    objects: "Accounts, Segments, Personalization, Campaigns, Website Experiences, Analytics",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm whether Webeo exposes public API docs or only managed integrations.",
    sources: ["https://www.webeo.com/"]
  },
  {
    name: "Folloze",
    canonicalUrl: "https://www.folloze.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Unknown.",
    objects: "Boards, Content, Audiences, Visitors, Campaigns, Engagement, Analytics",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm public API availability and whether docs are customer-gated.",
    sources: ["https://www.folloze.com/", "https://help.folloze.com/"]
  },
  {
    name: "Front",
    canonicalUrl: "https://front.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "unknown", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "Bearer API token or OAuth; scopes and teammate permissions apply.",
    objects: "Accounts, Contacts, Conversations, Messages, Inboxes, Channels, Tags, Teammates, Comments, Rules",
    rateLimits: "Workspace and endpoint-specific rate limits; 429 responses include retry behavior.",
    pagination: "Cursor pagination with next links for list endpoints.",
    risk: "high",
    sources: ["https://dev.frontapp.com/reference/introduction", "https://dev.frontapp.com/docs/pagination", "https://front.com/blog/front-mcp-server"]
  },
  {
    name: "Help Scout",
    slug: "help-scout",
    aliases: ["helpscout"],
    canonicalUrl: "https://www.helpscout.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "no", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "OAuth 2.0 or API app credentials for Mailbox API and Docs API.",
    objects: "Mailboxes, Conversations, Customers, Threads, Users, Teams, Tags, Workflows, Docs Collections, Articles",
    rateLimits: "Documented per-endpoint and global limits with 429 retry behavior.",
    pagination: "page/size pagination and embedded collection links.",
    risk: "high",
    sources: ["https://developer.helpscout.com/mailbox-api/", "https://developer.helpscout.com/mailbox-api/overview/rate-limiting/", "https://developer.helpscout.com/docs-api/"]
  },
  {
    name: "Freshdesk",
    canonicalUrl: "https://freshdesk.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "no", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "API key with Basic auth or OAuth depending app/integration.",
    objects: "Tickets, Contacts, Companies, Agents, Groups, Conversations, Time Entries, Products, Solutions, Forums",
    rateLimits: "Plan-based API rate limits; 429 with Retry-After.",
    pagination: "page/per_page and cursor pagination for selected endpoints.",
    risk: "high",
    sources: ["https://developers.freshdesk.com/api/", "https://developers.freshdesk.com/api/#ratelimit", "https://developers.freshdesk.com/api/#pagination"]
  },
  {
    name: "Gorgias",
    canonicalUrl: "https://www.gorgias.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "no", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "Basic auth or OAuth app tokens depending integration model.",
    objects: "Tickets, Customers, Messages, Tags, Macros, Rules, Teams, Users, Satisfaction Surveys, Integrations",
    rateLimits: "Endpoint-specific limits and 429 behavior documented in API reference.",
    pagination: "Cursor/limit style pagination on list endpoints.",
    risk: "high",
    sources: ["https://developers.gorgias.com/reference/introduction", "https://developers.gorgias.com/docs/authentication", "https://developers.gorgias.com/docs/pagination"]
  },
  {
    name: "Crisp",
    canonicalUrl: "https://crisp.chat/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "no", "yes", "yes", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "Identifier/key Basic auth or plugin tokens depending API surface.",
    objects: "Websites, Conversations, Messages, People, Contacts, Segments, Operators, Plugins, Campaigns",
    rateLimits: "Public API rate limits exist by route/token; 429 responses should be retried.",
    pagination: "page-number pagination on list endpoints.",
    risk: "high",
    sources: ["https://docs.crisp.chat/references/rest-api/v1/", "https://github.com/crisp-im/node-crisp-api"]
  },
  {
    name: "Tidio",
    canonicalUrl: "https://www.tidio.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API credentials; exact current model needs verification.",
    objects: "Contacts, Conversations, Messages, Operators, Chatbots, Events",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    review: "Confirm current public API docs, auth model, and whether any MCP/CLI wrapper is viable.",
    sources: ["https://www.tidio.com/", "https://help.tidio.com/"]
  },
  {
    name: "Clari Copilot",
    slug: "clari-copilot",
    aliases: ["chorus", "chorus.ai"],
    canonicalUrl: "https://www.clari.com/products/copilot/",
    status: "published",
    score: 3,
    surfaces: ["announced", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API/OAuth model depends on Clari/Chorus customer access and integrations.",
    objects: "Calls, Meetings, Recordings, Transcripts, Deals, Accounts, Contacts, Scorecards",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://www.clari.com/products/copilot/", "https://apidocs.chorus.ai/", "https://www.salesloft.com/company/newsroom/clari-salesloft-forecasting-execution-mcp-server"]
  },
  {
    name: "Avoma",
    canonicalUrl: "https://www.avoma.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "yes", "unknown", "yes"],
    auth: "API token/Bearer auth for Avoma API.",
    objects: "Meetings, Calls, Transcripts, Notes, Users, Contacts, Deals, Scorecards, Topics",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://api.avoma.com/", "https://help.avoma.com/"]
  },
  {
    name: "tl;dv",
    slug: "tldv",
    aliases: ["tldv"],
    canonicalUrl: "https://tldv.io/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer auth; exact docs need confirmation.",
    objects: "Meetings, Recordings, Transcripts, Clips, Notes, Users, Integrations",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm current public API docs, auth, pagination, and rate limits.",
    sources: ["https://tldv.io/", "https://help.tldv.io/"]
  },
  {
    name: "MeetGeek",
    canonicalUrl: "https://meetgeek.ai/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token.",
    objects: "Meetings, Transcripts, Summaries, Highlights, Participants, Teams, Integrations",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://meetgeek.ai/", "https://api.meetgeek.ai/"]
  },
  {
    name: "ZoomInfo",
    canonicalUrl: "https://www.zoominfo.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "OAuth 2.0 client credentials and/or API credentials depending API generation.",
    objects: "Contacts, Companies, Search, Enrichment, Intent, Scoops, Technologies, Org Charts, Exports",
    rateLimits: "Contract and endpoint-specific limits; 429 should be retried.",
    pagination: "page/rpp or cursor patterns depending endpoint.",
    risk: "medium",
    sources: ["https://api-docs.zoominfo.com/", "https://developers.zoominfo.com/"]
  },
  {
    name: "Cognism",
    canonicalUrl: "https://www.cognism.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token for customer API access.",
    objects: "Contacts, Companies, Search, Enrichment, Intent, Lists, Exports",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://www.cognism.com/", "https://docs.cognism.com/"]
  },
  {
    name: "Clearbit",
    canonicalUrl: "https://clearbit.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "yes", "unknown", "no", "yes", "unknown", "unknown", "yes"],
    auth: "Bearer secret key for API/webhook access; newer HubSpot/Breeze paths may differ.",
    objects: "Person enrichment, Company enrichment, Company attributes, Person attributes, Reveal IP-to-company",
    rateLimits: "Soft enrichment limit around 600 requests/min; exact current limits and availability need confirmation.",
    pagination: "Single lookup APIs; batch enrichment is CSV/list based rather than cursor pagination.",
    risk: "medium",
    review: "Clearbit is now HubSpot/Breeze-adjacent and docs are partly legacy; confirm current new-customer API availability for Enrichment vs Reveal.",
    sources: ["https://clearbit.com/platform/enrichment", "https://help.clearbit.com/hc/en-us/categories/360000913214-APIs", "https://help.clearbit.com/hc/en-us/articles/115015390748-What-Counts-as-an-API-Request", "https://help.clearbit.com/hc/en-us/articles/5975301365655-What-Enrichment-Attributes-Does-Clearbit-Return", "https://help.clearbit.com/hc/en-us/articles/360051664114-What-is-the-Reveal-API"]
  },
  {
    name: "People Data Labs",
    slug: "people-data-labs",
    aliases: ["pdl"],
    canonicalUrl: "https://www.peopledatalabs.com/",
    status: "published",
    score: 5,
    surfaces: ["unknown", "yes", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "API key in X-Api-Key header or query parameter depending client.",
    objects: "Person, Company, Enrichment, Search, Bulk Enrichment, Autocomplete, Cleaner, Usage",
    rateLimits: "Plan-based requests and concurrency; 429 on exceeded limits.",
    pagination: "scroll_token for search; batch jobs for bulk.",
    risk: "medium",
    sources: ["https://docs.peopledatalabs.com/", "https://docs.peopledatalabs.com/docs/authentication", "https://docs.peopledatalabs.com/docs/rate-limits", "https://github.com/peopledatalabs/peopledatalabs-python"]
  },
  {
    name: "Seamless.AI",
    slug: "seamless",
    aliases: ["seamless ai"],
    canonicalUrl: "https://www.seamless.ai/",
    status: "needs-review",
    score: 2,
    surfaces: ["unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Unknown; likely customer/API-token gated.",
    objects: "Contacts, Companies, Search, Enrichment, Lists",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm whether Seamless.AI has public API docs or only private/integration access.",
    sources: ["https://www.seamless.ai/", "https://help.seamless.ai/"]
  },
  {
    name: "LeadIQ",
    canonicalUrl: "https://leadiq.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token for partner/customer API access.",
    objects: "Prospects, Accounts, Enrichment, Lists, Sequences, Integrations, Usage",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://developer.leadiq.com/", "https://leadiq.com/"]
  },
  {
    name: "Kaspr",
    canonicalUrl: "https://www.kaspr.io/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token; exact docs need confirmation.",
    objects: "Contacts, Companies, Enrichment, Lists, Exports, Credits",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm current official API docs, rate limits, and pagination.",
    sources: ["https://www.kaspr.io/", "https://help.kaspr.io/"]
  },
  {
    name: "SignalHire",
    canonicalUrl: "https://www.signalhire.com/",
    status: "published",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key for REST API.",
    objects: "Candidate profiles, Contact lookup, Company lookup, Search, Credits",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://www.signalhire.com/api"]
  },
  {
    name: "Datagma",
    canonicalUrl: "https://datagma.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key.",
    objects: "Email finder, Phone finder, LinkedIn enrichment, Company enrichment, Profile enrichment, Credits",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://docs.datagma.com/", "https://datagma.com/"]
  },
  {
    name: "BetterContact",
    slug: "bettercontact",
    canonicalUrl: "https://www.bettercontact.rocks/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token.",
    objects: "Enrichment jobs, Contacts, Emails, Phone numbers, Credits, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Job/batch result retrieval patterns.",
    risk: "medium",
    sources: ["https://docs.bettercontact.rocks/", "https://www.bettercontact.rocks/"]
  },
  {
    name: "Enrow",
    canonicalUrl: "https://www.enrow.io/",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key/Bearer token; exact docs need confirmation.",
    objects: "Contacts, Companies, Emails, Phone numbers, Waterfall enrichment, Credits",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm official API docs, auth, limits, and pagination.",
    sources: ["https://www.enrow.io/", "https://docs.enrow.io/"]
  },
  {
    name: "Icypeas",
    canonicalUrl: "https://www.icypeas.com/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "unknown", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "API key.",
    objects: "Email search, Email verification, Domain search, Batch jobs, Credits",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://app.icypeas.com/api-docs", "https://www.icypeas.com/"]
  },
  {
    name: "Iterable",
    canonicalUrl: "https://iterable.com/",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API key or JWT-enabled API key; header auth preferred.",
    objects: "Users, Events, Templates, Campaigns, Journeys, Lists, Catalogs, Exports, Message Types",
    rateLimits: "Endpoint-specific; applied per project, API key, or organization; 429 with exponential backoff.",
    pagination: "Endpoint-specific; API reference includes pagination objects/fields.",
    risk: "high",
    sources: ["https://support.iterable.com/hc/en-us/articles/41044692130196-Getting-Started-with-Iterable-s-API", "https://api.iterable.com/api/docs"]
  },
  {
    name: "Adobe Marketo Engage",
    slug: "marketo",
    aliases: ["marketo"],
    canonicalUrl: "https://business.adobe.com/products/marketo/adobe-marketo.html",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "yes", "unknown", "unknown", "yes", "unknown", "yes"],
    auth: "LaunchPoint API-only user; OAuth access token sent as Authorization Bearer.",
    objects: "Leads, Persons, Activities, Lists, Companies, Opportunities, Programs, Campaigns, Assets, Forms, Email Templates",
    rateLimits: "50,000 calls/day default, 100 calls/20 seconds, 10 concurrent calls.",
    pagination: "nextPageToken for lead/activity-style reads; endpoint-specific bulk/export paging.",
    risk: "high",
    sources: ["https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/rest-api", "https://developer.adobe.com/marketo-apis/api/mapi", "https://github.com/CDataSoftware/marketo-mcp-server-by-cdata"]
  },
  {
    name: "Salesforce Account Engagement",
    slug: "pardot",
    aliases: ["pardot", "salesforce pardot"],
    canonicalUrl: "https://www.salesforce.com/marketing/b2b-automation/",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "no", "unknown", "unknown", "yes"],
    auth: "Salesforce OAuth access token plus Account Engagement business unit context/domain.",
    objects: "Prospects, Accounts, Campaigns, Lists, List Memberships, Custom Fields, Visitor Activities, Forms, Emails",
    rateLimits: "Daily by edition: 25k Growth, 50k Plus, 100k Advanced/Premium; 5 concurrent requests.",
    pagination: "v5 collection pagination via next-page style URLs/tokens; v3/v4 use older query patterns.",
    risk: "high",
    sources: ["https://developer.salesforce.com/docs/marketing/pardot/guide/overview"]
  },
  {
    name: "Drip",
    canonicalUrl: "https://www.drip.com/",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "Private API key via Basic auth; OAuth2/Bearer required for public integrations.",
    objects: "Accounts, Subscribers, Campaigns, Workflows, Events, Tags, Forms, Broadcasts, Conversions, Webhooks",
    rateLimits: "3,600 individual requests/hour; 50 batch requests/hour; batch payloads up to 1,000 records.",
    pagination: "page parameter with meta.page, count, total_pages, total_count.",
    risk: "high",
    sources: ["https://developer.drip.com/", "https://github.com/GravityKit/drip-mcp-server"]
  },
  {
    name: "Campaign Monitor",
    slug: "campaign-monitor",
    canonicalUrl: "https://www.campaignmonitor.com/",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "OAuth2 preferred for multi-account integrations; API key via Basic auth for internal/testing use.",
    objects: "Account, Clients, Campaigns, Journeys, Lists, Segments, Subscribers, Templates, Transactional, Webhooks",
    rateLimits: "Transactional endpoints expose X-RateLimit headers; broader numeric limits not clearly published.",
    pagination: "Paged endpoints use endpoint-specific page/page-size style parameters.",
    risk: "high",
    sources: ["https://www.campaignmonitor.com/api/", "https://www.campaignmonitor.com/api/v3-3/getting-started/", "https://github.com/campaignmonitor/createsend-php"]
  },
  {
    name: "SendGrid",
    canonicalUrl: "https://sendgrid.com/",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "yes", "yes", "yes"],
    auth: "API key in Authorization Bearer header; scoped API keys supported.",
    objects: "Mail Send, Contacts, Lists, Segments, Single Sends, Templates, Suppressions, Webhooks, Domains, IPs, Subusers, Stats",
    rateLimits: "Endpoint-specific refresh windows; X-RateLimit-Limit/Remaining/Reset headers; 429 on exhaustion.",
    pagination: "limit/offset for many GET resources, Link header where batched.",
    risk: "high",
    sources: ["https://www.twilio.com/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication", "https://www.twilio.com/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/rate-limits", "https://github.com/Garoth/sendgrid-mcp"]
  },
  {
    name: "Resend",
    canonicalUrl: "https://resend.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "no", "yes"],
    auth: "API key in Authorization Bearer header; direct HTTP requires User-Agent.",
    objects: "Emails, Batches, Domains, Audiences, Contacts, Broadcasts, Templates, Webhooks, API Keys, Logs",
    rateLimits: "Default 5 requests/second per team; 429 on exceed; increase available by request.",
    pagination: "Cursor-based on supported list endpoints.",
    risk: "high",
    sources: ["https://www.resend.com/docs/api-reference/introduction", "https://resend.com/docs/cli", "https://resend.com/changelog/mcp", "https://github.com/resend/mcp-send-email"]
  },
  {
    name: "Loops",
    canonicalUrl: "https://loops.so/",
    status: "needs-review",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "yes", "yes", "unknown", "no", "yes"],
    auth: "API key in Authorization Bearer header; CLI uses LOOPS_API_KEY or keyring.",
    objects: "Contacts, Contact Properties, Mailing Lists, Events, Transactional Emails, Campaigns, Email Messages, Themes, Components, Uploads",
    rateLimits: "10 requests/second per team; x-ratelimit headers; 429 on exceed.",
    pagination: "Endpoint-specific; inspect official OpenAPI for exact list parameters.",
    risk: "high",
    review: "Confirm this entry should target Loops.so email platform; separate useLoops.io MCP docs appear to describe a different agent/workspace product.",
    sources: ["https://loops.so/docs/api-reference/intro", "https://loops.so/docs/cli", "https://loops.so/docs/llms.txt", "https://app.loops.so/openapi.json"]
  },
  {
    name: "Ortto",
    canonicalUrl: "https://ortto.com/",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "yes"],
    auth: "Custom private API key via X-Api-Key header; regional API hosts.",
    objects: "Account, People, Organizations, Audiences, Custom Fields, Activities, Tags, Campaigns",
    rateLimits: "Professional 10 req/s, Business 30 req/s, Enterprise 30 req/s default; IP and bad-request limiters also apply.",
    pagination: "limit/offset in POST query bodies for retrieval endpoints such as person/get.",
    risk: "high",
    sources: ["https://help.ortto.com/a-223-developer-guide", "https://help.ortto.com/a-250-api-reference", "https://help.ortto.com/a-235-rate-limits"]
  },
  {
    name: "Vero",
    canonicalUrl: "https://www.getvero.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "Track API auth_token parameter per request; HTTPS required.",
    objects: "Users, Customers, Identities, Tags, Events, Subscriptions, Campaigns, Templates, Webhooks",
    rateLimits: "Unknown.",
    pagination: "Unknown for Track API; Campaigns REST API is preview and needs verification.",
    risk: "high",
    review: "Public docs clearly cover Track REST API, but rate limits, pagination, and Campaigns REST API preview coverage need confirmation before publishing broad agent actions.",
    sources: ["https://www.getvero.com/", "https://vero-c561507b.mintlify.app/api-reference/track/overview", "https://vero-c561507b.mintlify.app/developer-docs/overview", "https://help.getvero.com/llms.txt"]
  },
  {
    name: "Owler",
    canonicalUrl: "https://www.owler.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "yes", "unknown", "no", "unknown", "unknown", "unknown", "yes"],
    auth: "Legacy docs show Basic Auth; current Data Licensing/API appears sales-gated/API-key based.",
    objects: "Companies, Competitors, Firmographics, Funding, Acquisitions, News, Contacts",
    rateLimits: "Legacy docs: most endpoints 100 requests/hour.",
    pagination: "Unknown.",
    risk: "low",
    review: "Which Owler API surface is current: legacy docs.owler.cloud Basic Auth, or sales-gated Meltwater/Owler Data Licensing API?",
    sources: ["https://www.owler.com/", "https://www.owler.com/data-licensing", "https://docs.owler.cloud/api/requests.html", "https://docs.owler.cloud/api/auth.html", "https://central.ballerina.io/ballerinax/owler/latest"]
  },
  {
    name: "Similarweb",
    canonicalUrl: "https://www.similarweb.com/",
    status: "needs-review",
    score: 4,
    surfaces: ["announced", "no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "Admin-generated API keys tied to account permissions and user credit allowances.",
    objects: "Websites, Apps, Traffic Metrics, Engagement Metrics, Keywords, Referrals, Audiences, Batch Reports, Capabilities, Credits",
    rateLimits: "REST: 10 requests/second/account; Batch: 20 pending requests/user.",
    pagination: "limit, offset, sort, asc on many aggregated endpoints.",
    risk: "low",
    review: "Similarweb mentions/developed MCP in company materials, but public setup docs were not found; confirm availability before marking official_mcp yes.",
    sources: ["https://docs.similarweb.com/api-v5/support-and-faq", "https://developers.similarweb.com/docs/rate-limit", "https://developers.similarweb.com/docs/authentication", "https://ir.similarweb.com/financials/all-sec-filings/content/0001842731-25-000049/0001842731-25-000049.pdf"]
  },
  {
    name: "Semrush",
    canonicalUrl: "https://www.semrush.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "no", "unknown", "unknown", "yes"],
    auth: "API key for APIs; MCP supports OAuth 2.1 by default and API-key header for some clients.",
    objects: "Domains, Keywords, Backlinks, Competitors, Traffic Trends, Projects, Site Audits, Listings, Map Rank Campaigns",
    rateLimits: "Unit-based consumption; Trends API includes 10,000 requests/month by default; endpoint/report costs vary.",
    pagination: "Endpoint/report-specific line limits and result sizing.",
    risk: "medium",
    sources: ["https://developer.semrush.com/api/get-started/api-access/", "https://developer.semrush.com/api/introduction/semrush-mcp/"]
  },
  {
    name: "Ahrefs",
    canonicalUrl: "https://ahrefs.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "unknown", "unknown", "unknown", "unknown"],
    auth: "API keys for REST API; MCP uses consent flow/dedicated MCP-scoped API key, with optional manual MCP key.",
    objects: "Site Explorer, Backlinks, Keywords, SERP Overview, Rank Tracker, Site Audit, Batch Analysis, Brand Radar, Social Media",
    rateLimits: "60 requests/minute default plus dynamic throttling; unit-based monthly plan limits.",
    pagination: "Endpoint-specific rows/limits; plan-specific max rows per MCP/API request.",
    risk: "medium",
    sources: ["https://docs.ahrefs.com/en/api/docs/introduction", "https://docs.ahrefs.com/en/mcp/docs/introduction"]
  },
  {
    name: "SpyFu",
    canonicalUrl: "https://www.spyfu.com/",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "yes", "yes", "no", "unknown", "yes", "yes"],
    auth: "Bearer API key.",
    objects: "Domains, Keywords, Competitors, PPC SERPs, SEO SERPs, Ad History, Ranking History, Projects, Account Usage",
    rateLimits: "Endpoint-specific rolling 1-second RPS limits, roughly 2-1000 RPS; 429 includes Retry-After.",
    pagination: "Endpoint-specific; docs recommend batch/paginate where supported; billing is per row returned.",
    risk: "medium",
    sources: ["https://developer.spyfu.com/", "https://developer.spyfu.com/docs/rate-limits", "https://developer.spyfu.com/docs/api-pricing", "https://help.spyfu.com/en/articles/12195281-how-do-i-get-spyfu-data-in-chatgpt"]
  },
  {
    name: "SerpAPI",
    slug: "serpapi",
    aliases: ["serp api"],
    canonicalUrl: "https://serpapi.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "API key query parameter; hosted MCP URL embeds key; SDKs pass api_key.",
    objects: "Search Engines, Organic Results, Local Results, Ads, Knowledge Graph, Images, News, Shopping, Jobs, Flights, Search Archive",
    rateLimits: "Plan/quota based; docs surface rate-limit errors, but exact default throughput is plan-specific.",
    pagination: "Google-style start offset; serpapi_pagination/next links; async archive retrieval.",
    risk: "low",
    sources: ["https://serpapi.com/search-api", "https://serpapi.com/blog/introducing-serpapis-mcp-server/", "https://github.com/serpapi/mcp-server", "https://serpapi.com/integrations/node", "https://github.com/serpapi/serpapi-python"]
  },
  {
    name: "Serper",
    canonicalUrl: "https://serper.dev/",
    status: "needs-review",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "no", "yes", "yes", "yes"],
    auth: "X-API-KEY header.",
    objects: "Google Search, Organic Results, Knowledge Graph, People Also Ask, Images, News, Maps, Shopping",
    rateLimits: "Plan-specific; Serper homepage says Ultimate credits default to 300 queries/second.",
    pagination: "Likely num/page-style request parameters; official docs should be checked in-app/dashboard.",
    risk: "low",
    review: "Official API docs were not easily crawlable; confirm pagination parameters and exact plan rate limits from Serper dashboard/docs.",
    sources: ["https://serper.dev/", "https://github.com/garylab/serper-mcp-server", "https://pkg.go.dev/github.com/SecKatie/serper-mcp", "https://github.com/topics/serper"]
  },
  {
    name: "Diffbot",
    canonicalUrl: "https://www.diffbot.com/",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "yes", "yes", "yes", "yes", "unknown", "yes"],
    auth: "API token.",
    objects: "Knowledge Graph Entities, Organizations, People, Articles, Products, Events, Extract, Crawl, Bulk, Enhance, Natural Language",
    rateLimits: "Plan-based: Free 5 calls/min, Startup 5 calls/sec, Plus 25 calls/sec, Enterprise 25+/sec.",
    pagination: "size/from-style KG queries and job/search metadata; endpoint-specific.",
    risk: "medium",
    sources: ["https://docs.diffbot.com/", "https://docs.diffbot.com/reference/authentication", "https://www.diffbot.com/pricing", "https://github.com/diffbot", "https://docs.diffbot.com/docs/getting-started-with-diffbot-knowledge-graph"]
  },
  {
    name: "OWOX",
    slug: "owox",
    canonicalUrl: "https://www.owox.com/",
    status: "needs-review",
    score: 3,
    surfaces: ["no", "yes", "unknown", "unknown", "unknown", "unknown", "unknown", "no", "yes"],
    auth: "Self-hosted/local app credentials; storage auth via BigQuery service account JSON or Google OAuth; connector auth varies by source API.",
    objects: "Data Marts, Connectors, Storages, Reports, Semantic Layer Metrics, Schedules, Google Sheets, Data Studio, Warehouse Destinations",
    rateLimits: "No public OWOX platform API rate limit found; inherits connector source API and warehouse limits.",
    pagination: "Connector/source-specific; Data Mart exports handle result delivery to sheets/warehouses.",
    risk: "medium",
    review: "OWOX is primarily an open-source analytics/data-mart platform, not a sales-intelligence data API; confirm whether it belongs in this GTM docs chunk.",
    sources: ["https://www.owox.com/", "https://docs.owox.com/", "https://docs.owox.com/docs/getting-started/quick-start/", "https://docs.owox.com/docs/storages/supported-storages/google-bigquery/", "https://docs.owox.com/apps/owox/publishing/"]
  },
  {
    name: "RudderStack",
    canonicalUrl: "https://www.rudderstack.com/docs/",
    status: "published",
    score: 5,
    surfaces: ["announced", "yes", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API tokens / workspace credentials; CLI config; MCP positioned read-only.",
    objects: "Sources, Destinations, Tracking Plans, Transformations, Pipelines, Audiences, Profiles",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "high",
    sources: ["https://www.rudderstack.com/docs/", "https://www.rudderstack.com/blog/ai-agents-cli-mcp-design-pattern/", "https://github.com/rudderlabs"]
  },
  {
    name: "mParticle",
    slug: "mparticle",
    canonicalUrl: "https://docs.mparticle.com/developers/",
    status: "published",
    score: 4,
    surfaces: ["unknown", "yes", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "OAuth client_credentials for Platform API; platform API key/secret for event/identity APIs.",
    objects: "Workspaces, Apps, Audiences, Feeds, Services, Users, Events, Identities, Data Plans",
    rateLimits: "Documented default service limits; endpoint/class-specific.",
    pagination: "Endpoint-specific JSON wrappers.",
    risk: "high",
    sources: ["https://docs.mparticle.com/developers/", "https://docs.mparticle.com/developers/tools/cli/", "https://docs.mparticle.com/developers/apis/platform/overview/", "https://docs.mparticle.com/developers/server/http", "https://docs.mparticle.com/guides/default-service-limits/"]
  },
  {
    name: "Tealium",
    canonicalUrl: "https://docs.tealium.com/api/v3/",
    status: "needs-review",
    score: 4,
    surfaces: ["announced", "unknown", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "Tealium API auth varies by endpoint; Moments API/MCP for consented profile access.",
    objects: "Profiles, Audiences, Consent State, Events, Tags, Connectors, Moments",
    rateLimits: "Endpoint-specific; 429 on excess.",
    pagination: "Endpoint-specific.",
    risk: "high",
    review: "Confirm whether MCP is generally available or customer/feature-gated.",
    sources: ["https://docs.tealium.com/api/v3/getting-started/request-format/", "https://tealium.com/press-releases/tealium-achieves-mcp-integration-to-fuel-agentic-ai-initiatives/", "https://tealium.com/developer-center/bridging-ai-and-customer-data-platforms-with-mcp/"]
  },
  {
    name: "Segment",
    canonicalUrl: "https://www.twilio.com/docs/segment/api/public-api/",
    status: "published",
    score: 4,
    surfaces: ["yes", "no", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "Bearer Public API token; workspace-owner-created tokens.",
    objects: "Workspaces, Sources, Destinations, Warehouses, Tracking Plans, Catalogs",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "high",
    sources: ["https://www.twilio.com/docs/segment/api/public-api/", "https://www.twilio.com/docs/ai/mcp"]
  },
  {
    name: "Countly",
    canonicalUrl: "https://api.count.ly/reference/rest-api-reference",
    status: "published",
    score: 4,
    surfaces: ["unknown", "no", "yes", "yes", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "Countly API keys; self-hosted/server config controls access.",
    objects: "Apps, Users, Events, Sessions, Cohorts, Dashboards, Funnels, Push, Feedback, Remote Config",
    rateLimits: "Configurable server/API settings; no single public global limit found.",
    pagination: "Endpoint-specific.",
    risk: "high",
    sources: ["https://api.count.ly/reference/rest-api-reference", "https://support.countly.com/hc/en-us/articles/26173669019804", "https://github.com/Countly/countly-server"]
  },
  {
    name: "Matomo",
    canonicalUrl: "https://developer.matomo.org/api-reference",
    status: "published",
    score: 4,
    surfaces: ["yes", "yes", "yes", "unknown", "unknown", "yes", "yes", "unknown", "yes"],
    auth: "token_auth/API token; MCP supports API token or OAuth 2.0.",
    objects: "Sites, Visits, Events, Goals, Segments, Reports, Users, Tag Manager",
    rateLimits: "Self-host/server-dependent; no global SaaS limit found.",
    pagination: "Reporting/API endpoint-specific.",
    risk: "high",
    sources: ["https://developer.matomo.org/api-reference", "https://matomo.org/docs/analytics-api/", "https://matomo.org/guide/apis/mcp-model-context-protocol/", "https://matomo.org/faq/how-to/configure-the-matomo-mcp-server/"]
  },
  {
    name: "Contentsquare",
    canonicalUrl: "https://docs.contentsquare.com/en/",
    status: "needs-review",
    score: 4,
    surfaces: ["announced", "yes", "yes", "unknown", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "OAuth/login for MCP; API credentials for export/data APIs.",
    objects: "Projects, Metrics, Journeys, Funnels, Pages, Errors, Exports, Job Runs, Sessions",
    rateLimits: "Unknown.",
    pagination: "Export APIs use jobs/job_runs/job_run_parts.",
    risk: "medium",
    review: "MCP is closed beta; confirm access requirements and tool scope.",
    sources: ["https://docs.contentsquare.com/en/", "https://support.contentsquare.com/hc/en-us/articles/41563169756945-Model-Context-Protocol-MCP", "https://docs.contentsquare.com/en/api/export/", "https://docs.contentsquare.com/en/csq-sdk-flutter/experience-analytics/contentsquare-cli/"]
  },
  {
    name: "Appcues",
    canonicalUrl: "https://docs.appcues.com/en_US/integration-documents/appcues-mcp-server",
    status: "published",
    score: 5,
    surfaces: ["yes", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "MCP via Appcues login; Public API v2 uses HTTP Basic Auth with API key/secret.",
    objects: "Flows, Experiences, Segments, Goals, NPS, Events, Users, Groups, SDK Keys",
    rateLimits: "429 when throttled; no public numeric limits found.",
    pagination: "Not clearly documented globally.",
    risk: "high",
    sources: ["https://docs.appcues.com/en_US/integration-documents/appcues-mcp-server", "https://api.appcues.com/", "https://docs.appcues.com/en_US/dev-api-data/javascript-api-developer"]
  },
  {
    name: "Userflow",
    canonicalUrl: "https://docs.userflow.com/docs/api",
    status: "published",
    score: 4,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "Bearer environment API keys for Users API; bearer personal API keys for Accounts API.",
    objects: "Users, Groups, Events, Content, Content Versions, Flows, Checklists, Launchers, Members, Invites",
    rateLimits: "Account-plan-dependent per-minute limiter plus concurrency limiter; 429/503 responses.",
    pagination: "List endpoints support ordering/expansion; pagination endpoint-specific.",
    risk: "high",
    sources: ["https://docs.userflow.com/docs/api", "https://docs.userflow.com/docs/dev"]
  },
  {
    name: "Userpilot",
    canonicalUrl: "https://docs.userpilot.com/api-references/overview",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "yes", "yes", "unknown", "unknown", "yes"],
    auth: "API token in Authorization header.",
    objects: "Users, Companies, Events, Segments, Goals, Exports, Imports, Bulk Updates, Deletes",
    rateLimits: "Unknown in surfaced official docs.",
    pagination: "Endpoint-specific/unknown.",
    risk: "high",
    sources: ["https://docs.userpilot.com/api-references/overview", "https://docs.userpilot.com/api-references/http-api"]
  },
  {
    name: "Chameleon",
    canonicalUrl: "https://developers.chameleon.io/",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "REST API auth plus JavaScript API installation; exact token model endpoint-specific.",
    objects: "Users, Companies, Events, Experiences, Tours, Microsurveys, Launchers, Segments, Deliveries, Webhooks",
    rateLimits: "Global 60-120 requests/min; some concurrency limits.",
    pagination: "Bulk/list docs reference limit=500.",
    risk: "high",
    sources: ["https://developers.chameleon.io/", "https://developers.chameleon.io/concepts/rate-limiting", "https://developers.chameleon.io/guides/api/bulk-operations"]
  },
  {
    name: "Mouseflow",
    canonicalUrl: "https://api-docs.mouseflow.com/",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "HTTP Basic Auth with email as username and API key as password; US/EU API endpoints.",
    objects: "Websites, Recordings, Heatmaps, Funnels, Forms, Feedback, Sessions",
    rateLimits: "Unknown.",
    pagination: "Endpoint-specific.",
    risk: "medium",
    sources: ["https://api-docs.mouseflow.com/", "https://js-api-docs.mouseflow.com/"]
  },
  {
    name: "Woopra",
    canonicalUrl: "https://docs.woopra.com/reference/intro-http-apis",
    status: "published",
    score: 3,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "HTTP Basic Auth with App ID and Secret Key.",
    objects: "Projects, Visitors, Profiles, Events, Journeys, Trends, Funnels, Cohorts, Reports, Segments",
    rateLimits: "300/min, 600/hour, 3000/day per project.",
    pagination: "Unknown.",
    risk: "medium",
    sources: ["https://docs.woopra.com/", "https://docs.woopra.com/reference/intro-http-apis"]
  },
  {
    name: "Kissmetrics",
    canonicalUrl: "https://www.kissmetrics.io/lp/api-first-analytics",
    status: "needs-review",
    score: 3,
    surfaces: ["unknown", "unknown", "yes", "yes", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API credentials; exact current auth model needs confirmation in API reference.",
    objects: "Events, Identities, Properties, People, Queries, Exports",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Verify current REST API reference/auth docs beyond the API-first landing page.",
    sources: ["https://www.kissmetrics.io/lp/api-first-analytics", "https://support.kissmetrics.io/docs/installing-kissmetrics-quickstart-guide"]
  },
  {
    name: "Inspectlet",
    canonicalUrl: "https://docs.inspectlet.com/",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API credentials; details in Inspectlet API docs.",
    objects: "Sessions, Recordings, Heatmaps, Forms, Funnels, Tags, Custom Metadata, Users",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Confirm current API auth, pagination, and whether session download/delete endpoints are public.",
    sources: ["https://docs.inspectlet.com/"]
  },
  {
    name: "Crazy Egg",
    slug: "crazy-egg",
    canonicalUrl: "https://support.crazyegg.com/knowledge-base/conversion-tracking-api/",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "unknown", "yes", "unknown", "yes"],
    auth: "Site/domain Conversion Tracking API key.",
    objects: "Conversions, Goals, Sites, Heatmaps, Snapshots, Recordings",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "low",
    review: "Official public API appears limited to conversion tracking; verify whether broader account/report APIs exist.",
    sources: ["https://support.crazyegg.com/knowledge-base/conversion-tracking-api/", "https://zapier.com/mcp/crazy-egg"]
  },
  {
    name: "UserGuiding",
    canonicalUrl: "https://help.userguiding.com/en/articles/4493538-userguiding-user-api",
    status: "needs-review",
    score: 2,
    surfaces: ["no", "no", "yes", "unknown", "unknown", "yes", "unknown", "unknown", "yes"],
    auth: "API Access Token after User Identification is enabled.",
    objects: "Users, User Attributes, User Events, Guide Interactions, Onboarding Material",
    rateLimits: "Unknown.",
    pagination: "Unknown.",
    risk: "medium",
    review: "Interactive API docs should be checked for auth headers, pagination, delete semantics, and rate limits.",
    sources: ["https://help.userguiding.com/en/articles/4493538-userguiding-user-api", "https://help.userguiding.com/en/articles/18839-user"]
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

function renderDocs(entry, surfaces) {
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

const seenIds = new Set();
for (const entry of entries) {
  const id = `/gtm/${entry.slug || slugify(entry.name)}`;
  if (seenIds.has(id)) {
    throw new Error(`Duplicate entry in tier2 importer: ${id}`);
  }
  seenIds.add(id);
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
      "Generated from the Tier 2/Tier 3 parallel specialist scout wave.",
      "Use source links to refresh endpoint-level details before implementation."
    ],
    needsHumanReview: entry.status === "needs-review",
    reviewReason: entry.review || ""
  };

  writeJson(path.join(dir, "tool.json"), tool);
  fs.writeFileSync(path.join(dir, "docs.md"), renderDocs(entry, surfaces));
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

console.log(`Imported ${entries.length} tier2 scout findings.`);
console.log(`Registry now contains ${registry.tools.length} tools.`);
