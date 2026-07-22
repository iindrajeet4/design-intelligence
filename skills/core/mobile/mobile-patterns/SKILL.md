---
id: mobile.mobile-patterns
name: mobile-patterns
description: Design for touch and small screens on their own terms — reachable primary actions, generous targets, native inputs and gestures, and prioritised content, not a shrunk desktop layout.
version: 1.0.0
type: skill
category: mobile
tags: [mobile, touch, responsive, ergonomics]
priority: high
complexity: intermediate
applies_to:
  platforms: [mobile, web]
  product_types: [ecommerce, saas, marketing, enterprise]
knowledge: [rules.touch-target-min-size, patterns.progressive-disclosure, heuristics.recognition-over-recall]
dependencies: [responsive.responsive-design]
related_skills: [responsive.responsive-design, navigation.navigation-patterns]
validation_rules: [primary-action-reachable, targets-and-spacing-adequate, native-inputs-used]
sources: [{ class: industry_practice, title: "Mobile and touch design guidance across platforms" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Mobile is not a narrow desktop. Thumbs, small viewports, variable connectivity, and
interruptions change what good design is.

## Rules

- Keep primary actions within thumb reach (bottom/near-bottom); avoid burying key actions in top corners.
- Targets and spacing meet touch minimums (see rules.touch-target-min-size); avoid tiny adjacent controls.
- Use native input types and controls (correct keyboard, pickers); support expected gestures without hiding all actions behind them.
- Prioritise content ruthlessly; move secondary detail behind progressive disclosure.
- Design for interruption and slow networks: preserve state, show progress, fail gracefully.

## Anti-patterns

Desktop layout scaled down; hover-dependent actions; tiny tap targets; gesture-only actions with no visible affordance.

## Validation

`primary-action-reachable` · `targets-and-spacing-adequate` · `native-inputs-used`

## Related skills

responsive.responsive-design · navigation.navigation-patterns
