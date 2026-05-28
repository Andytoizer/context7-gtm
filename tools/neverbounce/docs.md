# NeverBounce

## Agent Summary

NeverBounce is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key; standard API should not be exposed client-side.

## Main Objects

- Account
- single_verification
- jobs
- POE/widget
- job_results

## Rate Limits

Dashboard-configurable throttling; bulk guidance says avoid more than 10 jobs per 100k items/hour and 25MB payload cap.

## Pagination

Job create/parse/start/status/result flow; result pagination endpoint details need endpoint-level scrape.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.neverbounce.com/v4.1/reference
- https://developers.neverbounce.com/v4.1/reference/jobs-create
- https://github.com/NeverBounce/NeverBounceApi-Go
- https://zapier.com/mcp/neverbounce
- https://composio.dev/toolkits/neverbounce/framework/open-ai-agents-sdk
