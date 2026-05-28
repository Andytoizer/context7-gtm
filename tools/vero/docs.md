# Vero

## Agent Summary

Vero is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

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

Track API auth_token parameter per request; HTTPS required.

## Main Objects

- Users
- Customers
- Identities
- Tags
- Events
- Subscriptions
- Campaigns
- Templates
- Webhooks

## Rate Limits

Unknown.

## Pagination

Unknown for Track API; Campaigns REST API is preview and needs verification.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Public docs clearly cover Track REST API, but rate limits, pagination, and Campaigns REST API preview coverage need confirmation before publishing broad agent actions.

## Sources

- https://www.getvero.com/
- https://vero-c561507b.mintlify.app/api-reference/track/overview
- https://vero-c561507b.mintlify.app/developer-docs/overview
- https://help.getvero.com/llms.txt
