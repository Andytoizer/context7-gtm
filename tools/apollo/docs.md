# Apollo

## Agent Summary

Apollo lets agents work with People, organizations, contacts, accounts, deals, sequences, and email accounts through official MCP, API, CLI, OpenAPI/spec, and llms/AI docs surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Apollo in automations.

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
