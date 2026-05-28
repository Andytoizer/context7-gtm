# Clearbit

## Agent Summary

Clearbit remains needs-review for GTM Docs Registry agent docs retrieval. Public sources confirm API products such as Enrichment and Reveal, request/credit accounting, payload attributes, and a deprecated official Node SDK, but the current endpoint-level docs redirect to dashboard login.

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

Legacy/current customer support content refers to a secret Clearbit API key. `https://clearbit.com/docs` redirects to `https://dashboard.clearbit.com/docs` and then login, so current endpoint-level auth details require authenticated verification.

## Main Objects

- Person enrichment
- Company enrichment
- Company attributes
- Person attributes
- Reveal IP-to-company
- Batch enrichment
- Legacy Discovery/Prospector objects

## Rate Limits

Needs review. Public help docs describe what counts as an Enrichment API request and how Reveal is counted by monthly unique visitors. Historical SDK/community material mentions 600 requests per minute, but current public endpoint-level rate-limit docs were not available.

## Pagination

Needs review. Enrichment and Reveal are lookup-style surfaces. The deprecated Node SDK documents legacy Prospector page/page_size parameters, but current availability and pagination require authenticated docs.

## Agent Caveats

- Destructive action risk: medium.
- Do not implement against the deprecated SDK alone; it explicitly points users to HTTP docs.
- Clearbit by HubSpot/Breeze Intelligence changed packaging and new-customer availability.
- Public Help Center articles are marked for specific Clearbit customer plans and include legacy sections.

## Needs Human Review

Exact blocker: current endpoint-level API documentation at `clearbit.com/docs` is behind dashboard login, while public Help Center articles are legacy/customer-plan specific. Need authenticated confirmation of current Enrichment/Reveal availability, auth, rate limits, pagination, and OpenAPI/spec status.

## Sources

- https://clearbit.com/
- https://clearbit.com/docs
- https://help.clearbit.com/hc/en-us/categories/360000913214-APIs
- https://help.clearbit.com/hc/en-us/articles/115015390748-What-Counts-as-an-API-Request
- https://help.clearbit.com/hc/en-us/articles/360051664114-What-is-the-Reveal-API
- https://help.clearbit.com/hc/en-us/articles/4419649060119-What-Does-an-Enrichment-Payload-Look-Like
- https://help.clearbit.com/hc/en-us/articles/115012670127-Getting-Started-with-Batch-Enrichment
- https://help.clearbit.com/hc/en-us/articles/115015797408-Clearbit-API-Version-Change-Logs
- https://help.clearbit.com/hc/en-us/articles/21570749175703-Clearbit-By-HubSpot-Set-Up-Clearbit-Enrichment-for-HubSpot
- https://github.com/clearbit/clearbit-node
