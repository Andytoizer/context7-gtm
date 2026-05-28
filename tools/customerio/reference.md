# Reference Details

Dense retrieval notes for Customer.io. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/customerio
- Slug: customerio
- Aliases: customer.io, cio
- Agent readiness score: 5/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes

## Auth And Permission Model

- Auth model: API keys, workspace credentials, and endpoint-specific authentication depending on API surface.
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

- Rate limits: Rate limits: verify current API-specific limits before implementation.
- Pagination: Pagination: API-specific; agents should inspect endpoint docs and OpenAPI schemas.
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
- If the returned docs are ambiguous, fetch /tools/customerio/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: see `tool.json` and `sources.json`.
- MCP docs (official): https://docs.customer.io/ai/mcp-server/
- CLI quickstart (official): https://docs.customer.io/ai/cli/get-started/
- CLI reference (official): https://docs.customer.io/ai/cli/reference/
- API/OpenAPI docs (official): https://docs.customer.io/integrations/api/app/
- AI docs usage (official): https://docs.customer.io/ai/use-docs-with-ai/
- Official GitHub (official): https://github.com/customerio
- SDK docs (official): https://docs.customer.io/integrations/sdk/

## Profile-Derived Operational Context

- Required scopes or permissions: depend on workspace, API type, and action. Agents should verify whether they are using Track, App, Pipelines, or another API surface.
- Key objects: customers, events, attributes, segments, campaigns, broadcasts, newsletters, journeys, messages, workspaces, objects, pipelines, sources, destinations.
- Key actions: identify/update customers, track events, manage attributes, query or manage campaigns/messages, work with pipelines, inspect workspace resources.
- Required fields: API-surface-specific. Track calls typically require identifiers and event/customer payloads; App API operations require resource IDs and authenticated workspace context.
- Common field mappings: customer ID, email, anonymous ID, event name, event properties, traits/attributes, campaign ID, message ID, workspace ID.
- Rate limits: verify current API-specific limits before implementation.
- Pagination: API-specific; agents should inspect endpoint docs and OpenAPI schemas.
- Webhooks: supported as a first-party API/docs area.
- Destructive operations: deleting or mutating customers, campaigns, messages, data pipelines, or workspace resources can affect live engagement systems.
- Pricing/API access constraints: available surfaces and limits may depend on workspace plan, enabled products, and credentials.
- Known caveats: Customer.io has multiple API surfaces. Agents must choose the correct surface before acting: Track API for event/customer data, App API for workspace resources, Pipelines APIs for data routing, and Webhooks docs for inbound/outbound event behavior.
