# BuiltWith

## Agent Summary

BuiltWith is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: no
- Community CLI: no
- Community SDK / integration: yes

## Auth

API key as KEY query param or Authorization: API/Bearer depending API/MCP surface.

## Main Objects

- Domains
- technologies
- technology_lists
- relationships
- changes
- redirects
- keywords
- trends
- products
- trust
- credits

## Rate Limits

Domain API documents max 8 concurrent and 10 requests/second, with 429 format.

## Pagination

Bulk jobs use async job_id/status/result; list pagination varies by endpoint.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api.builtwith.com/
- https://api.builtwith.com/domain-api
- https://github.com/builtwith/builtwith-mcp
- https://github.com/builtwith/builtwith-official-cli
- https://api.builtwith.com/llms.txt
