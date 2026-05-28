# Apify

## Agent Summary

Apify lets agents work with Actors, actor runs, tasks, datasets, key-value stores, request queues, and webhooks through official MCP, API, CLI, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Apify in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Bearer API token; hosted MCP supports OAuth or Bearer token.

## Main Objects

- Actors
- actor runs
- tasks
- datasets
- key-value stores
- request queues
- webhooks
- builds

## Rate Limits

API global 250,000 req/min; default per-resource 60 req/s; MCP 30 req/s/user; X-RateLimit-Limit returned.

## Pagination

Offset/limit common; request queues use cursor/exclusiveStartId; endpoints cap max limit.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.apify.com/platform/integrations/mcp
- https://docs.apify.com/api/v2/
- https://docs.apify.com/cli
- https://docs.apify.com/api/v2/getting-started
- https://docs.apify.com/api/v2/request-queue-requests-get
