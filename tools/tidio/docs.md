# Tidio

## Agent Summary

Tidio is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Generate OpenAPI credentials in Tidio Panel under `Developer > OpenAPI`. Send `X-Tidio-Openapi-Client-Id` (`ci_` prefix), `X-Tidio-Openapi-Client-Secret` (`cs_` prefix), and `Accept: application/json; version=1` on requests.

## Main Objects

- Contacts
- Contact Properties
- Contact Messages
- Messages
- Operators
- Departments
- Tickets
- Products
- Lyro Data Sources
- Webhooks
- Widget Visitors

## Rate Limits

Plan-based OpenAPI limits: Free Trial and Starter/Growth with paid Lyro/Flows allow 10 requests/minute per project for Product Recommendation endpoints only; Plus allows 60 requests/minute per project; Premium allows 120 requests/minute per project. Responses include `x-ratelimit-limit` and `x-ratelimit-remaining`; exceeding limits returns 429.

## Pagination

Cursor pagination on paginated endpoints. Responses include `meta.cursor` and `meta.limit`; pass `cursor` as a GET parameter to fetch the next page, and a null cursor means no next page.

## Agent Caveats

- Destructive action risk: high.
- Official developer portal exposes OpenAPI, webhooks, Widget SDK docs, `llms.txt`, Markdown pages, and reference pages for contacts, operators, tickets, products, Lyro data sources, project info, and webhooks.
- OpenAPI availability is plan-gated: Product endpoints are available on paid Lyro plans; other OpenAPI endpoints require Plus or Premium.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.tidio.com/
- https://help.tidio.com/
- https://developers.tidio.com/
- https://developers.tidio.com/llms.txt
- https://developers.tidio.com/docs/openapi-enable
- https://developers.tidio.com/docs/openapi-authorization
- https://developers.tidio.com/docs/openapi-rate-limiting
- https://developers.tidio.com/docs/openapi-pagination
- https://developers.tidio.com/reference/get_contacts
- https://developers.tidio.com/reference/get_tickets
- https://developers.tidio.com/reference/put_products-batch
- https://developers.tidio.com/docs/webhooks-signature-verification
- https://developers.tidio.com/docs/widget-visitor-identification
