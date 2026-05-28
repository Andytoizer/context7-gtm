# Salesforce Account Engagement

## Agent Summary

Salesforce Account Engagement is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Salesforce OAuth access token plus Account Engagement business unit context/domain.

## Main Objects

- Prospects
- Accounts
- Campaigns
- Lists
- List Memberships
- Custom Fields
- Visitor Activities
- Forms
- Emails

## Rate Limits

Daily by edition: 25k Growth, 50k Plus, 100k Advanced/Premium; 5 concurrent requests.

## Pagination

v5 collection pagination via next-page style URLs/tokens; v3/v4 use older query patterns.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.salesforce.com/docs/marketing/pardot/guide/overview
