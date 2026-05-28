# dbt Cloud

## Agent Summary

dbt Cloud is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

Service tokens or user API tokens; account/project permissions apply.

## Main Objects

- Accounts
- Projects
- Environments
- Jobs
- Runs
- Artifacts
- Sources
- Exposures
- Metrics

## Rate Limits

Rate limits and quotas depend on endpoint and account; retry 429 responses.

## Pagination

limit/offset pagination for many list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether MCP coverage is first-party dbt Labs or community-only for dbt Cloud.

## Sources

- https://docs.getdbt.com/dbt-cloud/api-v2
- https://docs.getdbt.com/docs/cloud/dbt-cloud-cli-installation
- https://docs.getdbt.com/docs/dbt-cloud-apis/admin-cloud-api
