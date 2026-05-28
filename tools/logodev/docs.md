# Logo.dev

## Agent Summary

Logo.dev is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
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

Image and Describe lookups are single-resource requests. Brand Search returns a maximum of 10 results and does not document cursor/offset pagination.

## Agent Caveats

- Destructive action risk: low.
- The public `api-reference/openapi.json` endpoint currently returns Mintlify sample content, not a Logo.dev API spec.
- Prefer official docs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.logo.dev/
- https://www.logo.dev/docs/platform/rate-limits
- https://docs.logo.dev/logo-images/get
- https://docs.logo.dev/brand-search/introduction
- https://docs.logo.dev/describe/introduction
- https://docs.logo.dev/platform/api-keys
- https://mcp.pipedream.com/app/logo_dev
- https://composio.dev/toolkits/logo_dev/framework/ai-sdk
