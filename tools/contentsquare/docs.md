# Contentsquare

## Agent Summary

Contentsquare lets agents work with Projects, Metrics, Journeys, Funnels, Pages, Errors, and Exports through official MCP, API, CLI, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and medium write risk before using Contentsquare in automations.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

APIs use server-to-server OAuth 2.0 client credentials; access tokens last 1 hour and return the regional base URL. MCP uses OAuth-secured agent access and only exposes projects the user can access.

## Main Objects

- Projects
- Metrics
- Journeys
- Funnels
- Pages
- Errors
- Exports
- Job Runs
- Sessions
- Segments
- Page Groups

## Rate Limits

Data Export API allows 10 concurrent requests per project and 10 OAuth credentials per project/account. MCP tool calls are plan-limited: Free up to 300/month, Growth up to 36k/year, Pro up to 72k/year, Enterprise up to 108k/year.

## Pagination

Data Export API is job-oriented: exports contain jobs, job runs, and downloadable job run parts. One-time jobs cannot cover more than 7 days and generated files are retained 7 days.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Data Export API cannot update existing export jobs; create/retrieve flows are API-backed while edits happen in the Contentsquare console.
- API keys are no longer supported for APIs; use OAuth credentials.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.contentsquare.com/en/
- https://docs.contentsquare.com/en/llms.txt
- https://support.contentsquare.com/hc/en-us/articles/41563169756945-How-to-set-up-and-use-Model-Context-Protocol-MCP
- https://docs.contentsquare.com/en/api/export/
- https://docs.contentsquare.com/en/api/export/authentication/
- https://docs.contentsquare.com/en/api/export/limits/
- https://docs.contentsquare.com/en/csq-sdk-flutter/experience-analytics/contentsquare-cli/
