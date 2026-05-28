# BuiltWith

## Agent Summary

BuiltWith lets agents work with Domains, technologies, technology lists, relationships, changes, redirects, and keywords through official MCP, API, CLI, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using BuiltWith in automations.

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
