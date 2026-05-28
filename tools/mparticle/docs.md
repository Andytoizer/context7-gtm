# mParticle

## Agent Summary

mParticle is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth client_credentials for Platform API; platform API key/secret for event/identity APIs.

## Main Objects

- Workspaces
- Apps
- Audiences
- Feeds
- Services
- Users
- Events
- Identities
- Data Plans

## Rate Limits

Documented default service limits; endpoint/class-specific.

## Pagination

Endpoint-specific JSON wrappers.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.mparticle.com/developers/
- https://docs.mparticle.com/developers/tools/cli/
- https://docs.mparticle.com/developers/apis/platform/overview/
- https://docs.mparticle.com/developers/server/http
- https://docs.mparticle.com/guides/default-service-limits/
