# Lightfield

## Agent Summary

Lightfield is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: no
- Community SDK / integration: unknown

## Auth

Scoped bearer API key, sk_lf_..., with Lightfield-Version header.

## Main Objects

- Accounts
- contacts
- lists
- meetings
- notes
- opportunities
- tasks
- members
- workflow runs
- files
- custom objects

## Rate Limits

Unknown.

## Pagination

limit/offset; max limit 25; list results served from a possibly stale search index.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.lightfield.app/api
- https://docs.lightfield.app/getting-started/http-quickstart/
- https://docs.lightfield.app/using-the-api/list-endpoints
- https://lightfield.app/blog/skills-knowledge-mcp-performance-improvements
