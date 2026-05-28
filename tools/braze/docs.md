# Braze

## Agent Summary

Braze lets agents work with Users, campaigns, canvases, segments, catalogs, templates, and content blocks through official MCP, API, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Braze in automations.

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
