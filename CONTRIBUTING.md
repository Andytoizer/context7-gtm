# Contributing

Context7 GTM is an agent-facing docs retrieval project. Contributions should improve per-tool documentation retrieval.

## What To Add

Each tool belongs in:

```text
tools/<slug>/
  tool.json
  docs.md
  sources.json
```

Then add the tool to `registry.json`.

## Source Order

Use this research order:

1. Official MCP docs.
2. Official CLI docs.
3. Official API docs.
4. Official OpenAPI/spec docs.
5. Official llms.txt or AI-agent docs.
6. Official SDKs or GitHub repos.
7. Strong community MCP, CLI, SDK, or integration on GitHub.
8. Wrapper docs such as Zapier, Make, Pipedream, or similar.

## Rules

- Prefer official sources.
- Mark community sources as unofficial.
- Do not add workflow recipes.
- Do not add tool comparison content.
- Do not invent categories yet.
- Mark unknowns explicitly.
- Include `lastVerified` dates.

## Validation

Run:

```bash
npm run validate
```

