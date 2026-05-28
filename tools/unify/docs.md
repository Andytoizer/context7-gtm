# Unify

## Agent Summary

Unify is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

X-Api-Key header.

## Main Objects

- Objects
- attributes
- records
- company
- person
- opportunity
- intent/events

## Rate Limits

100000 requests per 5 minutes.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.unifygtm.com/developers/api/data/overview
- https://docs.unifygtm.com/developers/sdks/python-library
- https://docs.unifygtm.com/developers/sdks/typescript-library
