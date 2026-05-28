# Gorgias

## Agent Summary

Gorgias is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

Basic auth or OAuth app tokens depending integration model.

## Main Objects

- Tickets
- Customers
- Messages
- Tags
- Macros
- Rules
- Teams
- Users
- Satisfaction Surveys
- Integrations

## Rate Limits

Endpoint-specific limits and 429 behavior documented in API reference.

## Pagination

Cursor/limit style pagination on list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.gorgias.com/reference/introduction
- https://developers.gorgias.com/docs/authentication
- https://developers.gorgias.com/docs/pagination
