# Findymail

## Agent Summary

Findymail lets agents work with Email verification, contacts, contact lists, email finder searches, reverse email, companies, and employees through official API, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using Findymail in automations.

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
