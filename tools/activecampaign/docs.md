# ActiveCampaign

## Agent Summary

ActiveCampaign lets agents work with Contacts, tags, lists, custom fields, field values, campaigns, and automations through official MCP, API, OpenAPI/spec, llms/AI docs, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using ActiveCampaign in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: no
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

Account API URL + API key; MCP private remote URL from account Developer settings.

## Main Objects

- Contacts
- tags
- lists
- custom_fields
- field_values
- campaigns
- automations
- deals
- pipelines
- activities
- groups

## Rate Limits

5 requests/second/account; 429 includes Retry-After and rate headers.

## Pagination

limit/offset, page-number, and cursor patterns documented.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developers.activecampaign.com/reference/overview
- https://developers.activecampaign.com/page/mcp
- https://developers.activecampaign.com/page/mcp-available-tools/
- https://developers.activecampaign.com/reference/rate-limits
- https://github.com/ActiveCampaign/activecampaign-api-php
