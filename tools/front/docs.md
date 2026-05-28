# Front

## Agent Summary

Front lets agents work with Accounts, Contacts, Conversations, Messages, Inboxes, Channels, and Tags through official MCP, API, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Front in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Bearer API token or OAuth; scopes and teammate permissions apply.

## Main Objects

- Accounts
- Contacts
- Conversations
- Messages
- Inboxes
- Channels
- Tags
- Teammates
- Comments
- Rules

## Rate Limits

Workspace and endpoint-specific rate limits; 429 responses include retry behavior.

## Pagination

Cursor pagination with next links for list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://dev.frontapp.com/reference/introduction
- https://dev.frontapp.com/docs/pagination
- https://front.com/blog/front-mcp-server
