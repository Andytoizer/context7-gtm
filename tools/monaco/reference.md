# Reference

## List Endpoint Shape

Monaco list endpoints use `POST /v1/{entity}/list` with pagination, filtering, and sorting parameters in the JSON body. Agents should inspect the field schema for the entity before constructing filters against custom fields or enum values.

## MCP Authorization

The Monaco MCP endpoint is `https://mcp.monaco.com/mcp`. The documented client flow uses OAuth 2.0, with bearer-token configuration available for clients that support explicit MCP server headers.

## Destructive Operations

Delete and sequence-control operations can change CRM state quickly. Agents should treat account, contact, opportunity, tag, and sequence mutations as write actions that require confirmation and a clear rollback or audit plan.
