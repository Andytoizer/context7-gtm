# Microsoft Dynamics 365 Sales

## Agent Summary

Microsoft Dynamics 365 Sales is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Microsoft Entra ID OAuth 2.0 tokens with Dataverse permissions and security roles.

## Main Objects

- Accounts
- Contacts
- Leads
- Opportunities
- Activities
- Cases
- Products
- Quotes
- Orders
- Invoices
- custom tables

## Rate Limits

Dataverse service protection limits apply by user, organization, and time window; 429 responses include retry guidance.

## Pagination

OData nextLink and paging cookies; Dataverse Web API supports $top, $skiptoken, and server-driven paging.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://learn.microsoft.com/en-us/dynamics365/sales/developer/overview
- https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview
- https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits
- https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction
- https://github.com/microsoft/PowerPlatformConnectors
