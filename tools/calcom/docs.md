# Cal.com

## Agent Summary

Cal.com is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

API keys, OAuth apps, platform/managed-user auth.

## Main Objects

- Users
- teams
- event_types
- bookings
- availability
- calendars
- webhooks
- organizations
- routing_forms

## Rate Limits

Documented in API docs; limits vary by auth/product surface.

## Pagination

limit/offset and cursor-like list behavior depending on endpoint/version.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://cal.com/docs
- https://cal.com/docs/api-reference/v2
- https://cal.com/docs/mcp
- https://cal.com/docs/llms.txt
- https://www.npmjs.com/package/@calcom/cli
- https://www.npmjs.com/package/@calcom/platform-libraries
