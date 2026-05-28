# Enrow

## Agent Summary

Enrow is a published GTM Docs Registry profile for agent docs retrieval. The public docs include ReadMe markdown pages, an llms.txt index, and OpenAPI files for email and phone APIs.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Use an API key in the `x-api-key` header against `https://api.enrow.io`. The account info endpoint returns the current credit balance and registered webhook URLs for the key.

## Main Objects

- Email finder: single and bulk
- Email verifier: single and bulk
- Phone finder: single and bulk
- Account info
- Credits
- Webhooks

## Rate Limits

The official API product page advertises up to 50 requests per second. Treat this as plan/account dependent until confirmed in account settings or contract.

## Pagination

No traditional cursor/page pagination was found. The API is job-oriented:

- `POST` single/bulk endpoints start searches or verifications and return an id.
- `GET` endpoints retrieve a single or bulk result by id.
- Webhooks can notify completion and reduce polling.
- Email bulk search supports up to 5000 searches per batch.

## Agent Caveats

- Destructive action risk: medium.
- No official MCP, CLI, or SDK found.
- Bulk jobs and verifications consume credits and process personal contact data.
- Use webhooks for long-running bulk work rather than tight polling.

## Sources

- https://enrow.io/api
- https://enrow.readme.io/
- https://enrow.readme.io/llms.txt
- https://enrow.readme.io/openapi/6508193c4b0459106cfaedba
- https://enrow.readme.io/openapi/671785d0e3c49400267b50d8
- https://enrow.readme.io/reference/find-single-email.md
- https://enrow.readme.io/reference/find-multiple-emails.md
- https://enrow.readme.io/reference/get-multiple-emails-results.md
- https://enrow.readme.io/reference/get-account-info.md
- https://enrow.readme.io/reference/using-webhooks-with-enrow.md
- https://zapier.com/apps/enrow/integrations
