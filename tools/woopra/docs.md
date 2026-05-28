# Woopra

## Agent Summary

Woopra is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

HTTP Basic Auth with App ID and Secret Key.

## Main Objects

- Projects
- Visitors
- Profiles
- Events
- Journeys
- Trends
- Funnels
- Cohorts
- Reports
- Segments

## Rate Limits

300/min, 600/hour, 3000/day per project.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.woopra.com/
- https://docs.woopra.com/reference/intro-http-apis
