# Gamma

## Agent Summary

Gamma is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: yes
- Official SDK: no
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key / bearer token; MCP uses Gamma auth setup.

## Main Objects

- Generations
- presentations
- themes
- folders
- exports
- images

## Rate Limits

Documented mostly through usage/credits and 429 behavior; no stable global numeric limit found.

## Pagination

Limited list endpoints; pagination model not fully clear.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.gamma.app/
- https://developers.gamma.app/docs/introduction
- https://developers.gamma.app/docs/api-reference
- https://developers.gamma.app/docs/mcp-server
- https://developers.gamma.app/llms.txt
