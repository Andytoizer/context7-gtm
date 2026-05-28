# Reference Details

Dense retrieval notes for Clay. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/clay
- Slug: clay
- Aliases: clay.com
- Agent readiness score: 4/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: no
- Community SDK / integration: unknown

## Auth And Permission Model

- MCP connection is workspace/user based through ChatGPT or Claude, with admin credit controls and usage monitoring. Public docs also describe table webhooks and enterprise-only People and Company API access, but do not publish a full REST auth header model for that API.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

- Tables
- webhooks
- enrichments
- people
- companies
- contacts

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: Unknown.
- Pagination: Unknown for the enterprise People and Company API. Clay's public API guidance emphasizes webhooks, Make/Zapier wrappers, and enterprise API access rather than a traditional paginated REST reference.
- Back off on 429/rate-limit responses and preserve vendor retry headers when available.
- For cursor pagination, store the cursor alongside the source query so retries do not skip or duplicate records.

## Destructive Operation Guardrails

- Destructive action risk: medium.
- Official Clay.com community and University docs confirm Clay MCP is live for ChatGPT and Claude, with admin controls, function enablement, credit limits, and usage monitoring.
- Third-party MCP directories list the remote Clay MCP endpoint at https://api.clay.com/v3/mcp and describe enrichment/contact/company tools; treat those tool lists as secondary until Clay publishes a full first-party tool schema.
- Clay's official API guidance says Clay is not a traditional API-first SaaS product; programmatic access is via table webhooks, Make/Zapier wrappers, or enterprise-only People and Company API access.
- NPM/GitHub results for @clayhq/clay-mcp and clay-inc/clay-mcp were excluded from Clay.com evidence because they are for clay.earth personal CRM, not Clay.com GTM enrichment.
- No official Clay.com CLI was found.
- Third-party MCP directories list the remote Clay MCP endpoint at `https://api.clay.com/v3/mcp` and describe enrichment/contact/company tools. Use those as secondary evidence until Clay publishes a first-party MCP tool schema.
- The public docs describe an enterprise-only People and Company API but do not publish complete endpoint-level reference, REST auth header, rate-limit, or pagination details.
- NPM/GitHub results for `@clayhq/clay-mcp` / `clay-inc/clay-mcp` were excluded from Clay.com evidence because they target clay.earth personal CRM, not Clay.com GTM enrichment.
- No official Clay.com CLI was found in public docs, GitHub search, or npm search.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Prefer read-only validation first. For writes, require a concrete target record/list/workspace and a bounded operation size.
- Capture before/after IDs and source URLs in downstream audit logs.

## Retrieval Hints

- Good topic strings: `auth`, `mcp`, `api`, `openapi`, `pagination`, `rate limits`, `webhooks`, `objects`, `destructive operations`.
- Ask for the most specific object or action when available, for example `contacts auth`, `campaign pagination`, `workflow activation`, or `record delete caveats`.
- If the returned docs are ambiguous, fetch /tools/clay/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: https://www.clay.com/
- university.clay.com/docs/using-clay-as-an-api (official-docs): https://university.clay.com/docs/using-clay-as-an-api
- university.clay.com/docs/mcp-settings (official-mcp): https://university.clay.com/docs/mcp-settings
- Clay MCP Now Live in Claude and ChatGPT (official-mcp): https://community.clay.com/x/announcements/ks5pwdvf83tf/clay-mcp-now-live-in-claude-and-chatgpt-run-clay-w
- Clay MCP Server - Tool Junction (mcp-directory): https://www.tooljunction.io/mcp/clay
- Knowledge Work Plugins Connectors (mcp-directory): https://www.mintlify.com/anthropics/knowledge-work-plugins/concepts/connectors

## Profile-Derived Operational Context

The main profile contains the operational context for this tool. This reference file adds retrieval-oriented guardrails and should be used with the official sources above.
