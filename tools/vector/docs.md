# Vector.co

## Agent Summary

Vector.co is agent-ready through an official remote MCP server. Official docs provide the MCP URL, OAuth setup for major clients, supported data categories, operating guidance, and safety caveats. No separate public REST API, CLI, OpenAPI spec, llms docs, or SDK was found.

Agent readiness score: 4/5.

## Retrieval Priority

1. Use the official Vector MCP setup guide for connection and OAuth details.
2. Use the official MCP usage and best-practices docs for supported query types and limitations.
3. Use Vector blog posts for product-level MCP positioning and caveats around read-only access, approved APIs, caching, and daily refresh behavior.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: no public REST docs found
- OpenAPI/spec: no
- llms/AI docs: no
- Official SDK: no
- Strong community fallback: not needed

## Auth

Vector MCP uses the remote server URL `https://mcp.vector.co/mcp` with browser-based OAuth 2.0. Official docs say no API key, CLI, or local installation is required. The OAuth token is scoped to the user's Vector account and permissions, and access can be revoked from Vector account settings.

## Main Objects

- Ad campaign performance
- Campaign pacing and budgets
- Creative diagnostics
- Spend, impressions, clicks, and ROAS signals
- LinkedIn ad engagement
- Contact-level visitor data
- De-anonymized site visitors
- ICP companies and target-account engagement
- Cross-channel buyer signals

## Rate Limits

No public Vector MCP rate-limit numbers were found. Vector says it avoids repeated live ad-platform calls by caching performance data and refreshing it daily, which improves speed and reduces ad-platform quota/rate-limit risk. Agents should still avoid unnecessary bulk scheduled queries.

## Pagination

No public pagination docs were found for Vector MCP tools.

## Agent Caveats

- Vector MCP is currently read-only. It can pull data, generate reports, and surface insights, but cannot create, enable, disable, or edit campaigns.
- The data layer emphasizes LinkedIn Ads today, with Google Ads and Meta described as coming.
- Cached data may not include campaign activity launched earlier the same day until the daily refresh completes.
- Keep humans in the loop for budget moves, creative direction, and strategic prioritization.
- Do not model Vector as a browser automation tool; official docs say it uses approved ad-platform APIs and no scraping.

## Sources

- https://www.vector.co/
- https://learn.vector.co/articles/3680183282-connecting-vector-mcp-to-your-ai-client
- https://learn.vector.co/articles/1767915906-getting-the-most-out-of-vector-mcp
- https://learn.vector.co/articles/2402799783-best-practices-for-getting-great-results-from-vector-mcp
- https://www.vector.co/blog/what-can-you-actually-ask-your-ads-with-vector-mcp
- https://www.vector.co/blog/the-mcp-trust-problem-nobodys-talking-about
