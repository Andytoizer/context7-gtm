# Webflow

## Agent Summary

Webflow is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth 2.0 apps, site/workspace tokens, bearer access tokens.

## Main Objects

- Sites
- pages
- collections
- collection_items
- forms
- assets
- users
- webhooks

## Rate Limits

Documented per API/app/token in official docs.

## Pagination

limit/offset style on list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.webflow.com/
- https://developers.webflow.com/mcp/reference/overview
- https://developers.webflow.com/data/reference/rest-introduction
- https://developers.webflow.com/llms.txt
- https://www.npmjs.com/package/@webflow/webflow-cli
