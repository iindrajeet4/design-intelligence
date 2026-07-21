---
id: rules.form-controls-have-labels
type: rule
name: Every form control has a programmatic label
summary: Inputs, selects, and textareas must have an associated label that assistive technology can announce — placeholder text is not a label.
status: stable
version: 1.0.0
tags: [accessibility, forms, labels]
applies_to:
  platforms: [web, mobile]
relations: [{ kind: related_to, target: patterns.inline-validation }]
sources: [{ class: official_standard, title: "WAI-ARIA Authoring Practices Guide — Forms", url: "https://www.w3.org/WAI/ARIA/apg/" }]
---

## Rule

Every control that accepts input must be programmatically associated with a text label, via a `<label for>`, wrapping label, `aria-label`, or `aria-labelledby`. Placeholders disappear on input and are not a substitute.

## How to satisfy

- Pair each input with a visible `<label>` linked by `for`/`id`.
- Where a visible label is genuinely impossible, use `aria-label` — but a visible label is almost always better.
- Group related controls (e.g. radio sets) with `<fieldset>` and `<legend>`.

## Validation

`form-controls-have-labels` — every input/select/textarea resolves to an accessible name.
