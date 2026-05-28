# tl;dv

## Agent Summary

tl;dv lets agents work with Meetings, Meeting Recordings, Transcripts, Notes, Highlights (deprecated), Webhooks, and MeetingReady Events through official MCP, API, and OpenAPI/spec surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using tl;dv in automations.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: no
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key auth using the `x-api-key` request header. API keys are generated from tl;dv account personal settings; access is plan- and meeting-organizer-dependent.

## Main Objects

- Meetings
- Meeting Recordings
- Transcripts
- Notes
- Highlights (deprecated)
- Webhooks
- MeetingReady Events
- TranscriptReady Events

## Rate Limits

Not specified in public docs.

## Pagination

The meetings list endpoint uses `page` and `limit` query parameters; `limit` max is 100 and total returned results cannot exceed 10,000. Responses include `page`, `pages`, `total`, `pageSize`, and `results` fields.

## Agent Caveats

- Destructive action risk: medium.
- Official API docs are Redoc/OpenAPI-style docs for `v1alpha1` on `https://pasta.tldv.io`, covering meeting import/list/get/download, transcript, notes, deprecated highlights, health check, and webhook payloads.
- Official GitHub MCP server exists under `tldv-public/tldv-mcp-server` and requires a Business or Enterprise tl;dv account plus `TLDV_API_KEY`.
- API/webhook access is Business-plan gated in the help center; API exportability depends on the meeting organizer plan and organization-wide automation requires Enterprise.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://tldv.io/
- https://help.tldv.io/
- https://doc.tldv.io/index.html
- https://intercom.help/tldv/en/articles/11583137-api-and-webhooks
- https://github.com/tldv-public/tldv-mcp-server
- https://nango.dev/docs/integrations/all/tldv
