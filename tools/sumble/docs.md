# Sumble

## Agent Summary

Sumble is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API key from account API keys.

## Main Objects

- Organizations
- people
- jobs
- account_lists
- technologies
- credits

## Rate Limits

10 requests/second per user across endpoints; 429 on limit.

## Pagination

limit/offset on people and likely other find endpoints.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether Sumble publishes OpenAPI/llms.txt and any official SDK or CLI.

## Sources

- https://docs.sumble.com/api
- https://docs.sumble.com/api/people
- https://sumble.com/integrations/mcp
- https://docs.sumble.com/trust-and-security
