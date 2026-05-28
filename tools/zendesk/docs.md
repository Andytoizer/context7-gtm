# Zendesk

## Agent Summary

Zendesk is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Locate official Zendesk MCP server docs/config once public after the May 2026 announcement.

## Sources

- https://developer.zendesk.com/api-reference/
- https://developer.zendesk.com/api-reference/ticketing/introduction/
- https://developer.zendesk.com/documentation/conversations/references/openapi-specification/
- https://developer.zendesk.com/api-reference/introduction/rate-limits/
- https://developer.zendesk.com/api-reference/introduction/pagination/
- https://developer.zendesk.com/documentation/apps/getting-started/using-zcli/
- https://www.techradar.com/pro/zendesk-becomes-the-latest-to-adopt-mcp-to-futureproof-customers-in-the-ai-first-era
