# Drip

## Agent Summary

Drip lets agents work with Accounts, Subscribers, Campaigns, Workflows, Events, Tags, and Forms through official API and SDK surfaces plus community MCP and community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Drip in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Private API key via Basic auth; OAuth2/Bearer required for public integrations.

## Main Objects

- Accounts
- Subscribers
- Campaigns
- Workflows
- Events
- Tags
- Forms
- Broadcasts
- Conversions
- Webhooks

## Rate Limits

3,600 individual requests/hour; 50 batch requests/hour; batch payloads up to 1,000 records.

## Pagination

page parameter with meta.page, count, total_pages, total_count.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.drip.com/
- https://github.com/GravityKit/drip-mcp-server
