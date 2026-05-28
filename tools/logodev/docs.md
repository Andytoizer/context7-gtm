# Logo.dev

## Agent Summary

Logo.dev is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: no
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Image API uses publishable token query param; Describe/Brand API uses Bearer secret key.

## Main Objects

- Domain logos
- brand search results
- stock ticker logos
- crypto logos
- brand describe records

## Rate Limits

Monthly request limits by plan; no per-second/minute burst limit; proactive/soft enforcement.

## Pagination

No pagination found for image lookup; search/describe pagination unclear.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether an official OpenAPI spec exists and whether third-party MCP listings are acceptable.

## Sources

- https://docs.logo.dev/
- https://www.logo.dev/docs/platform/rate-limits
- https://docs.logo.dev/logo-images/get
- https://docs.logo.dev/describe/introduction
- https://mcp.pipedream.com/app/logo_dev
- https://composio.dev/toolkits/logo_dev/framework/ai-sdk
