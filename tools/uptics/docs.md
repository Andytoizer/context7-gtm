# Uptics

## Agent Summary

Uptics lets agents work with Email address lookup, Domain search, Email address verifier, and Email provider lookup through official API surfaces plus community MCP and community integration support. Check auth, pagination, rate limits, source links, and medium write risk before using Uptics in automations.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: unknown
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: unknown
- Community MCP: yes
- Community CLI: no
- Community SDK / integration: yes

## Auth

Bearer token in the `Authorization` header. Uptics says the API key is managed under Settings > Integrations > API Page.

## Main Objects

- Email address lookup
- Domain search
- Email address verifier
- Email provider lookup

## Rate Limits

No HTTP rate limit found. Official docs state each lookup request consumes 1 Uptics credit.

## Pagination

No pagination is documented for the published lookup POST endpoints.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.
- Official public docs cover lookup/enrichment endpoints only; no public full CRM/outreach API reference was found.

## Sources

- https://help.uptics.io/en/articles/13-uptics-lookup-apis
- https://viasocket.com/mcp/uptics
- https://help.uptics.io/en/articles/90-connect-uptics-to-hundreds-of-other-apps-with-zapier
- https://uptics.io/
