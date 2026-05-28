# Matomo

## Agent Summary

Matomo is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

token_auth/API token; MCP supports API token or OAuth 2.0.

## Main Objects

- Sites
- Visits
- Events
- Goals
- Segments
- Reports
- Users
- Tag Manager

## Rate Limits

Self-host/server-dependent; no global SaaS limit found.

## Pagination

Reporting/API endpoint-specific.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.matomo.org/api-reference
- https://matomo.org/docs/analytics-api/
- https://matomo.org/guide/apis/mcp-model-context-protocol/
- https://matomo.org/faq/how-to/configure-the-matomo-mcp-server/
