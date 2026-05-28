# Salesloft

## Agent Summary

Salesloft lets agents work with Accounts, people, cadences, cadence memberships, steps/actions, calls, and emails through official API surfaces plus community MCP and community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Salesloft in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth authorization code for partners; client credentials for private apps; API keys for customers; scoped access.

## Main Objects

- Accounts
- people
- cadences
- cadence memberships
- steps/actions
- calls
- emails
- tasks
- opportunities
- notes
- users
- webhooks

## Rate Limits

600 cost/minute team-level; higher page numbers add cost; x-ratelimit headers.

## Pagination

page / per_page, default 25, max 100; docs recommend updated_at cursor poller for deep syncs.

## Agent Caveats

- Destructive action risk: high.
- Salesloft REST docs are sufficient for agent retrieval across auth, scopes, endpoints, rate limits, pagination, and webhooks.
- Clari + Salesloft announced an MCP Server for live Salesloft data, but public setup/reference docs were not found.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.salesloft.com/docs/api/
- https://developers.salesloft.com/docs/platform/api-basics/
- https://developer.salesloft.com/docs/platform/api-basics/api-key-authentication/
- https://developer.salesloft.com/docs/platform/api-basics/rate-limits/
- https://developers.salesloft.com/docs/platform/api-basics/filtering-paging-sorting/
- https://www.salesloft.com/company/newsroom/clari-salesloft-forecasting-execution-mcp-server
- https://cdn.cdata.com/help/KBM/mcp
- https://zapier.com/mcp/salesloft
