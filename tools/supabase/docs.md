# Supabase

## Agent Summary

Supabase lets agents work with Projects, organizations, databases/tables, migrations, auth users, storage buckets, and edge functions through official MCP, API, CLI, OpenAPI/spec, and SDK surfaces. Check auth, pagination, rate limits, source links, and high write risk before using Supabase in automations.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: unknown
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

MCP OAuth/PAT; Management API Bearer PAT; project APIs use anon/publishable or secret/service keys plus JWT/RLS.

## Main Objects

- Projects
- organizations
- databases/tables
- migrations
- auth users
- storage buckets
- edge functions
- logs
- branches

## Rate Limits

Management API returns X-RateLimit-* headers; Auth has documented endpoint quotas and 429s.

## Pagination

Management API offset pagination; PostgREST range/limit-offset patterns.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://supabase.com/docs/guides/getting-started/mcp
- https://supabase.com/docs/reference/api/getting-started
- https://supabase.com/docs/guides/auth/rate-limits
