# Clearbit

## Agent Summary

Clearbit is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: no
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Bearer secret key for API/webhook access; newer HubSpot/Breeze paths may differ.

## Main Objects

- Person enrichment
- Company enrichment
- Company attributes
- Person attributes
- Reveal IP-to-company

## Rate Limits

Soft enrichment limit around 600 requests/min; exact current limits and availability need confirmation.

## Pagination

Single lookup APIs; batch enrichment is CSV/list based rather than cursor pagination.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Clearbit is now HubSpot/Breeze-adjacent and docs are partly legacy; confirm current new-customer API availability for Enrichment vs Reveal.

## Sources

- https://clearbit.com/platform/enrichment
- https://help.clearbit.com/hc/en-us/categories/360000913214-APIs
- https://help.clearbit.com/hc/en-us/articles/115015390748-What-Counts-as-an-API-Request
- https://help.clearbit.com/hc/en-us/articles/5975301365655-What-Enrichment-Attributes-Does-Clearbit-Return
- https://help.clearbit.com/hc/en-us/articles/360051664114-What-is-the-Reveal-API
