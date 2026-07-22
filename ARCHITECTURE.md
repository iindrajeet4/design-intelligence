# Architecture

The design specification for the Design Intelligence Layer. This is the canonical
text version; a visual walkthrough of the same content is available as a published
artifact.

## 1. Executive summary

AI coding agents can write correct code but lack a structured, contextual, retrievable
body of *design* knowledge, so they fall back on generic defaults. This project is an
**Open Design Intelligence Layer**: a git-native, machine-readable knowledge system plus
explicit reasoning procedures that let an agent understand context, retrieve the right
design knowledge, make explainable decisions, generate a coherent design system,
implement, and critique-and-improve in a loop.

**Core bet:** do not invent a new consumption mechanism — build on the open standards
already converging here: **Agent Skills** (`SKILL.md`), **MCP**, and **W3C Design Tokens**.

## 2. Problem definition

The failure is not code generation; it is the absence of a design *reasoning substrate*.
Three root causes: (1) design knowledge is unstructured prose; (2) no contextual
selection, so a single default is applied to every brief; (3) no feedback loop, so the
agent stops at its first output. The deliverable is therefore **infrastructure** — a
knowledge layer, a retrieval layer, and a reasoning method — not a documentation site.

## 3. Existing ecosystem

- **Design knowledge today**: enterprise design systems (Material, HIG, Fluent, Carbon,
  Polaris…), standards (WCAG 2.2, WAI-ARIA APG), token standards (W3C DTCG, Style
  Dictionary). Authoritative but prose-first, vendor-specific, not machine-queryable.
- **Agent knowledge mechanisms today**: `CLAUDE.md`/`AGENTS.md` (always-on rules), Agent
  Skills (progressive disclosure), MCP (tools/resources), RAG.
- **The white space**: no design-specific knowledge layer built natively for those
  mechanisms, and nothing that performs contextual design *reasoning*.

## 4. Proposed architecture

Three planes. The lower two are data at rest in git; the top is behaviour executed by
the agent.

- **Knowledge plane** (`knowledge/`, `skills/`, `index/`): a typed knowledge graph,
  packaged into Agent Skills, compiled into a retrieval index.
- **Reasoning plane** (`engine/`): the decision, generation, and review *procedures* an
  agent executes.
- **Interface plane**: Agent Skills (native today), the CLI, and an MCP server.

**Pivotal reframe:** the engines are not programs we build — they are documented
procedures plus decision-typed knowledge objects that a capable agent executes. The LLM
supplies reasoning; the repo supplies grounding, structure, conflict-awareness, and an
audit trail. This is why every recommendation is explainable.

## 5. Repository structure

```
schemas/     JSON Schema contracts (source of truth)
knowledge/   atomic, typed, graph-connected objects
skills/      SKILL.md packages (the unit agents load); core/ + community/
engine/      reasoning procedures, delivered as skills
index/        GENERATED — skill-index.json
tools/       zero-dependency CLI + MCP server
context/     project-context examples
```

Humans and PRs edit `knowledge/` and `skills/`; a build step produces `index/`.

## 6. Knowledge object model

Knowledge is a typed, directed graph. Object types: **principle, pattern, component,
interaction, rule, anti-pattern, heuristic, decision, token**. Typed relations:
`refines, implements, composes, requires, conflicts_with, resolved_by, evidenced_by,
reviewed_by, related_to`. Each object carries `id · type · name · summary · body ·
relations · sources · applies_to`. The `summary` is indexed; the body loads on demand.

## 7. Skill schema

A **Skill** is an Agent Skill (`SKILL.md`) that packages knowledge objects into a
loadable capability. Progressive disclosure: frontmatter (~100 tokens, always) → body
(< 5k tokens, on selection) → resources (on demand). Body sections: Purpose, Context,
Inputs/Outputs, Principles, Rules, Patterns, Anti-patterns, Accessibility, Responsive,
Implementation, Validation, Related, References.

## 8. Metadata schema

