---
id: theming.dark-mode
name: dark-mode
description: Support light and dark themes at the token layer — designed, not inverted — with re-checked contrast, adjusted elevation, and honoured system preference plus an optional toggle.
version: 1.0.0
type: skill
category: theming
tags: [theming, dark-mode, tokens, contrast]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, dashboard, marketing]
knowledge: [rules.contrast-meets-wcag-aa, principles.consistency-reduces-load]
dependencies: [color.color-system]
related_skills: [color.color-system]
validation_rules: [themes-at-token-layer, contrast-rechecked-per-theme, respects-system-preference]
sources: [{ class: industry_practice, title: "Dark-mode and multi-theme guidance across design systems" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 5 }
status: stable
---

## Purpose

A second theme should feel as considered as the first — not a mechanical inversion.

## Rules

- Define themes at the **semantic token layer**; components read tokens and never change between themes.
- Do not naively invert. Dark surfaces use near-black-with-hue, not pure black; elevation is shown with lighter surfaces rather than heavier shadows.
- Re-check contrast for every pairing in each theme — a colour that passes on white often fails on dark and vice versa.
- Honour the system preference (`prefers-color-scheme`) by default; if you add a toggle, let it override in both directions and persist.
- Dim large bright imagery/whites in dark mode to avoid glare.

## Validation

`themes-at-token-layer` · `contrast-rechecked-per-theme` · `respects-system-preference`

## Related skills

color.color-system · typography.typography-system
