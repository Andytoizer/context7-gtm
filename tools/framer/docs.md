# Framer

## Agent Summary

Framer lets agents work with Projects, pages, CMS collections, CMS collection items, code files, canvas nodes, and images/assets through official API, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using Framer in automations.

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

Framer Server API requires a project-bound API key generated from the project's Site Settings. Scripts pass the key to `connect(projectUrl, process.env.FRAMER_API_KEY)` from the `framer-api` package.

## Main Objects

- Projects
- pages
- CMS collections
- CMS collection items
- code files
- canvas nodes
- images/assets
- deployments
- users

## Rate Limits

No public per-endpoint rate limits found. The Server API FAQ says the API is in beta, beta usage is free, and future pricing will likely be per-use with a monthly free allowance.

## Pagination

No general REST pagination model found. Framer's official FAQ says the Server API uses persistent streaming WebSockets rather than HTTP REST methods; REST is only shown as an example wrapper that forwards actions to the streaming API.

## Agent Caveats

- Destructive action risk: medium.
- Server API can publish preview links and promote deployments to production, and the FAQ says operations are not transactional; handle partial failures carefully.
- Official Framer docs mention building an MCP server as a Server API use case, but first-party developer docs do not publish canonical MCP setup instructions.
- Framer Marketplace lists third-party MCP plugins; MCP directory listings should not be treated as the source of truth for destructive site changes.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.framer.com/developers/server-api-introduction
- https://www.framer.com/developers/server-api-quick-start
- https://www.framer.com/developers/server-api-reference
- https://www.framer.com/developers/server-api-faq
- https://www.framer.com/developers/reference
- https://www.framer.com/llms.txt
- https://www.npmjs.com/package/framer-api
- https://github.com/framer/server-api-examples
- https://www.framer.com/marketplace/plugins/mcp
- https://mcp.directory/servers/framer
