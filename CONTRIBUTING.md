# Contributing

Thanks for helping build the design intelligence layer. The barrier to contribute is deliberately low: everything is Markdown + YAML.

## Adding a skill

> Fastest start: `node tools/di.mjs new-skill <category> <name>` scaffolds a valid
> `SKILL.md` in `skills/community/` (add `--core` for core scope). A static reference
> template also lives in [`templates/SKILL.template.md`](templates/SKILL.template.md).

1. Create `skills/core/<category>/<skill-name>/SKILL.md` (community skills: `skills/community/...`).
2. Write frontmatter conforming to `schemas/skill.schema.json` — `id` is `<category>.<name>`, description ≤ 1024 chars, semver version.
3. Write the body with these sections: Purpose · (Context) · Rules · Anti-patterns · Accessibility · (Responsive) · Validation · Related skills. Keep it under ~5k tokens; put anything heavier in a `resources/` folder beside the SKILL.md.
4. Reference knowledge objects by id in `knowledge:`; every referenced id must exist.
5. Classify your `sources`. Original synthesis only — never copy proprietary docs.

## Adding a knowledge object

Create `knowledge/<type>s/<name>.md` with frontmatter conforming to `schemas/knowledge-object.schema.json`. One object = one idea. Link related objects with typed `relations`.

## Before opening a PR

```bash
node tools/di.mjs validate            # must pass
node tools/di.mjs certify <your-id>   # automated certification gate for a new skill
node tools/di.mjs build-index         # commit the refreshed index
```

CI runs the tests, validation, and the index freshness check; a stale
`index/skill-index.json` fails the build.

## Frontmatter YAML conventions

The zero-dependency parser supports block maps, block lists, one-level nesting, and inline flow style. Write lists-of-objects inline: `sources: [{ class: official_standard, title: "WCAG 2.2" }]`.

## Licensing of contributions

Code contributions are accepted under Apache-2.0; content contributions (`knowledge/`, `skills/`, `engine/`) under CC BY 4.0. Submitting a PR certifies you have the right to contribute the material under those terms.
