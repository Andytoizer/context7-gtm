# Loops

## Agent Summary

Loops is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: no
- Community SDK / integration: yes

## Auth

API key in Authorization Bearer header; CLI uses LOOPS_API_KEY or keyring.

## Main Objects

- Contacts
- Contact Properties
- Mailing Lists
- Events
- Transactional Emails
- Campaigns
- Email Messages
- Themes
- Components
- Uploads

## Rate Limits

10 requests/second per team; x-ratelimit headers; 429 on exceed.

## Pagination

Endpoint-specific; inspect official OpenAPI for exact list parameters.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm this entry should target Loops.so email platform; separate useLoops.io MCP docs appear to describe a different agent/workspace product.

## Sources

- https://loops.so/docs/api-reference/intro
- https://loops.so/docs/cli
- https://loops.so/docs/llms.txt
- https://app.loops.so/openapi.json
