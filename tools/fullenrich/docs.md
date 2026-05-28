# FullEnrich

## Agent Summary

FullEnrich is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API key.

## Main Objects

- Async enrich API
- async reverse email lookup
- sync search API
- contacts
- companies
- exports
- credits

## Rate Limits

60 API calls per minute across Enrich, Reverse Email Lookup, and Search. Enrich and Reverse Email Lookup allow up to 100 contacts per bulk request and default workspace queues of 100 concurrent enrichments and 100 concurrent reverse email lookups.

## Pagination

Search API pagination uses `offset` and `limit`; the people/company search endpoint examples also expose `search_after` in request examples and response metadata.

## Agent Caveats

- Destructive action risk: medium.
- Public `api-reference/openapi.json` currently returns Mintlify sample content, while docs pages reference an internal `api/v2/reference/openapi.yml`; treat OpenAPI/spec as unresolved unless a fetchable vendor spec is found.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.fullenrich.com/api/v2/general/authentication
- https://docs.fullenrich.com/api/v2/general/ratelimit
- https://docs.fullenrich.com/api/v2/general/intro-search
- https://fullenrich.mintlify.app/api/v2/implement-in-product/getting-started
- https://docs.fullenrich.com/api/v2/people/search/post
- https://docs.fullenrich.com/api/v2/company/search/post
- https://help.fullenrich.com/en/articles/14190120-mcp-server
- https://help.fullenrich.com/en/articles/15025057-build-a-custom-mcp-client
- https://help.fullenrich.com/en/articles/9688091-data-provided-by-fullenrich
