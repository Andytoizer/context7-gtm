# Internal Codex Maintenance

This folder is intentionally hidden from the public-facing registry instructions.

The actual product surfaces are the CLI, MCP server, HTTP API, catalog, `registry.json`, and `tools/*` profiles. This folder exists only for the scheduled Codex cloud maintenance job that keeps the registry fresh.

## Run Protocol

Use these scripts from the repository root:

```bash
node .internal/codex-maintenance/scripts/create-maintenance-plan.js --run-id "$(date -u +%F)" --batch-size 10 --max-agents 6
node .internal/codex-maintenance/scripts/run-scout-batch.js --run-dir ".internal/codex-maintenance/runs/<run-id>" --batch-id scout-001
node .internal/codex-maintenance/scripts/run-qa-batch.js --run-dir ".internal/codex-maintenance/runs/<run-id>" --batch-id scout-001
node .internal/codex-maintenance/scripts/apply-approved-findings.js --run-dir ".internal/codex-maintenance/runs/<run-id>"
node .internal/codex-maintenance/scripts/render-maintenance-report.js --run-dir ".internal/codex-maintenance/runs/<run-id>"
```

Memory may guide where scouts search, but memory is not evidence. Scout findings must cite current sources, and QA must approve findings before they are applied or used in a registry update.

