---
id: layout.layout-foundations
name: layout-foundations
description: Compose layouts on a grid with intentional alignment and rhythm, so structure reads clearly and content has room to breathe across breakpoints.
version: 1.0.0
type: skill
category: layout
tags: [layout, grid, alignment, structure]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [principles.hierarchy-reflects-priority, principles.consistency-reduces-load]
dependencies: [spacing.spacing-system]
related_skills: [responsive.responsive-design, spacing.spacing-system]
validation_rules: [content-on-grid, reading-measure-in-range]
sources: [{ class: industry_practice, title: "Layout and grid conventions across major design systems" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Give an interface a coherent skeleton: a grid, consistent alignment, and a comfortable reading measure.

## Rules

- Lay content on a consistent column grid; align edges deliberately rather than by eye.
- Keep running text near a 60–75 character measure for readability.
- Use layout containers and `gap` for spacing between siblings — not stacked per-element margins that collapse or double.
- Let wide content (tables, code, diagrams) scroll inside its own container so the page never scrolls sideways.

## Patterns

Application shell (persistent nav + content), centred reading column for prose, split master–detail for lists with detail.

## Responsive

Define how the grid reflows at each breakpoint and which content is prioritised when space is scarce (see responsive.responsive-design).

## Validation

- `content-on-grid` — elements align to a shared grid.
- `reading-measure-in-range` — body text stays within a legible line length.

## Related skills

spacing.spacing-system · responsive.responsive-design
