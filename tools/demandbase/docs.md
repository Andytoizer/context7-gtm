# Demandbase

## Agent Summary

Demandbase is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

JWT Bearer token.

## Main Objects

- Companies
- contacts/people
- exports
- imports
- users/admin
- subscriptions/webhooks
- credit usage
- buying groups

## Rate Limits

Admin API 90/min per HTTP method; other quotas vary.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm MCP endpoint and access model; public search surfaced an official support title but not the full MCP docs.

## Sources

- https://developer.demandbase.com/docs/demandbase-apis
- https://developer.demandbase.com/docs/b2b-overview
- https://developer.demandbase.com/docs/authenticating-with-the-apis
- https://developer.demandbase.com/docs/user-admin-overview
