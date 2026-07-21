---
id: accessibility.accessibility-foundations
name: accessibility-foundations
description: The baseline accessibility every interface must meet — semantic HTML, visible focus, labelled controls, sufficient contrast, keyboard operability, and adequate touch targets. Treat as a hard constraint, not an enhancement.
version: 1.0.0
type: skill
category: accessibility
tags: [accessibility, wcag, keyboard, focus, contrast, aria]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [rules.interactive-has-focus-state, rules.form-controls-have-labels, rules.contrast-meets-wcag-aa, rules.touch-target-min-size]
dependencies: [principles.design-principles]
related_skills: [forms.accessible-form-design, color.color-system]
validation_rules: [semantic-html, focus-visible-present, contrast-meets-aa, form-controls-have-labels, keyboard-operable]
sources: [{ class: official_standard, title: "WCAG 2.2", url: "https://www.w3.org/TR/WCAG22/" }, { class: official_standard, title: "WAI-ARIA Authoring Practices Guide", url: "https://www.w3.org/WAI/ARIA/apg/" }]
quality: { evidence: 5, clarity: 5, implementation: 4, accessibility: 5, reusability: 5, maintainability: 5 }
status: stable
---

## Purpose

Guarantee the interface is usable by everyone, including keyboard, screen-reader, and touch users. Accessibility is a floor, applied by default — never a phase to add later.

## Non-negotiable rules

- **Semantic HTML first.** Use real buttons, links, headings, lists, and landmarks before reaching for ARIA. ARIA supplements semantics; it does not replace them.
- **Visible focus.** Every interactive element shows a clear `:focus-visible` indicator.
- **Labelled controls.** Every input has a programmatic label; errors are associated with their fields.
- **Contrast.** Text meets WCAG AA in every theme; meaning is never colour-only.
- **Keyboard operable.** Every action is reachable and operable by keyboard, in a logical order, with no traps.
- **Touch targets.** Meet the minimum target size on touch platforms.

## Review checklist

Tab through the whole view · check focus order and visibility · verify names/roles/states · run a contrast check · confirm no keyboard traps · test with a screen reader for critical flows.

## Validation

`semantic-html` · `focus-visible-present` · `contrast-meets-aa` · `form-controls-have-labels` · `keyboard-operable`

## Related skills

forms.accessible-form-design · color.color-system · data-tables.accessible-data-tables
