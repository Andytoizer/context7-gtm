# Mailchimp

## Agent Summary

Mailchimp is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key or OAuth 2; Basic or Bearer auth; data-center-specific base URL.

## Main Objects

- Audiences
- contacts/members
- campaigns
- reports
- automations
- ecommerce stores/orders/products
- batches
- webhooks
- transactional messages

## Rate Limits

10 simultaneous Marketing API connections/user; 120-second timeout; batch endpoint recommended for long-running work.

## Pagination

count/offset plus partial-response capabilities.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://mailchimp.com/developer/marketing/docs/fundamentals/
- https://mailchimp.com/developer/marketing/docs/errors/
- https://mailchimp.com/developer/transactional/guides/how-to-use-mailchimps-transactional-messaging-mcp/
- https://github.com/mailchimp
- https://mailchimp.com/developer/release-notes/new-client-libraries-marketing-transactional-apis/
