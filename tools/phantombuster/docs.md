# PhantomBuster

## Agent Summary

PhantomBuster is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

X-Phantombuster-Key header with an API key created in workspace settings.

## Main Objects

- Agents/Phantoms
- containers/launches
- console output
- results
- scripts
- workspace storage
- LinkedIn leads
- lead lists
- companies

## Rate Limits

Current docs require testing in the built-in API reference and handling throttling; exact public limits should be confirmed per workspace/endpoint.

## Pagination

Endpoint-specific; results and storage endpoints should be checked in the API reference before bulk retrieval.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://support.phantombuster.com/hc/en-us/articles/4401916698130-Get-started-with-the-PhantomBuster-API
- https://hub.phantombuster.com/docs/api
- https://support.phantombuster.com/hc/en-us/sections/27979945401106-Use-the-PhantomBuster-API-to-Build-Custom-Workflows
