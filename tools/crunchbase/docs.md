# Crunchbase API

## Agent Summary

Crunchbase API is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Token API key via user_key query parameter or X-cb-user-key header; enterprise/application license required for full API.

## Main Objects

- Organizations
- people
- funding rounds
- acquisitions
- searches
- autocomplete
- entity lookups

## Rate Limits

200 calls per minute.

## Pagination

Search API uses keyset pagination; default/max behavior varies, docs note 50 items/page when limit omitted.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://data.crunchbase.com/docs/using-the-api
- https://data.crunchbase.com/v4-legacy/docs/using-search-apis
- https://support.crunchbase.com/hc/en-us/articles/32319290128019-Crunchbase-API-FAQ
- https://about.crunchbase.com/api-guide/
