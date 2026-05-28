# Apollo

## Agent Summary

Apollo is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

API key for REST; OAuth for Apollo CLI/MCP connectors.

## Main Objects

- People
- organizations
- contacts
- accounts
- deals
- sequences
- email accounts
- calls
- tasks
- users
- usage/analytics

## Rate Limits

Plan-based per endpoint; usage endpoint reports per-minute/hour/day limits.

## Pagination

page/per_page; People Search max 100/page, 500 pages / 50k display limit.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.apollo.io/
- https://docs.apollo.io/docs/apollo-cli-overview
- https://www.apollo.io/product/mcp
