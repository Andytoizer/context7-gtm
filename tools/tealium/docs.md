# Tealium

## Agent Summary

Tealium lets agents work with Profiles, Audiences, Consent State, Events, Tags, Connectors, and Moments through official API and SDK surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Tealium in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

V3 APIs exchange Tealium iQ username plus API key for a 30-minute JWT bearer token and region-specific host. Moments API/MCP is for consented profile access.

## Main Objects

- Profiles
- Audiences
- Consent State
- Events
- Tags
- Connectors
- Moments
- Variables
- Load Rules

## Rate Limits

Endpoint-specific; request-format docs say excess returns 429. Collect HTTP API supports 100 events/second, or 10 bulk calls/second when sending 10 events per call.

## Pagination

Endpoint-specific; list/read endpoints define supported query parameters in their reference pages.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- MCP coverage is source-backed as an announced Moments API/MCP integration and demo implementation, not a standalone public MCP setup reference.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.tealium.com/api/v3/
- https://docs.tealium.com/api/v3/getting-started/authentication/
- https://docs.tealium.com/api/v3/getting-started/request-format/
- https://docs.tealium.com/api/v3/http-api/about/
- https://docs.tealium.com/api/v3/iq-profiles/
- https://docs.tealium.com/api/v3/visitor-privacy/
- https://docs.tealium.com/api/v3/visitor-profile/
- https://docs.tealium.com/platforms/getting-started-mobile/quick-start/
- https://tealium.com/press-releases/tealium-achieves-mcp-integration-to-fuel-agentic-ai-initiatives/
- https://tealium.com/developer-center/bridging-ai-and-customer-data-platforms-with-mcp/
