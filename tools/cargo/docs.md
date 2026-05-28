# Cargo

## Agent Summary

Cargo lets agents work with Datasets, models, connectors, actions, segments, tools, and workflows through official API, CLI, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Cargo in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API token.

## Main Objects

- Datasets
- models
- connectors
- actions
- segments
- tools
- workflows
- plays
- agents
- files
- MCP server configs

## Rate Limits

Workspace-level API 429; connector-node limits only.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.getcargo.ai/api-reference/introduction
- https://docs.getcargo.ai/cli/overview
- https://docs.getcargo.ai/api-reference/ai--mcp/list-mcp-servers
