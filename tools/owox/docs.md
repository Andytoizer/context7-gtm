# OWOX

## Agent Summary

OWOX is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: yes
- Official API: unknown
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: no
- Community SDK / integration: yes

## Auth

Self-hosted/local app credentials; storage auth via BigQuery service account JSON or Google OAuth; connector auth varies by source API.

## Main Objects

- Data Marts
- Connectors
- Storages
- Reports
- Semantic Layer Metrics
- Schedules
- Google Sheets
- Data Studio
- Warehouse Destinations

## Rate Limits

No public OWOX platform API rate limit found; inherits connector source API and warehouse limits.

## Pagination

Connector/source-specific; Data Mart exports handle result delivery to sheets/warehouses.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

OWOX is primarily an open-source analytics/data-mart platform, not a sales-intelligence data API; confirm whether it belongs in this GTM docs chunk.

## Sources

- https://www.owox.com/
- https://docs.owox.com/
- https://docs.owox.com/docs/getting-started/quick-start/
- https://docs.owox.com/docs/storages/supported-storages/google-bigquery/
- https://docs.owox.com/apps/owox/publishing/
