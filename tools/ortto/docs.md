# Ortto

## Agent Summary

Ortto lets agents work with Account, People, Organizations, Audiences, Custom Fields, Activities, and Tags through official API surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Ortto in automations.

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

Custom private API key via X-Api-Key header; regional API hosts.

## Main Objects

- Account
- People
- Organizations
- Audiences
- Custom Fields
- Activities
- Tags
- Campaigns

## Rate Limits

Professional 10 req/s, Business 30 req/s, Enterprise 30 req/s default; IP and bad-request limiters also apply.

## Pagination

limit/offset in POST query bodies for retrieval endpoints such as person/get.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://help.ortto.com/a-223-developer-guide
- https://help.ortto.com/a-250-api-reference
- https://help.ortto.com/a-235-rate-limits
