# Reference Details

Dense retrieval notes for Attio. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/attio
- Slug: attio
- Aliases: attio crm
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

- Auth model: OAuth and API key authentication.
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

- Rate limits: Rate limits: verify in current API docs before implementation.
- Pagination: Pagination: use the documented pagination model for list and search endpoints.
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
- If the returned docs are ambiguous, fetch /tools/attio/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: see `tool.json` and `sources.json`.
- Developer platform (official): https://attio.com/platform/developers
- Docs homepage (official): https://docs.attio.com/docs/overview
- MCP docs (official): https://docs.attio.com/mcp/overview
- REST API overview (official): https://docs.attio.com/rest-api/overview
- Auth docs (official): https://docs.attio.com/rest-api/guides/authentication
- OpenAPI docs (official): https://docs.attio.com/rest-api/endpoint-reference/openapi
- AI docs (official): https://docs.attio.com/sdk/guides/ai
- Official GitHub (official): https://github.com/attio
- Changelog (official): https://attio.com/changelog

## Profile-Derived Operational Context

- Required scopes or permissions: depend on workspace access, app type, and endpoint.
- Key objects: records, objects, lists, attributes, entries, notes, tasks, comments, users/workspaces.
- Key actions: read records, create/update records, manage list entries, query objects, inspect schemas, create notes/tasks, work with attributes.
- Required fields: object-specific and schema-dependent; agents should inspect object/attribute metadata before writes.
- Common field mappings: company, person, email, domain, object ID, record ID, list ID, attribute slug, workspace ID.
- Rate limits: verify in current API docs before implementation.
- Pagination: use the documented pagination model for list and search endpoints.
- Webhooks: supported in the developer platform; confirm event coverage before depending on a webhook.
- Destructive operations: schema changes, record writes, deletions, and bulk operations require caution.
- Pricing/API access constraints: may depend on workspace plan and developer platform access.
- Known caveats: the CLI surfaced in audit is app SDK-oriented, not a broad CRM admin CLI. Agents should prefer MCP/API docs for operational actions.
