# Exa

## Agent Summary

Exa lets agents work with Search results, contents, similar pages, answers, research tasks, websets, and enrichments through official MCP, API, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using Exa in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

x-api-key header or Authorization: Bearer; MCP can run hosted or npm with EXA_API_KEY.

## Main Objects

- Search results
- contents
- similar pages
- answers
- research tasks
- websets
- enrichments

## Rate Limits

Default API limits include /search 10 QPS, /contents 100 QPS, /answer 10 QPS, legacy research 15 concurrent tasks.

## Pagination

Search is limit/numResults oriented; no general cursor pagination found in core search docs.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://exa.ai/docs/reference/exa-mcp
- https://exa.ai/docs/reference/rate-limits
- https://exa.ai/docs/reference/openapi-spec
- https://exa.ai/docs/sdks/python-sdk
- https://exa.ai/docs/reference/search
