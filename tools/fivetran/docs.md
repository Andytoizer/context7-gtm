# Fivetran

## Agent Summary

Fivetran lets agents work with Connectors, Groups, Destinations, Users, Teams, Roles, and Webhooks through official MCP, API, CLI, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Fivetran in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key and secret with Basic auth; OAuth support for selected connector setup flows.

## Main Objects

- Connectors
- Groups
- Destinations
- Users
- Teams
- Roles
- Webhooks
- Logs
- Transformations
- Certificates

## Rate Limits

REST API has documented concurrent and per-minute limits; 429 on excess.

## Pagination

Cursor pagination with next_cursor on list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://fivetran.com/docs/rest-api
- https://fivetran.com/docs/rest-api/getting-started
- https://fivetran.com/docs/cli
- https://github.com/fivetran/mcp-server
