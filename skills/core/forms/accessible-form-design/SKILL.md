---
id: forms.accessible-form-design
name: accessible-form-design
description: Design forms that are usable, forgiving, and accessible — clear labels, helpful inline validation, associated errors, logical focus order, and a recoverable submit.
version: 1.0.0
type: skill
category: forms
tags: [forms, accessibility, validation, ux, usability]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile]
  product_types: [saas, ecommerce, enterprise]
knowledge: [rules.form-controls-have-labels, patterns.inline-validation, rules.interactive-has-focus-state]
dependencies: [accessibility.accessibility-foundations]
related_skills: [states.error-states, accessibility.accessibility-foundations]
validation_rules: [form-controls-have-labels, errors-associated-with-fields, keyboard-navigation-works]
sources: [{ class: official_standard, title: "WAI-ARIA Authoring Practices Guide — Forms", url: "https://www.w3.org/WAI/ARIA/apg/" }]
quality: { evidence: 5, clarity: 5, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Reduce the effort and anxiety of giving a product information, and make errors easy to understand and fix.

## Context

Use for any data-entry flow — sign-up, checkout, settings, search filters. Higher stakes (payments, account) raise the bar for clarity and error recovery.

## Rules

- Every control has a visible, programmatic label; placeholders are hints, not labels.
- Ask only for what is needed; group related fields; use one column for linear flows.
- Validate inline at a helpful moment (on blur / after a pause), not on every keystroke.
- Associate each error with its field so assistive tech announces it; on submit, focus the first error and summarise.
- Preserve entered data on error; never clear the form.

## Anti-patterns

Placeholder-as-label; a single generic error on submit; resetting fields after a failure; disabling submit with no explanation.

## Accessibility & responsive

Full keyboard operability and visible focus throughout. On mobile, use appropriate input types and keep targets large.

## Validation

`form-controls-have-labels` · `errors-associated-with-fields` · `keyboard-navigation-works`

## Related skills

states.error-states · accessibility.accessibility-foundations
