# Google Places API

## Agent Summary

Google Places API is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

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

## Needs Human Review

Decide whether to include community MCP wrappers or only official Google REST/client-library docs.

## Sources

- https://developers.google.com/maps/documentation/places/web-service/reference/rest
- https://developers.google.com/maps/documentation/places/web-service/usage-and-billing
- https://developers.google.com/maps/faq
- https://developers.google.com/maps/documentation/places/web-service/text-search
- https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places/searchText
