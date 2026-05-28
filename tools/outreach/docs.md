# Outreach

## Agent Summary

Outreach is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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
- Community SDK / integration: unknown

## Auth

OAuth 2.0 bearer tokens with Outreach API access/scopes.

## Main Objects

- Prospects
- accounts
- sequences
- sequence states
- tasks
- calls
- mailings
- opportunities
- users
- stages

## Rate Limits

Generally 10,000 requests/hour per user.

## Pagination

Cursor-based page[size] with links.next; offset pagination deprecated, max offset 10,000, page limit max 1,000.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.outreach.io/api/getting-started
- https://developers.outreach.io/api/making-requests
- https://support.outreach.io/hc/en-us/articles/46458159059227-Connect-to-Outreach-MCP-Server-using-CLI-or-Config-Tools
