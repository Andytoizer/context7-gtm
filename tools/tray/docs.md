# Tray.io

## Agent Summary

Tray.io is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Bearer API tokens for Tray Platform APIs; connector auth varies by service.

## Main Objects

- Workflows
- Solutions
- Instances
- Authentications
- Connectors
- Projects
- Users
- Logs

## Rate Limits

Endpoint and account-level limits; 429 indicates throttling.

## Pagination

Cursor or page-style list pagination depending endpoint.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.tray.io/
- https://developer.tray.io/graphql/
- https://docs.tray.ai/platform/connectors/tray-cli
