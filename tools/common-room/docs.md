# Common Room

## Agent Summary

Common Room is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Core API Bearer JWT; MCP OAuth 2.1.

## Main Objects

- Contacts/members
- organizations
- activities
- segments
- custom fields
- signals

## Rate Limits

Documented 429 responses; numeric limits unknown.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.commonroom.io/docs/using-common-room/mcp-server/
- https://www.commonroom.io/developers/
- https://api.commonroom.io/docs/community.html
