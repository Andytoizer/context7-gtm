# Adobe Marketo Engage

## Agent Summary

Adobe Marketo Engage is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

LaunchPoint API-only user; OAuth access token sent as Authorization Bearer.

## Main Objects

- Leads
- Persons
- Activities
- Lists
- Companies
- Opportunities
- Programs
- Campaigns
- Assets
- Forms
- Email Templates

## Rate Limits

50,000 calls/day default, 100 calls/20 seconds, 10 concurrent calls.

## Pagination

nextPageToken for lead/activity-style reads; endpoint-specific bulk/export paging.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://experienceleague.adobe.com/en/docs/marketo-developer/marketo/rest/rest-api
- https://developer.adobe.com/marketo-apis/api/mapi
- https://github.com/CDataSoftware/marketo-mcp-server-by-cdata
