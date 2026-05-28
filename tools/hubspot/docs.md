# Summary

HubSpot is a CRM and customer platform with developer APIs, app tooling, MCP support, and CLI support.

- Official website: https://www.hubspot.com
- Docs homepage: https://developers.hubspot.com/docs
- Last verified: 2026-05-28

# Agent Interface

- Official MCP: yes. HubSpot has a remote CRM MCP server and a local developer MCP server.
- Official CLI: yes. HubSpot CLI includes MCP setup support.
- Official API: yes. HubSpot has extensive REST API references.
- OpenAPI/spec: yes. HubSpot maintains a public API spec collection, but notes it is not intended as the external public contract.
- llms.txt / AI docs: yes. HubSpot developer docs expose LLM-oriented docs and Ask Docs AI surfaces.
- Official SDK: yes. Official SDKs and client libraries are available across common languages.
- Official GitHub: yes.
- Community MCP/CLI/SDK: community MCPs exist, but official coverage is stronger.
- Wrapper support: broad ecosystem support likely exists, but it is not needed for core agent access.

# Operational Context

- Auth model: OAuth and private app access tokens.
- Required scopes or permissions: depend on object and endpoint; CRM object operations require relevant CRM scopes.
- Key objects: contacts, companies, deals, tickets, owners, pipelines, properties, associations, engagements, custom objects.
- Key actions: read, search, create, update, batch update, associate records, manage properties, sync CRM data.
- Required fields: object-specific. Contacts commonly use email; companies commonly use domain/name; custom objects depend on schema.
- Common field mappings: email, domain, company name, lifecycle stage, owner, deal stage, pipeline, object IDs, association IDs.
- Rate limits: account/app-tier dependent; use official rate-limit docs before implementation.
- Pagination: HubSpot APIs commonly use paging cursors/after parameters depending on endpoint.
- Webhooks: supported through app/webhook tooling.
- Destructive operations: deleting records, overwriting properties, changing associations, and batch updates require caution.
- Pricing/API access constraints: feature availability and limits can vary by HubSpot hub, tier, app type, and private app permissions.
- Known caveats: the public OpenAPI repo is useful for agents, but HubSpot says it is not intended as the external API contract. Prefer official docs for final behavior.

# Sources

- Official docs: https://developers.hubspot.com/docs
- Remote MCP: https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server
- Local MCP: https://developers.hubspot.com/docs/developer-tooling/local-development/mcp-server
- CLI reference: https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/reference
- API reference: https://developers.hubspot.com/docs/reference/api
- OAuth docs: https://developers.hubspot.com/docs/api/working-with-oauth
- OpenAPI/spec collection: https://github.com/HubSpot/HubSpot-public-api-spec-collection
- Changelog: https://developers.hubspot.com/changelog

