---
id: rules.logical-heading-order
type: rule
name: Headings form a logical outline
summary: Use one h1 per page and nest headings without skipping levels, so the document has a meaningful outline for assistive tech and scanning.
status: stable
version: 1.0.0
tags: [accessibility, semantics, hierarchy]
applies_to:
  platforms: [web]
relations: [{ kind: related_to, target: principles.hierarchy-reflects-priority }]
sources: [{ class: official_standard, title: "WCAG 2.2 — Info and Relationships (1.3.1); HTML sectioning semantics", url: "https://www.w3.org/TR/WCAG22/" }]
---

## Rule

Each page has a single `h1` describing its purpose; subsequent headings (`h2`, `h3`, …)
nest without skipping a level. Headings describe structure — do not pick a level for its
size (style with CSS instead).

## How to satisfy

- One `h1` per page/view.
- Do not jump from `h2` to `h4`; add the intermediate level or restructure.
- Use headings for real sections, not as styled labels.

## Validation

`logical-heading-order` — exactly one h1; no skipped heading levels.
