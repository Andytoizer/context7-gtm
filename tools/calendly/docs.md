# Calendly

## Agent Summary

Calendly lets agents work with Users, organizations, event types, scheduled events, invitees, memberships, and webhooks through official MCP and API surfaces plus community MCP and community integration support. Check auth, pagination, rate limits, source links, and medium write risk before using Calendly in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 and personal access tokens.

## Main Objects

- Users
- organizations
- event_types
- scheduled_events
- invitees
- memberships
- webhooks
- routing_forms

## Rate Limits

Documented; 429 on excess.

## Pagination

count/page_token style pagination with next_page_token.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.calendly.com/
- https://developer.calendly.com/api-docs
- https://developer.calendly.com/getting-started
- https://developer.calendly.com/how-to-embed-calendly
- https://help.calendly.com/hc/en-us/articles/31575909095447-Calendly-MCP-Server
