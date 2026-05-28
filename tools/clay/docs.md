# Clay

## Agent Summary

Clay is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: no
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Workspace login for MCP; table webhook endpoints; enterprise-only People and Company API access. Public docs did not expose a REST auth header format for the enterprise API.

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

MCP credit docs mention usage/credit limits, but public API pagination details were not found.

## Agent Caveats

- Destructive action risk: medium.
- Official Clay.com docs confirm MCP settings for Clay workspaces and programmatic table webhooks.
- The public docs describe an enterprise-only People and Company API but do not publish endpoint-level reference details.
- Similarly named Clay/Me relationship-manager MCP material found in search was excluded as non-canonical for the Clay.com GTM enrichment workspace.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Official Clay.com docs confirm MCP and API-like access, but no public MCP tool schema, enterprise API endpoint reference, REST auth header, rate limits, or API pagination details were found.

## Sources

- https://university.clay.com/docs/using-clay-as-an-api
- https://university.clay.com/docs/mcp-settings
