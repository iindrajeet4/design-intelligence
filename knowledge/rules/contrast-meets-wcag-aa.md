---
id: rules.contrast-meets-wcag-aa
type: rule
name: Text contrast meets WCAG AA
summary: Body text needs a contrast ratio of at least 4.5:1 against its background (3:1 for large text and meaningful UI components), in every theme.
status: stable
version: 1.0.0
tags: [accessibility, color, contrast]
applies_to:
  platforms: [web, mobile, desktop]
relations: [{ kind: related_to, target: rules.interactive-has-focus-state }]
sources: [{ class: official_standard, title: "WCAG 2.2 — Contrast (Minimum) 1.4.3 and Non-text Contrast 1.4.11", url: "https://www.w3.org/TR/WCAG22/" }]
---

## Rule

Normal body text must reach at least 4.5:1 contrast against its background; large text (roughly 24px, or 18.66px bold) and essential UI/graphical elements must reach at least 3:1. This holds in light *and* dark themes.

## How to satisfy

- Check contrast for every text-on-surface pairing you ship, including hover and disabled states you still expect to be read.
- Do not rely on colour alone to convey meaning — pair it with text, shape, or icon.
- Luxury/minimal brands must still meet the ratios: choose a darker ink or a lighter ground rather than grey-on-grey.

## Validation

`contrast-meets-aa` — computed ratio ≥ 4.5:1 (text) / 3:1 (large text, UI).
