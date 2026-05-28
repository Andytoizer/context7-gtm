# Campaign Monitor

## Agent Summary

Campaign Monitor is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

OAuth2 preferred for multi-account integrations; API key via Basic auth for internal/testing use.

## Main Objects

- Account
- Clients
- Campaigns
- Journeys
- Lists
- Segments
- Subscribers
- Templates
- Transactional
- Webhooks

## Rate Limits

Transactional endpoints expose X-RateLimit headers; broader numeric limits not clearly published.

## Pagination

Paged endpoints use endpoint-specific page/page-size style parameters.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.campaignmonitor.com/api/
- https://www.campaignmonitor.com/api/v3-3/getting-started/
- https://github.com/campaignmonitor/createsend-php
