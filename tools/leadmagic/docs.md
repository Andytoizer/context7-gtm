# LeadMagic

## Agent Summary

LeadMagic is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: no
- Community CLI: no
- Community SDK / integration: unknown

## Auth

API key.

## Main Objects

- B2B enrichment endpoints
- email/mobile finding
- validation
- person/company enrichment
- usage/credits

## Rate Limits

Per-tool limits; responses include headers for credits, rate limits, concurrency, and usage.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://leadmagic.io/docs/developer-experience
- https://leadmagic.io/docs/cli/commands
- https://leadmagic.io/solutions/developers
- https://github.com/LeadMagic/leadmagic-mcp
