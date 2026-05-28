# Default

## Agent Summary

Default has public product/help-center documentation for GTM workflow integrations, but no public REST API reference was found. The official docs support agent retrieval for generated inbound webhook URLs, Forms SDK/listener behavior, form submission callbacks, scheduling, routing, and CRM triggers. They do not provide enough public API/auth/rate/pagination detail to publish as a complete developer-docs entry.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: unknown
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: no
- Community CLI: no
- Community SDK / integration: unknown

## Auth

Unknown for a public REST API. Webhook triggers use unique workflow-generated endpoint URLs. Webform setup uses a Default-provided listener script embedded in the page head.

## Main Objects

- Leads
- forms
- webforms
- webhook workflow triggers
- routing
- scheduling
- meetings
- HubSpot company/contact triggers
- Salesforce leads, contacts, accounts, opportunities, events, tasks, campaign members

## Rate Limits

Unknown.

## Pagination

Unknown.

## Agent Caveats

- Destructive action risk: medium.
- Public docs are workflow and embed oriented, not endpoint-reference oriented.
- GitHub and npm searches for Default.com-specific MCP/CLI evidence did not surface credible official or community packages; results were dominated by generic matches for the word default.
- Treat API/auth/rate/pagination/MCP/CLI as unresolved until private customer docs or vendor confirmation are available.

## Needs Human Review

Still not publishable: only official product/help-center integration docs surfaced for Forms SDK/listener callbacks, generated inbound webhook URLs, and CRM object triggers. No public REST API auth, OpenAPI, rate-limit, pagination, MCP, CLI, or credible community agent connector evidence was found; confirm whether developer API docs are private/customer-only.

## Sources

- https://www.default.com
- https://docs.default.com/
- https://docs.default.com/article/glossary
- https://docs.default.com/article/webhook-trigger
- https://docs.default.com/article/connecting-a-web-flow-form-to-default
- https://docs.default.com/article/hub-spot-object-created
- https://docs.default.com/article/sfdc-object-created-trigger
- https://github.com/search?q=%22default.com%22+mcp&type=repositories
- https://www.npmjs.com/search?q=default.com%20mcp
