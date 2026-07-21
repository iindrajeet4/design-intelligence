---
id: color.color-system
name: color-system
description: Build a semantic, token-based colour system that is accessible in light and dark themes, with a chosen neutral and an accent kept separate from status colours.
version: 1.0.0
type: skill
category: color
tags: [color, tokens, contrast, theming, dark-mode]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [rules.contrast-meets-wcag-aa]
dependencies: [principles.design-principles]
related_skills: [typography.typography-system]
validation_rules: [semantic-tokens-used, contrast-meets-aa, status-color-separate-from-accent]
sources: [{ class: official_standard, title: "W3C Design Tokens Community Group — Format Module", url: "https://www.designtokens.org/tr/drafts/format/" }]
quality: { evidence: 5, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 5 }
status: stable
---

## Purpose

Give colour meaning through semantic tokens, so themes can change without breaking the system, and so contrast is guaranteed.

## Token tiers

Primitive (e.g. `blue-500`) → Semantic (`color-action-primary`, `color-surface-default`, `color-text-primary`, `color-border-subtle`) → Component (`button-primary-background`). Components reference semantic tokens, never primitives.

## Rules

- Choose neutrals deliberately — a slight hue bias reads as considered; a pure mid-grey reads as unconsidered.
- Keep the brand accent distinct from status colours (success/warning/critical); status is not your accent.
- Every text-on-surface pairing meets WCAG AA in both light and dark.
- Never convey meaning by colour alone.

## Dark mode

Design both themes at the token level; do not naively invert. Re-check contrast on the second theme.

## Validation

- `semantic-tokens-used` · `contrast-meets-aa` · `status-color-separate-from-accent`

## Related skills

typography.typography-system · accessibility.accessibility-foundations
