# Summary

Attio is a modern CRM with a developer platform, REST API, hosted MCP server, OpenAPI specs, and agent-oriented documentation.

- Official website: https://attio.com
- Docs homepage: https://docs.attio.com/docs/overview
- Last verified: 2026-05-28

# Agent Interface

- Official MCP: yes. Attio has a hosted MCP server.
- Official CLI: yes, for app SDK development via commands such as `npm create attio` / `npm run dev`; this is not a general CRM operations CLI.
- Official API: yes. Attio has a REST API.
- OpenAPI/spec: yes. Public OpenAPI specs are available.
- llms.txt / AI docs: yes. Attio has llms docs, llms-full, Docs MCP, and AI-assisted development guidance.
- Official SDK: yes, for app development.
- Official GitHub: yes.
- Community MCP/CLI/SDK: strong unofficial projects exist, including community MCP and JS client work.
- Wrapper support: not needed for core agent access.

# Operational Context

- Auth model: OAuth and API key authentication.
- Required scopes or permissions: depend on workspace access, app type, and endpoint.
- Key objects: records, objects, lists, attributes, entries, notes, tasks, comments, users/workspaces.
- Key actions: read records, create/update records, manage list entries, query objects, inspect schemas, create notes/tasks, work with attributes.
- Required fields: object-specific and schema-dependent; agents should inspect object/attribute metadata before writes.
- Common field mappings: company, person, email, domain, object ID, record ID, list ID, attribute slug, workspace ID.
- Rate limits: verify in current API docs before implementation.
- Pagination: use the documented pagination model for list and search endpoints.
- Webhooks: supported in the developer platform; confirm event coverage before depending on a webhook.
- Destructive operations: schema changes, record writes, deletions, and bulk operations require caution.
- Pricing/API access constraints: may depend on workspace plan and developer platform access.
- Known caveats: the CLI surfaced in audit is app SDK-oriented, not a broad CRM admin CLI. Agents should prefer MCP/API docs for operational actions.

# Sources

- Developer platform: https://attio.com/platform/developers
- Docs homepage: https://docs.attio.com/docs/overview
- MCP docs: https://docs.attio.com/mcp/overview
- REST API overview: https://docs.attio.com/rest-api/overview
- Auth docs: https://docs.attio.com/rest-api/guides/authentication
- OpenAPI docs: https://docs.attio.com/rest-api/endpoint-reference/openapi
- AI docs: https://docs.attio.com/sdk/guides/ai
- Official GitHub: https://github.com/attio
- Changelog: https://attio.com/changelog

