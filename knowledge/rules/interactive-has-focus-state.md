---
id: rules.interactive-has-focus-state
type: rule
name: Every interactive element has a visible focus state
summary: Anything a keyboard can reach must show a clearly visible focus indicator, so keyboard and switch users can always see where they are.
status: stable
version: 1.0.0
tags: [accessibility, keyboard, focus]
applies_to:
  platforms: [web, desktop]
relations: [{ kind: related_to, target: rules.contrast-meets-wcag-aa }]
sources: [{ class: official_standard, title: "WCAG 2.2 — Focus Visible (2.4.7) and Focus Appearance (2.4.11)", url: "https://www.w3.org/TR/WCAG22/" }]
---

## Rule

Buttons, links, inputs, and any custom interactive control must render a visible focus indicator when focused via keyboard. Never remove focus outlines without replacing them with something at least as visible.

## How to satisfy

- Prefer `:focus-visible` so the indicator shows for keyboard users without cluttering mouse interaction.
- Ensure the indicator has sufficient contrast against both the component and its background.
- Verify a full keyboard path: every action reachable and operable with Tab, Enter, and Space.

## Validation

`focus-visible-present` — no interactive element ships with `outline: none` and no replacement.
