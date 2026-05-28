# RudderStack

## Agent Summary

RudderStack is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API tokens / workspace credentials; CLI config; MCP positioned read-only.

## Main Objects

- Sources
- Destinations
- Tracking Plans
- Transformations
- Pipelines
- Audiences
- Profiles

## Rate Limits

Unknown.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.rudderstack.com/docs/
- https://www.rudderstack.com/blog/ai-agents-cli-mcp-design-pattern/
- https://github.com/rudderlabs
