---
id: principles.clarity-over-decoration
type: principle
name: Clarity beats decoration
summary: Visual effects must earn their place by improving comprehension; ornament that adds cognitive load without meaning is a cost, not a feature.
status: stable
version: 1.0.0
tags: [clarity, restraint, foundations]
relations: [{ kind: related_to, target: patterns.progressive-disclosure }, { kind: related_to, target: anti-patterns.modal-for-everything }]
sources: [{ class: industry_practice, title: "Restraint-first guidance common to mature design systems" }]
---

## Principle

Every visual device — a gradient, a shadow, a card border, a glass blur — carries a comprehension cost. It is justified only when it helps the user understand structure, state, or priority. Decoration applied for its own sake competes with content for attention.

## Why it matters

AI-generated interfaces tend to over-decorate: excessive cards, stacked gradients, and glassmorphism that blur hierarchy. The result looks busy and generic. Restraint is what makes an interface read as considered.

## How to apply

- Before adding an effect, ask what it *communicates*. If the answer is "nothing," remove it.
- Default to flat surfaces and clear type; add elevation or colour only to signal real differences.
- Reserve strong visual moments for one place per view, and keep everything around it quiet.