Strict JSON Schema (draft 2020-12) validates the frontmatter of skills, knowledge
objects, and project contexts. Namespaced ids, semver versions, `applies_to`,
dependencies, `related_skills`, `validation_rules`, classified `sources`, `quality`
scores, and `status`. Invalid content fails CI.

## 9. Retrieval architecture

**Hybrid** (recommended): Markdown + YAML frontmatter is the human/agent-readable source
of truth; a compiled `skill-index.json` is the fast retrieval layer; SQLite FTS and
vector embeddings are optional later layers. Tiered retrieval: (0) frontmatter
disclosure, (1) structured filter over the index, (2) full-text/semantic (future),
(3) MCP tools (present). The agent never reads the whole repository.

## 10. Design decision engine

Input: a project context. Method: normalise context into dimensions → retrieve
candidate skills → score applicability → detect and resolve conflicts → rank and explain.
Output: recommendations, each with reasoning, confidence, tradeoffs, and alternatives.
Rules are themselves knowledge objects (decisions, heuristics), so the engine is
data-driven and auditable.

## 11. Design review engine

Six dimensions — UX, UI, accessibility, responsive, performance, product. Deterministic
checks (contrast, focus, labels, targets) are delegated to tooling; the rest are
heuristics grounded in the knowledge graph. Output: a score and structured issues
(`severity, dimension, reasoning, suggested_fix, affected_skill, evidence`). The critique
loop runs generate → review → prioritise → improve → re-review until score ≥ threshold
and zero critical issues.

## 12. Claude Code integration

`CLAUDE.md` is a thin entry point that explains the workflow and points to the index;
`AGENTS.md` mirrors it for other tools. Skills auto-register; the decision and review
engines are themselves skills. Efficiency comes from progressive disclosure and
index-driven selection.

## 13. MCP evaluation

MCP is the universal, agent-agnostic access path. The knowledge layer is built MCP-ready
(stable ids, clean JSON index, pure functions), so the server (`tools/di-mcp.mjs`) is a
thin adapter exposing `search_design_skills`, `recommend_design_patterns`,
`review_design`, `get_design_skill`, `list_design_skills`.

## 14. MVP scope

3 schemas, seed skills across the core categories, an index builder, a validator, a
CLI, and the decision/review engine skills, with docs and dual licensing. Semantic
search and the community registry are designed-for but added incrementally.

## 15. Long-term roadmap

Knowledge base → skill system → decision engine → review engine → CLI → MCP server →
community skill ecosystem → registry/marketplace. Each phase adds a capability layer or
a new audience; earlier phases make the system smarter, later phases make it universal
and self-growing.

## 16. Open-source governance

`skills/core/` is curated; `skills/community/` is contributed. Contribution flow: PR →
schema validation → maintainer review → quality score recorded → merge. Semver +
deprecation with `supersedes`. Certification = automated validation + human review, never
vanity metrics.

## 17. Licensing strategy

**Apache-2.0** for code (patent + trademark clarity for infrastructure), **CC BY 4.0**
for knowledge (maximal reuse, no copyleft friction). Only original synthesis; every
principle carries a classified source; no proprietary content is reproduced.

## 18. Risks

The most important is **design monoculture** — a system like this could homogenise the
web. Mitigations: contextual recommendations, brand personality as a first-class
dimension, alternatives always surfaced, and evidence-not-fashion sourcing. Others:
index drift (CI-generated index), context budget (progressive disclosure), skill sprawl,
and agents ignoring or over-trusting the knowledge (IDs validated; review loop as backstop).

## 19. Technology stack

Content in Markdown + YAML; contracts in JSON Schema; zero-dependency Node tooling
(runs with only `node`); axe-style deterministic checks where possible; GitHub Actions CI.
The knowledge layer stays language-agnostic — files and JSON — so anyone can consume it
without running our code.

## 20. Implementation plan

Schemas → repo scaffold + governance/licensing → templates → validator + index builder +
CI → seed skills → decision engine → review engine → CLI → end-to-end demo → contribution
docs. Later: MCP packaging, community infrastructure, registry and catalog site.
