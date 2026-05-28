# Salesloft

## Agent Summary

Salesloft is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

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
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether the announced Clari+Salesloft MCP Server has public setup/reference docs yet.

## Sources

- https://developers.salesloft.com/docs/api/
- https://developers.salesloft.com/docs/platform/api-basics/
- https://developer.salesloft.com/docs/platform/api-basics/rate-limits/
- https://developers.salesloft.com/docs/platform/api-basics/filtering-paging-sorting/
- https://www.salesloft.com/company/newsroom/clari-salesloft-forecasting-execution-mcp-server
- https://cdn.cdata.com/help/KBM/mcp
