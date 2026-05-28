# Zapier

## Agent Summary

Zapier lets agents work with MCP servers, tools/actions, apps, connections/accounts, zaps/workflows, triggers, and action catalog through official MCP, API, CLI, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Zapier in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Zapier account OAuth/connectors; SDK client credentials; Workflow API bearer auth; app connections managed by Zapier.

## Main Objects

- MCP servers
- tools/actions
- apps
- connections/accounts
- zaps/workflows
- triggers
- action catalog

## Rate Limits

Workflow API: 60 req/min per IP or 150 req/min per partner; Zap/webhook limits vary by surface.

## Pagination

Product-specific; app/action APIs vary, embedded triggers expose their own API contract.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://help.zapier.com/hc/en-us/articles/36265392843917-Use-Zapier-MCP-with-your-client
- https://docs.zapier.com/mcp/clients
- https://docs.zapier.com/sdk
- https://docs.zapier.com/sdk/using-the-cli
- https://docs.zapier.com/platform/build-cli/overview
- https://docs.zapier.com/powered-by-zapier/api-reference/rate-limiting
- https://docs.zapier.com/llms.txt
