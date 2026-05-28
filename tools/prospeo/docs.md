# Prospeo

## Agent Summary

Prospeo lets agents work with Enrich person/company, bulk enrich person/company, search person/company, search suggestions, and account info through official MCP, API, and llms/AI docs surfaces. Check auth, pagination, rate limits, source links, and lower write risk before using Prospeo in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: no
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

X-KEY API key header; MCP hosted OAuth/API key or local PROSPEO_API_KEY.

## Main Objects

- Enrich person/company
- bulk enrich person/company
- search person/company
- search suggestions
- account info

## Rate Limits

Search Free 1/s 20/min 50/day; Starter 1/s 30/min 1k/day; Growth 2/s 60/min 4k/day; Pro 5/s 180/min 250k/day. Enrich Pro up to 30/s 1,800/min 500k/day.

## Pagination

Search pages return up to 25 results; MCP docs state up to 1,000 pages.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://prospeo.io/api-docs
- https://prospeo.io/api-docs/rate-limits
- https://prospeo.io/mcp
- https://prospeo.io/mcp-docs/quick-start
