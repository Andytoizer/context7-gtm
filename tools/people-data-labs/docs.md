# People Data Labs

## Agent Summary

People Data Labs is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key in X-Api-Key header or query parameter depending client.

## Main Objects

- Person
- Company
- Enrichment
- Search
- Bulk Enrichment
- Autocomplete
- Cleaner
- Usage

## Rate Limits

Plan-based requests and concurrency; 429 on exceeded limits.

## Pagination

scroll_token for search; batch jobs for bulk.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.peopledatalabs.com/
- https://docs.peopledatalabs.com/docs/authentication
- https://docs.peopledatalabs.com/docs/rate-limits
- https://github.com/peopledatalabs/peopledatalabs-python
