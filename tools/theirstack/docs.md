# TheirStack

## Agent Summary

TheirStack lets agents work with Jobs, companies, technographics, buying intents, catalogs, company lists, and saved searches through official MCP, API, and OpenAPI/spec surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using TheirStack in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: no
- Community CLI: no
- Community SDK / integration: yes

## Auth

Bearer API key; MCP supports OAuth or Authorization: Bearer.

## Main Objects

- Jobs
- companies
- technographics
- buying_intents
- catalogs
- company_lists
- saved_searches
- webhooks
- credits

## Rate Limits

Free 4/sec, 10/min, 50/hour, 400/day on core search endpoints; paid 4/sec.

## Pagination

page+limit and offset+limit; optional include_total_results.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://theirstack.com/en/docs/api-reference
- https://theirstack.com/en/docs/api-reference/authentication
- https://theirstack.com/en/docs/api-reference/pagination
- https://theirstack.com/en/docs/api-reference/rate-limit
- https://theirstack.com/en/docs/mcp
- https://theirstack.com/en/product-updates/2026-02-13-mcp-server
