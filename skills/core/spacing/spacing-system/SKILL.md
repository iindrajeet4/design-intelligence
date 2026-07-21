---
id: spacing.spacing-system
name: spacing-system
description: Use a consistent spacing scale and let layout containers own the gaps, producing even rhythm and grouping that communicates structure.
version: 1.0.0
type: skill
category: spacing
tags: [spacing, rhythm, tokens, layout]
priority: medium
complexity: basic
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [principles.consistency-reduces-load]
dependencies: [principles.design-principles]
related_skills: [layout.layout-foundations]
validation_rules: [spacing-from-scale, grouping-by-proximity]
sources: [{ class: industry_practice, title: "Spacing-scale conventions across major design systems" }]
quality: { evidence: 4, clarity: 4, implementation: 5, accessibility: 3, reusability: 5, maintainability: 5 }
status: stable
---

## Purpose

Turn spacing from guesswork into a system, so rhythm is even and proximity communicates grouping.

## Rules

- Define a spacing scale (commonly a base unit stepped in a fixed progression) and use only those values.
- Express spacing between siblings with `gap` on a flex/grid container — not per-element margins that collapse or double.
- Use larger space to separate groups and smaller space within a group; proximity is meaning.
- Keep spacing tokens semantic where useful (e.g. `space-section`, `space-inline`).

## Anti-patterns

Random pixel values; inconsistent gaps between similar elements; using margins to nudge single elements into place.

## Validation

- `spacing-from-scale` — all spacing values come from the scale.
- `grouping-by-proximity` — related items are visibly grouped.

## Related skills

layout.layout-foundations · hierarchy.visual-hierarchy
