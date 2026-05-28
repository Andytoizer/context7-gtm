# Workato

## Agent Summary

Workato is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API client tokens and OAuth client credentials for Workato API platform access.

## Main Objects

- Recipes
- Jobs
- Connections
- Folders
- Projects
- Packages
- Manifests
- Users
- Roles
- Lookup Tables

## Rate Limits

Account and API endpoint limits apply; 429 responses should be retried.

## Pagination

Page and per_page list pagination on many endpoints.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.workato.com/workato-api.html
- https://docs.workato.com/developing-connectors/sdk.html
- https://docs.workato.com/workato-cli.html
