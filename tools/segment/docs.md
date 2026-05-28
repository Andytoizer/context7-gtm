# Segment

## Agent Summary

Segment is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

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

Bearer Public API token; workspace-owner-created tokens.

## Main Objects

- Workspaces
- Sources
- Destinations
- Warehouses
- Tracking Plans
- Catalogs

## Rate Limits

Unknown.

## Pagination

Endpoint-specific.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.twilio.com/docs/segment/api/public-api/
- https://www.twilio.com/docs/ai/mcp
