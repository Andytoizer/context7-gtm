# PitchBook API

## Agent Summary

PitchBook has an official REST API offering through PitchBook Direct Data, but the public docs are intentionally high level. The official page confirms the base URL, standalone contract requirement, relational endpoints, platform/API access path, and API key or authentication-token setup. Endpoint overview, rate-limit, pagination, and machine-readable spec details appear gated behind PitchBook/API access, so this remains needs-review.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Standalone API contract through PitchBook Direct Data. Official docs state that PitchBook helps establish the connection through an API key or authentication token. Third-party dltHub material describes `Authorization: PB-Token {API_KEY}`, but that should be verified against official customer docs.

## Main Objects

- Companies/entities
- People/professionals
- Investors
- Funds
- Deals
- financing details
- deal stock information
- VC exit predictor data
- relational endpoints

## Rate Limits

Unknown/publicly gated.

## Pagination

Unknown/publicly gated.

## Agent Caveats

- Destructive action risk: low.
- Public official docs do not expose endpoint-level reference, pagination, rate limits, or a downloadable spec.
- Third-party dltHub and Unified.to sources suggest integration/MCP coverage, but they are not official PitchBook API docs.

## Needs Human Review

Official page confirms REST base URL and API key/authentication-token setup through PitchBook Direct Data, but the endpoint overview, machine-readable spec, pagination, and rate-limit docs appear gated behind PitchBook/API access. Third-party dltHub/Unified.to evidence is not enough to publish.

## Sources

- https://pitchbook.com/help/PitchBook-api
- https://pitchbook.com/blog/announcing-the-launch-of-api-and-datafeed
- https://pitchbook.com/blog/what-is-direct-data
- https://dlthub.com/context/source/pitchbook-api
- https://unified.to/integrations/pitchbook
- https://openai.com/business/apps/pitchbook/
