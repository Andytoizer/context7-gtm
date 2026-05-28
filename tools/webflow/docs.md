# Webflow

## Agent Summary

Webflow lets agents work with Sites, pages, collections, collection items, forms, assets, and users through official MCP, API, CLI, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Webflow in automations.

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
