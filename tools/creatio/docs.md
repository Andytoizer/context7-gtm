# Creatio

## Agent Summary

Creatio is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 or Creatio authentication depending product/version and API surface.

## Main Objects

- Accounts
- Contacts
- Leads
- Opportunities
- Activities
- Cases
- Orders
- Products
- custom objects

## Rate Limits

Unknown.

## Pagination

OData-style pagination and filtering for entity collections.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm current public API surface and auth model for modern Creatio CRM versus older platform docs.

## Sources

- https://academy.creatio.com/docs/developer/integrations_and_api
- https://academy.creatio.com/docs/developer/integrations_and_api/data_services/odata
