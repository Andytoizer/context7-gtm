# Framer

## Agent Summary

Framer is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Framer API tokens / auth token for Server API.

## Main Objects

- Sites
- projects
- pages
- redirects
- collection_items
- folders
- locales

## Rate Limits

Unknown.

## Pagination

Cursor-style pagination appears in Server API list flows.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm whether any Framer MCP is officially maintained; public official docs clearly cover Server API/SDK but not an official MCP install surface.

## Sources

- https://www.framer.com/developers/server-api-introduction
- https://www.framer.com/developers/server-api-quick-start
- https://www.framer.com/llms.txt
- https://www.npmjs.com/package/framer-api
