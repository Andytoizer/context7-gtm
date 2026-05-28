# Fathom

## Agent Summary

Fathom is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

X-Api-Key header; user-scoped access to owned/shared/team meetings.

## Main Objects

- Meetings
- recordings
- teams
- team members
- webhooks
- transcripts
- summaries
- action items

## Rate Limits

60 calls per 60-second window.

## Pagination

List endpoints expose item collections; cursor/next semantics need endpoint-level verification.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.fathom.ai/
- https://developers.fathom.ai/quickstart
- https://developers.fathom.ai/webhooks
- https://developers.fathom.ai/sdks/available-methods
- https://github.com/Dot-Fun/fathom-mcp
