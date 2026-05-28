# n8n

## Agent Summary

n8n is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

API key header X-N8N-API-KEY; MCP OAuth2 or bearer token; enterprise scoped API keys.

## Main Objects

- Workflows
- executions
- credentials
- projects
- tags
- variables
- data tables
- users
- MCP-exposed workflows/tools

## Rate Limits

No clear public REST API rate limit found.

## Pagination

Cursor pagination; default 100, max 250, nextCursor.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.n8n.io/advanced-ai/mcp/accessing-n8n-mcp-server/
- https://docs.n8n.io/api/api-reference/
- https://docs.n8n.io/api/authentication/
- https://docs.n8n.io/api/pagination/
- https://docs.n8n.io/api/n8n-cli/
