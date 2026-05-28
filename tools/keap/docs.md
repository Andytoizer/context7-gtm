# Keap

## Agent Summary

Keap is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 access tokens for Keap REST API apps.

## Main Objects

- Contacts
- Companies
- Tags
- Campaigns
- Opportunities
- Orders
- Products
- Invoices
- Payments
- Tasks

## Rate Limits

Public limits need confirmation; docs reference throttling and OAuth-app usage constraints.

## Pagination

limit/offset pagination on many list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm current Keap REST API docs, limits, and whether older Infusionsoft references should be treated as legacy.

## Sources

- https://developer.keap.com/
- https://developer.keap.com/docs/rest/
