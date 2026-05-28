# Chameleon

## Agent Summary

Chameleon lets agents work with Users, Companies, Events, Experiences, Tours, Microsurveys, and Launchers through official API and SDK surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Chameleon in automations.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

REST API auth plus JavaScript API installation; exact token model endpoint-specific.

## Main Objects

- Users
- Companies
- Events
- Experiences
- Tours
- Microsurveys
- Launchers
- Segments
- Deliveries
- Webhooks

## Rate Limits

Global 60-120 requests/min; some concurrency limits.

## Pagination

Bulk/list docs reference limit=500.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.chameleon.io/
- https://developers.chameleon.io/concepts/rate-limiting
- https://developers.chameleon.io/guides/api/bulk-operations
