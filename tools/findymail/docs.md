# Findymail

## Agent Summary

Findymail is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer token from the Findymail API page.

## Main Objects

- Email verification
- contacts
- contact lists
- email finder searches
- reverse email
- companies
- employees
- phone search
- credits

## Rate Limits

Official docs state all endpoints have a concurrent rate limit of 300 simultaneous requests unless stated otherwise.

## Pagination

List/search pagination is endpoint-specific; inspect the OpenAPI document and endpoint reference before bulk retrieval.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://app.findymail.com/docs/
- https://www.findymail.com/api/
