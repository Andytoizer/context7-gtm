# Help Scout

## Agent Summary

Help Scout is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

OAuth 2.0 or API app credentials for Mailbox API and Docs API.

## Main Objects

- Mailboxes
- Conversations
- Customers
- Threads
- Users
- Teams
- Tags
- Workflows
- Docs Collections
- Articles

## Rate Limits

Documented per-endpoint and global limits with 429 retry behavior.

## Pagination

page/size pagination and embedded collection links.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.helpscout.com/mailbox-api/
- https://developer.helpscout.com/mailbox-api/overview/rate-limiting/
- https://developer.helpscout.com/docs-api/
