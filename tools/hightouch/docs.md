# Hightouch

## Agent Summary

Hightouch is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API keys and workspace-scoped credentials; CLI uses local/authenticated workspace config.

## Main Objects

- Models
- Syncs
- Sources
- Destinations
- Audiences
- Segments
- Events
- Users
- Workspaces

## Rate Limits

Endpoint-specific limits; 429 behavior should be handled with backoff.

## Pagination

Cursor or page-style list pagination depending endpoint.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://hightouch.com/docs/api-reference
- https://hightouch.com/docs/developer-tools/cli
- https://hightouch.com/docs/api-reference/openapi
