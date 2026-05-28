# Iterable

## Agent Summary

Iterable is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key or JWT-enabled API key; header auth preferred.

## Main Objects

- Users
- Events
- Templates
- Campaigns
- Journeys
- Lists
- Catalogs
- Exports
- Message Types

## Rate Limits

Endpoint-specific; applied per project, API key, or organization; 429 with exponential backoff.

## Pagination

Endpoint-specific; API reference includes pagination objects/fields.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://support.iterable.com/hc/en-us/articles/41044692130196-Getting-Started-with-Iterable-s-API
- https://api.iterable.com/api/docs
