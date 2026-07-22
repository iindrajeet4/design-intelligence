---
id: onboarding.first-run-onboarding
name: first-run-onboarding
description: Get users to their first success fast — show value before setup, teach in context instead of upfront tours, make progress visible, and always allow skip and return.
version: 1.0.0
type: skill
category: onboarding
tags: [onboarding, first-run, activation, empty-states]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile]
  product_types: [saas, ecommerce, enterprise]
knowledge: [principles.hierarchy-reflects-priority, patterns.progressive-disclosure, heuristics.recognition-over-recall]
dependencies: [principles.design-principles]
related_skills: [states.empty-states, forms.accessible-form-design]
validation_rules: [value-before-setup, teach-in-context, skippable-and-resumable]
sources: [{ class: industry_practice, title: "Onboarding and activation design guidance" }]
quality: { evidence: 3, clarity: 4, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

The first session decides whether a user stays. Move them to a first meaningful outcome
with the least friction.

## Rules

- Show value before demanding setup; ask only for what's needed to reach the first success.
- Teach in context (inline hints at the moment of use) rather than a front-loaded tour that users click past.
- Use empty states as onboarding: explain what goes here and offer the first action (see states.empty-states).
- Make progress visible for multi-step setup; always allow skip, and let users resume later.
- Celebrate the first success clearly.

## Anti-patterns

Long modal tours before any value; forcing full profile setup upfront; no way to skip; onboarding that can't be resumed.

## Validation

`value-before-setup` · `teach-in-context` · `skippable-and-resumable`

## Related skills

states.empty-states · forms.accessible-form-design
