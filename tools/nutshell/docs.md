# Nutshell

## Agent Summary

Nutshell is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

API key with HTTP Basic auth; user-specific access.

## Main Objects

- Accounts
- Contacts
- Leads
- Activities
- Tasks
- Products
- Users
- Pipelines
- Custom Fields

## Rate Limits

Unknown.

## Pagination

JSON-RPC style pagination and filtering by method.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.nutshell.com/
- https://developers.nutshell.com/reference
