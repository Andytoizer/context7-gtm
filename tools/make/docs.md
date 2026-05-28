# Make

## Agent Summary

Make lets agents work with Scenarios, executions, connections, data stores, webhooks/hooks, teams, and organizations through official MCP, API, CLI, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Make in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

User authentication token with scopes for REST API; MCP via OAuth or MCP bearer token.

## Main Objects

- Scenarios
- executions
- connections
- data stores
- webhooks/hooks
- teams
- organizations
- templates

## Rate Limits

Core 60/min, Pro 120/min, Teams 240/min, Enterprise 1000/min per organization.

## Pagination

pg[limit], pg[offset], pg[sortBy], pg[sortDir].

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.make.com/mcp-server
- https://help.make.com/make-mcp-server
- https://developers.make.com/api-documentation
- https://developers.make.com/api-documentation/getting-started/rate-limiting
- https://developers.make.com/api-documentation/pagination-sorting-filtering/pagination-and-sorting
- https://help.make.com/the-make-cli-is-now-live
- https://developers.make.com/api-documentation/client-libraries
