# Monday CRM

## Agent Summary

Monday CRM is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API token or OAuth app token for monday.com GraphQL API; permissions follow workspace/app scopes.

## Main Objects

- Boards
- Items
- Columns
- Groups
- Updates
- Users
- Teams
- Workspaces
- CRM templates
- Automations

## Rate Limits

Complexity, daily, minute, and concurrency limits; GraphQL responses include complexity data.

## Pagination

Cursor-based pagination with items_page and next_items_page.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.monday.com/api-reference/docs
- https://developer.monday.com/api-reference/docs/rate-limits
- https://developer.monday.com/api-reference/reference/items-page
- https://developer.monday.com/apps/docs/monday-code-cli
- https://developer.monday.com/apps/docs/mcp
