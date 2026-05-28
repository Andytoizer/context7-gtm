# Keap

## Agent Summary

Keap is a CRM and marketing automation platform with current REST v2 API docs, OAuth/PAT/Service Account authentication docs, published quotas, an official OpenAPI-derived swagger file, and generated SDKs.

- Official website: https://keap.com/
- Developer guide: https://developer.keap.com/developer-guide/
- Last verified: 2026-05-28
- Agent readiness score: 5/5

## Available Surfaces

- Official MCP: no public first-party MCP server found.
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes. Keap's official SDK repository says SDKs are generated from an OpenAPI specification and includes `sdks/v2/swagger.yml`.
- llms/AI docs: no public `llms.txt` found.
- Official SDK: yes. The official `infusionsoft/keap-sdk` repository includes C#, Java, JavaScript, PHP, Python, and TypeScript SDKs plus examples.
- Community SDK / integration: yes. Keap also links developer community resources and legacy sample code.

## Auth

Keap supports OAuth 2.0 Authorization Code plus Refresh Token flows for apps. API requests use `Authorization: Bearer <access_token>` against `https://api.infusionsoft.com/crm/rest/v1/` or `https://api.infusionsoft.com/crm/rest/v2/`.

For single-account scripts, Keap also supports Personal Access Tokens and Service Account Keys. These are also sent as bearer tokens. Personal Access Tokens run under the creating user's visibility and permissions; Service Account Keys require admin creation and grant admin access to the app's stored data.

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

Keap publishes quota and throttle limits:

- OAuth key/secret pairs: 1500 queries per minute and 150000 queries per day, reset at 12:00 AM UTC.
- Personal Access Tokens and Service Account Keys: 10 queries per second, 240 queries per minute, and 30000 queries per day.
- A per-second spike policy also exists, with a documented default of 25 calls per second.
- Responses include `x-keap-product-quota-*`, `x-keap-product-throttle-*`, and tenant-throttle headers that agents should inspect before continuing high-volume work.

## Pagination

REST v2 list endpoints use `page_size` and `page_token` in the official swagger. Older REST v1 references may use legacy endpoint-specific pagination, so prefer REST v2 for new agent integrations.

## Agent Caveats

- Destructive action risk: high.
- REST v2 is the current REST surface; REST v1 is listed as deprecated in the developer guide.
- Keap and Infusionsoft domains both appear in official docs. Treat `developer.keap.com` and redirected `developer.infusionsoft.com` API docs as the same official developer surface.
- Service Account Keys are powerful admin-level credentials. Do not place them in client-side code or logs.
- Contact, commerce, invoice, payment, task, and campaign operations can mutate customer and revenue data.

## Sources

- https://developer.keap.com/developer-guide/
- https://developer.keap.com/docs/restv2/
- https://developer.keap.com/getting-started-oauth-keys/
- https://developer.keap.com/pat-and-sak/
- https://developer.keap.com/api-token-quota-and-usage-measurements/
- https://github.com/infusionsoft/keap-sdk
- https://github.com/infusionsoft/keap-sdk/blob/main/sdks/v2/swagger.yml
- https://documenter.getpostman.com/view/2915979/UVByKWEZ
