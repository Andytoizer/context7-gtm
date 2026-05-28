# Summary

Customer.io is a customer engagement platform with official MCP, CLI, API docs, OpenAPI specs, SDKs, and AI-oriented documentation.

- Official website: https://customer.io
- Docs homepage: https://docs.customer.io
- Last verified: 2026-05-28

# Agent Interface

- Official MCP: yes.
- Official CLI: yes, `cio` CLI.
- Official API: yes. Customer.io exposes Track, App, Pipelines, Webhooks, and other API surfaces.
- OpenAPI/spec: yes. Raw OpenAPI JSON files are available for multiple API surfaces.
- llms.txt / AI docs: yes. Customer.io has explicit AI docs and markdown-oriented docs usage guidance.
- Official SDK: yes. Official SDKs exist, including mobile SDKs and API clients.
- Official GitHub: yes.
- Community MCP/CLI/SDK: not needed for core agent access.
- Wrapper support: likely available through integration platforms, but first-party docs are strong enough for agent use.

# Operational Context

- Auth model: API keys, workspace credentials, and endpoint-specific authentication depending on API surface.
- Required scopes or permissions: depend on workspace, API type, and action. Agents should verify whether they are using Track, App, Pipelines, or another API surface.
- Key objects: customers, events, attributes, segments, campaigns, broadcasts, newsletters, journeys, messages, workspaces, objects, pipelines, sources, destinations.
- Key actions: identify/update customers, track events, manage attributes, query or manage campaigns/messages, work with pipelines, inspect workspace resources.
- Required fields: API-surface-specific. Track calls typically require identifiers and event/customer payloads; App API operations require resource IDs and authenticated workspace context.
- Common field mappings: customer ID, email, anonymous ID, event name, event properties, traits/attributes, campaign ID, message ID, workspace ID.
- Rate limits: verify current API-specific limits before implementation.
- Pagination: API-specific; agents should inspect endpoint docs and OpenAPI schemas.
- Webhooks: supported as a first-party API/docs area.
- Destructive operations: deleting or mutating customers, campaigns, messages, data pipelines, or workspace resources can affect live engagement systems.
- Pricing/API access constraints: available surfaces and limits may depend on workspace plan, enabled products, and credentials.
- Known caveats: Customer.io has multiple API surfaces. Agents must choose the correct surface before acting: Track API for event/customer data, App API for workspace resources, Pipelines APIs for data routing, and Webhooks docs for inbound/outbound event behavior.

# Sources

- MCP docs: https://docs.customer.io/ai/mcp-server/
- CLI quickstart: https://docs.customer.io/ai/cli/get-started/
- CLI reference: https://docs.customer.io/ai/cli/reference/
- API/OpenAPI docs: https://docs.customer.io/integrations/api/app/
- AI docs usage: https://docs.customer.io/ai/use-docs-with-ai/
- Official GitHub: https://github.com/customerio
- SDK docs: https://docs.customer.io/integrations/sdk/

