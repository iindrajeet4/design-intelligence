---
id: cards.card-design
name: card-design
description: Use cards deliberately to group related content — with real hierarchy inside, restrained elevation, and a clear primary action — instead of wrapping everything in a card by reflex.
version: 1.0.0
type: skill
category: cards
tags: [cards, layout, grouping, restraint]
priority: medium
complexity: basic
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, dashboard, marketing]
knowledge: [principles.clarity-over-decoration, principles.consistency-reduces-load, principles.hierarchy-reflects-priority]
dependencies: [principles.design-principles]
related_skills: [layout.layout-foundations, spacing.spacing-system]
validation_rules: [card-groups-related-content, no-card-overuse]
sources: [{ class: industry_practice, title: "Card usage guidance across design systems" }]
quality: { evidence: 3, clarity: 4, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

A card is a container that says "these things belong together." Used well it clarifies;
overused it fragments a page into noisy boxes.

## Rules

- Use a card only when it groups genuinely related content that benefits from separation.
- Keep internal hierarchy clear: one focal element, supporting detail, at most one primary action.
- Restrain elevation and borders — one subtle separation cue, not shadow + border + background all at once.
- Keep cards in a set consistent in structure and spacing.

## Anti-patterns

Wrapping every element in its own card; nested cards; a grid of equal cards where nothing is more important; heavy shadows/gradients on every card (a common AI-generated tell).

## Validation

`card-groups-related-content` · `no-card-overuse`

## Related skills

layout.layout-foundations · spacing.spacing-system
