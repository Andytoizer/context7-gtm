# UserGuiding

## Agent Summary

UserGuiding is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 2/5.

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

API Access Token after User Identification is enabled.

## Main Objects

- Users
- User Attributes
- User Events
- Guide Interactions
- Onboarding Material

## Rate Limits

Unknown.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Interactive API docs should be checked for auth headers, pagination, delete semantics, and rate limits.

## Sources

- https://help.userguiding.com/en/articles/4493538-userguiding-user-api
- https://help.userguiding.com/en/articles/18839-user
