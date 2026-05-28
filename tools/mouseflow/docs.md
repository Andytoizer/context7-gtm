# Mouseflow

## Agent Summary

Mouseflow is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

HTTP Basic Auth with email as username and API key as password; US/EU API endpoints.

## Main Objects

- Websites
- Recordings
- Heatmaps
- Funnels
- Forms
- Feedback
- Sessions

## Rate Limits

Unknown.

## Pagination

Endpoint-specific.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api-docs.mouseflow.com/
- https://js-api-docs.mouseflow.com/
