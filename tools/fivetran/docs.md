# Fivetran

## Agent Summary

Fivetran is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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
