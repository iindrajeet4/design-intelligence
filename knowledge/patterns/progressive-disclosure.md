---
id: patterns.progressive-disclosure
type: pattern
name: Progressive disclosure
summary: Show the few things most users need now; reveal advanced or secondary detail on demand, so complexity is available without being imposed.
status: stable
version: 1.0.0
tags: [complexity, mobile, forms, navigation]
applies_to:
  platforms: [web, mobile, desktop]
relations: [{ kind: refines, target: principles.clarity-over-decoration }]
sources: [{ class: research, title: "Progressive disclosure as a usability pattern (Nielsen Norman Group)", url: "https://www.nngroup.com/articles/progressive-disclosure/" }]
---

## Pattern

Split an interface into an essential primary layer and one or more secondary layers. Present the primary layer immediately; let the user pull the rest into view when they need it.

## When to use

- Dense products where showing everything at once overwhelms.
- Mobile layouts that cannot fit desktop density.
- Forms and settings with rarely-used advanced options.

## Realisations

- Advanced filters behind a "More filters" control.
- Expandable sections and accordions.
- Multi-step forms that reveal one decision at a time.
- Detail panels that open beside or over a list.

## Cautions

Do not hide *essential* actions. Progressive disclosure manages secondary complexity — it is not an excuse to bury the primary path.
