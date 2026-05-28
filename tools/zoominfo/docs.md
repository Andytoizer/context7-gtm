# ZoomInfo

## Agent Summary

ZoomInfo is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 client credentials and/or API credentials depending API generation.

## Main Objects

- Contacts
- Companies
- Search
- Enrichment
- Intent
- Scoops
- Technologies
- Org Charts
- Exports

## Rate Limits

Contract and endpoint-specific limits; 429 should be retried.

## Pagination

page/rpp or cursor patterns depending endpoint.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://api-docs.zoominfo.com/
- https://developers.zoominfo.com/
