# QuickMail

## Agent Summary

QuickMail is a cold email and LinkedIn outbound platform with an official GraphQL API V2 for querying and mutating workspaces, campaigns, leads, tags, custom properties, campaign steps, and email accounts.

- Official website: https://quickmail.com/
- API docs: https://api.quickmail.com/help
- Last verified: 2026-05-28
- Agent readiness score: 4/5

## Available Surfaces

- Official MCP: no public first-party MCP server found.
- Official CLI: no public first-party CLI found.
- Official API: yes
- OpenAPI/spec: no. API V2 is GraphQL, with docs and GraphiQL instead of OpenAPI.
- llms/AI docs: no public `llms.txt` found.
- Official SDK: no public first-party SDK found.
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

QuickMail API V2 uses a single GraphQL endpoint:

`POST https://api.quickmail.com/v2/graphql`

Send the raw API key in the `Authorization` header without a `Bearer` prefix. The agency plan must have API access enabled or requests are rejected.

## Main Objects

- Agency
- Workspaces
- Leads
- Campaigns
- Campaign steps and variations
- Email accounts
- Custom properties
- Tags
- Campaign stats
- LinkedIn connection, InMail, message, and profile-visit steps

## Rate Limits

Rate limits are enforced per agency. Each response includes:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

If the limit is exceeded, QuickMail returns HTTP 429.

## Pagination

List fields return Relay-style connections and accept GraphQL pagination arguments such as `first` and `after`. Many list queries also include `skip` for offset-style access. The server enforces a maximum page size and defaults to a small page size when no size is provided.

## Agent Caveats

- Destructive action risk: high.
- `deleteLeads` can permanently delete leads when `permanent` is true.
- Mutations can create campaigns, add or update email and LinkedIn steps, assign email accounts, change campaign automation, add leads to campaigns, and update tracking domains.
- Plain-text email mutations require open tracking and click tracking to be disabled.
- GraphQL IDs are opaque prefixed IDs; agents should reuse IDs returned by the API.

## Sources

- https://quickmail.com/
- https://api.quickmail.com/help
- https://www.reddit.com/r/coldemail/comments/1tcrod2/any_advice_on_a_solid_mcp_outbound_infra/
