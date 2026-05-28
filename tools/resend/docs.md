# Resend

## Agent Summary

Resend is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: no
- Community SDK / integration: yes

## Auth

API key in Authorization Bearer header; direct HTTP requires User-Agent.

## Main Objects

- Emails
- Batches
- Domains
- Audiences
- Contacts
- Broadcasts
- Templates
- Webhooks
- API Keys
- Logs

## Rate Limits

Default 5 requests/second per team; 429 on exceed; increase available by request.

## Pagination

Cursor-based on supported list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.resend.com/docs/api-reference/introduction
- https://resend.com/docs/cli
- https://resend.com/changelog/mcp
- https://github.com/resend/mcp-send-email
