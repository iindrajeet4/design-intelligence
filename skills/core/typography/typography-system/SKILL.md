---
id: typography.typography-system
name: typography-system
description: Establish a type system — a modular scale, deliberate weights, and readable measures — that carries hierarchy and personality without relying on decoration.
version: 1.0.0
type: skill
category: typography
tags: [typography, type-scale, readability, hierarchy]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing]
knowledge: [principles.hierarchy-reflects-priority, rules.contrast-meets-wcag-aa]
dependencies: [principles.design-principles]
related_skills: [color.color-system, spacing.spacing-system]
validation_rules: [type-scale-consistent, body-contrast-aa]
sources: [{ class: industry_practice, title: "Type-scale and readability conventions across major design systems" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Make type do the heavy lifting: a small, consistent scale that expresses hierarchy and gives the product a voice.

## Rules

- Define a modular type scale (e.g. a fixed ratio) and stay on it; avoid one-off sizes.
- Pair at most two families with clear roles (e.g. display + text), plus a mono for data if needed.
- Set line-height by role: tighter for headings, roomier for body.
- Body text must meet WCAG AA contrast in every theme.

## Personality with restraint

Typography can carry brand character (a distinctive display face, considered weights and spacing) while body text stays quiet and readable. Do not default to the same "safe" sans everywhere.

## Accessibility

Respect user font-size preferences; use relative units. Keep uppercase runs short and letter-spaced.

## Validation

- `type-scale-consistent` — sizes come from the defined scale.
- `body-contrast-aa` — body text ≥ 4.5:1.

## Related skills

color.color-system · spacing.spacing-system · hierarchy.visual-hierarchy
