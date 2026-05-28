# Similarweb

## Agent Summary

Similarweb is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Admin-generated API keys tied to account permissions and user credit allowances.

## Main Objects

- Websites
- Apps
- Traffic Metrics
- Engagement Metrics
- Keywords
- Referrals
- Audiences
- Batch Reports
- Capabilities
- Credits

## Rate Limits

REST: 10 requests/second/account; Batch: 20 pending requests/user.

## Pagination

limit, offset, sort, asc on many aggregated endpoints.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Similarweb mentions/developed MCP in company materials, but public setup docs were not found; confirm availability before marking official_mcp yes.

## Sources

- https://docs.similarweb.com/api-v5/support-and-faq
- https://developers.similarweb.com/docs/rate-limit
- https://developers.similarweb.com/docs/authentication
- https://ir.similarweb.com/financials/all-sec-filings/content/0001842731-25-000049/0001842731-25-000049.pdf
