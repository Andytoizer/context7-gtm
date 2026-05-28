# OWOX

## Agent Summary

OWOX lets agents work with Data Marts, Connectors, Storages, Reports, Semantic Layer Metrics, Schedules, and Google Sheets through official CLI and SDK surfaces plus community integration support. Check auth, pagination, rate limits, source links, and medium write risk before using OWOX in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: yes
- Official API: no
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: no
- Community SDK / integration: yes

## Auth

Self-hosted/local app credentials; storage auth varies by warehouse. BigQuery supports service-account JSON or Google OAuth; source connector auth varies by the upstream API.

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

No public OWOX platform REST API rate limit applies; connector jobs inherit upstream source API and warehouse limits. Connector SDK exposes retry hooks and treats 429 as retryable.

## Pagination

Connector/source-specific. The connector SDK documents next-page URL loops and optional per-endpoint limits; Data Mart exports deliver results to configured storages/destinations.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- OWOX is primarily an open-source data-mart/connector platform, not a general-purpose remote SaaS REST API; agent implementations should use the CLI, local app, and connector package docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.owox.com/docs/getting-started/quick-start/
- https://github.com/OWOX/owox-data-marts
- https://docs.owox.com/apps/owox/contributing/
- https://docs.owox.com/docs/contributing/repository/release-strategy/
- https://docs.owox.com/packages/connectors/contributing/
- https://docs.owox.com/packages/connectors/creating-connector/
- https://docs.owox.com/docs/getting-started/setup-guide/connector-data-mart/
- https://docs.owox.com/
- https://docs.owox.com/docs/storages/supported-storages/google-bigquery/
