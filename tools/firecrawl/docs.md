# Firecrawl

## Agent Summary

Firecrawl is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Authorization: Bearer fc-* API key; CLI login/browser/API-key/env auth; self-host can bypass cloud key.

## Main Objects

- Scrape jobs
- crawl jobs
- batch scrape jobs
- search results
- extracted structured data
- maps

## Rate Limits

Plan-based rate and concurrency limits; 429 on exceeded limits; CLI status shows concurrency and credits.

## Pagination

Crawl and batch scrape status can return next URL; SDKs can auto-paginate with controls.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.firecrawl.dev/api-reference/v2-introduction
- https://docs.firecrawl.dev/cli
- https://github.com/firecrawl/firecrawl-mcp-server
- https://docs.firecrawl.dev/sdks/overview
- https://raw.githubusercontent.com/firecrawl/firecrawl-docs/main/api-reference/v2-openapi.json
