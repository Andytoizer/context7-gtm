# Pipedrive

## Agent Summary

Pipedrive lets agents work with Deals, leads, persons, organizations, products, activities, and notes through official API, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Pipedrive in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API token or OAuth 2.0 bearer tokens.

## Main Objects

- Deals
- leads
- persons
- organizations
- products
- activities
- notes
- pipelines/stages
- users

## Rate Limits

Token-based burst limits; Search API 10 requests/2 sec; headers include x-ratelimit-* and daily write quota.

## Pagination

Cursor-based pagination for many list endpoints; older endpoints vary.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.pipedrive.com/docs/api/v1
- https://pipedrive.readme.io/docs/core-api-concepts-rate-limiting
- https://pipedrive.readme.io/docs/core-api-concepts-pagination
- https://github.com/pipedrive
- https://www.apideck.com/mcp-server/pipedrive
