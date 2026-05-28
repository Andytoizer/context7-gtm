# Salesforce

## Agent Summary

Salesforce lets agents work with Account, Contact, Lead, Opportunity, Task/Event, Campaign, and Case through official MCP, API, CLI, and OpenAPI/spec surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Salesforce in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0, Connected Apps, and bearer tokens. Hosted MCP uses Salesforce auth and user permissions.

## Main Objects

- Account
- Contact
- Lead
- Opportunity
- Task/Event
- Campaign
- Case
- custom sObjects
- Flow/Apex actions

## Rate Limits

Org/license-based API limits; common allocation cited as 1,000 requests per user license per 24h, Developer Edition 15,000/org/day.

## Pagination

REST query locators/nextRecordsUrl; SOQL LIMIT/OFFSET; GraphQL cursor pagination.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.salesforce.com/docs/platform/hosted-mcp-servers/references/reference/servers-reference.html
- https://github.com/salesforcecli/mcp
- https://developer.salesforce.com/tools/salesforcecli/
- https://help.salesforce.com/s/articleView?id=000389027&language=en_US&type=1
- https://help.salesforce.com/s/articleView?id=release-notes.rn_api_rest.htm&language=en_US&release=236&type=5
