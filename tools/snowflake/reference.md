# Reference Details

Dense retrieval notes for Snowflake. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/snowflake
- Slug: snowflake
- Aliases: none recorded
- Agent readiness score: 4/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth And Permission Model

- REST APIs use key-pair JWT, OAuth, or PAT; managed MCP uses OAuth 2.0 and Snowflake RBAC.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

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

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: General REST thresholds not clearly published; Cortex REST has RPM/TPM limits and 429 behavior.
- Pagination: REST resources commonly use token/pageToken-style pagination; SQL API has async result/result-part handling.
- Back off on 429/rate-limit responses and preserve vendor retry headers when available.
- For cursor pagination, store the cursor alongside the source query so retries do not skip or duplicate records.

## Destructive Operation Guardrails

- Destructive action risk: high.
- Snowflake REST API docs link to first-party OpenAPI specifications in the snowflakedb/snowflake-rest-api-specs GitHub repository.
- Snowflake docs expose a hierarchical llms.txt index plus section-specific llms.txt files and Markdown page variants.
- Snowflake-managed MCP supports tool discovery/invocation for Cortex Search, Cortex Analyst, Cortex Agents, SQL execution, and UDF/stored procedure tools; SQL execution can be configured read-only or write-capable.
- Snowflake REST APIs are OpenAPI-compliant and Snowflake publishes first-party specs in `snowflakedb/snowflake-rest-api-specs`.
- Snowflake documentation exposes `https://docs.snowflake.com/llms.txt`, section-level llms indexes, and Markdown page variants.
- General REST rate limits are not consolidated in one official page; refresh endpoint-specific limits before operational use.
- Prefer read-only validation first. For writes, require a concrete target record/list/workspace and a bounded operation size.
- Capture before/after IDs and source URLs in downstream audit logs.

## Retrieval Hints

- Good topic strings: `auth`, `mcp`, `api`, `openapi`, `pagination`, `rate limits`, `webhooks`, `objects`, `destructive operations`.
- Ask for the most specific object or action when available, for example `contacts auth`, `campaign pagination`, `workflow activation`, or `record delete caveats`.
- If the returned docs are ambiguous, fetch /tools/snowflake/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: https://docs.snowflake.com
- docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp (source): https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-mcp
- docs.snowflake.com/en/developer-guide/snowflake-cli/command-reference/overview (source): https://docs.snowflake.com/en/developer-guide/snowflake-cli/command-reference/overview
- docs.snowflake.com/en/developer-guide/snowflake-rest-api/snowflake-rest-api (source): https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/snowflake-rest-api
- docs.snowflake.com/en/developer-guide/snowflake-rest-api/reference (source): https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/reference
- docs.snowflake.com/en/developer-guide/sql-api/index (source): https://docs.snowflake.com/en/developer-guide/sql-api/index
- docs.snowflake.com/llms.txt (source): https://docs.snowflake.com/llms.txt
- github.com/snowflakedb/snowflake-rest-api-specs (source): https://github.com/snowflakedb/snowflake-rest-api-specs
- github.com/Snowflake-Labs/mcp (source): https://github.com/Snowflake-Labs/mcp

## Profile-Derived Operational Context

The main profile contains the operational context for this tool. This reference file adds retrieval-oriented guardrails and should be used with the official sources above.
