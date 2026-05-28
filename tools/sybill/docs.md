# Sybill

## Agent Summary

Sybill lets agents work with Conversations, deals, accounts, participants, and CRM metadata through official MCP, API, and OpenAPI/spec surfaces. Check auth, pagination, rate limits, source links, and lower write risk before using Sybill in automations.

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
