# Warmly

## Agent Summary

Warmly is strongly agent-ready. Official launch documentation covers an MCP endpoint, REST API base URL, OAuth and API-key auth, tool names, input shapes, execution polling, credits, rate limits, troubleshooting, and roadmap caveats.

Agent readiness score: 5/5.

## Retrieval Priority

1. Use Warmly's MCP/API launch documentation for MCP setup, REST execution, tool schemas, auth, credits, rate limits, and troubleshooting.
2. Use `GET /agent-tools/tools?organizationId=<org-id>` to discover the exact tool schemas available to an organization before building a direct REST integration.
3. Use the Warmly product site for product-level object context such as inbound agents, TAM agents, signals, data, integrations, and the context graph.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no public OpenAPI found
- llms/AI docs: no
- Official SDK: no
- Strong community fallback: not needed

## Auth

Warmly MCP uses OAuth at `https://opps-api.getwarmly.com/api/mcp`. If the account belongs to multiple organizations, callers provide `organization_id` in the query string or `X-Warmly-Organization-Id` as a header. REST uses per-organization API keys with `Authorization: Bearer $WARMLY_API_KEY`, plus `organizationId` in the request body or query.

## Main Objects

- Warm visitors
- Warm accounts
- Identified visitors
- Company profiles
- Contact profiles
- Page visits and sessions
- UTM data
- CRM provider intersections
- Agent tool executions
- Credit balance

## Rate Limits

Warmly documents 60 requests per minute on the free tier and 120 requests per minute on paid tiers. The server returns HTTP 429 when exceeded; agents should back off about 60 seconds and retry. Credits are shared across the Warmly workspace, but reads from `list_warm_visitors`, `list_warm_accounts`, and `get_credits_remaining` are free.

## Pagination

`list_warm_visitors` supports `take` from 1-500 and `offset`; `list_warm_accounts` uses the same shape minus contact-level filters. `GET /agent-tools/executions` can filter by `toolName`, `status`, `externalRef`, or date range.

## Agent Caveats

- Destructive action risk: low.
- MCP exposes three read-only tools: `list_warm_visitors`, `list_warm_accounts`, and `get_credits_remaining`.
- REST exposes the same tools through `POST /agent-tools/execute`; successful API receipt returns `202`, so agents must inspect `status` and `output.success` rather than treating HTTP status alone as tool success.
- Async tools can require polling `GET /agent-tools/executions/:id` until `succeeded`, `failed`, `cancelled`, or `awaiting_approval`.
- REST inputs have documented size/depth limits: input object 256 KB serialized, 1,000 total keys, 32 levels deep; `reasoning` is capped at 50,000 characters.
- Write tools, execution webhooks, phone reveals, and additional intent signal lookups are described as future work or coming soon.

## Sources

- https://www.warmly.ai/launches/warmly-mcp-and-api-are-live
- https://www.warmly.ai/
