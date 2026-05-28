# Semrush

## Agent Summary

Semrush lets agents work with Domains, Keywords, Backlinks, Competitors, Traffic Trends, Projects, and Site Audits through official MCP and API surfaces plus community integration support. Check auth, pagination, rate limits, source links, and medium write risk before using Semrush in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key for APIs; MCP supports OAuth 2.1 by default and API-key header for some clients.

## Main Objects

- Domains
- Keywords
- Backlinks
- Competitors
- Traffic Trends
- Projects
- Site Audits
- Listings
- Map Rank Campaigns

## Rate Limits

Unit-based consumption; Trends API includes 10,000 requests/month by default; endpoint/report costs vary.

## Pagination

Endpoint/report-specific line limits and result sizing.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.semrush.com/api/get-started/api-access/
- https://developer.semrush.com/api/introduction/semrush-mcp/
