# Monaco

## Agent Summary

Monaco now has enough public developer and agent documentation to publish for GTM Docs Registry. The docs expose an agent-readable index, REST endpoint pages, an OpenAPI 3.1 spec, API key auth, pagination/filtering/sorting rules, rate limits, and an official MCP server.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

REST API requests go to `https://api.monaco.com` and use `Authorization: Bearer mks_<token>`. API keys are created in Monaco Settings > API Keys, are scoped to an organization, and may be tied to a specific user. The MCP endpoint is `https://mcp.monaco.com/mcp` and uses OAuth 2.0, with a documented bearer-token option for Codex/ChatGPT-style clients.

## Main Objects

- Accounts
- contacts
- opportunities
- tasks
- meetings
- sequences
- sequence templates
- tags
- field schemas
- authenticated user

## Rate Limits

100 requests per minute per organization. Rate-limited responses return HTTP 429 with `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, and `Retry-After`. The MCP server shares the same per-org limit as the REST API.

## Pagination

List endpoints use `POST /v1/{entity}/list` with `page` and `page_size` in the JSON body. Pages are 1-indexed; `page_size` defaults to 50 and maxes at 500. Responses include `pagination.page`, `pagination.page_size`, `pagination.total_count`, and `pagination.total_pages`.

Sorting uses a `sort` field with `-` for descending order. Filtering supports simple rule arrays and nested `and`/`or` expressions. The field schemas endpoint (`GET /v1/schemas/{entity}`) returns filterable/sortable fields, allowed operators, custom field keys, and enum values.

## Agent Caveats

- Destructive action risk: high.
- The public API includes delete operations for accounts, contacts, opportunities, and tags; updates can replace tag lists; sequence updates can pause/resume/stop/enqueue sequences.
- MCP tools enforce existing Monaco user permissions, and compatible clients prompt for writes/deletes by default.
- Monaco's API and MCP are in beta. The beta notice warns that API methods, responses, parameters, MCP tools, and MCP schemas may change.
- No official CLI or SDK was found. Use the OpenAPI spec and endpoint markdown as the canonical implementation sources.

## Sources

- https://docs.monaco.com/beta-notice
- https://docs.monaco.com/llms.txt
- https://docs.monaco.com/auth
- https://docs.monaco.com/pagination-sorting-and-filtering
- https://docs.monaco.com/mcp/overview
- https://docs.monaco.com/agent-skills
- https://api.monaco.com/openapi.json
