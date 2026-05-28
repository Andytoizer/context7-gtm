# Google Places API

## Agent Summary

Google Places API lets agents work with Places, place photos, autocomplete sessions, text search, nearby search, and place details through official API and SDK surfaces plus community integration support. Check auth, pagination, rate limits, source links, and lower write risk before using Google Places API in automations.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key or OAuth token; billing must be enabled; field masks required/recommended for cost control.

## Main Objects

- Places
- place photos
- autocomplete sessions
- text search
- nearby search
- place details

## Rate Limits

Places usage limit shown as 6,000 QPM; billable SKU and quota controls in Cloud Console.

## Pagination

Text/Nearby Search use pageSize/pageToken with nextPageToken; usually 20/page, max 60 results/query.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.google.com/maps/documentation/places/web-service/reference/rest
- https://developers.google.com/maps/documentation/places/web-service/usage-and-billing
- https://developers.google.com/maps/faq
- https://developers.google.com/maps/documentation/places/web-service/text-search
- https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places/searchText
