---
id: states.empty-states
name: empty-states
description: Turn empty screens into onboarding moments — explain what belongs here and give a clear first action, distinguishing "nothing yet" from "no results" and "error".
version: 1.0.0
type: skill
category: states
tags: [states, empty, onboarding, first-run]
priority: medium
complexity: basic
applies_to:
  platforms: [web, mobile]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [principles.hierarchy-reflects-priority]
related_skills: [states.loading-states, states.error-states]
validation_rules: [empty-state-has-primary-action, empty-variants-distinguished]
sources: [{ class: industry_practice, title: "Empty-state conventions across major design systems" }]
quality: { evidence: 3, clarity: 4, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

The first time a user sees a feature, it is often empty. Use that moment to orient and activate them rather than showing a blank void.

## Rules

- Distinguish three cases: **nothing yet** (first run), **no results** (a filter/search returned none), and **error** (something failed). They need different copy and actions.
- For "nothing yet," explain what will appear here and give one clear primary action to create the first item.
- For "no results," suggest how to broaden or clear the query.
- Keep it calm and brief; do not over-illustrate a routine empty list.

## Anti-patterns

A bare "No data"; treating an error as an empty state; a wall of illustration with no next step.

## Validation

- `empty-state-has-primary-action` — first-run empty states offer a clear action.
- `empty-variants-distinguished` — nothing-yet / no-results / error are handled distinctly.

## Related skills

states.loading-states · states.error-states
