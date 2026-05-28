# Userflow

## Agent Summary

Userflow lets agents work with Users, Groups, Events, Content, Content Versions, Flows, and Checklists through official API and SDK surfaces plus community integration support. Check auth, pagination, rate limits, source links, and high write risk before using Userflow in automations.

Agent readiness score: 4/5.

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

Bearer environment API keys for Users API; bearer personal API keys for Accounts API.

## Main Objects

- Users
- Groups
- Events
- Content
- Content Versions
- Flows
- Checklists
- Launchers
- Members
- Invites

## Rate Limits

Account-plan-dependent per-minute limiter plus concurrency limiter; 429/503 responses.

## Pagination

List endpoints support ordering/expansion; pagination endpoint-specific.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.userflow.com/docs/api
- https://docs.userflow.com/docs/dev
