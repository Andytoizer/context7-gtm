# Kondo

## Agent Summary

Kondo is agent-ready through official MCP docs and llms documentation. It is not currently a public REST API or CLI target. Treat Kondo as an MCP-first tool for LinkedIn inbox retrieval, triage, labels, draft replies, reminders, and relationship workflows.

## Retrieval Priority

1. Use official Kondo MCP setup docs for connection details.
2. Use Kondo llms docs for agent-readable documentation retrieval.
3. Use integration and webhook docs for non-MCP automation context.

## Auth

Kondo MCP uses the Kondo relay endpoint and depends on the user's Kondo account, browser extension, and session state. Do not model Kondo as a normal API-key REST integration unless official API docs become available.

## Main Objects

- Inbox
- Chats
- Messages
- Draft replies
- Labels
- Archive state
- Reminders
- Connections
- Invitations
- Snippets

## Agent Caveats

- Kondo MCP may require Business tier access.
- Some message history may need to be loaded before an agent can summarize or draft accurately.
- Drafting is safer than direct send. Prefer saving draft replies where possible.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: no public docs found
- OpenAPI/spec: no
- llms/AI docs: yes
- Official SDK: no
- Strong community fallback: no
