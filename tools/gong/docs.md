# Gong

## Agent Summary

Gong is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Access Key and Access Key Secret via HTTP Basic auth; OAuth apps use Bearer tokens and customer-specific `api_base_url_for_customer`.

## Main Objects

- Calls
- transcripts
- users
- user settings
- scorecards
- stats
- libraries
- CRM entities
- data privacy
- Engage flows

## Rate Limits

3 calls/sec and 10,000 calls/day; 429 with Retry-After.

## Pagination

Cursor pagination for list endpoints that return a `records` field; repeat the same request with the returned cursor.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://help.gong.io/docs/receive-access-to-the-api
- https://help.gong.io/docs/what-the-gong-api-provides
- https://help.gong.io/docs/how-to-use-the-gong-developers-hub
- https://help.gong.io/docs/create-an-app-for-gong
- https://help.gong.io/docs/gong-engage-api-capabilities
- https://app.gong.io/settings/api/documentation
- https://app.gong.io/ajax/settings/api/documentation/specs?version=
- https://github.com/ksindi/gong-client
- https://github.com/aaronsb/gong-api-client
