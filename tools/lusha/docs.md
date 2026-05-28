# Lusha

## Agent Summary

Lusha lets agents work with Contacts, companies, search, enrich, search-and-enrich, prospecting, and lookalikes through official MCP, API, OpenAPI/spec, and llms/AI docs surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using Lusha in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: no
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

REST uses api_key header; MCP supports OAuth/API-key bearer header depending client.

## Main Objects

- Contacts
- companies
- search
- enrich
- search-and-enrich
- prospecting
- lookalikes
- signals
- filters
- webhooks
- account

## Rate Limits

Plan-based per minute/hour/day; response headers expose remaining/usage/limits.

## Pagination

Prospecting uses pagination.page and pagination.size; up to 1,000 pages x 50 results.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.lusha.com/apis/openapi/prospecting
- https://docs.lusha.com/mcp-docs
- https://info.lusha.com/en/articles/361329-lusha-model-context-protocol-mcp-server
