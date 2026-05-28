# Obsidian

## Agent Summary

Obsidian is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Local vault access; official CLI enabled in desktop app; community REST/MCP uses local bearer API key.

## Main Objects

- Vaults
- files/notes
- frontmatter
- tags
- commands
- active file
- periodic notes
- search results

## Rate Limits

None documented; local app/plugin performance bound.

## Pagination

Not central; file/search result handling varies by CLI/plugin.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://obsidian.md/cli
- https://obsidian.md/help/cli
- https://docs.obsidian.md/Home
- https://community.obsidian.md/plugins/obsidian-local-rest-api
- https://github.com/MarkusPfundstein/mcp-obsidian
- https://github.com/cyanheads/obsidian-mcp-server
