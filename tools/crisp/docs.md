# Crisp

## Agent Summary

Crisp lets agents work with Websites, Conversations, Messages, People, Contacts, Segments, and Operators through official API, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Crisp in automations.

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
