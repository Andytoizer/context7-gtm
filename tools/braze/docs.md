# Braze

## Agent Summary

Braze is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Scoped REST API key in request header; MCP recommends dedicated read-only API key plus REST/base URL.

## Main Objects

- Users
- campaigns
- canvases
- segments
- catalogs
- templates
- content_blocks
- subscription_groups
- events
- purchases
- KPIs

## Rate Limits

Default 250,000 requests/hour for most APIs; endpoint-specific exceptions.

## Pagination

Endpoint-specific; export/list endpoints support list-style retrieval.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.braze.com/docs/api/basics
- https://www.braze.com/docs/api/api_limits
- https://www.braze.com/resources/articles/introducing-braze-mcp-server
- https://www.braze.com/resources/articles/braze-mcp-claude-desktop
- https://www.braze.com/dev-portal
