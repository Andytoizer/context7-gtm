# HockeyStack

## Agent Summary

HockeyStack is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

Official docs expose product/admin and tracking-oriented docs. A third-party dlt context describes Bearer-token account-intelligence access, but no official public server API auth reference was found.

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
- Public official docs are useful for product context and agent-readable retrieval via llms.txt, but are not enough to implement a stable server-side API connector.
- Treat third-party API details as non-canonical until HockeyStack publishes or confirms the server API contract.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Need an official public HockeyStack server API reference covering auth, endpoints, pagination, rate limits, and destructive/write semantics. Current public coverage is product docs plus non-official API context.

## Sources

- https://docs.hockeystack.com/
- https://docs.hockeystack.com/llms.txt
- https://docs.hockeystack.com/integrations/installing-the-website-tracker/react
- https://docs.hockeystack.com/technical-details/tracking/customize-your-tracking
- https://docs.hockeystack.com/marketing-intelligence/the-hockeystack-data-model.md
- https://docs.hockeystack.com/account-intelligence/account-intelligence-configuration-guide.md
- https://dlthub.com/context/source/hockeystack
- https://hockeystack.com/
