# Nooks

## Agent Summary

Nooks has a usable official API surface for agent workflows through its OpenAPI-backed Nooks Sequencing API. The public docs cover authentication, rate limits, cursor pagination, inline expansion, and core sales engagement objects. No official MCP server, official CLI, llms.txt, or official SDK surfaced during this audit.

## Retrieval Priority

1. Use the official Nooks developer docs for endpoint behavior and schema details.
2. Use the OpenAPI document exposed by the docs UI for generated clients or endpoint inspection.
3. Treat any community MCP, CLI, or SDK as unofficial unless separately verified.

## Auth

Requests use `Authorization: Bearer <token>`. Nooks accepts long-lived workspace API keys generated in Developer Settings and OAuth 2.0 access tokens issued through authorization code with PKCE. API keys are broad workspace credentials; agents should store them as secrets and avoid using them for unbounded write operations.

## Main Objects

- Sequences
- Sequence steps
- Emails
- Users
- Sequence states
- Prospects
- Accounts
- Mailboxes
- Calls
- Call dispositions
- Tasks

## Agent Caveats

- List endpoints use cursor pagination through `page[size]` and `page[after]` or `page[before]`.
- Maximum page size is 100 and default page size is 50.
- GET endpoints may support `include` expansion, but only up to three top-level includes per request.
- POST, PATCH, and DELETE endpoints do not support `include`.
- API keys are workspace-scoped and full read/write, so destructive task or sequence-state actions should require explicit confirmation.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: no
- Official SDK: no
- Strong community fallback: not found
