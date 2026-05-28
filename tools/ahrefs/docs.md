# Ahrefs

## Agent Summary

Ahrefs is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

API keys for REST API; MCP uses consent flow/dedicated MCP-scoped API key, with optional manual MCP key.

## Main Objects

- Site Explorer
- Backlinks
- Keywords
- SERP Overview
- Rank Tracker
- Site Audit
- Batch Analysis
- Brand Radar
- Social Media

## Rate Limits

60 requests/minute default plus dynamic throttling; unit-based monthly plan limits.

## Pagination

Endpoint-specific rows/limits; plan-specific max rows per MCP/API request.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.ahrefs.com/en/api/docs/introduction
- https://docs.ahrefs.com/en/mcp/docs/introduction
