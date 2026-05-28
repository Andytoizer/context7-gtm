# Jungler

## Agent Summary

Jungler is API-ready but not MCP/CLI-ready. It has official API docs covering workspaces, signals, posts, engagers, and workbooks. No official MCP server, CLI, SDK, OpenAPI spec, or strong community fallback was found during this audit.

## Retrieval Priority

1. Use official Jungler API docs for endpoint behavior.
2. Use the quick start for authentication and request shape.
3. Use object-specific docs for pagination, required workspace context, and endpoint-specific rate limits.

## Auth

Jungler uses an `X-API-Key` header. Most useful operations require a `workspace_id`, so agents should resolve and persist the workspace context before fetching signals, posts, engagers, or workbooks.

## Main Objects

- Workspaces
- Signals
- Posts
- Engagers
- Workbooks
- Integrations

## Rate Limits

- Workspaces: 30 requests per minute
- Signals: 30 requests per minute
- Posts: 60 requests per minute
- Workbooks: 30 requests per minute
- Engagers: 60 requests per minute

## Agent Caveats

- Pagination responses include `items`, `total`, `page`, `page_size`, and `pages`.
- Agents should not assume MCP or CLI access exists.
- Integrations include Clay, Slack, Google Sheets, HeyReach, Expandi, and webhook automation patterns for n8n, Zapier, and Make.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: no
- Strong community fallback: no
