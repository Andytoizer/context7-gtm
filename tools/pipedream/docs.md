# Pipedream

## Agent Summary

Pipedream is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Bearer OAuth/API tokens; connected accounts are managed per app/account.

## Main Objects

- Workflows
- Components
- Sources
- Connected Accounts
- Apps
- Projects
- Events
- Data Stores
- MCP Servers

## Rate Limits

Plan and endpoint-based API limits; 429 on excess.

## Pagination

Cursor/page-style pagination on API lists.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://pipedream.com/docs/api/rest/
- https://pipedream.com/docs/cli/
- https://pipedream.com/docs/mcp/
- https://mcp.pipedream.com/
