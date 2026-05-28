# Demandbase

## Agent Summary

Demandbase lets agents work with Companies, contacts/people, exports, imports, users/admin, subscriptions/webhooks, and credit usage through official MCP, API, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Demandbase in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
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

Admin API 90/min per HTTP method; Import API daily endpoint quotas; MCP credit usage is record-based.

## Pagination

MCP defaults to 5 records/page and supports up to 100 records/page; REST pagination is endpoint-specific in the API reference.

## Agent Caveats

- Destructive action risk: high.
- Official developer hub covers REST APIs, API reference/OpenAPI-backed endpoint docs, Python SDK, and MCP.
- Demandbase MCP requires CSM enablement and official support is limited to documented clients.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.demandbase.com/docs/welcome
- https://developer.demandbase.com/docs/demandbase-apis
- https://developer.demandbase.com/docs/b2b-overview
- https://developer.demandbase.com/docs/authenticating-with-the-apis
- https://developer.demandbase.com/docs/user-admin-overview
- https://developer.demandbase.com/docs/mcp
- https://developer.demandbase.com/docs/instructions
- https://developer.demandbase.com/docs/credit-consumption
- https://developer.demandbase.com/docs/rate-limits-1
- https://pypi.org/project/demandbase-sdk/
