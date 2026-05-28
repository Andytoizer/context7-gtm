# ContactOut

## Agent Summary

ContactOut is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

API token in token header.

## Main Objects

- LinkedIn profile enrich
- people search/count
- contact info single/bulk
- company info/search
- decision makers
- email verifier
- contact checkers
- API usage

## Rate Limits

People Search 60/min; Contact Checker 150/min; other APIs 1000/min; 429 includes retry-after.

## Pagination

page parameter; responses include metadata.page, page_size, total_results.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api.contactout.com/
- https://contactout.com/api-feature
- https://mcp.pipedream.com/app/contactout
