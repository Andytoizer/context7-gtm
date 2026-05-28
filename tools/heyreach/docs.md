# HeyReach

## Agent Summary

HeyReach is agent-ready for LinkedIn outbound workflows through official MCP setup docs and public API/webhook documentation. It does not appear to have an official CLI or official SDK. Community CLI and MCP projects exist and can be useful as implementation references, but they should remain marked unofficial.

## Retrieval Priority

1. Use official HeyReach MCP docs for agent connection setup.
2. Use official API and webhook docs for endpoint behavior.
3. Use community CLI/MCP repositories only as fallback implementation references.
4. Use Postman docs as supplemental material, with source-quality caveats.

## Auth

HeyReach API requests use an `X-API-KEY` header. Agents should store the API key as a secret and avoid logging it.

## Main Objects

- Campaigns
- Leads
- LinkedIn accounts
- Inboxes
- Messages
- Webhooks

## Agent Caveats

- Respect the documented 60 requests per minute API limit.
- API docs use offset/limit pagination patterns.
- Treat LinkedIn messaging and campaign mutation as high-impact. Prefer read-only exploration before writing.
- Community MCP/CLI projects are unofficial and should be pinned by version or commit if used.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: no
- Official SDK: no
- Community MCP: yes
- Community CLI: yes
