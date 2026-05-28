# Otter.ai

## Agent Summary

Otter.ai is a GTM tool profile for Context7 GTM. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

Bearer API key created from the Integrations > Developer tab. Public API is beta and must be enabled for the workspace.

## Main Objects

- Channels
- conversations
- transcripts
- audio
- action items
- insights
- outlines
- workspace details
- webhooks

## Rate Limits

Enterprise plan users are limited to 10 requests per second in the public beta docs.

## Pagination

Cursor-based pagination with meta.has_more and meta.next_cursor on list endpoints.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

Public API is beta and may require account-manager enablement; verify workspace access and current endpoint coverage before implementation.

## Sources

- https://help.otter.ai/hc/en-us/articles/36130822688279-Otter-ai-Public-API-beta
