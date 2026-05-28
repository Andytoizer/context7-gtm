# Reference Details

Dense retrieval notes for n8n. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/n8n
- Slug: n8n
- Aliases: none recorded
- Agent readiness score: 5/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth And Permission Model

- API key header X-N8N-API-KEY; MCP OAuth2 or bearer token; enterprise scoped API keys.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

- Workflows
- executions
- credentials
- projects
- tags
- variables
- data tables
- users
- MCP-exposed workflows/tools

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: No clear public REST API rate limit found.
- Pagination: Cursor pagination; default 100, max 250, nextCursor.
- Back off on 429/rate-limit responses and preserve vendor retry headers when available.
- For cursor pagination, store the cursor alongside the source query so retries do not skip or duplicate records.

## Destructive Operation Guardrails

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Prefer read-only validation first. For writes, require a concrete target record/list/workspace and a bounded operation size.
- Capture before/after IDs and source URLs in downstream audit logs.

## Retrieval Hints

- Good topic strings: `auth`, `mcp`, `api`, `openapi`, `pagination`, `rate limits`, `webhooks`, `objects`, `destructive operations`.
- Ask for the most specific object or action when available, for example `contacts auth`, `campaign pagination`, `workflow activation`, or `record delete caveats`.
- If the returned docs are ambiguous, fetch /tools/n8n/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: https://n8n.io
- docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server (source): https://docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server/
- docs.n8n.io/api/api-reference (source): https://docs.n8n.io/api/api-reference/
- docs.n8n.io/api/authentication (source): https://docs.n8n.io/api/authentication/
- docs.n8n.io/api/pagination (source): https://docs.n8n.io/api/pagination/
- docs.n8n.io/api/n8n-cli (source): https://docs.n8n.io/api/n8n-cli/

## Profile-Derived Operational Context

The main profile contains the operational context for this tool. This reference file adds retrieval-oriented guardrails and should be used with the official sources above.
