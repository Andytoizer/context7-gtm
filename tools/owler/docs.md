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

Legacy docs.owler.cloud show Basic Auth over HTTPS. Community Ballerina connector docs for Owler API v1.0 use an API key named `user_key` against `https://api.owler.com/`. The current Owler Data Licensing/API path appears sales-gated.

## Main Objects

- Companies
- Company Profiles
- Competitors
- Firmographics
- Funding
- Acquisitions
- News
- Contacts
- Feeds
- Legacy Users/Statuses

## Rate Limits

Legacy docs.owler.cloud say most endpoints have a 100 requests/hour limit. No current public rate limits were found for Owler Data Licensing/API.

## Pagination

The community Ballerina connector documents `limit` parameters for company search and `pagination_id` for feeds. Current official pagination behavior for the Data Licensing/API product is not public.

## Agent Caveats

- Destructive action risk: low.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Do not assume docs.owler.cloud maps to the current licensed company-data API; it appears to document an older Basic Auth surface with social-style endpoints.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Current Owler Data Licensing/API endpoint reference, auth scheme, pagination, and rate limits are not publicly documented. Public sources conflict between legacy Basic Auth docs and community API-key/OpenAPI-derived connector docs.

## Sources

- https://www.owler.com/
- https://corp.owler.com/data-licensing
- https://docs.owler.cloud/api/requests.html
- https://docs.owler.cloud/api/auth.html
- https://central.ballerina.io/ballerinax/owler/latest
