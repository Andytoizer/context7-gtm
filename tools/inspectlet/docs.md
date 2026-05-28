# Inspectlet

## Agent Summary

Inspectlet is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 3/5.

## Available Surfaces

- Official MCP: no
- Official CLI: no
- Official API: yes
- OpenAPI/spec: no
- llms/AI docs: unknown
- Official SDK: no
- Community MCP: unknown
- Community CLI: unknown
- Community SDK / integration: unknown

## Auth

HTTP Basic Auth using the account email as username and Inspectlet API token as password.

## Main Objects

- Websites
- Sessions
- Tags
- Pages
- Session Links
- Search Filters

## Rate Limits

429 Too Many Requests is documented, but no numeric quota is published.

## Pagination

Session search uses limit and page; default limit 10, max 100 per response.

## Agent Caveats

- Destructive action risk: low.
- Official API reference covers authentication, websites, session search/listing, individual session retrieval, pagination, and error codes.
- The public API appears read-oriented for websites and session recordings; no public create/update/delete endpoints were found.
- Official docs provide Shell, JavaScript, and PHP examples, but no separately packaged SDK was found.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://apidocs.inspectlet.com/
- https://docs.inspectlet.com/
