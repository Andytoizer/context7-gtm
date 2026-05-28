# Reply.io

## Agent Summary

Reply.io is strongly agent-ready. It publishes official MCP positioning and setup guidance, V3 API documentation, llms.txt, and a bundled OpenAPI YAML. The API covers the sales engagement dashboard broadly, including contacts, lists, sequences, inbox, tasks, reporting, webhooks, and background jobs.

## Retrieval Priority

1. Use Reply MCP for MCP-compatible agent operation.
2. Use Reply API V3 docs and bundled OpenAPI YAML for direct REST integrations.
3. Use `https://docs.reply.io/llms.txt` as the docs index before retrieving individual pages.
4. Avoid V1/V2 except for legacy compatibility questions.

## Auth

Reply API V3 uses bearer token authentication with `Authorization: Bearer <YOUR_API_KEY>`. Reply MCP setup also uses the user's API key over HTTPS. Agents should keep API keys in a secret store and avoid logging MCP connection URLs if they embed sensitive credentials.

## Main Objects

- Contacts and contact lists
- Accounts and account lists
- Custom fields and blacklist rules
- Sequences, sequence steps, sequence folders, and sequence templates
- Email accounts and LinkedIn accounts
- Inbox
- Tasks
- Schedules and holiday calendars
- Reports
- Webhooks
- Background jobs

## Agent Caveats

- Prefer API V3; Reply says V1 and V2 are outdated and no longer supported.
- Long-running operations can return `202 Accepted` with a `Location` header for background-job polling.
- Default rate limits are 100 requests per minute and 3,000 requests per hour per user; reporting endpoints may be stricter.
- Some MCP calls consume Reply API credits. Agents should check whether a planned operation has credit impact before bulk use.
- Mutating sequence, contact, and inbox state is high-impact and should require explicit confirmation.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: no
- Strong community fallback: not needed
