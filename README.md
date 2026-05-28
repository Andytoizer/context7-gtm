# Context7 GTM

Context7 GTM is an open-source documentation retrieval layer for GTM tools.

It is modeled after Context7: agents should be able to resolve a tool by name, then fetch current, source-backed docs for a focused topic. This is not a human-facing software directory, comparison site, or workflow recipe library.

## Core Interface

The intended agent interface is:

```text
resolve-tool-id("hubspot")
get-tool-docs("/gtm/hubspot", topic="contacts API auth")
```

The initial repo is file-first so agents can use it before any server is running.

```text
registry.json
tools/<tool>/tool.json
tools/<tool>/docs.md
tools/<tool>/sources.json
```

## Current Tools

The registry is the source of truth for available tools:

```bash
npm run cli -- list
```

## Local Usage

Validate the registry:

```bash
npm run validate
```

Resolve a tool:

```bash
npm run cli -- resolve hubspot
```

Fetch docs:

```bash
npm run cli -- docs /gtm/smartlead auth
```

## Tool Profile Contract

Each tool has three files:

- `tool.json`: canonical machine-readable metadata.
- `docs.md`: retrieval-ready operational context for agents.
- `sources.json`: official and community source URLs with verification dates.

Minimum agent-useful fields:

- canonical ID
- aliases
- interface status: MCP, CLI, API, OpenAPI/spec, llms.txt, SDK
- agent readiness score
- last verified date
- source links
- operational caveats

## Non-Goals

- No GTM workflow recipes yet.
- No human-facing comparison pages.
- No category taxonomy until the documentation audit is complete.
- No unsupported claims.

## Status Values

- `draft`
- `published`
- `needs-review`
- `monitoring`

## Source Policy

Prefer official sources. If official MCP, CLI, API, or SDK docs are missing or weak, community GitHub sources can be included, but must be marked unofficial and scored for quality.

Human review should be asynchronous: mark unclear items as `needs-review`, include the exact review question, and keep processing other tools.
