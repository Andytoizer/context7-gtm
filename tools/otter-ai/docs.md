# Otter.ai

## Agent Summary

Otter.ai is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Public API uses Bearer API keys from Integrations > Developer for Enterprise workspaces. Official MCP uses OAuth authorization through supported AI tools or custom MCP setup.

## Main Objects

- Channels
- Channel Members
- Conversations
- Transcripts
- Audio
- Action Items
- Insights
- Outlines
- Workspace Details
- MCP Search/Fetch/User Info

## Rate Limits

Enterprise plan users are limited to 10 requests per second in the public API docs.

## Pagination

Cursor-based pagination with meta.has_more and meta.next_cursor on list endpoints.

## Agent Caveats

- Destructive action risk: medium.
- Official Public API article, updated April 23, 2026, covers auth, endpoints, rate limits, pagination, channels, conversations, transcripts, audio, workspace, and webhooks guidance.
- Official MCP article, updated May 14, 2026, documents https://mcp.otter.ai/mcp, OAuth auth, ChatGPT/Claude/Cursor/Perplexity setup, and tools for user info, search, and fetch.
- Public API availability is Enterprise-workspace gated; contact the account manager if the Developer tab is missing.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://help.otter.ai/hc/en-us/articles/36130822688279-Otter-ai-Public-API
- https://help.otter.ai/hc/en-us/articles/35287607569687-Otter-MCP-Server
- https://github.com/omerdn1/otter.ai-api
- https://github.com/gmchad/otterai-api
- https://zapier.com/mcp/otterai
