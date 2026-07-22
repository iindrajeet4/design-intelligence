# AGENTS.md — Design Intelligence

Instructions for AI coding agents working with this repository. This is the
cross-tool entry point: it is read natively by **OpenAI Codex, Cursor, GitHub
Copilot, Gemini CLI, Windsurf/Devin, Jules, Aider, Zed** and other AGENTS.md-aware
tools. **Claude Code** reads [`CLAUDE.md`](CLAUDE.md), which carries the same guidance.

This repository is a **Design Intelligence Layer** — structured design knowledge plus
explicit reasoning procedures. It is a system to **query**, not documentation to read
cover to cover.

## Workflow — when designing or building any UI

1. **Context.** Load `context/*.yaml` if present; otherwise infer one from the brief
   using `schemas/project-context.schema.json` and show it for correction.
2. **Decide.** Follow `engine/decision-engine/SKILL.md` to turn context into
   recommendations — each with reasoning, confidence, tradeoffs, and alternatives.
3. **Discover skills through the index.** Filter `index/skill-index.json` by
   `platforms`, `product_types`, `tags`. **Never read all of `skills/`** — load only
   the shortlisted `SKILL.md` files.
4. **Generate the design system.** Follow `engine/system-generator/SKILL.md`:
   primitive → semantic → component tokens, every token with a rationale, WCAG AA
   verified in both themes.
5. **Implement**, applying the selected skills' Rules and avoiding their Anti-patterns.
6. **Review and improve.** Follow `engine/review-engine/SKILL.md`; loop until score
   ≥ 85 and zero critical issues.

## Command-line interface (zero dependencies, Node ≥ 18)

```bash
node tools/di.mjs search <terms>        # find skills by keyword
node tools/di.mjs recommend ctx.yaml    # contextual recommendation
node tools/di.mjs review page.html      # static a11y/responsive pass
node tools/di.mjs list-skills           # list every skill
node tools/di.mjs validate              # validate all content (CI gate)
```

## MCP server (optional, universal)

`tools/di-mcp.mjs` is a stdio MCP server exposing `search_design_skills`,
`recommend_design_patterns`, `review_design`, `get_design_skill`, and
`list_design_skills`. Register it with any MCP-capable agent — see
[`docs/INTEGRATION.md`](docs/INTEGRATION.md).

## Hard constraints (never trade away)

- **Accessibility is a floor**, not a preference. Brand never overrides contrast,
  focus visibility, labels, or keyboard paths.
- **One primary action per view**; hierarchy reflects user priority.
- **Tokens are semantic**; components never reference primitive tokens directly.

## Skill format

Skills follow the [Agent Skills](https://agentskills.io) open standard (`SKILL.md`
with YAML frontmatter). They are compatible as-is with any agent that implements it.
