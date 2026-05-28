# Airbyte

## Agent Summary

Airbyte is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

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

Bearer tokens for Cloud API; workspace credentials and environment variables for local/OSS.

## Main Objects

- Workspaces
- Sources
- Destinations
- Connections
- Jobs
- Streams
- Schemas
- Connector Definitions

## Rate Limits

API rate limits vary by deployment/cloud tier; 429 should be retried with backoff.

## Pagination

limit/offset or tokenized pagination depending API generation/version.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://reference.airbyte.com/reference/start
- https://docs.airbyte.com/platform/api-documentation
- https://docs.airbyte.com/platform/operator-guides/using-the-airbyte-cli
- https://docs.airbyte.com/platform/mcp-server
