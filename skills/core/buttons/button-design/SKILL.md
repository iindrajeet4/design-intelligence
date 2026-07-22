---
id: buttons.button-design
name: button-design
description: Design buttons with a clear action hierarchy — one primary per view, distinct secondary and tertiary styles, real semantics, visible focus, and honest labels that say what happens.
version: 1.0.0
type: skill
category: buttons
tags: [buttons, actions, hierarchy, accessibility]
priority: high
complexity: basic
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [heuristics.primary-action-distinct, rules.interactive-has-focus-state, principles.hierarchy-reflects-priority]
dependencies: [principles.design-principles]
related_skills: [hierarchy.visual-hierarchy, forms.accessible-form-design]
validation_rules: [one-primary-action, button-has-accessible-label, focus-visible-present]
sources: [{ class: industry_practice, title: "Button and action-hierarchy conventions across design systems" }]
quality: { evidence: 4, clarity: 5, implementation: 5, accessibility: 5, reusability: 5, maintainability: 5 }
status: stable
---

## Purpose

Buttons carry the actions. Their styling must communicate importance, and their labels
must be honest about what happens.

## Rules

- One visually dominant **primary** action per view; **secondary** actions are lighter;
  **tertiary**/text actions lightest. Destructive actions are styled distinctly and never the default primary.
- Use real `<button>`/`<a>` semantics — a link navigates, a button acts.
- Labels are verbs that state the outcome ("Publish", "Delete draft"), not "OK"/"Submit" where a specific word is clearer.
- Visible focus; comfortable target size; a clear disabled state that explains itself where possible.

## Anti-patterns

Two equal-weight filled buttons side by side; "Cancel" as loud as "Save"; a `<div>` acting as a button; vague labels.

## Validation

`one-primary-action` · `button-has-accessible-label` · `focus-visible-present`

## Related skills

hierarchy.visual-hierarchy · forms.accessible-form-design
