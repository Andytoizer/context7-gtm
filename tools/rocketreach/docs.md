# RocketReach

## Agent Summary

RocketReach is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key auth. Official OpenAPI uses an `Api-Key` header security scheme; Python SDK uses `Gateway(api_key=...)` or `GatewayConfig`.

## Main Objects

- Person search
- person lookup
- lookup status
- company/profile lookup
- account
- webhooks
- universal credits

## Rate Limits

Official docs publish a global 10 requests/second limit plus plan-specific per-minute/hour/day/month limits for person search, person lookup, company search, and bulk jobs. `429` responses include `Retry-After`.

## Pagination

Search endpoints use `start` and `page_size` in the OpenAPI docs; the Python SDK exposes `start` and `size` params for person search pagination.

## Agent Caveats

- Destructive action risk: medium.
- Official ReadMe docs expose `llms.txt` and an OpenAPI 3.1 spec at `/openapi/index.yaml`.
- Universal Credits endpoints are documented alongside legacy person/company search and lookup endpoints; note plan access restrictions in endpoint docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://rocketreach.co/api
- https://docs.rocketreach.co/llms.txt
- https://docs.rocketreach.co/openapi/index.yaml
- https://docs.rocketreach.co/reference/rate-limits
- https://docs.rocketreach.co/reference/responses-and-errors
- https://docs.rocketreach.co/reference/people-search-api
- https://docs.rocketreach.co/reference/create_universal_person_search
- https://docs.rocketreach.co/reference/create_universal_person_lookup
- https://docs.rocketreach.co/reference/get_universal_account
- https://pypi.org/project/rocketreach/
- https://github.com/rocketreach/rocketreach_python
- https://glama.ai/mcp/servers/%40Meerkats-Ai/rocketreach-mcp-server/tree
