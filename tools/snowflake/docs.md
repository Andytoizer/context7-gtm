# Snowflake

## Agent Summary

Snowflake is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

REST APIs use key-pair JWT, OAuth, or PAT; managed MCP uses OAuth 2.0 and Snowflake RBAC.

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

## Rate Limits

General REST thresholds not clearly published; Cortex REST has RPM/TPM limits and 429 behavior.

## Pagination

REST resources commonly use token/pageToken-style pagination; SQL API has async result/result-part handling.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether Snowflake publishes first-party OpenAPI specs for REST/SQL APIs and whether docs expose llms.txt.

## Sources

- https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp
- https://docs.snowflake.com/en/developer-guide/snowflake-cli/command-reference/overview
- https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/reference
- https://docs.snowflake.com/en/developer-guide/sql-api/index
- https://github.com/Snowflake-Labs/mcp
