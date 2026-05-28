# Mixpanel

## Agent Summary

Mixpanel lets agents work with Events, user profiles, group profiles, cohorts, funnels, retention, and insights through official API, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Mixpanel in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Service account Basic auth for query/export APIs; project tokens or SDK credentials for event ingestion and profile updates depending API surface.

## Main Objects

- Events
- user profiles
- group profiles
- cohorts
- funnels
- retention
- insights
- annotations
- schemas
- lookup tables
- projects

## Rate Limits

Endpoint-specific. Raw event export documents 60 queries per hour, 3 queries per second, and 100 concurrent queries; other endpoints have separate documented limits.

## Pagination

Endpoint-specific. Export streams raw events by date range; query/reference endpoints use their own paging, cursor, or limit parameters.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.mixpanel.com/reference/overview
- https://developer.mixpanel.com/reference
- https://developer.mixpanel.com/reference/limits
- https://developer.mixpanel.com/reference/raw-event-export
- https://developer.mixpanel.com/llms.txt
- https://github.com/mixpanel/docs
- https://mixpanel.github.io/mixpanel-python/
- https://mixpanel.github.io/mixpanel-php/classes/Mixpanel.html
