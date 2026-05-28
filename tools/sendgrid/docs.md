# SendGrid

## Agent Summary

SendGrid is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

API key in Authorization Bearer header; scoped API keys supported.

## Main Objects

- Mail Send
- Contacts
- Lists
- Segments
- Single Sends
- Templates
- Suppressions
- Webhooks
- Domains
- IPs
- Subusers
- Stats

## Rate Limits

Endpoint-specific refresh windows; X-RateLimit-Limit/Remaining/Reset headers; 429 on exhaustion.

## Pagination

limit/offset for many GET resources, Link header where batched.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.twilio.com/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication
- https://www.twilio.com/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/rate-limits
- https://github.com/Garoth/sendgrid-mcp
