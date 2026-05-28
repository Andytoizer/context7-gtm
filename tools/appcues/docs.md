# Appcues

## Agent Summary

Appcues is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP via Appcues login; Public API v2 uses HTTP Basic Auth with API key/secret.

## Main Objects

- Flows
- Experiences
- Segments
- Goals
- NPS
- Events
- Users
- Groups
- SDK Keys

## Rate Limits

429 when throttled; no public numeric limits found.

## Pagination

Not clearly documented globally.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.appcues.com/en_US/integration-documents/appcues-mcp-server
- https://api.appcues.com/
- https://docs.appcues.com/en_US/dev-api-data/javascript-api-developer
