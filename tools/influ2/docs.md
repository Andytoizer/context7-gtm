# Influ2

## Agent Summary

Influ2 lets agents work with Clients, Cohorts/campaign audiences, Targets, Ad content/creatives, Assets, Jobs, and Engagement metrics through community MCP and community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Influ2 in automations.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: unknown
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: no
- Community SDK / integration: yes

## Auth

The community MCP package expects `INFLU2_API_KEY` as a Bearer token and defaults to `https://v2-api.influ2.com`. Official public auth docs were not found.

## Main Objects

- Clients
- Cohorts/campaign audiences
- Targets
- Ad content/creatives
- Assets
- Jobs
- Engagement metrics
- Salesforce integration metrics

## Rate Limits

Unknown.

## Pagination

Unknown; community MCP docs do not specify pagination.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Influ2 public help documents CRM integration behavior, but not a public developer API reference.

## Needs Human Review

No official public Influ2 API reference or official MCP/SDK docs found; community `influ2-mcp` package is useful but unofficial and should be validated against customer-gated Influ2 API docs before live use.

## Sources

- https://www.influ2.com/
- https://help.influ2.com/articles/7290465539-how-to-integrate-influ2-with-salesforce
- https://pypi.org/project/influ2-mcp/
- https://www.piwheels.org/project/influ2-mcp
