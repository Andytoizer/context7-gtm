# Kaspr

## Agent Summary

Kaspr remains needs-review for GTM Docs Registry agent docs retrieval. Official sources confirm a REST API, account API keys, LinkedIn-profile enrichment, credit consumption, and plan-based request limits, but the complete API reference is not reliably retrievable by agents from public sources.

Agent readiness score: 2/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: no
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Official help examples send an API key in the `Authorization` header with `Content-Type: application/json`. The help article also warns to use the correct API version and fields such as `dataToGet`. Community examples sometimes show `Authorization: Bearer ...`; verify the exact current header and version requirements before building.

## Main Objects

- LinkedIn profile enrichment
- B2B emails
- Direct emails
- Phone numbers
- CSV/Google Sheets enrichment
- Credits
- Exports

## Rate Limits

Kaspr says request-per-hour or request-per-day limits may apply by plan, but exact public limits were not available in the agent-retrievable docs found.

## Pagination

Unknown. Public docs found describe single profile/CSV enrichment workflows, but do not expose complete endpoint-level pagination behavior.

## Agent Caveats

- Destructive action risk: medium.
- Needs human review before implementation.
- The API is documented as compatible with standard LinkedIn profile URLs, not Sales Navigator URLs.
- Credits are consumed for B2B emails, direct emails, phone numbers, and successful API/export calls.
- Reselling Kaspr data is explicitly prohibited in the official help article.

## Needs Human Review

Exact blocker: public sources do not expose a complete agent-readable API reference/OpenAPI, full endpoint list, exact current auth version/header requirements, exact requests-per-hour/day limits, or pagination semantics. The linked Stoplight reference was JavaScript-only from the available fetch path.

## Sources

- https://www.kaspr.io/api
- https://help.kaspr.io/en/articles/8857583-how-to-setup-kaspr-api
- https://kaspr.stoplight.io/docs/kaspr-api/branches/main/a9e3adc32ee8e-kaspr-api-doc
- https://www.kaspr.io/pricing
- https://smoothwork.ai/kaspr-api-integration-services/
- https://dlthub.com/context/source/kaspr
- https://community.make.com/t/issue-with-kaspr-integration-no-phone-numbers-added-to-google-sheet-despite-purchased-credits/19938
