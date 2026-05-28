# Fireflies.ai

## Agent Summary

Fireflies.ai is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: yes
- Official SDK: no
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP OAuth or bearer API key; GraphQL bearer token.

## Main Objects

- Transcripts
- summaries
- users
- usergroups
- channels
- soundbites
- meetings

## Rate Limits

Free/Pro 50/day; Business/Enterprise 60/min; endpoint-specific limits exist.

## Pagination

GraphQL list/query pagination; MCP search/fetch patterns.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.fireflies.ai/getting-started/mcp-configuration
- https://docs.fireflies.ai/mcp-tools/overview
- https://docs.fireflies.ai/introduction
- https://docs.fireflies.ai/fundamentals/limits
- https://docs.fireflies.ai/graphql-api/mutation/delete-transcript
- https://github.com/props-labs/fireflies-mcp
