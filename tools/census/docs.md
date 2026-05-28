# Census

## Agent Summary

Census lets agents work with Syncs, sources, destinations, models, datasets, workspaces, and organizations through official API surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Census in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer tokens; workspace API keys for Workspace APIs, personal access tokens for Organization APIs.

## Main Objects

- Syncs
- sources
- destinations
- models
- datasets
- workspaces
- organizations
- custom destinations

## Rate Limits

Management API limits not clearly published; custom destination default is 50,000 req/sec, overrideable with X-RateLimit-Limit.

## Pagination

page, per_page max 100, order; pagination object with next_page/last_page; legacy next URL being phased out.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.getcensus.com/api-reference/introduction/authorization
- https://developers.getcensus.com/api-reference/introduction/pagination
- https://www.postman.com/getcensus/census-api/overview
- https://developers.getcensus.com/custom-destinations/destination-spec
