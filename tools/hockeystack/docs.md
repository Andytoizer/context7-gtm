# HockeyStack

## Agent Summary

HockeyStack is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: unknown
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Tracking script/API token surfaces; server API auth not clearly public.

## Main Objects

- Users
- accounts
- events
- properties
- journeys
- attribution
- campaigns
- reports

## Rate Limits

Unknown.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: unknown.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Public docs expose tracking/SDK and AI-docs surfaces, but a stable public server API reference, auth model, pagination, and rate limits need confirmation.

## Sources

- https://docs.hockeystack.com/
- https://docs.hockeystack.com/llms.txt
- https://hockeystack.com/
