# AI Ark

## Agent Summary

AI Ark has a public developer hub for B2B company and people data enrichment. The current docs are strong enough for agent retrieval: they include a developer hub, `llms.txt`, Markdown docs, endpoint reference pages, authentication examples, rate-limit docs, webhook payloads, and an official remote MCP server.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

API key. The current Authentication page requires the API key in the `X-TOKEN` header and shows Python, JavaScript, and cURL examples. A getting-started page still mentions `Authorization: Bearer`, so agents should prefer the endpoint/auth reference examples and verify auth headers against the target endpoint before implementation.

## Main Objects

- Companies
- People
- Email finder/export jobs
- Webhook payloads
- Lists
- Credits
- Clay enrichment templates

## Rate Limits

The public docs state a global limit of 5 requests/second, 300 requests/minute, and 18,000 requests/hour. Exceeded calls return `429 Too Many Requests`, rate limits reset every 60 seconds, and service-specific concurrency can be viewed or upgraded in the developer portal.

## Pagination

Result endpoints document `page` and `size` parameters. Bulk endpoints such as People Search, Company Search, and Export People with Email document size-based retrieval; common bulk throughput examples use `size=100`, while Export People with Email supports up to 10,000 requested results per export.

## Agent Caveats

- Destructive action risk: medium.
- Raw OpenAPI URL was not confirmed during QA even though the docs site says endpoint references are OpenAPI-backed.
- Auth docs have one header mismatch between summary and reference pages; prefer the dedicated Authentication page and endpoint examples.

## Sources

- https://docs.ai-ark.com/
- https://docs.ai-ark.com/llms.txt
- https://docs.ai-ark.com/docs/authentication
- https://docs.ai-ark.com/docs/rate-limits
- https://docs.ai-ark.com/docs/mcp
- https://docs.ai-ark.com/reference/people-search-1
- https://docs.ai-ark.com/reference/company-search-1
- https://docs.ai-ark.com/reference/export-people-results-by-track-id
