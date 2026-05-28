# Copper

## Agent Summary

Copper lets agents work with People, Companies, Opportunities, Tasks, Activities, Projects, and Leads through official API surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Copper in automations.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key and user email headers; OAuth available for integrations.

## Main Objects

- People
- Companies
- Opportunities
- Tasks
- Activities
- Projects
- Leads
- Pipelines
- Custom Fields

## Rate Limits

Public docs describe rate limiting and 429 behavior; exact limits vary by plan and endpoint.

## Pagination

page_number and page_size style pagination on search/list endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.copper.com/
- https://developer.copper.com/requests-and-responses/
- https://developer.copper.com/authentication.html
