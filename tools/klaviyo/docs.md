# Klaviyo

## Agent Summary

Klaviyo is highly agent-ready. It has official MCP documentation, a CLI, a public API reference, SDKs, and OpenAPI assets. Use Klaviyo as a first-class target for agents that need to read or manage marketing automation, customer profiles, events, lists, segments, campaigns, and flows.

## Retrieval Priority

1. Use the official Klaviyo developer docs for API concepts and endpoint details.
2. Use the Klaviyo MCP server docs when connecting Claude, Cursor, Codex, or another MCP client.
3. Use the Klaviyo CLI docs for local developer workflows.
4. Use official SDK repositories for implementation details and generated client behavior.

## Auth

Klaviyo supports private API keys, OAuth, and public API keys depending on use case. Private API keys should be scoped and handled as secrets. The remote MCP server requires a Klaviyo account with sufficient workspace role; local MCP setup can be configured for safer read-only agent access.

## Main Objects

- Profiles
- Lists
- Segments
- Events
- Metrics
- Campaigns
- Flows
- Templates
- Coupons
- Catalogs

## Agent Caveats

- Confirm whether the agent should use remote MCP, local MCP, CLI, SDK, or raw API before performing mutating operations.
- Treat marketing send, list mutation, suppression, coupon, and flow changes as high-impact operations.
- Read rate limit headers and endpoint docs at runtime. Do not rely on a global static rate limit.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: yes
- llms/AI docs: yes
- Official SDK: yes
- Community fallback needed: no
