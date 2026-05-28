# GoHighLevel

## Agent Summary

GoHighLevel is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 for marketplace apps; Private Integration Tokens; bearer JWT scoped by company/location.

## Main Objects

- Contacts
- conversations/messages
- calendars
- appointments
- opportunities/pipelines
- payments/products
- locations
- workflows
- webhooks

## Rate Limits

V2 public APIs: 100 requests/10 sec per app per resource; 200,000/day per app per resource.

## Pagination

Endpoint-specific list/search pagination; needs per-endpoint handling.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://marketplace.gohighlevel.com/docs/
- https://help.gohighlevel.com/support/solutions/articles/155000005741-how-to-use-the-highlevel-mcp-server
- https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api
- https://marketplace.gohighlevel.com/docs/sdk/GettingStartedSDK/index.html
- https://mcp.localbosses.org/
