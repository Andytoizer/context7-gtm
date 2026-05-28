# Diffbot

## Agent Summary

Diffbot is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API token.

## Main Objects

- Knowledge Graph Entities
- Organizations
- People
- Articles
- Products
- Events
- Extract
- Crawl
- Bulk
- Enhance
- Natural Language

## Rate Limits

Plan-based: Free 5 calls/min, Startup 5 calls/sec, Plus 25 calls/sec, Enterprise 25+/sec.

## Pagination

size/from-style KG queries and job/search metadata; endpoint-specific.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.diffbot.com/
- https://docs.diffbot.com/reference/authentication
- https://www.diffbot.com/pricing
- https://github.com/diffbot
- https://docs.diffbot.com/docs/getting-started-with-diffbot-knowledge-graph
