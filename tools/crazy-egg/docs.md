# Crazy Egg

## Agent Summary

Crazy Egg is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Site/domain Conversion Tracking API key.

## Main Objects

- Goal Conversions
- Goals
- Site API Keys
- UTM Parameters
- Custom Conversion Data
- Survey Responses

## Rate Limits

429 Too Many Requests is documented for the Conversion Tracking API, but no numeric quota is published. Zapier's Crazy Egg app page says no Zapier-side usage limits.

## Pagination

No pagination for the documented Conversion Tracking API; conversion events are submitted in batches of 1-25.

## Agent Caveats

- Destructive action risk: low.
- Official public developer surface found is the server-side Conversion Tracking API at https://track.crazyegg.com/api/v1.
- Zapier provides a third-party Crazy Egg MCP/integration surface using Zapier auth and actions, including survey-response workflows, but it is not an official Crazy Egg API reference.
- No official public REST/OpenAPI/SDK docs were found for account administration, heatmap/snapshot reports, recordings, A/B tests, or survey export.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Keep needs-review: official public API coverage is limited to server-side conversion event ingestion; no official public account/report API for heatmaps, snapshots, recordings, A/B tests, or survey retrieval was found.

## Sources

- https://support.crazyegg.com/knowledge-base/conversion-tracking-api/
- https://help.zapier.com/hc/en-us/articles/10459896422285-How-to-get-started-with-Crazy-Egg-on-Zapier
- https://zapier.com/mcp/crazy-egg
