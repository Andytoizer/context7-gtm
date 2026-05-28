# Creatio

## Agent Summary

Creatio has source-backed public developer documentation for current 8.3 integrations: OAuth 2.0, OData 4/3, DataService, Postman API documentation, API testing, and file CRUD over OData 4. This is sufficient for publishing an agent docs retrieval profile, with the caveat that no official MCP or CLI was found and no raw OpenAPI spec URL was confirmed.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Current 8.3 docs recommend OAuth 2.0 for third-party apps and web services. Client credentials grant retrieves a Bearer token from Identity Service and then uses `Authorization: Bearer ...` to access OData/DataService/web services. Creatio also documents forms authentication via `AuthService.svc`.

## Main Objects

- Accounts
- Contacts
- Leads
- Opportunities
- Activities
- Cases
- Orders
- Products
- custom objects
- files/attachments
- OAuth integrations

## Rate Limits

No conventional request-per-second rate limit was found in public docs. Current docs document OData constraints instead: response body up to 20,000 records, batch request up to 100 sub-requests, file upload size controlled by `MaxFileSize`, and a configurable RAM limit for OData GET requests.

## Pagination

OData query options include `$skip` and `$top`, with `$select`, `$orderby`, `$expand`, and `$filter` for shaping result sets.

## Agent Caveats

- Destructive action risk: high.
- Official docs include destructive create/update/delete examples and file deletion; ensure permissions and backups before write operations.
- Community MCP and older SDK/client wrappers exist, but treat them as unofficial.
- Public docs expose Postman API documentation, but no downloadable OpenAPI spec URL was confirmed.

## Sources

- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/category/authentication
- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/integrations-and-api/authentication/oauth-2-0-authorization/identity-service-overview
- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/integrations-and-api/authentication/oauth-2-0-authorization/manage-oauth-integrations
- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/integrations-and-api/data-services/odata/basics/overview
- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/odata-references
- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/integrations-and-api/data-services/odata/ram-consumption-limit
- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/integrations-and-api/data-services/odata/odata-file-api/references/endpoints
- https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/integrations-and-api/integration-examples
- https://www.npmjs.com/package/%40creatio-devkit/common
- https://www.stork.ai/mcp/mcp-creatio
- https://npm.io/package/api-node-creatio
