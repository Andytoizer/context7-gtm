# ZeroBounce

## Agent Summary

ZeroBounce is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key; regional endpoints for US/EU/global.

## Main Objects

- Validations
- batch_validations
- credits
- API_usage
- email_finder
- activity_data
- domain_search

## Rate Limits

Examples include validate 80,000 requests/10s, getcredits 80,000/hour, getapiusage 800/hour, batch validate 30/min up to 100 emails/request; temporary blocks on abuse.

## Pagination

Mostly job/batch/download patterns; normal pagination not prominent.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://www.zerobounce.net/docs/api-dashboard
- https://www.zerobounce.net/docs/zerobounce-api-wrappers
- https://zerobounce-mcp.com/
