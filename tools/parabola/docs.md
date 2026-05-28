# Parabola

## Agent Summary

Parabola is a no-code data automation platform for building flows that import, transform, enrich, and export data. Public evidence supports strong product documentation and AI-readable docs, but Parabola does not publish a public product API or developer portal for controlling Parabola itself.

- Official website: https://parabola.io/
- Docs index: https://parabola.io/docs/llms.txt
- Last verified: 2026-05-28
- Agent readiness score: 2/5

## Available Surfaces

- Official MCP: no public first-party MCP server found.
- Official CLI: no public first-party CLI found.
- Official API: no public product API found. Official docs state Parabola does not currently have a developer portal for building custom integrations.
- OpenAPI/spec: no public Parabola product OpenAPI spec found.
- llms/AI docs: yes. Parabola publishes `https://parabola.io/docs/llms.txt`.
- Official SDK: no public first-party SDK found.
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes, through integration and automation ecosystems, but not needed to establish the core public limitation.

## Auth

No public Parabola product API auth model was found. Inside Parabola flows, auth is configured per connected app or API step. The official API-step docs describe bearer tokens, basic auth, custom headers, and expiring access token patterns including OAuth2 Client Credentials-style token requests.

## Main Objects

- Flows
- Steps
- Tables
- Runs
- Schedules
- Triggers
- Webhook triggers
- Imports
- Exports
- Shared authentications

## Rate Limits

No public Parabola product API rate limit was found because no public product API surface was found. Official running/trigger docs state webhook and email-triggered flows can queue up to 1000 pending runs. Schedule frequency is plan-dependent, with documented schedule options down to every 10 minutes depending on plan.

## Pagination

No public Parabola product API pagination model was found. For API steps that call external APIs, pagination is configured according to the external API. Official docs include API-step support for REST and GraphQL calls and mention GraphQL offset/limit variables.

## Agent Caveats

- Destructive action risk: medium.
- Do not infer a hidden Parabola API from Parabola's ability to call other APIs. The documented API surface is for using Parabola as an API client inside flows.
- Publishing or updating a flow can affect scheduled runs and downstream destinations.
- Webhook triggers can accumulate queued work; agents should inspect run history and trigger queues before changing live flows.
- Auth ownership matters when offboarding users; official docs cover transferring flow and step authentication ownership.

## Sources

- https://parabola.io/
- https://parabola.io/docs/llms.txt
- https://parabola.io/docs/product/integration/api
- https://parabola.io/docs/articles/how-do-i-post-data-to-a-webhook
- https://parabola.io/docs/product/canvas/updating-and-running-your-flow
- https://parabola.io/docs/articles/api-errors
- https://parabola.io/docs/articles/how-can-i-see-complete-error-messages-associated-with-an-api-call
- https://parabola.io/docs/articles/user-offboarding-transferring-flow-step-authentication-ownership
