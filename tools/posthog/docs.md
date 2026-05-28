# PostHog

## Agent Summary

PostHog is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Personal API keys, project API keys/tokens, OAuth for app integrations.

## Main Objects

- Projects
- persons
- events
- insights
- feature_flags
- cohorts
- experiments
- surveys
- dashboards
- session_recordings

## Rate Limits

Documented by endpoint/class in API docs; 429 on excess.

## Pagination

Cursor/next-link pagination in API responses.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://posthog.com/docs/api
- https://posthog.com/docs/model-context-protocol
- https://posthog.com/docs/data/posthog-cli
- https://posthog.com/docs/libraries
- https://posthog.com/llms.txt
