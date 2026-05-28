# Typeform

## Agent Summary

Typeform is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Personal access tokens or OAuth 2.0 bearer tokens; EU data-center accounts use EU API base URLs.

## Main Objects

- Forms/typeforms
- fields
- themes
- images
- responses
- webhooks
- workspaces
- teams
- applications
- embeds

## Rate Limits

Create and Responses APIs document two requests per second per Typeform account.

## Pagination

Responses and list endpoints use endpoint-specific parameters such as page_size, before/after tokens, or form-specific query filters.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.typeform.com/developers/
- https://www.typeform.com/developers/get-started/
- https://www.typeform.com/developers/get-started/applications/
- https://www.typeform.com/developers/create/
- https://github.com/Typeform/js-api-client
- https://github.com/Typeform/embed
