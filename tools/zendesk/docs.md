# Zendesk

## Agent Summary

Zendesk lets agents work with Tickets, users, organizations, groups, comments, help center articles, and conversations through official API, CLI, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Zendesk in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth, API token/basic for Support APIs; product-specific auth for Messaging/Sunshine.

## Main Objects

- Tickets
- users
- organizations
- groups
- comments
- help center articles
- conversations
- custom objects

## Rate Limits

Plan/endpoint-specific; headers expose remaining/reset; account-wide spike cap 100,000/min.

## Pagination

Cursor recommended; offset still supported but limited.

## Agent Caveats

- Destructive action risk: high.
- Zendesk announced a first-party MCP Server for summer 2026; no public setup or endpoint configuration was found during this QA pass.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.zendesk.com/api-reference/
- https://developer.zendesk.com/api-reference/ticketing/introduction/
- https://developer.zendesk.com/documentation/conversations/references/openapi-specification/
- https://developer.zendesk.com/api-reference/introduction/rate-limits/
- https://developer.zendesk.com/api-reference/introduction/pagination/
- https://developer.zendesk.com/api-reference/introduction/security-and-auth/
- https://developer.zendesk.com/documentation/ticketing/api-clients/introduction/
- https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/
- https://www.zendesk.com/newsroom/articles/relate-2026/
- https://github.com/reminia/zendesk-mcp-server
