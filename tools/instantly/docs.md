# Instantly

## Agent Summary

Instantly lets agents work with Accounts/mailboxes, campaigns, leads, lead lists, emails/unibox, blocklists, and webhooks through official MCP, API, and llms/AI docs surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Instantly in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API keys with scopes; multiple revocable keys.

## Main Objects

- Accounts/mailboxes
- campaigns
- leads
- lead lists
- emails/unibox
- blocklists
- webhooks
- analytics
- workspaces
- API keys
- background jobs

## Rate Limits

Publicly announced 100 req/sec and 6,000 req/min; endpoint exceptions include email list 20/min and test email 10/min.

## Pagination

Cursor pagination with starting_after / next_starting_after; limits often 1-100.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.instantly.ai/api-reference/introduction
- https://developer.instantly.ai/llms.txt
- https://help.instantly.ai/en/articles/12980002-instantly-mcp-model-context-protocol
- https://developer.instantly.ai/api-reference/lead/list-leads
- https://www.linkedin.com/posts/instantlyapp_building-on-instantly-just-got-a-lot-better-activity-7437528536367878144-qkdz
