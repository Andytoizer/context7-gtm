# RocketReach

## Agent Summary

RocketReach is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key; Python SDK uses Gateway(api_key=...); REST commonly uses Api-Key header.

## Main Objects

- Person search
- person lookup
- lookup status
- company/profile lookup
- account

## Rate Limits

Exact published limits not found; SDK warns tight polling may return 429 with retry wait.

## Pagination

Python SDK search uses start and size params.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm current official REST docs, exact rate limits, and whether an official OpenAPI spec exists.

## Sources

- https://rocketreach.co/api
- https://pypi.org/project/rocketreach/
- https://github.com/rocketreach/rocketreach_python
- https://glama.ai/mcp/servers/%40Meerkats-Ai/rocketreach-mcp-server/tree
