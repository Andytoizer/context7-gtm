# Sumble

## Agent Summary

Sumble is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API key from account API keys.

## Main Objects

- Organizations
- People
- Jobs
- Organization lists
- Contact lists
- Technologies
- Intelligence briefs
- credits

## Rate Limits

10 requests/second per user across endpoints; 429 on limit.

## Pagination

limit/offset on find/list endpoints; documented limits include people find limit up to 250 and offset up to 10000.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Sumble publishes per-endpoint OpenAPI snippets in the Markdown API docs; no standalone public OpenAPI bundle was found at common official API/spec URLs during verification.
- Official CLI and SDK surfaces were not found in the current official docs; treat them as unknown unless Sumble publishes them later.

## Sources

- https://docs.sumble.com/api
- https://docs.sumble.com/api.md
- https://docs.sumble.com/api/people
- https://docs.sumble.com/api/people.md
- https://docs.sumble.com/api/mcp.md
- https://docs.sumble.com/llms.txt
- https://sumble.com/integrations/mcp
- https://docs.sumble.com/trust-and-security
