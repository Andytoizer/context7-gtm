# Relevance AI

## Agent Summary

Relevance AI lets agents work with Agents, tools, knowledge, workforces, conversations, agent runs, and integrations through official MCP, API, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Relevance AI in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: unknown
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP OAuth per project; API trigger uses Authorization API key; SDK uses RAI_API_KEY/region/project.

## Main Objects

- Agents
- tools
- knowledge
- workforces
- conversations
- agent runs
- integrations
- projects

## Rate Limits

Plan-based; exact public limits not listed. MCP sync trigger timeout 120s; async trigger/poll pattern available.

## Pagination

Not clearly documented for public supported API; MCP has async polling for long-running runs.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://relevanceai.com/docs/integrations/mcp/programmatic-gtm/mcp-server
- https://relevanceai.com/docs/build/agents/build-your-agent/agent-triggers/api-trigger
- https://relevanceai.com/docs/build/agents/build-your-agent/agent-triggers/api
- https://relevanceai.com/docs/llms.txt
- https://github.com/RelevanceAI/relevanceai
- https://github.com/RelevanceAI/relevance-js-sdk
