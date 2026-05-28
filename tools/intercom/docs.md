# Intercom

## Agent Summary

Intercom lets agents work with Conversations, contacts, tickets, admins, articles, companies, and segments through official MCP, API, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Intercom in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP OAuth or bearer token; REST access token/OAuth app auth.

## Main Objects

- Conversations
- contacts
- tickets
- admins
- articles
- companies
- segments
- tags
- messages

## Rate Limits

Default 10,000 API calls/min/app and 25,000/min/workspace.

## Pagination

Cursor; starting_after for search/list tools.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.intercom.com/docs/guides/mcp
- https://developers.intercom.com/docs/references/rest-api/api.intercom.io
- https://developers.intercom.com/docs/references/2.13/rest-api/errors/rate-limiting
- https://github.com/intercom/intercom-node
