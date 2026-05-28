# Clay

## Agent Summary

Clay is publishable for agent retrieval through its official MCP surface and public Clay University docs. The public REST/API story remains limited: Clay's own docs say it is not a traditional API-first SaaS product, and recommend table webhooks, Make/Zapier wrappers, or enterprise-only People and Company API access depending on the use case.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: unknown
- Community CLI: no
- Community SDK / integration: unknown

## Auth

MCP access is workspace/user based through ChatGPT or Claude, with admin controls for function enablement, credit budgets, and usage monitoring. Public docs also describe generated table webhook endpoints and enterprise-only People and Company API access, but do not expose a full REST auth header model for that enterprise API.

## Main Objects

- Tables
- webhooks
- enrichments
- people
- companies
- contacts

## Rate Limits

Unknown.

## Pagination

Unknown for the enterprise People and Company API. Clay's public API guidance emphasizes webhooks, automation wrappers, and enterprise API access rather than a traditional paginated REST reference.

## Agent Caveats

- Destructive action risk: medium.
- Official Clay.com community and University docs confirm Clay MCP is live for ChatGPT and Claude, with admin controls, function enablement, credit limits, and usage monitoring.
- Third-party MCP directories list the remote Clay MCP endpoint at `https://api.clay.com/v3/mcp` and describe enrichment/contact/company tools. Use those as secondary evidence until Clay publishes a first-party MCP tool schema.
- The public docs describe an enterprise-only People and Company API but do not publish complete endpoint-level reference, REST auth header, rate-limit, or pagination details.
- NPM/GitHub results for `@clayhq/clay-mcp` / `clay-inc/clay-mcp` were excluded from Clay.com evidence because they target clay.earth personal CRM, not Clay.com GTM enrichment.
- No official Clay.com CLI was found in public docs, GitHub search, or npm search.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://university.clay.com/docs/using-clay-as-an-api
- https://university.clay.com/docs/mcp-settings
- https://community.clay.com/x/announcements/ks5pwdvf83tf/clay-mcp-now-live-in-claude-and-chatgpt-run-clay-w
- https://www.tooljunction.io/mcp/clay
- https://www.mintlify.com/anthropics/knowledge-work-plugins/concepts/connectors
