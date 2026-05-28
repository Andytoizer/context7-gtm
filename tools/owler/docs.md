# Owler

## Agent Summary

Owler is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: no
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Legacy docs show Basic Auth; current Data Licensing/API appears sales-gated/API-key based.

## Main Objects

- Companies
- Competitors
- Firmographics
- Funding
- Acquisitions
- News
- Contacts

## Rate Limits

Legacy docs: most endpoints 100 requests/hour.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Which Owler API surface is current: legacy docs.owler.cloud Basic Auth, or sales-gated Meltwater/Owler Data Licensing API?

## Sources

- https://www.owler.com/
- https://www.owler.com/data-licensing
- https://docs.owler.cloud/api/requests.html
- https://docs.owler.cloud/api/auth.html
- https://central.ballerina.io/ballerinax/owler/latest
