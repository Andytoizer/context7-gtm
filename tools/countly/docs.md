# Countly

## Agent Summary

Countly is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Countly API keys; self-hosted/server config controls access.

## Main Objects

- Apps
- Users
- Events
- Sessions
- Cohorts
- Dashboards
- Funnels
- Push
- Feedback
- Remote Config

## Rate Limits

Configurable server/API settings; no single public global limit found.

## Pagination

Endpoint-specific.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api.count.ly/reference/rest-api-reference
- https://support.countly.com/hc/en-us/articles/26173669019804
- https://github.com/Countly/countly-server
