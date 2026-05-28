# Wiza

## Agent Summary

Wiza is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API token.

## Main Objects

- Individual reveals
- credits
- company enrichment
- prospect search
- lists
- list contacts
- prospect lists
- webhooks

## Rate Limits

Individual Reveal concurrency Starter 5 / Enterprise 15+; queue is 200x concurrency. Help article also states Individual Reveal 15 RPS and list creation 10/min.

## Pagination

Prospect/list endpoints support paged retrieval; exact prospect pagination needs endpoint-level confirmation.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.wiza.co/
- https://docs.wiza.co/overview/usage-limits
- https://feedback.wiza.co/changelog/wiza-mcp
- https://help.wiza.co/en/articles/8392662-wiza-s-api-everything-you-need-to-know
