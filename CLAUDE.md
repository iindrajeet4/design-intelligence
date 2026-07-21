# Design Intelligence — agent instructions

This repository is a **Design Intelligence Layer**: structured design knowledge plus explicit reasoning procedures for AI coding agents. It is not documentation to read cover-to-cover — it is a system to query.

## The workflow (when designing or building any UI)

1. **Load the project context.** Read `context/*.yaml` if present; otherwise infer one from the brief using `schemas/project-context.schema.json` and show it for correction.
2. **Run the decision engine.** Follow `engine/decision-engine/SKILL.md` to turn context into recommendations — each with reasoning, confidence, tradeoffs, and alternatives.
3. **Discover skills through the index.** Query `index/skill-index.json` (filter by `platforms`, `product_types`, `tags`). **Never read all of `skills/` — load only the shortlisted SKILL.md files.**
4. **Generate the design system.** Follow `engine/system-generator/SKILL.md`: primitive → semantic → component tokens, every token with a rationale, WCAG AA verified in both themes.
5. **Implement**, applying the selected skills' Rules and avoiding their Anti-patterns.
6. **Review and improve.** Follow `engine/review-engine/SKILL.md`; loop until score ≥ 85 and zero critical issues. `node tools/di.mjs review page.html` gives the deterministic first pass.

## Hard constraints (never trade away)

- Accessibility (`accessibility.accessibility-foundations`) is a floor, not a preference. Brand never overrides contrast, focus visibility, labels, or keyboard paths.
- One primary action per view; hierarchy reflects user priority.
- Tokens are semantic; components never reference primitives directly.

## Tooling (zero dependencies, Node ≥ 18)

```bash
node tools/di.mjs search <terms>       # find skills by keyword
node tools/di.mjs recommend ctx.yaml   # deterministic recommendation baseline
node tools/di.mjs review page.html     # static a11y/responsive heuristic pass
node tools/di.mjs validate             # validate all skills + knowledge (CI gate)
node tools/di.mjs build-index          # recompile index/skill-index.json
```

## Contributing content

Skills live in `skills/`, knowledge objects in `knowledge/`. Frontmatter must validate against `schemas/`. After adding or editing content, run `validate` then `build-index` — CI rejects a stale index. Knowledge must be original synthesis with classified `sources`; never copy proprietary documentation.
