# RB2B

## Agent Summary

RB2B is publishable for agent docs retrieval. Public official sources now cover RB2B's API Partner Program, dedicated API subdomain, Identity API categories, endpoint-level Postman docs, API-key auth, rate limits, credits, response codes, and the consumer-platform webhook payload surface.

Agent readiness score: 4/5.

## Retrieval Priority

1. Use RB2B's API Partner Program and API suite page for product boundaries, endpoint categories, pricing/credit behavior, and compliance caveats.
2. Use the public RB2B Postman collection for endpoint-level request/response details, API-key auth, response codes, and rate limits.
3. Use RB2B support webhook docs for consumer-platform outbound visitor delivery.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: no
- Official SDK: no
- Strong community fallback: not needed

## Auth

RB2B's public Postman docs use API-key authentication with the key name `Api-Key`. The consumer-platform webhook integration sends data to an HTTPS receiver URL configured in RB2B; any required receiver authentication or identifiers must be included directly in that URL as query parameters because RB2B does not attach custom headers or body configuration at send time.

## Main Objects

- Identity API lookups
- IP to HEM
- IP to MAID
- IP to company
- HEM to LinkedIn and business profile
- Email to LinkedIn and business profile
- LinkedIn to personal email, hashed emails, mobile phone, and business profile
- LinkedIn slug search
- Identified visitors
- Company-only profiles
- Webhook payloads

## Rate Limits

RB2B's Postman docs state that APIs are rate limited to 50 requests per second per endpoint per account.

## Pagination

No public pagination docs were found. The documented Identity API endpoints are lookup-oriented POST endpoints, and consumer-platform webhook delivery is push-based.

## Agent Caveats

- Destructive action risk: low.
- The API suite is separate from standard RB2B consumer accounts and uses a separate API account, credit balance, billing model, and `api.rb2b.com` subdomain.
- API access is not included with standard RB2B accounts of any tier.
- Credits are charged only on successful `200` responses according to the public Postman docs.
- Webhook payloads are fixed and not customizable; if the receiving platform needs different field names or shapes, mapping must happen on the receiving side.
- Repeat visitor data can create duplicates in receiving systems if the destination is not prepared to update existing records.
- Several API page entries are marked "Coming Soon"; agents should check the Postman endpoint docs before assuming availability.

## Sources

- https://support.rb2b.com/en/articles/12579420-rb2b-apis-rb2b-s-api-partner-program
- https://www.rb2b.com/apis
- https://www.postman.com/rb2b-api/apis/collection/n7gn6w7/rb2b-apis
- https://support.rb2b.com/en/articles/8976614-setup-guide-webhook
- https://support.rb2b.com/en/articles/10551225-how-rb2b-s-integrations-work
