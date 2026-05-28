# Clay

## Agent Summary

Clay is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Workspace login/API key; table webhooks; enterprise People/Company API access.

## Main Objects

- Tables
- webhooks
- enrichments
- people
- companies
- contacts

## Rate Limits

Unknown.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm Clay MCP docs apply to Clay.com GTM enrichment workspace, not Clay.earth relationship-manager product lineage.

## Sources

- https://university.clay.com/docs/using-clay-as-an-api
- https://library.clay.earth/hc/en-us/articles/36405339564315-Clay-MCP-live-Make-integration-improved-Library-and-more
- https://github.com/clay-inc/clay-mcp
