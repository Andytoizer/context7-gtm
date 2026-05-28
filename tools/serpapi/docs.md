# SerpAPI

## Agent Summary

SerpAPI is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

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

API key query parameter; hosted MCP URL embeds key; SDKs pass api_key.

## Main Objects

- Search Engines
- Organic Results
- Local Results
- Ads
- Knowledge Graph
- Images
- News
- Shopping
- Jobs
- Flights
- Search Archive

## Rate Limits

Plan/quota based; docs surface rate-limit errors, but exact default throughput is plan-specific.

## Pagination

Google-style start offset; serpapi_pagination/next links; async archive retrieval.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://serpapi.com/search-api
- https://serpapi.com/blog/introducing-serpapis-mcp-server/
- https://github.com/serpapi/mcp-server
- https://serpapi.com/integrations/node
- https://github.com/serpapi/serpapi-python
