# Close

## Agent Summary

Close lets agents work with Leads, contacts, opportunities, activities, emails, calls, and SMS through official MCP, API, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Close in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key via Basic Auth; OAuth 2.0 supported for apps/MCP; MCP supports read, safe-write, and destructive scopes.

## Main Objects

- Leads
- contacts
- opportunities
- activities
- emails
- calls
- SMS
- tasks
- users
- custom objects
- webhooks

## Rate Limits

Rate limits apply to all endpoints; numeric public limit not found in official overview.

## Pagination

_skip/_limit and cursor-based pagination depending on endpoint.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://help.close.com/docs/mcp-server
- https://developer.close.com/api/overview
- https://api.close.com/api/openapi.json
- https://developer.close.com/api/overview/api-clients
- https://github.com/closeio/closeio-api
