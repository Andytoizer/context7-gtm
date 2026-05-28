# SpyFu

## Agent Summary

SpyFu lets agents work with Domains, Keywords, Competitors, PPC SERPs, SEO SERPs, Ad History, and Ranking History through official API, OpenAPI/spec, and llms/AI docs surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using SpyFu in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: no
- Community MCP: unknown
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Bearer API key.

## Main Objects

- Domains
- Keywords
- Competitors
- PPC SERPs
- SEO SERPs
- Ad History
- Ranking History
- Projects
- Account Usage

## Rate Limits

Endpoint-specific rolling 1-second RPS limits, roughly 2-1000 RPS; 429 includes Retry-After.

## Pagination

Endpoint-specific; docs recommend batch/paginate where supported; billing is per row returned.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.spyfu.com/
- https://developer.spyfu.com/docs/rate-limits
- https://developer.spyfu.com/docs/api-pricing
- https://help.spyfu.com/en/articles/12195281-how-do-i-get-spyfu-data-in-chatgpt
