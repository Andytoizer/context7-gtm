# Granola

## Agent Summary

Granola is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP browser OAuth only; API keys for Business/Enterprise API.

## Main Objects

- Notes
- transcripts
- folders
- action items
- decisions
- calendar-linked meetings

## Rate Limits

Unknown; API key count limit recently raised to 25/workspace and 25/user.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Find the public Granola API reference for exact endpoints, pagination, and rate limits.

## Sources

- https://docs.granola.ai/help-center/sharing/integrations/mcp
- https://docs.granola.ai/article/integrations-with-granola
- https://docs.granola.ai/help-center/changelog
