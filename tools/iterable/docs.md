# Iterable

## Agent Summary

Iterable lets agents work with Users, Events, Templates, Campaigns, Journeys, Lists, and Catalogs through official API, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Iterable in automations.

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
