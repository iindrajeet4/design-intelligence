---
id: engine.system-generator
name: system-generator
description: The design system generation procedure — derive tokens (primitive → semantic → component), type scale, spacing, and component rules from the decision engine's output, with a written rationale for every token.
version: 1.0.0
type: skill
category: engine
tags: [engine, tokens, design-system, theming]
priority: high
complexity: advanced
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [rules.contrast-meets-wcag-aa, principles.consistency-reduces-load]
dependencies: [engine.decision-engine]
related_skills: [color.color-system, typography.typography-system, spacing.spacing-system]
sources: [{ class: official_standard, title: "W3C Design Tokens Community Group — Format Module (2025.10)", url: "https://www.designtokens.org/tr/drafts/format/" }]
quality: { evidence: 5, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 5 }
status: stable
---

## Purpose

Generate a coherent, justified design system — never arbitrary tokens. Every value exists for a reason traceable to the project context.

## Inputs

The decision engine's recommendations plus the project context (brand personality, density, accessibility target, platforms).

## Procedure

1. **Colour.** Choose a deliberate neutral (slight hue bias toward the accent), one brand accent, and separate status colours. Build the three tiers: primitive (`blue-500`) → semantic (`color-action-primary`, `color-surface-default`, `color-text-primary`, `color-border-subtle`) → component (`button-primary-background`). Components reference semantic tokens only. Verify WCAG AA for every text/surface pairing in both themes.
2. **Typography.** Pick faces that carry the brand personality (never a reflexive default); define a modular scale and role-based line heights.
3. **Spacing.** A base unit and fixed progression; semantic aliases where they help (`space-section`, `space-inline`).
4. **Radius, shadow, motion.** Derive from brand personality (sharp/minimal vs soft/friendly); respect `prefers-reduced-motion`.
5. **Breakpoints.** From the device list in context, with content-priority notes per breakpoint.
6. **Write the rationale.** Each token group gets one line explaining *why* — e.g. "accent amber 600: brand warmth, 4.6:1 on surface-default."

## Output structure

```text
design-system/
├── tokens/   colors · typography · spacing · radius · shadows · motion
├── layout/   grid + breakpoints
├── components/  per-component token mappings
├── patterns/    composed patterns in use
└── guidelines/  the rationale document
```

Emit tokens in the W3C DTCG format (JSON with `$value`/`$type`) when the stack supports it, or CSS custom properties otherwise — semantic names either way.

## Guardrails

- No token without a rationale.
- Accessibility checks run *inside* generation, not after.
- Themes (light/dark) are designed at the semantic tier — components never change.

## Related skills

color.color-system · typography.typography-system · spacing.spacing-system · engine.review-engine (next step)
