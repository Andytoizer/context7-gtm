# Summary

Smartlead is a cold email and sales engagement platform with API, MCP, CLI, OpenAPI, and llms.txt support.

- Official website: https://www.smartlead.ai
- Docs homepage: https://api.smartlead.ai/quickstart
- Last verified: 2026-05-28

# Agent Interface

- Official MCP: yes. Smartlead has an SSE MCP server.
- Official CLI: yes. `@smartlead/cli` is available through the public Smartlead CLI repo.
- Official API: yes.
- OpenAPI/spec: yes. A public OpenAPI JSON endpoint was found.
- llms.txt / AI docs: yes. `llms.txt` and `llms-full.txt` were found.
- Official SDK: no separate official SDK found in audit.
- Official GitHub: yes, for CLI.
- Community MCP/CLI/SDK: unofficial MCP/CLI projects exist, but official surfaces cover most agent needs.
- Wrapper support: likely available through common automation platforms, but not needed for core agent access.

# Operational Context

- Auth model: API key, passed as `api_key` query parameter according to the audited docs.
- Required scopes or permissions: API key permissions and workspace/account permissions determine available actions.
- Key objects: leads, campaigns, email accounts, clients, sequences, webhooks, replies, analytics.
- Key actions: create/update leads, add leads to campaigns, manage campaigns, manage email accounts, fetch stats, configure webhooks.
- Required fields: action-specific. Lead import usually requires email and campaign/list context; campaign operations require campaign IDs.
- Common field mappings: email, first name, last name, company name, website/domain, LinkedIn URL, campaign ID, custom fields.
- Rate limits: verify current API docs before implementation.
- Pagination: endpoint-specific; agents should read each endpoint response schema.
- Webhooks: supported; use official webhook docs before implementation.
- Destructive operations: deleting leads, changing campaign membership, modifying sending accounts, and campaign updates can affect live outbound.
- Pricing/API access constraints: API availability and limits may depend on plan/account configuration.
- Known caveats: MCP is SSE-only for now. API auth uses query-param API key rather than OAuth/Bearer, so agents should avoid logging URLs with credentials.

# Sources

- API quickstart: https://api.smartlead.ai/quickstart
- MCP docs: https://helpcenter.smartlead.ai/en/articles/300-smartlead-mcp-server
- Full API docs/auth: https://helpcenter.smartlead.ai/en/articles/125-full-api-documentation
- CLI repo: https://github.com/Smartlead-Public/smartlead-cli
- Changelog: https://api.smartlead.ai/changelog

