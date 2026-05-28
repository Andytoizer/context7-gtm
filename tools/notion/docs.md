# Notion

## Agent Summary

Notion lets agents work with Pages, blocks, databases/data sources, users, comments, files, and workers through official MCP, API, CLI, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Notion in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

OAuth or internal integration token; MCP OAuth; CLI browser login/keychain or token env.

## Main Objects

- Pages
- blocks
- databases/data sources
- users
- comments
- files
- workers

## Rate Limits

Average 3 requests/sec per connection; 429 with Retry-After.

## Pagination

Cursor, start_cursor, has_more, page_size.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.notion.com/guides/mcp/mcp
- https://developers.notion.com/cli/get-started/overview
- https://developers.notion.com/reference/request-limits
- https://developers.notion.com/reference/intro
- https://github.com/makenotion/notion-sdk-js
