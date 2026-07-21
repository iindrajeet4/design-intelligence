---
id: rules.touch-target-min-size
type: rule
name: Touch targets meet a minimum size
summary: Tappable controls should be large enough and spaced enough to hit reliably — a common floor is 24x24 CSS px minimum, with 44x44 preferred for primary touch actions.
status: stable
version: 1.0.0
tags: [accessibility, mobile, touch]
applies_to:
  platforms: [web, mobile]
relations: [{ kind: related_to, target: rules.interactive-has-focus-state }]
sources: [{ class: official_standard, title: "WCAG 2.2 — Target Size (Minimum) 2.5.8", url: "https://www.w3.org/TR/WCAG22/" }]
---

## Rule

Interactive targets must be large enough to activate without precision. Treat 24x24 CSS px as the accessibility floor and 44x44 as the comfortable target for primary touch actions, with adequate spacing between adjacent targets.

## How to satisfy

- Size buttons, icon buttons, and list-row actions to the target minimum even when the icon is small — pad the hit area.
- Keep spacing between adjacent tappable items so users don't hit the wrong one.
- On dense desktop UIs, still ensure pointer targets are comfortable; density is not an excuse for tiny hit areas.

## Validation

`touch-target-min-size` — interactive elements meet the minimum target dimensions.
