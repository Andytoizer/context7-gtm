# WordPress

## Agent Summary

WordPress is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: yes
- Community SDK / integration: yes

## Auth

Depends on surface: WordPress REST API uses cookies/nonces, application passwords, OAuth/plugin auth, or host-specific auth; WP-CLI uses local site/server credentials; WordPress.com MCP uses account authorization.

## Main Objects

- Posts
- pages
- media
- comments
- users
- taxonomies
- terms
- plugins
- themes
- settings
- sites
- multisite networks
- blocks
- revisions

## Rate Limits

Self-hosted WordPress REST API rate limits are host/plugin-specific; WordPress.com APIs and MCP access are plan/account controlled.

## Pagination

REST API collection endpoints use page/per_page headers and links; WP-CLI supports output formats and command-specific filters.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://developer.wordpress.org/rest-api/
- https://developer.wordpress.org/rest-api/reference/
- https://developer.wordpress.org/cli/commands/
- https://wordpress.org/cli/
- https://wordpress.com/support/mcp/
- https://github.com/WP-API/docs
