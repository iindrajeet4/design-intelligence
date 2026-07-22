<!-- Thanks for contributing to Design Intelligence. -->

## What this changes

<!-- One or two sentences. Link any related issue. -->

## Type

- [ ] New skill
- [ ] New / updated knowledge object
- [ ] Engine, CLI, or schema change (may require an RFC — see GOVERNANCE.md)
- [ ] Docs

## Checklist

- [ ] `node tools/di.mjs validate` passes
- [ ] `node tools/di.mjs build-index` run and the refreshed `index/skill-index.json` is committed
- [ ] `node tools/test.mjs` passes (if I touched tooling)
- [ ] New content classifies its `sources` and is **original synthesis** (no proprietary copying)
- [ ] For a new skill: ran `node tools/di.mjs certify <id>` and it passes the automated gate

## Notes for reviewers

<!-- Anything a maintainer should know: tradeoffs, open questions, evidence. -->
