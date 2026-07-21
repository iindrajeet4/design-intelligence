---
id: states.error-states
name: error-states
description: Handle errors with recovery in mind — say what went wrong in plain language, why, and how to fix it, at the right level, without blame or dead ends.
version: 1.0.0
type: skill
category: states
tags: [states, errors, recovery, messaging]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [patterns.inline-validation]
related_skills: [states.loading-states, forms.accessible-form-design]
validation_rules: [error-explains-and-recovers, no-dead-ends]
sources: [{ class: industry_practice, title: "Error-handling and messaging conventions across major design systems" }]
quality: { evidence: 4, clarity: 5, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Turn failure into recovery. A good error state tells the user what happened and gives them a way forward.

## Rules

- Write plainly: what went wrong, why (if useful), and the next action. No apologies, no jargon, no blame.
- Put the message where the problem is (inline for field errors; scoped for section failures; page-level only for whole-page failures).
- Always offer a path forward — retry, edit, go back, or contact — never a dead end.
- Preserve the user's work; never discard input on error.
- Announce errors to assistive tech and move focus to the first actionable point.

## Message shape

State the problem → give the reason if it helps → offer the fix. Example: "We couldn't save your changes because the connection dropped. Retry."

## Validation

- `error-explains-and-recovers` — message names the problem and a next step.
- `no-dead-ends` — every error offers an action.

## Related skills

states.loading-states · forms.accessible-form-design
