# Tally

## Agent Summary

Tally is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API key for REST API, or OAuth/API-key authentication for the official remote MCP server.

## Main Objects

- Forms
- blocks/fields
- submissions
- workspaces
- webhooks
- published form metadata

## Rate Limits

Public docs describe API availability but do not expose a single global rate limit; handle 429s and verify limits before high-volume sync.

## Pagination

Submissions and list endpoints use endpoint-specific pagination/filter parameters in the API reference.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://tally.so/help/api
- https://developers.tally.so/api-reference/introduction
- https://developers.tally.so/api-reference/api-keys
- https://developers.tally.so/api-reference/versioning
- https://developers.tally.so/api-reference/mcp
- https://developers.tally.so/llms.txt
- https://tally.so/help/mcp-server
- https://tally.so/help/webhooks
