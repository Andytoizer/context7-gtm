# Google Drive

## Agent Summary

Google Drive is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

OAuth 2.0 scopes; service accounts/domain-wide delegation for workspace admin scenarios.

## Main Objects

- Files
- folders
- permissions
- comments
- revisions
- drives
- changes
- channels

## Rate Limits

12,000 queries/60s and 12,000 queries/60s/user; 403/429 with backoff.

## Pagination

pageToken/nextPageToken.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Confirm public endpoint/config and availability tier for Google's managed Drive/Workspace MCP server.

## Sources

- https://workspaceupdates.googleblog.com/2026/05/agent-tools-and-security-updates-for-workspace-developers.html
- https://developers.google.com/workspace/drive/api/guides/limits
- https://developers.google.com/drive/api/v2/reference/files/list
- https://developers.google.com/workspace/drive/api/guides/downloads
- https://cloud.google.com/docs/discovery/apis
- https://workspacemcp.com/
