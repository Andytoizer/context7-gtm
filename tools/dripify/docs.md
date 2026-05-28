# Dripify

## Agent Summary

Dripify has weak public agent readiness. During this audit, no official MCP server, CLI, public API reference, OpenAPI spec, llms docs, or official SDK was found. Public automation appears to rely mostly on Zapier, Make, and webhook-style integrations.

## Retrieval Priority

1. Use official Dripify help docs for product behavior.
2. Use official integration pages for Zapier and Make automation details.
3. If an agent needs direct API behavior, mark the task for review and check whether the workspace has customer-only API documentation.

## Auth

Public docs found during this audit describe Zapier and Make style connected-account flows rather than a public first-party API key model.

## Main Objects

- Campaigns
- Leads
- LinkedIn outreach activity
- Automation events

## Agent Caveats

- Do not assume a direct public API exists.
- Do not infer endpoint shapes from Zapier or Make connector behavior.
- Any generated direct API integration should be marked `Needs Human Review` until first-party API docs are confirmed.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: unknown
- OpenAPI/spec: no
- llms/AI docs: no
- Official SDK: no
- Strong community fallback: no
