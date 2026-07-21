# Design Intelligence

**An open Design Intelligence Layer for AI coding agents.**

AI agents can already write correct code — but they lack a structured, contextual, retrievable body of *design* knowledge. The result is generic interfaces: identical dashboards, over-carded layouts, weak hierarchy, fragile accessibility. This project fixes the substrate, not the model:

> An agent should **query a structured design intelligence system**, not read design documentation.

```text
Understand product → users → goals → platform
        ↓
Retrieve relevant design knowledge        (knowledge graph + skill index)
        ↓
Make contextual design decisions          (decision engine)
        ↓
Generate a design system                  (system generator — justified tokens)
        ↓
Implement → Review → Detect problems → Improve   (review engine, critique loop)
```

## What's inside

| Layer | Where | What |
|---|---|---|
| **Knowledge graph** | `knowledge/` | Atomic, typed objects — principles, patterns, rules, anti-patterns, heuristics, decisions — linked by typed relations (`refines`, `requires`, `conflicts_with`, `resolved_by`, …) |
| **Skill library** | `skills/` | [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) (`SKILL.md`) packaging knowledge into loadable capabilities — 15 seed skills across principles, hierarchy, layout, typography, color, spacing, responsive, accessibility, navigation, forms, states, tables, dashboards |
| **Reasoning engines** | `engine/` | The decision, generation, and review *procedures* an agent executes — every recommendation explained with reasoning, confidence, tradeoffs, alternatives |
| **Retrieval index** | `index/skill-index.json` | Compiled from frontmatter; agents filter this instead of reading the repo |
| **Contracts** | `schemas/` | JSON Schema for skills, knowledge objects, and project contexts — CI-enforced |
| **Tooling** | `tools/` | Zero-dependency CLI: validate, build-index, search, recommend, review |

## Quick start

**With Claude Code** — clone and go; `CLAUDE.md` wires the workflow automatically:

```bash
git clone https://github.com/iindrajeet4/design-intelligence.git
```

**CLI** (Node ≥ 18, no install):

```bash
node tools/di.mjs search dashboard accessibility
node tools/di.mjs recommend context/project.example.yaml
node tools/di.mjs review your-page.html
node tools/di.mjs validate
```

## Design principles of the project itself

- **Contextual** — a luxury storefront and an enterprise dashboard get different answers.
- **Explainable** — every recommendation cites the knowledge object it derives from.
- **Evidence-based** — sources are classified (`official_standard` → `community_reference`); knowledge is original synthesis, never copied.
- **Agent-native** — progressive disclosure via Agent Skills; an agent loads ~100 tokens per skill until one is needed.
- **Validatable** — invalid skills fail CI; a stale index fails CI.
- **Accessibility is a hard floor** — brand personality shapes expression, never compliance.

## Roadmap

Knowledge base → skill system → decision engine → review engine → CLI *(you are here — seed MVP)* → MCP server → community skill ecosystem → registry. See [GOVERNANCE.md](GOVERNANCE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Code: [Apache-2.0](LICENSE) · Knowledge content (`knowledge/`, `skills/`, `engine/`): [CC BY 4.0](LICENSE-CONTENT). Referenced design systems and standards are cited as evidence; no proprietary content is reproduced.
