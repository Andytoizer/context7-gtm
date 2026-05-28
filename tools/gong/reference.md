# Reference Details

Dense retrieval notes for Gong. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/gong
- Slug: gong
- Aliases: none recorded
- Agent readiness score: 4/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth And Permission Model

- Access Key and Access Key Secret via HTTP Basic auth; OAuth apps use Bearer tokens and customer-specific api_base_url_for_customer.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

- Calls
- transcripts
- users
- user settings
- scorecards
- stats
- libraries
- CRM entities
- data privacy
- Engage flows

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: 3 calls/sec and 10,000 calls/day; 429 with Retry-After.
- Pagination: Cursor pagination for list endpoints that return a records field; repeat the same request with the returned cursor.
- Back off on 429/rate-limit responses and preserve vendor retry headers when available.
- For cursor pagination, store the cursor alongside the source query so retries do not skip or duplicate records.

## Destructive Operation Guardrails

- Destructive action risk: medium.
- Official Gong public API docs are rendered with RapiDoc from an OpenAPI 3.0.1 spec endpoint.
- The spec endpoint currently reports Gong API V2 with 55 paths; use the source links to refresh endpoint-level details before implementation.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Prefer read-only validation first. For writes, require a concrete target record/list/workspace and a bounded operation size.
- Capture before/after IDs and source URLs in downstream audit logs.

## Retrieval Hints

- Good topic strings: `auth`, `mcp`, `api`, `openapi`, `pagination`, `rate limits`, `webhooks`, `objects`, `destructive operations`.
- Ask for the most specific object or action when available, for example `contacts auth`, `campaign pagination`, `workflow activation`, or `record delete caveats`.
- If the returned docs are ambiguous, fetch /tools/gong/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: https://www.gong.io/
- help.gong.io/docs/receive-access-to-the-api (official): https://help.gong.io/docs/receive-access-to-the-api
- help.gong.io/docs/what-the-gong-api-provides (official): https://help.gong.io/docs/what-the-gong-api-provides
- help.gong.io/docs/how-to-use-the-gong-developers-hub (official): https://help.gong.io/docs/how-to-use-the-gong-developers-hub
- help.gong.io/docs/create-an-app-for-gong (official): https://help.gong.io/docs/create-an-app-for-gong
- help.gong.io/docs/gong-engage-api-capabilities (official): https://help.gong.io/docs/gong-engage-api-capabilities
- Gong public API docs (official): https://app.gong.io/settings/api/documentation
- Gong OpenAPI spec endpoint (official): https://app.gong.io/ajax/settings/api/documentation/specs?version=
- ksindi/gong-client (community): https://github.com/ksindi/gong-client
- aaronsb/gong-api-client (community): https://github.com/aaronsb/gong-api-client

## Profile-Derived Operational Context

The main profile contains the operational context for this tool. This reference file adds retrieval-oriented guardrails and should be used with the official sources above.
