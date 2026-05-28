# Pylon

## Agent Summary

Pylon lets agents work with Users, contacts, accounts, issues, messages, teams, and KB articles through official MCP and API surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Pylon in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP OAuth; REST bearer API token.

## Main Objects

- Users
- contacts
- accounts
- issues
- messages
- teams
- KB articles
- audit logs
- training data

## Rate Limits

Often 60/min read, 20/min write/search; endpoint-specific.

## Pagination

Cursor; audit logs max page size 999; search limits up to 1000 on users.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://support.usepylon.com/articles/2407390554-connecting-to-the-pylon-mcp-server
- https://docs.usepylon.com/pylon-docs/developer/api/api-reference/users
- https://support.usepylon.com/articles/1797406754-exporting-audit-logs-to-a-siem
- https://docs.arcade.dev/en/resources/integrations/customer-support/pylon-api
