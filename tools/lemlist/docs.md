# Summary

Lemlist is a sales engagement and outbound platform with API, hosted MCP, llms.txt, and AI-agent-oriented documentation.

- Official website: https://www.lemlist.com
- Docs homepage: https://developer.lemlist.com/api-reference/getting-started/overview
- Last verified: 2026-05-28

# Agent Interface

- Official MCP: yes. Lemlist has a hosted MCP at `app.lemlist.com/mcp`.
- Official CLI: no standalone product CLI found; docs include Claude Code MCP setup and agent prompt guidance.
- Official API: yes, API v2.
- OpenAPI/spec: no public raw OpenAPI found in audit.
- llms.txt / AI docs: yes. Lemlist exposes `llms.txt`, `CLAUDE.md`, AI info, and Claude Code agent docs.
- Official SDK: no official SDK repo found in audit.
- Official GitHub: no official SDK repo found in audit.
- Community MCP/CLI/SDK: unofficial Composio/Sim-style toolkits exist, but official docs are stronger for this use case.
- Wrapper support: likely available through automation ecosystems, but not needed for core docs retrieval.

# Operational Context

- Auth model: API key authentication according to official API docs.
- Required scopes or permissions: depends on account/workspace permissions and API key access.
- Key objects: leads, campaigns, sequences, mailboxes, tasks, activities, replies, custom variables.
- Key actions: create/update leads, manage campaigns, add leads to campaigns, fetch campaign data, inspect lead activity, work with custom fields.
- Required fields: endpoint-specific. Lead and campaign operations typically require identifiers such as email, lead ID, campaign ID, or related campaign context.
- Common field mappings: email, first name, last name, company, domain, LinkedIn URL, campaign ID, custom variables.
- Rate limits: verify in official API docs before implementation.
- Pagination: endpoint-specific; inspect response schemas.
- Webhooks: verify current official webhook support before implementation.
- Destructive operations: campaign updates, lead deletion, enrollment changes, and mailbox/sending changes can affect live outbound.
- Pricing/API access constraints: API access and limits may depend on plan/account configuration.
- Known caveats: very strong agent-doc posture despite missing public OpenAPI and official SDK. Agents should prefer MCP and official API docs.

# Sources

- Official website: https://www.lemlist.com/
- API overview: https://developer.lemlist.com/api-reference/getting-started/overview
- MCP setup: https://developer.lemlist.com/mcp/setup
- API auth: https://developer.lemlist.com/api-reference/getting-started/authentication
- llms.txt: https://developer.lemlist.com/llms.txt
- AI info: https://www.lemlist.com/ai-info
- Lemlist agent docs: https://developer.lemlist.com/mcp/lemlist-agent

