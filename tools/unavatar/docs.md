# unavatar.io

## Agent Summary

unavatar.io is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: no
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Anonymous GET requests allowed; PRO uses x-api-key header.

## Main Objects

- Avatar/logo lookups by provider
- provider routes
- cached image redirects
- JSON metadata

## Rate Limits

Anonymous 25 requests/day/IP; authenticated origin 50 free/day then metered; x-rate-limit-* headers.

## Pagination

None; single-resource lookup API.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://unavatar.io/docs
- https://github.com/microlinkhq/unavatar
