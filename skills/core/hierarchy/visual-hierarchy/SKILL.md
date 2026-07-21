---
id: hierarchy.visual-hierarchy
name: visual-hierarchy
description: Build a clear visual hierarchy so users find what matters at a glance — using size, weight, colour, and spacing to encode priority rather than decoration.
version: 1.0.0
type: skill
category: hierarchy
tags: [hierarchy, layout, typography, emphasis]
priority: high
complexity: basic
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [principles.hierarchy-reflects-priority, heuristics.primary-action-distinct]
dependencies: [principles.design-principles]
related_skills: [typography.typography-system, spacing.spacing-system]
validation_rules: [single-dominant-focal-point, contrast-encodes-priority]
sources: [{ class: industry_practice, title: "Visual-hierarchy conventions across major design systems" }]
quality: { evidence: 4, clarity: 5, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Turn a list of content into a scannable interface where priority is obvious before the user reads a word.

## Method

1. Rank every element on the view by user priority.
2. Assign the most contrast (size/weight/colour) to the top of the ranking; step each level down.
3. Group related items with proximity and whitespace; separate unrelated ones.
4. Confirm there is a single, obvious focal point.

## Rules

- One dominant focal point per view; one primary action.
- Encode priority with contrast, not with novelty — resist a new visual gimmick per section.
- Whitespace is a hierarchy tool, not empty space to fill.

## Accessibility

Never signal hierarchy with colour alone; pair with size, weight, or position so it survives colour-blindness and greyscale.

## Validation

- `single-dominant-focal-point` — one clear centre of attention.
- `contrast-encodes-priority` — visual weight tracks the priority ranking.

## Related skills

typography.typography-system · spacing.spacing-system · principles.design-principles
