# 6sense

## Agent Summary

6sense is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Authorization: Token API token.

## Main Objects

- Company identification
- company firmographics
- lead scoring
- people enrichment
- people search
- API credits

## Rate Limits

General 100/min; People Enrichment 20 qps; People Search 10 qps.

## Pagination

pageNo/pageSize; People Search max pageSize 1000.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api.6sense.com/docs/
