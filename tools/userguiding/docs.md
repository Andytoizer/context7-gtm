# UserGuiding

## Agent Summary

UserGuiding lets agents work with Users, User Attributes, Companies, User Events, Interaction History, Guide/Checklist/Survey/Hotspot Events, and Knowledge Base Articles through official MCP, API, and OpenAPI/spec surfaces. Check auth, pagination, rate limits, source links, and high write risk before using UserGuiding in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

REST API uses UG-API-KEY header. MCP uses the same project API key via UG-API-KEY header or api_key query parameter for SSE.

## Main Objects

- Users
- User Attributes
- Companies
- User Events
- Interaction History
- Guide/Checklist/Survey/Hotspot Events
- Knowledge Base Articles

## Rate Limits

50 requests per 10 seconds for the User API; exceeding the limit blocks requests for 1 minute.

## Pagination

REST user list uses search_after plus page_size; default page size 100, max 1000. MCP list/search tools support pagination.

## Agent Caveats

- Destructive action risk: high.
- Official MCP server is documented at https://mcp.userguiding.com/mcp/sse with 17 tools across users, search/analytics, events, companies, and knowledge base.
- Official OpenAPI 3.1 spec is available at https://user.userguiding.com/openapi.json for the User API.
- Official docs state there is no npm package; install is via snippet/JavaScript API rather than a package SDK.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://help.userguiding.com/en/articles/20916-userguiding-mcp-server
- https://help.userguiding.com/en/articles/4493538-userguiding-user-api
- https://user.userguiding.com/openapi.json
- https://help.userguiding.com/en/articles/8284734-rate-limit-for-the-user-api
- https://help.userguiding.com/en/articles/8046430-does-userguiding-offer-an-npm-package
