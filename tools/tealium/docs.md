# Tealium

## Agent Summary

Tealium is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Tealium API auth varies by endpoint; Moments API/MCP for consented profile access.

## Main Objects

- Profiles
- Audiences
- Consent State
- Events
- Tags
- Connectors
- Moments

## Rate Limits

Endpoint-specific; 429 on excess.

## Pagination

Endpoint-specific.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether MCP is generally available or customer/feature-gated.

## Sources

- https://docs.tealium.com/api/v3/getting-started/request-format/
- https://tealium.com/press-releases/tealium-achieves-mcp-integration-to-fuel-agentic-ai-initiatives/
- https://tealium.com/developer-center/bridging-ai-and-customer-data-platforms-with-mcp/
