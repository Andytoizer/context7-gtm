# Insightly

## Agent Summary

Insightly is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key in Basic auth; account-specific API access.

## Main Objects

- Contacts
- Organizations
- Opportunities
- Leads
- Projects
- Tasks
- Events
- Notes
- Emails
- Custom Objects

## Rate Limits

Plan-based limits with 429 responses when exceeded.

## Pagination

skip/top style list pagination on REST endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api.insightly.com/v3.1/Help
- https://support.insight.ly/en-us/Knowledge/article/1817/Insightly_API/
