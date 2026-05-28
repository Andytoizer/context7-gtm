# CrustData

## Agent Summary

CrustData lets agents work with Companies, people, jobs, social posts, watchers/webhooks, credits, and web search/fetch through official MCP, API, and llms/AI docs surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using CrustData in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

API key/Bearer token; MCP OAuth 2.1 with API-key pass-through.

## Main Objects

- Companies
- people
- jobs
- social posts
- watchers/webhooks
- credits
- web search/fetch

## Rate Limits

Endpoint-specific; web search default 10/min.

## Pagination

Yes.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.crustdata.com/general/mcp
- https://docs.crustdata.com/api-reference/web-apis/web-search
- https://staging.crustdata.com/api-documentation
