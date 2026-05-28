# Autoklose

## Agent Summary

Autoklose is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: no
- Community SDK / integration: yes

## Auth

Generate an API token from the Autoklose API/integrations page and pass it as the `api_token` URI/query parameter.

## Main Objects

- Contacts
- Contact fields
- Campaigns
- Campaign recipients
- Do-not-email domains
- Events
- Replies
- Saved emails
- Templates
- Email accounts
- Webhooks
- User/me

## Rate Limits

Unknown.

## Pagination

Paginated GET endpoints return `links` and `meta` objects. `page` defaults to 1 and `per_page` defaults to 25, with a documented maximum of 100.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Official Autoklose help links to the public API reference; the Postman document includes a 2025 changelog.

## Sources

- https://help.autoklose.com/hc/en-us/articles/38956030013211-Does-Autoklose-have-a-public-API
- https://api.aklab.xyz/
- https://developers.linkapi.solutions/docs/autoklose
- https://zapier.com/mcp/autoklose
- https://mcp.pipedream.com/app/autoklose
- https://www.autoklose.com/
