# Dripify

## Agent Summary

Dripify remains needs-review for agent docs retrieval. Public official docs describe product behavior and outbound webhook automation through Zapier, Make, or any public webhook URL that accepts an HTTP POST. They do not expose a first-party API reference, MCP server, CLI, OpenAPI spec, llms docs, official SDK, API authentication model, pagination, or rate limits.

The public automation surface is useful for event delivery from Dripify campaigns, but it is not enough to model direct agent retrieval against Dripify objects.

## Retrieval Priority

1. Use official Dripify help docs for product behavior and campaign webhook setup.
2. Use the official Zapier and Make articles for outbound event-delivery behavior.
3. If an agent needs direct Dripify API reads/writes, keep the task in review until private/customer-only API docs are provided.

## Auth

Public docs found during this audit describe webhook receiver URLs rather than a public first-party API key or OAuth model. For webhook destinations, Dripify sends data to the URL configured in a campaign integration.

## Main Objects

- Campaigns
- Leads
- LinkedIn outreach activity
- Automation events
- Outbound webhook payloads

## Agent Caveats

- Do not assume a direct public API exists.
- Do not infer Dripify endpoint shapes, auth headers, pagination, or rate limits from Zapier or Make connector behavior.
- Official Zapier docs say lead data can be transferred only through webhooks and that message content/other data cannot be transferred.
- Public webhook docs describe one condition per webhook integration within a single campaign.
- Any generated direct API integration should remain `Needs Human Review` until first-party API docs are confirmed.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: no public docs found
- OpenAPI/spec: no
- llms/AI docs: no
- Official SDK: no
- Strong community fallback: no

## Needs Human Review

No public first-party API, CLI, MCP, OpenAPI, SDK, endpoint, API-auth, pagination, or rate-limit docs were found. Public evidence supports only per-campaign outbound webhook automation, so direct agent API retrieval remains blocked unless private/customer-only docs exist.
