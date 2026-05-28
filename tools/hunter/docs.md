# Hunter.io

## Agent Summary

Hunter.io is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

api_key query param for REST; MCP accepts Authorization Bearer or X-API-KEY.

## Main Objects

- Discover
- domain search
- email finder
- email verifier/count/enrichment
- company enrichment
- combined enrichment
- account
- leads
- lead lists
- custom attributes
- email sequences

## Rate Limits

Domain Search and Email Finder 15 RPS / 500 per minute; Email Verifier 10 RPS / 300 per minute.

## Pagination

limit/offset; Discover max 100/page; Domain Search default 10 max 100; leads/lists/sequences use limit/offset.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://hunter.io/api-documentation/v2
- https://help.hunter.io/en/articles/1970956-hunter-api
- https://hunter.io/blog/hunter-mcp-server-bringing-ai-and-b2b-data-together/amp/
