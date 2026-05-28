# Reference Details

Dense retrieval notes for Google Drive. This file is optimized for agents that need auth, object, endpoint-family, pagination, rate-limit, source, and write-risk context without reading the full profile first.

## Stable Identity

- Registry ID: /gtm/google-drive
- Slug: google-drive
- Aliases: drive, google workspace drive
- Agent readiness score: 5/5
- Last verified: 2026-05-28

## Agent-Relevant Surface Matrix

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth And Permission Model

- OAuth 2.0 scopes; service accounts/domain-wide delegation for workspace admin scenarios.
- Agents should prefer the narrowest available credential, scope, role, workspace, project, or account permission for the requested action.
- Never log API keys, bearer tokens, OAuth codes, MCP headers, workspace secrets, or generated webhook URLs.

## Core Object Map

- Files
- folders
- permissions
- comments
- revisions
- drives
- changes
- channels

## Endpoint And Action Families

- Read/search/list operations are the safest first call path. Use them to inspect IDs, schemas, permissions, and current state before writes.
- Create/update/delete operations should be treated as state-changing even when exposed through MCP tools, SDK methods, workflow actions, or wrapper integrations.
- Bulk import, sync, enrichment, outbound, permission, schema, workflow, campaign, and data-destruction actions require an explicit dry-run or confirmation layer in downstream agents.
- If an OpenAPI/spec surface is marked available, agents should prefer that schema for exact paths, request bodies, and response fields.

## Pagination, Rate Limits, And Retries

- Rate limits: 12,000 queries/60s and 12,000 queries/60s/user; 403/429 with backoff.
- Pagination: pageToken/nextPageToken.
- Back off on 429/rate-limit responses and preserve vendor retry headers when available.
- For cursor pagination, store the cursor alongside the source query so retries do not skip or duplicate records.

## Destructive Operation Guardrails

- Destructive action risk: high.
- Official Workspace update says the Workspace MCP server is in public developer preview and includes Drive file fetching, listing, uploading, and permission management.
- Google Drive API uses Discovery documents rather than OpenAPI; use official client libraries and endpoint docs for implementation details.
- Workspace MCP is in public developer preview, so tool availability, quotas, and install/auth details may change.
- Drive write, upload, delete, and permission-management operations can expose or destroy sensitive files; scope OAuth narrowly.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Prefer read-only validation first. For writes, require a concrete target record/list/workspace and a bounded operation size.
- Capture before/after IDs and source URLs in downstream audit logs.

## Retrieval Hints

- Good topic strings: `auth`, `mcp`, `api`, `openapi`, `pagination`, `rate limits`, `webhooks`, `objects`, `destructive operations`.
- Ask for the most specific object or action when available, for example `contacts auth`, `campaign pagination`, `workflow activation`, or `record delete caveats`.
- If the returned docs are ambiguous, fetch /tools/google-drive/sources and inspect official source links before acting.

## Source Pointers

- Canonical site: https://drive.google.com/
- workspaceupdates.googleblog.com/2026/05/agent-tools-and-security-updates-for-workspace-developers.html (source): https://workspaceupdates.googleblog.com/2026/05/agent-tools-and-security-updates-for-workspace-developers.html?hl=en
- developers.google.com/workspace/guides/developer-tools (source): https://developers.google.com/workspace/guides/developer-tools
- developers.google.com/workspace/guides/build-with-llms (source): https://developers.google.com/workspace/guides/build-with-llms
- developers.google.com/workspace/drive/api/guides/limits (source): https://developers.google.com/workspace/drive/api/guides/limits
- developers.google.com/workspace/drive/api/reference/rest/v3/files/list (source): https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list
- developers.google.com/workspace/drive/api/guides/downloads (source): https://developers.google.com/workspace/drive/api/guides/downloads
- developers.google.com/workspace/drive/api/quickstart/js (source): https://developers.google.com/workspace/drive/api/quickstart/js
- cloud.google.com/docs/discovery/apis (source): https://cloud.google.com/docs/discovery/apis
- workspacemcp.com/docs (source): https://workspacemcp.com/docs

## Profile-Derived Operational Context

The main profile contains the operational context for this tool. This reference file adds retrieval-oriented guardrails and should be used with the official sources above.
