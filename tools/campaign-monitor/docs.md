# Campaign Monitor

## Agent Summary

Campaign Monitor lets agents work with Account, Clients, Campaigns, Journeys, Lists, Segments, and Subscribers through official API and SDK surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Campaign Monitor in automations.

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
