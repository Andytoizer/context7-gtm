# Gong

## Agent Summary

Gong is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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
- Community SDK / integration: unknown

## Auth

API access key/secret as basic auth; OAuth for published apps.

## Main Objects

- Calls
- transcripts
- users
- scorecards
- stats
- Engage flows

## Rate Limits

3 calls/sec and 10,000 calls/day; 429 with Retry-After.

## Pagination

Cursor, commonly 100 records/page.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether Gong exposes a downloadable OpenAPI spec or official SDK behind authenticated developer docs.

## Sources

- https://help.gong.io/docs/receive-access-to-the-api
- https://help.gong.io/docs/what-the-gong-api-provides
- https://visioneers.gong.io/developers-79/gong-api-pagination-limit-1036
