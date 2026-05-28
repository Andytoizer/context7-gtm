# Serper

## Agent Summary

Serper is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

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

X-API-KEY header.

## Main Objects

- Google Search
- Organic Results
- Knowledge Graph
- People Also Ask
- Images
- News
- Maps
- Shopping

## Rate Limits

Plan-specific; Serper homepage says Ultimate credits default to 300 queries/second.

## Pagination

Likely num/page-style request parameters; official docs should be checked in-app/dashboard.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Official API docs were not easily crawlable; confirm pagination parameters and exact plan rate limits from Serper dashboard/docs.

## Sources

- https://serper.dev/
- https://github.com/garylab/serper-mcp-server
- https://pkg.go.dev/github.com/SecKatie/serper-mcp
- https://github.com/topics/serper
