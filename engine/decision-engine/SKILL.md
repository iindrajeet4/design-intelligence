---
id: engine.decision-engine
name: decision-engine
description: The contextual design decision procedure — turn a project context into ranked, explained design recommendations with reasoning, confidence, tradeoffs, and alternatives. Run before implementing any interface.
version: 1.0.0
type: skill
category: engine
tags: [engine, decisions, context, reasoning]
priority: high
complexity: advanced
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [decisions.sidebar-when-frequent-switching, decisions.editorial-when-emotional, patterns.progressive-disclosure]
related_skills: [engine.system-generator, engine.review-engine]
sources: [{ class: industry_practice, title: "Original synthesis — contextual design decision method" }]
quality: { evidence: 4, clarity: 5, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Never apply a design pattern blindly. This skill is the procedure for turning *what the product is* into *what the design should be*, with every recommendation explained.

## Inputs

A project context (`context/` YAML conforming to `schemas/project-context.schema.json`), or a product brief from which you infer one. If you infer, show the inferred context and ask for corrections.

## The method

1. **Normalise context.** Extract the dimensions: product type · audience · user expertise · platforms/devices · information density · interaction frequency · accessibility target · conversion priority · brand personality · emotional weight.
2. **Retrieve candidates.** Query `index/skill-index.json`, filtering by `platforms`, `product_types`, and `tags`. Do **not** read all of `skills/` — load only the shortlisted skills' SKILL.md files.
3. **Score applicability.** For each candidate, judge match strength against the context dimensions. Prefer high-priority, stable skills.
4. **Detect and resolve conflicts.** Where two selected skills pull opposite directions (e.g. high density vs mobile simplicity), name the conflict, its severity, and resolve using the knowledge graph (`conflicts_with` / `resolved_by`) — e.g. progressive disclosure on mobile. Hard constraints always win: accessibility overrides brand styling; platform limits override density wishes.
5. **Rank and explain.** Emit recommendations in the output shape below.

## Output shape (non-negotiable)

Every recommendation carries all five fields:

```yaml
recommendations:
  navigation:
    recommendation: sidebar
    confidence: high          # high | medium | low
    reasoning: frequent switching across many sections
    tradeoffs: consumes horizontal space
    alternatives: [top-nav, command-palette]
conflicts:
  - between: [information density (high), mobile simplicity]
    severity: high
    resolution: progressive disclosure on mobile
```

## Constraints (always enforced)

- Accessibility target is a hard floor, never traded away.
- Brand personality shapes expression, not compliance — "luxury" never justifies unreadable contrast.
- Recommendations must cite the knowledge object or skill they derive from (`evidence:` field) so the decision is auditable.

## Deterministic baseline

`node tools/di.mjs recommend <project.yaml>` produces a reference recommendation for common contexts. Use it as a starting point and sanity check; your contextual reasoning should refine, not contradict, its hard constraints.

## Related skills

engine.system-generator (next step) · engine.review-engine (after implementation)
