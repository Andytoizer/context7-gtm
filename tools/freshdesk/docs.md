# Freshdesk

## Agent Summary

Freshdesk is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key with Basic auth or OAuth depending app/integration.

## Main Objects

- Tickets
- Contacts
- Companies
- Agents
- Groups
- Conversations
- Time Entries
- Products
- Solutions
- Forums

## Rate Limits

Plan-based API rate limits; 429 with Retry-After.

## Pagination

page/per_page and cursor pagination for selected endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.freshdesk.com/api/
- https://developers.freshdesk.com/api/#ratelimit
- https://developers.freshdesk.com/api/#pagination
