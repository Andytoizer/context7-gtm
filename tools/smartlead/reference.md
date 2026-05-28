# Reference Details

Dense retrieval notes for Smartlead. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/smartlead
- Slug: smartlead
- Aliases: smartlead.ai, smartlead outbound
- Agent readiness score: 5/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: no

## Auth And Permission Model

- Auth model: API key, passed as `api_key` query parameter according to the audited docs.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

- Object coverage was not explicit in the source-backed summary. Inspect the official API or MCP docs before object-level operations.

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: Rate limits: verify current API docs before implementation.
- Pagination: Pagination: endpoint-specific; agents should read each endpoint response schema.
- Back off on 429/rate-limit responses and preserve vendor retry headers when available.
- For cursor pagination, store the cursor alongside the source query so retries do not skip or duplicate records.

## Destructive Operation Guardrails

- Treat destructive action risk as high until verified for the exact endpoint/tool.
- Treat deletes, overwrites, permission changes, outbound sending, workflow activation, and schema migrations as high-risk by default.
- Prefer read-only validation first. For writes, require a concrete target record/list/workspace and a bounded operation size.
- Capture before/after IDs and source URLs in downstream audit logs.

## Retrieval Hints

- Good topic strings: `auth`, `mcp`, `api`, `openapi`, `pagination`, `rate limits`, `webhooks`, `objects`, `destructive operations`.
- Ask for the most specific object or action when available, for example `contacts auth`, `campaign pagination`, `workflow activation`, or `record delete caveats`.
- If the returned docs are ambiguous, fetch /tools/smartlead/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: see `tool.json` and `sources.json`.
- API quickstart (official): https://api.smartlead.ai/quickstart
- MCP docs (official): https://helpcenter.smartlead.ai/en/articles/300-smartlead-mcp-server
- Full API docs/auth (official): https://helpcenter.smartlead.ai/en/articles/125-full-api-documentation
- CLI repo (official): https://github.com/Smartlead-Public/smartlead-cli
- Changelog (official): https://api.smartlead.ai/changelog

## Profile-Derived Operational Context

- Required scopes or permissions: API key permissions and workspace/account permissions determine available actions.
- Key objects: leads, campaigns, email accounts, clients, sequences, webhooks, replies, analytics.
- Key actions: create/update leads, add leads to campaigns, manage campaigns, manage email accounts, fetch stats, configure webhooks.
- Required fields: action-specific. Lead import usually requires email and campaign/list context; campaign operations require campaign IDs.
- Common field mappings: email, first name, last name, company name, website/domain, LinkedIn URL, campaign ID, custom fields.
- Rate limits: verify current API docs before implementation.
- Pagination: endpoint-specific; agents should read each endpoint response schema.
- Webhooks: supported; use official webhook docs before implementation.
- Destructive operations: deleting leads, changing campaign membership, modifying sending accounts, and campaign updates can affect live outbound.
- Pricing/API access constraints: API availability and limits may depend on plan/account configuration.
- Known caveats: MCP is SSE-only for now. API auth uses query-param API key rather than OAuth/Bearer, so agents should avoid logging URLs with credentials.
