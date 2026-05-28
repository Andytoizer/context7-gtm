# Reference Details

Dense retrieval notes for Pinecone. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/pinecone
- Slug: pinecone
- Aliases: none recorded
- Agent readiness score: 5/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth And Permission Model

- API key in Api-Key header; MCP/CLI require Pinecone API key.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

- Indexes
- namespaces
- records/vectors
- metadata
- assistants
- rerank models
- inference models

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: Documented data-plane/index limits; 429 on namespace/API operation limits; exponential backoff recommended.
- Pagination: Vector ID list uses pagination_token; default 100 IDs.
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
- If the returned docs are ambiguous, fetch /tools/pinecone/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: https://www.pinecone.io
- docs.pinecone.io/guides/operations/mcp-server (source): https://docs.pinecone.io/guides/operations/mcp-server
- docs.pinecone.io/reference/cli/command-reference (source): https://docs.pinecone.io/reference/cli/command-reference
- docs.pinecone.io/reference/api/authentication (source): https://docs.pinecone.io/reference/api/authentication
- docs.pinecone.io/reference/list (source): https://docs.pinecone.io/reference/list
- docs.pinecone.io/reference/api/database-limits (source): https://docs.pinecone.io/reference/api/database-limits

## Profile-Derived Operational Context

The main profile contains the operational context for this tool. This reference file adds retrieval-oriented guardrails and should be used with the official sources above.
