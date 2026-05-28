# Crisp

## Agent Summary

Crisp is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Identifier/key Basic auth or plugin tokens depending API surface.

## Main Objects

- Websites
- Conversations
- Messages
- People
- Contacts
- Segments
- Operators
- Plugins
- Campaigns

## Rate Limits

Public API rate limits exist by route/token; 429 responses should be retried.

## Pagination

page-number pagination on list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.crisp.chat/references/rest-api/v1/
- https://github.com/crisp-im/node-crisp-api
