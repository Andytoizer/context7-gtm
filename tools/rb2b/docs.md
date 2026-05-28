# RB2B

## Agent Summary

RB2B is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: unknown
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Outbound webhook URL; required auth must be embedded as query params.

## Main Objects

- Identified visitors
- company-only profiles
- visitor page views
- LinkedIn URL
- first/last name

## Rate Limits

Unknown.

## Pagination

Not applicable for webhook docs.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether partner/OEM API suite has accessible docs.

## Sources

- https://support.rb2b.com/en/articles/8976614-setup-guide-webhook
- https://support.rb2b.com/en/articles/10551225-how-rb2b-s-integrations-work
- https://www.rb2b.com/partner
