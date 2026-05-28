# Changelog

## Unreleased

- Rebranded the project to GTM Docs Registry.
- Renamed the CLI package and executable to `gtm-docs-registry` and `gtm-docs`.
- Added CI coverage and issue templates for public-readiness.
- Published obvious needs-review wins where applicable.
- Completed a full needs-review QA sweep, reducing review profiles from 44 to 14.
- Published Monaco and Clay after follow-up source review; marked Default and HockeyStack as still blocked on credible MCP/CLI evidence.
- Added optional `reference.md` retrieval, a read-only HTTP server, source verification, surface drift detection, and draft profile generation.
- Added Vercel deployment configuration for the hosted read-only HTTP API.
- Added a public homepage and searchable catalog for the 184 published tool profiles.
- Added human-readable tool docs pages while preserving JSON retrieval for agents.
- Added `/llms.txt`, `/llms-full.txt`, `/openapi.json`, and an MCP-compatible JSON-RPC `/mcp` endpoint.
- Added dense `reference.md` retrieval notes for 19 additional high-priority tools.
- Clarified the project focus around source-backed docs retrieval for GTM tools, with no workflow recipes.
