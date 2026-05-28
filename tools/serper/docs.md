# Serper

## Agent Summary

Serper is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Use the `X-API-KEY` header for POST requests. Official playground-generated GET examples also support an `apiKey` query parameter.

## Main Objects

- Google Search
- Organic Results
- Knowledge Graph
- People Also Ask
- Images
- News
- Maps
- Places
- Videos
- Shopping
- Scholar
- Patents
- Autocomplete
- Reviews
- Product Reviews
- Lens
- Webpage Scrape

## Rate Limits

Credit tier-specific: Starter 50 QPS, Standard 100 QPS, Scale 200 QPS, and Ultimate default 300 QPS. Serper says higher concurrency can be changed for specific use cases.

## Pagination

The official playground uses `page` for most search-like endpoints, `num` on selected endpoints such as search/images/videos/news/shopping, `nextPageToken` for reviews/product reviews, and requires `ll` GPS area for maps pagination after page 1.

## Agent Caveats

- Destructive action risk: low.
- Official public docs are thin; parameter details are exposed through the official playground and generated code examples.
- No official SDK, CLI, MCP, or direct OpenAPI spec was found. Community MCP/CLI projects should be treated as unofficial.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://serper.dev/
- https://serper.dev/playground
- https://serper.dev/_next/static/chunks/pages/playground-7ce8960e9fe2fc99.js
- https://github.com/garylab/serper-mcp-server
- https://pkg.go.dev/github.com/SecKatie/serper-mcp
- https://github.com/marcopesani/mcp-server-serper
- https://apify.com/serper/serper/api/openapi
