# Zoho CRM

## Agent Summary

Zoho CRM lets agents work with Leads, Contacts, Accounts, Deals, Tasks, Events, and Calls through official API, CLI, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Zoho CRM in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 access tokens with Zoho account data-center-specific domains.

## Main Objects

- Leads
- Contacts
- Accounts
- Deals
- Tasks
- Events
- Calls
- Campaigns
- Products
- Quotes
- Sales Orders
- Invoices
- custom modules

## Rate Limits

Edition and API-credit based limits; concurrency and daily credit limits vary by org and endpoint.

## Pagination

page/per_page for many list APIs; bulk/read APIs use job-based retrieval.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.zoho.com/crm/developer/docs/api/v8/
- https://www.zoho.com/crm/developer/docs/api/v8/oauth-overview.html
- https://www.zoho.com/crm/developer/docs/server-side-sdks.html
- https://www.zoho.com/crm/developer/docs/api/v8/api-limits.html
