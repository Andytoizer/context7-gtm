# Vero

## Agent Summary

Vero lets agents work with Users, Customers, Identities, Tags, Events, Subscriptions, and Campaigns through official API, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Vero in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Track API requests use an `auth_token` request parameter and must be sent over HTTPS. Campaigns REST API preview endpoints use an `Authorization` header that accepts either a raw secret key or `Bearer <sk_KEY>`; preview endpoints also support an optional dated `revision` header.

## Main Objects

- Users
- Customers
- Identities
- Tags
- Events
- Subscriptions
- Campaigns
- Campaign Messages
- Campaign Content
- Templates
- Delivery Providers
- Webhooks

## Rate Limits

No public per-endpoint request-rate limits were found. Vero does document subscription/account usage limits and overage behavior, so agents should still budget usage and retry conservatively.

## Pagination

Track API endpoints are primarily write/ingest operations and do not paginate. Campaigns REST API preview list endpoints return ordered arrays; no public cursor/page contract was found.

## Agent Caveats

- Destructive action risk: high.
- Campaigns REST API is in preview and should be treated as a caveated surface.
- User delete, unsubscribe/resubscribe, tag edits, alias/identity merge, and campaign/content mutation actions require explicit guardrails.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.getvero.com/
- https://vero-c561507b.mintlify.app/api-reference/track/overview
- https://vero-c561507b.mintlify.app/developer-docs/overview
- https://help.getvero.com/llms.txt
- https://help.getvero.com/developer-docs/javascript-sdk
- https://help.getvero.com/developer-docs/community-sdks
- https://help.getvero.com/api-reference/campaign-content/list-campaign-message-content
