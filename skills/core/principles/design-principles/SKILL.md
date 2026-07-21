---
id: principles.design-principles
name: design-principles
description: The foundational design principles an agent should apply to every interface — hierarchy reflects priority, clarity beats decoration, and consistency reduces load. Start here before any UI work.
version: 1.0.0
type: skill
category: principles
tags: [principles, foundations, hierarchy, clarity, consistency]
priority: high
complexity: basic
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [principles.hierarchy-reflects-priority, principles.clarity-over-decoration, principles.consistency-reduces-load]
related_skills: [hierarchy.visual-hierarchy, spacing.spacing-system]
validation_rules: [primary-action-distinct, no-gratuitous-decoration]
sources: [{ class: industry_practice, title: "Synthesis of principles common to mature design systems" }]
quality: { evidence: 4, clarity: 5, implementation: 4, accessibility: 4, reusability: 5, maintainability: 5 }
status: stable
---

## Purpose

Ground every design decision in three durable principles. When in doubt, these override style trends and personal taste.

## Principles

1. **Hierarchy reflects priority.** The most important thing for the user is the most prominent thing on screen. Visual weight is a budget — spend it on what matters.
2. **Clarity beats decoration.** Every effect (gradient, shadow, card, blur) must earn its place by aiding comprehension. Ornament for its own sake is a cost.
3. **Consistency reduces load.** Reuse patterns, spacing, and language so users learn once and apply everywhere.

## Rules

- Exactly one primary action per view; secondary actions are demoted in weight.
- Derive spacing, type, and colour from shared tokens — never ad-hoc values.
- Add elevation or colour only to signal a real difference in state or priority.

## Anti-patterns

Everything emphasised (so nothing is); excessive cards, gradients, and glassmorphism; a different button or table style on every screen.

## Validation

- `primary-action-distinct` — one dominant action per view.
- `no-gratuitous-decoration` — visual effects map to meaning.

## Related skills

hierarchy.visual-hierarchy · spacing.spacing-system · color.color-system
