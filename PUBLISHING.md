# Publishing to npm

Publishing distributes the CLI (`di`) and the MCP server (`di-mcp`) so any agent can use
them via `npx`, with zero install. **Publishing requires your own npm account and login —
it is the one step a maintainer must run.**

## One-time

```bash
npm login          # authenticate with your npm account
npm whoami         # confirm you're logged in
```

## Publish

```bash
# from the repo root
npm run check      # runs tests + validate + index freshness (also runs automatically via prepublishOnly)
npm publish        # publishes the current version publicly
```

`prepublishOnly` runs `npm run check` for you, so a broken build cannot be published.
The package ships the knowledge (`skills/`, `knowledge/`, `engine/`), the compiled
`index/`, the schemas, the tooling, and `CLAUDE.md`/`AGENTS.md`.

## After publishing — how anyone uses it

```bash
# CLI, no install
npx design-intelligence search dashboard accessibility
npx design-intelligence recommend project.yaml

# MCP server (register with any MCP-capable agent), e.g. Emergent / Codex:
# { "command": "npx", "args": ["-y", "-p", "design-intelligence", "di-mcp"] }
```

## Versioning

Follow semver. Bump `version` in `package.json` (and the plugin manifest) before each
publish; tag releases in git (`git tag v0.2.0 && git push --tags`). Deprecate, never
silently break — see [GOVERNANCE.md](GOVERNANCE.md).

## Name note

The package name `design-intelligence` was unclaimed at time of writing. If it is taken
when you publish, either claim a scope (`@your-org/design-intelligence`) by setting
`name` accordingly, or choose another name and update the `npx` examples in
[docs/INTEGRATION.md](docs/INTEGRATION.md).
