# Granola

## Agent Summary

Granola lets agents work with Notes, transcripts, action items, decisions, calendar-linked meetings, and folders through official MCP, API, OpenAPI/spec, and llms/AI docs surfaces. Check auth, pagination, rate limits, source links, and lower write risk before using Granola in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP uses browser OAuth with Dynamic Client Registration and no API key/service-account auth. REST API uses Bearer API keys created in the Granola desktop app; available on Business/Enterprise with admin-controlled access scopes on Enterprise.

## Main Objects

- Notes
- transcripts
- folders
- action items
- decisions
- calendar-linked meetings
- folders

## Rate Limits

REST API: burst capacity 25 requests, 5-second window, sustained 5 requests/second (300/minute), returns 429 when exceeded. MCP docs state limits vary by plan/tool and average around 100 requests/minute across tools.

## Pagination

REST list endpoints use cursor pagination with `hasMore`/`cursor` response fields and `page_size` query parameter from 1 to 30.

## Agent Caveats

- Destructive action risk: low.
- Official docs expose `llms.txt` and an OpenAPI 3.1 spec.
- Public REST endpoints currently cover listing notes, getting a note, and listing folders; use MCP for AI-assistant retrieval across notes/transcripts.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.granola.ai/introduction
- https://docs.granola.ai/api-reference/openapi.json
- https://docs.granola.ai/api-reference/list-notes
- https://docs.granola.ai/api-reference/get-note
- https://docs.granola.ai/api-reference/list-folders
- https://docs.granola.ai/llms.txt
- https://docs.granola.ai/help-center/sharing/integrations/mcp
- https://docs.granola.ai/help-center/sharing/integrations/integrations-with-granola
- https://docs.granola.ai/help-center/changelog
