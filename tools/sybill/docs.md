# Sybill

## Agent Summary

Sybill is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

MCP OAuth; REST API key/rate-limit shared with MCP.

## Main Objects

- Conversations
- deals
- accounts
- participants
- CRM metadata

## Rate Limits

60/min, 1,000/hour, 10,000/day per API key.

## Pagination

Cursor, limit 1-50.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api.sybill.ai/docs/mcp.html
- https://api.sybill.ai/docs/rate-limiting.html
