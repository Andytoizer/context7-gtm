# Google Drive

## Agent Summary

Google Drive lets agents work with Files, folders, permissions, comments, revisions, drives, and changes through official MCP, API, CLI, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Google Drive in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
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
- Workspace MCP is in public developer preview, so tool availability, quotas, and install/auth details may change.
- Drive write, upload, delete, and permission-management operations can expose or destroy sensitive files; scope OAuth narrowly.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://workspaceupdates.googleblog.com/2026/05/agent-tools-and-security-updates-for-workspace-developers.html?hl=en
- https://developers.google.com/workspace/guides/developer-tools
- https://developers.google.com/workspace/guides/build-with-llms
- https://developers.google.com/workspace/drive/api/guides/limits
- https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list
- https://developers.google.com/workspace/drive/api/guides/downloads
- https://developers.google.com/workspace/drive/api/quickstart/js
- https://cloud.google.com/docs/discovery/apis
- https://workspacemcp.com/docs
