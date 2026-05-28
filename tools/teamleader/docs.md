# Teamleader

## Agent Summary

Teamleader is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 authorization code flow with scoped access.

## Main Objects

- Companies
- Contacts
- Deals
- Activities
- Tasks
- Invoices
- Projects
- Users
- Custom Fields

## Rate Limits

Unknown.

## Pagination

page and size parameters on many list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.teamleader.eu/
- https://developer.teamleader.eu/#/reference/general/api-basics
