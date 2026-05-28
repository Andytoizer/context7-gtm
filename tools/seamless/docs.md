# Seamless.AI

## Agent Summary

Seamless.AI is a published GTM Docs Registry profile for agent docs retrieval. The public developer surface is strong: REST API docs, OpenAPI, llms.txt, Postman guidance, and official MCP documentation are all available.

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
- Community SDK / integration: yes

## Auth

REST supports two documented modes:

- API key: send `Token: YOUR_API_KEY` to `https://api.seamless.ai/api/client/v1`.
- OAuth 2.0: exchange an authorization code or refresh token, then send `Authorization: Bearer ACCESS_TOKEN`.

MCP uses `https://mcp.seamless.ai/mcp` with OAuth 2.1. API and MCP access are feature-gated; the Public API/MCP menus may be hidden unless enabled for the account.

## Main Objects

- Contacts and companies
- Contact/company search
- Contact/company research and polling
- Org contacts and org companies
- Research webhooks
- Credits
- Saved searches
- Lists
- Campaigns
- Email templates, drafts, sends, and bulk sends
- Calls, tasks, and activity
- Buyer intent

## Rate Limits

Default REST rate limit is 60 requests per minute per endpoint at the organization level. Headers include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, and `X-PublicAPI-Credits`. OAuth routes and customer-specific accounts may have different limits.

## Pagination

Search endpoints use cursor pagination: pass `nextToken` and `limit`; responses return `supplementalData.nextToken`, `isMore`, and `perPage`. Org contact/company reads use page/limit query parameters; contacts document a maximum `limit` of 500.

## Agent Caveats

- Destructive action risk: high.
- MCP tools are labeled `read`, `write`, or `destructive`; require confirmation for email sends, creates/updates, and deletes.
- Research endpoints consume credits. Search and org reads do not start new research jobs.
- Public docs exist, but actual API/MCP access depends on account license and feature flags.

## Sources

- https://docs.seamless.ai/
- https://docs.seamless.ai/llms.txt
- https://docs.seamless.ai/openapi.json
- https://docs.seamless.ai/mcp-openapi.yaml
- https://docs.seamless.ai/authentication/api-keys.md
- https://docs.seamless.ai/rate-limits-and-credits.md
- https://docs.seamless.ai/searchcontacts.md
- https://docs.seamless.ai/searchcompanies.md
- https://docs.seamless.ai/mcp/risk-tiers.md
- https://seamless.ai/products/api
