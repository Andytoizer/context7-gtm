# Snowflake

## Agent Summary

Snowflake is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

REST APIs use key-pair JWT, OAuth, or PAT depending on endpoint family; the Snowflake-managed MCP server uses OAuth 2.0 aligned with MCP authorization guidance and Snowflake RBAC. PAT use should be least-privilege.

## Main Objects

- Databases
- schemas
- tables
- warehouses
- roles
- users
- grants
- stages
- tasks
- Cortex Search/Analyst/Agents
- MCP server objects
- UDFs and stored procedures as MCP tools

## Rate Limits

General REST thresholds not clearly published; Cortex REST has RPM/TPM limits and 429 behavior.

## Pagination

REST resources commonly use token/pageToken-style pagination; SQL API has async result/result-part handling.

## Agent Caveats

- Destructive action risk: high.
- Snowflake-managed MCP supports tool discovery/invocation for Cortex Search, Cortex Analyst, Cortex Agents, SQL execution, and UDF/stored procedure tools; SQL execution can be configured read-only or write-capable.
- Snowflake REST APIs are OpenAPI-compliant and Snowflake publishes first-party specs in `snowflakedb/snowflake-rest-api-specs`.
- Snowflake documentation exposes `https://docs.snowflake.com/llms.txt`, section-level llms indexes, and Markdown page variants.
- General REST rate limits are not consolidated in one official page; refresh endpoint-specific limits before operational use.

## Sources

- https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp
- https://docs.snowflake.com/en/developer-guide/snowflake-cli/command-reference/overview
- https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/snowflake-rest-api
- https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/reference
- https://docs.snowflake.com/en/developer-guide/sql-api/index
- https://docs.snowflake.com/llms.txt
- https://github.com/snowflakedb/snowflake-rest-api-specs
- https://github.com/Snowflake-Labs/mcp
