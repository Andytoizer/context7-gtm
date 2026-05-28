# Reference Details

Dense retrieval notes for Instantly. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/instantly
- Slug: instantly
- Aliases: instantly.ai
- Agent readiness score: 4/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth And Permission Model

- Bearer API keys with scopes; multiple revocable keys.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

- Accounts/mailboxes
- campaigns
- leads
- lead lists
- emails/unibox
- blocklists
- webhooks
- analytics
- workspaces
- API keys
- background jobs

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: Publicly announced 100 req/sec and 6,000 req/min; endpoint exceptions include email list 20/min and test email 10/min.
- Pagination: Cursor pagination with starting_after / next_starting_after; limits often 1-100.
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
- If the returned docs are ambiguous, fetch /tools/instantly/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: https://instantly.ai/
- developer.instantly.ai/api-reference/introduction (source): https://developer.instantly.ai/api-reference/introduction
- developer.instantly.ai/llms.txt (source): https://developer.instantly.ai/llms.txt
- help.instantly.ai/en/articles/12980002-instantly-mcp-model-context-protocol (source): https://help.instantly.ai/en/articles/12980002-instantly-mcp-model-context-protocol
- developer.instantly.ai/api-reference/lead/list-leads (source): https://developer.instantly.ai/api-reference/lead/list-leads
- linkedin.com/posts/instantlyapp_building-on-instantly-just-got-a-lot-better-activity-7437528536367878144-qkdz (source): https://www.linkedin.com/posts/instantlyapp_building-on-instantly-just-got-a-lot-better-activity-7437528536367878144-qkdz

## Profile-Derived Operational Context

The main profile contains the operational context for this tool. This reference file adds retrieval-oriented guardrails and should be used with the official sources above.
