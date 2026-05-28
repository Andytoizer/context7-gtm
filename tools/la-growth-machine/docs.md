# La Growth Machine

## Agent Summary

La Growth Machine is a multichannel outbound platform for lead enrichment, LinkedIn/email/X outreach, campaigns, inbox handling, webhooks, and CRM-oriented integrations. It publishes an official public Postman API document, an official `llms.txt`, and integration pages that confirm API and webhook availability.

- Official website: https://lagrowthmachine.com/
- API docs: https://documenter.getpostman.com/view/32966764/2sBXqFM2Vv
- Last verified: 2026-05-28
- Agent readiness score: 4/5

## Available Surfaces

- Official MCP: no. Official navigation says MCP is coming soon, but no public first-party MCP server/install surface was found.
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no public OpenAPI document found. Official API docs are published as a Postman document.
- llms/AI docs: yes. `https://lagrowthmachine.com/llms.txt` is public.
- Official SDK: no public first-party SDK found.
- Community MCP: unknown. Third-party toolkits exist and must be treated as unofficial integrations rather than first-party agent surfaces.
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

The API base URL is `https://apiv2.lagrowthmachine.com/flow`. API requests use an API key from account settings. Official docs support three auth placements:

- `Authorization: Bearer YOUR_API_KEY` (recommended)
- `x-api-key: YOUR_API_KEY`
- `?apikey=YOUR_API_KEY` as a legacy query parameter

Agents should prefer headers and avoid logging URLs that contain query-string API keys.

## Main Objects

- Leads
- Audiences
- Campaigns
- Identities
- Members
- Inbox webhooks
- Conversations
- Messages
- Credits
- CRM search

## Rate Limits

Official API docs state a rate limit of 50 calls per 10 seconds per API key. Excess requests return HTTP 429. Agents should add retry logic with backoff and avoid tight polling.

## Pagination

List endpoints use `skip` and `limit`. The documented campaigns endpoint defaults to `limit=25` and lists 25 as the maximum. Conversation message retrieval uses a `page` query parameter.

## Agent Caveats

- Destructive action risk: high.
- The API can create/update leads, create audiences, remove leads from audiences, send LinkedIn/email messages, and create/delete inbox webhooks.
- The official website says API access is available from the Pro plan and that full docs are available under Settings > Integrations & API.
- Website visitor endpoints are webhook-style ingestion endpoints for RB2B, Warmly, and Vector visitor data.
- Treat third-party MCP/toolkit coverage as community, not official.

## Sources

- https://lagrowthmachine.com/
- https://lagrowthmachine.com/integrations/
- https://lagrowthmachine.com/pricing/
- https://lagrowthmachine.com/llms.txt
- https://documenter.getpostman.com/view/32966764/2sBXqFM2Vv
- https://docs.composio.dev/toolkits/lagrowthmachine
- https://docs.getcargo.ai/integration/lgm
- https://nango.dev/docs/integrations/all/lagrowthmachine/connect
