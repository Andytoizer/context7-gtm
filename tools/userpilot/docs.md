# Userpilot

## Agent Summary

Userpilot is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API token in Authorization header.

## Main Objects

- Users
- Companies
- Events
- Segments
- Goals
- Exports
- Imports
- Bulk Updates
- Deletes

## Rate Limits

Unknown in surfaced official docs.

## Pagination

Endpoint-specific/unknown.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.userpilot.com/api-references/overview
- https://docs.userpilot.com/api-references/http-api
