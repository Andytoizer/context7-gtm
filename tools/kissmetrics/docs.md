# Kissmetrics

## Agent Summary

Kissmetrics lets agents work with Events, Identities, Properties, People, Queries, Exports, and Products through official API and SDK surfaces plus community integration support. Check auth, pagination, rate limits, source links, and medium write risk before using Kissmetrics in automations.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

REST API reference uses HTTP Basic auth credentials. Tracking libraries/API specifications use site-specific implementation credentials.

## Main Objects

- Events
- Identities
- Properties
- People
- Queries
- Exports
- Products
- Reports

## Rate Limits

No public current rate-limit numbers found in official REST or implementation docs.

## Pagination

REST list endpoints such as reports use offset and limit query parameters; async query/export flows use query result/status endpoints.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- REST API docs mark the API as beta and subject to regular changes, including possible breaking changes.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Keep in review: official REST API is marked beta and subject to breaking changes, and no public current rate-limit policy was found.

## Sources

- https://support.kissmetrics.io/reference/overview
- https://support.kissmetrics.io/reference/fetch-reports
- https://support.kissmetrics.io/docs/installing-kissmetrics-quickstart-guide
- https://support.kissmetrics.io/docs/url-api
