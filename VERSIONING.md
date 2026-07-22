# Versioning & deprecation

Everything versionable in this project follows [semantic versioning](https://semver.org/):
`MAJOR.MINOR.PATCH`.

## What is versioned

| Thing | Version field | Bump rules |
|---|---|---|
| A skill | `version:` in its frontmatter | MAJOR = a rule/behaviour change consumers must react to; MINOR = additive guidance; PATCH = wording/fixes |
| A knowledge object | `version:` in its frontmatter | same as skills |
| The package / CLI / schemas | `version` in `package.json` | MAJOR = breaking schema or CLI change; MINOR = new commands/fields; PATCH = fixes |

## Schema changes require an RFC

The three schemas in `schemas/` are contracts every consumer depends on. Any change to
them starts as an **RFC issue** with a comment period before it is merged. Additive,
backward-compatible fields are a MINOR bump; removing or tightening a field is MAJOR.

## Deprecation, never silent deletion

- Mark the item `status: deprecated` and add a `supersedes` pointer to its successor
  (or reference the successor in the body).
- Deprecated content is **not deleted while anything still references it** — referential
  integrity is enforced by `node tools/di.mjs validate`.
- Announce removals in release notes at least one MINOR version before they happen.

## Releases

Tag releases in git (`git tag v0.2.0 && git push --tags`) and, when publishing to npm,
keep the `package.json` version, the plugin manifest version, and the git tag in step.
See [PUBLISHING.md](PUBLISHING.md).
