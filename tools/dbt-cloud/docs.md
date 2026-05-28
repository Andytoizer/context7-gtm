# dbt Cloud

## Agent Summary

dbt Cloud lets agents work with Accounts, Projects, Environments, Jobs, Runs, Artifacts, and Sources through official MCP, API, CLI, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using dbt Cloud in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
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
- dbt Labs currently brands many dbt Cloud surfaces as dbt Platform; use dbt Platform docs when they cover Cloud API, CLI, Semantic Layer, Discovery, and MCP capabilities.
- The first-party dbt MCP server is maintained under the dbt-labs GitHub organization and includes dbt Platform, Admin API, Semantic Layer, Discovery, CLI, and product-doc retrieval tools.
- The dbt Cloud OpenAPI specs are maintained in dbt-labs/dbt-cloud-openapi-spec; v3 is recommended, with v2 retained for routes not yet upgraded.

## Sources

- https://docs.getdbt.com/dbt-cloud/api-v2
- https://docs.getdbt.com/dbt-cloud/api-v3
- https://docs.getdbt.com/docs/cloud/dbt-cloud-cli-installation
- https://docs.getdbt.com/docs/dbt-cloud-apis/admin-cloud-api
- https://docs.getdbt.com/docs/dbt-apis/authentication
- https://docs.getdbt.com/docs/dbt-apis/sl-api-overview
- https://docs.getdbt.com/docs/dbt-apis/sl-python
- https://docs.getdbt.com/llms.txt
- https://github.com/dbt-labs/dbt-cloud-openapi-spec
- https://github.com/dbt-labs/dbt-mcp
- https://www.getdbt.com/blog/mcp
