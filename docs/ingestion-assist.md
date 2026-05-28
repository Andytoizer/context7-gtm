# Ingestion Assist

Use `scripts/create-draft-profile.js` to turn vendor documentation inputs into a review-only draft profile. The script writes to `draft-profiles/<slug>/` and never edits `registry.json`.

## Input

Required fields:

- `name`: display name.
- `slug`: lowercase registry slug.
- `canonicalUrl`: official product or company URL.
- `sourceUrls`: one or more official documentation URLs.

Optional fields:

- `aliases`: alternate names to seed `tool.json`.
- `llmsTxtUrl`: AI-oriented docs or `llms.txt` URL.
- `openApiUrl`: OpenAPI/spec URL.
- `notes`: reviewer context.
- `status`: `draft` or `needs-review`. Any other value is written as `draft`.

## Commands

```sh
node scripts/create-draft-profile.js examples/draft-profile-input.json
node scripts/create-draft-profile.js examples/draft-profile-input.json --force
```

The command creates `tool.json`, `docs.md`, `sources.json`, and, when `llmsTxtUrl` or `openApiUrl` is present, `reference.md`.

## Review Flow

1. Review all TODO markers against the listed sources.
2. Fill endpoint, auth, object, rate-limit, and pagination details with source-backed facts.
3. Keep status as `draft` or `needs-review` while the profile lives under `draft-profiles/`.
4. After human approval, move the folder into `tools/<slug>/`.
5. Add the `registry.json` entry manually and run `npm run validate`.

The script fails when the draft folder already exists unless `--force` is passed.
