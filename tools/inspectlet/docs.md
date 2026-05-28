# Inspectlet

## Agent Summary

Inspectlet is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

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

API credentials; details in Inspectlet API docs.

## Main Objects

- Sessions
- Recordings
- Heatmaps
- Forms
- Funnels
- Tags
- Custom Metadata
- Users

## Rate Limits

Unknown.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm current API auth, pagination, and whether session download/delete endpoints are public.

## Sources

- https://docs.inspectlet.com/
