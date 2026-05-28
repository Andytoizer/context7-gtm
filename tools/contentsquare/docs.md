# Contentsquare

## Agent Summary

Contentsquare is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 4/5.

## Available Surfaces

- Official MCP: announced
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

OAuth/login for MCP; API credentials for export/data APIs.

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

## Rate Limits

Unknown.

## Pagination

Export APIs use jobs/job_runs/job_run_parts.

## Agent Caveats

- Destructive action risk: medium.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Needs Human Review

MCP is closed beta; confirm access requirements and tool scope.

## Sources

- https://docs.contentsquare.com/en/
- https://support.contentsquare.com/hc/en-us/articles/41563169756945-Model-Context-Protocol-MCP
- https://docs.contentsquare.com/en/api/export/
- https://docs.contentsquare.com/en/csq-sdk-flutter/experience-analytics/contentsquare-cli/
