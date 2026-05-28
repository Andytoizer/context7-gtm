# Amplemarket

## Agent Summary

Amplemarket is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Official MCP uses OAuth per user with account permissions. API access appears governed by Amplemarket data-as-a-service API terms.

## Main Objects

- People search
- company search
- enrichments
- lead lists
- sequences
- buying signals
- prospect activity

## Rate Limits

Official MCP docs state 100 requests per minute per user.

## Pagination

MCP search tools return up to 100 results per page.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://knowledge.amplemarket.com/articles/8022685319-connecting-to-the-amplemarket-mcp-server
- https://www.amplemarket.com/legal/api-terms
- https://www.amplemarket.com/
- https://zapier.com/mcp/amplemarket
