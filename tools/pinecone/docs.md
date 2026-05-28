# Pinecone

## Agent Summary

Pinecone is a GTM tool profile for GTM Docs Registry. This profile is for agent docs retrieval: identify available MCP, CLI, API, OpenAPI, SDK, auth, object, pagination, rate-limit, and caveat surfaces. It is not a workflow recipe or human-facing comparison page.

Agent readiness score: 5/5.

## Available Surfaces

- Official MCP: yes
- Official CLI: yes
- Official API: yes
- OpenAPI/spec: unknown
- llms/AI docs: yes
- Official SDK: yes
- Community MCP: yes
- Community CLI: unknown
- Community SDK / integration: yes

## Auth

API key in Api-Key header; MCP/CLI require Pinecone API key.

## Main Objects

- Indexes
- namespaces
- records/vectors
- metadata
- assistants
- rerank models
- inference models

## Rate Limits

Documented data-plane/index limits; 429 on namespace/API operation limits; exponential backoff recommended.

## Pagination

Vector ID list uses pagination_token; default 100 IDs.

## Agent Caveats

- Destructive action risk: high.
- Treat unknown or announced surfaces as unresolved until verified against current vendor docs.
- Prefer official docs and SDKs first. Use community MCP/CLI/SDK sources only when clearly marked unofficial.

## Sources

- https://docs.pinecone.io/guides/operations/mcp-server
- https://docs.pinecone.io/reference/cli/command-reference
- https://docs.pinecone.io/reference/api/authentication
- https://docs.pinecone.io/reference/list
- https://docs.pinecone.io/reference/api/database-limits
