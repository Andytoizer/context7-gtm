# Freshsales

## Agent Summary

Freshsales lets agents work with Contacts, Accounts, Deals, Leads, Tasks, Appointments, and Notes through official API surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Freshsales in automations.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Freshsales API key in Authorization header, scoped to account/domain.

## Main Objects

- Contacts
- Accounts
- Deals
- Leads
- Tasks
- Appointments
- Notes
- Sales Activities
- Users
- Territories

## Rate Limits

Plan-based API limits; 429 responses indicate throttling.

## Pagination

page and per_page parameters on list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.freshworks.com/crm/api/
- https://developers.freshworks.com/crm/api/#authentication
- https://developers.freshworks.com/crm/api/#pagination
