# BigQuery

## Agent Summary

BigQuery is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0/IAM/ADC/service accounts; MCP uses OAuth/IAM and does not accept API keys.

## Main Objects

- Projects
- datasets
- tables
- jobs
- routines
- models
- row access policies
- tabledata

## Rate Limits

BigQuery quotas apply across console, bq CLI, REST, libraries, and MCP; core API requests/day unlimited but method/data limits apply.

## Pagination

REST list/tabledata methods use maxResults and pageToken; bq supports page_token.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.cloud.google.com/bigquery/docs/use-bigquery-mcp
- https://cloud.google.com/bigquery/docs/reference/bq-cli-reference
- https://cloud.google.com/bigquery/docs/reference/rest/
- https://docs.cloud.google.com/bigquery/docs/paging-results
- https://docs.cloud.google.com/bigquery/quotas
- https://docs.cloud.google.com/bigquery/docs/reference/libraries-overview
