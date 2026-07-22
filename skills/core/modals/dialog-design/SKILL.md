---
id: modals.dialog-design
name: dialog-design
description: Use modal dialogs sparingly and correctly — only for focused interrupting decisions — with proper focus trapping, Escape to close, a labelled dialog, and a mobile-appropriate alternative.
version: 1.0.0
type: skill
category: modals
tags: [modals, dialogs, focus, accessibility]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [anti-patterns.modal-for-everything, interactions.keyboard-navigation, rules.interactive-has-focus-state]
dependencies: [accessibility.accessibility-foundations]
related_skills: [accessibility.accessibility-foundations, tabs.tabs-and-accordions]
validation_rules: [modal-traps-focus, modal-dismissible, modal-has-label]
sources: [{ class: official_standard, title: "WAI-ARIA Authoring Practices Guide — Dialog (Modal)", url: "https://www.w3.org/WAI/ARIA/apg/" }]
quality: { evidence: 5, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

A modal interrupts the user and demands attention. That power is worth it only for
focused decisions that genuinely must block the flow.

## When to use (and not)

- **Use** for a confirming/interrupting decision (destructive confirm, a short required choice).
- **Avoid** for routine editing, showing detail, or multi-step flows — prefer inline editing, detail panels, or a real page (see anti-patterns.modal-for-everything).

## Rules

- Trap focus inside the open dialog; return focus to the trigger on close.
- Dismiss with Escape and an explicit close control; consider click-outside for non-destructive dialogs.
- Give the dialog an accessible name (`aria-labelledby`) and role `dialog`/`alertdialog`.
- Never stack modals. On mobile, prefer a full page or bottom sheet over an emulated desktop modal.

## Validation

`modal-traps-focus` · `modal-dismissible` · `modal-has-label`

## Related skills

accessibility.accessibility-foundations · tabs.tabs-and-accordions
