# Outplay

## Agent Summary

Outplay is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: no
- Community SDK / integration: yes

## Auth

Use `client_id` as a query parameter and `X-CLIENT-SECRET` as a request header. Official Outplay help confirms admins can find or create these credentials under User settings > Company settings > Integrations & API.

## Main Objects

- Prospects
- Accounts
- Sequences
- Tasks
- Calls
- Reports
- Users
- SMS
- Notes
- Activities
- Prospect Mails
- Intelligence

## Rate Limits

The public Postman docs list rate-limit response headers and document a burst limit of 100 calls per 10 seconds plus a daily limit of 100,000 calls per UTC day. The docs note that limits may vary for some APIs.

## Pagination

Endpoint-specific list pagination is present in the public Postman collection; confirm each endpoint before bulk reads.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- The endpoint reference is a public Postman document; official Outplay help confirms credential creation, and third-party connector docs corroborate the workspace API host pattern.

## Sources

- https://documenter.getpostman.com/view/16947449/TzsikPV1
- https://support.outplayhq.com/en/article/what-are-client-id-and-client-secret-while-connecting-zapier-to-outplay-and-where-to-find-those-in-outplay-1gwqqyb/
- https://docs.withampersand.com/provider-guides/outplay
- https://communitynodes.com/n8n-nodes-outplay/
- https://outplayhq.com/
