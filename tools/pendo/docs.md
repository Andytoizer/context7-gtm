# Pendo

## Agent Summary

Pendo is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Integration/API key for API; OAuth/service-account style setup for MCP.

## Main Objects

- Visitors
- accounts
- guides
- segments
- reports
- features
- events
- metadata
- product_areas

## Rate Limits

No clear public numeric limits found; docs mention aggregation/report constraints.

## Pagination

Mixed/endpoint-specific; MCP docs describe paginated product-area retrieval.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://support.pendo.io/hc/en-us/articles/38099922926875-Pendo-developer-documentation
- https://support.pendo.io/hc/en-us/articles/41102236924955
- https://engageapi.pendo.io/
- https://agent.pendo.io/
