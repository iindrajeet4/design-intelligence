---
id: responsive.responsive-design
name: responsive-design
description: Design layouts that adapt across mobile, tablet, and desktop by prioritising content and using progressive disclosure — never by cramming a desktop layout onto a phone.
version: 1.0.0
type: skill
category: responsive
tags: [responsive, mobile, breakpoints, progressive-disclosure]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [patterns.progressive-disclosure, rules.touch-target-min-size]
dependencies: [layout.layout-foundations]
related_skills: [layout.layout-foundations, navigation.navigation-patterns]
validation_rules: [no-horizontal-overflow, content-priority-preserved, touch-target-min-size]
sources: [{ class: industry_practice, title: "Responsive layout conventions across major design systems" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Make the interface work well at every width by deciding what matters most when space is scarce.

## Method

1. Establish content priority for the view.
2. Design the smallest screen first; add, don't subtract, as space grows.
3. Reflow the grid at breakpoints; move secondary content behind progressive disclosure on small screens.
4. Verify no element forces horizontal scrolling of the page body.

## Rules

- Use relative units and fluid layouts; avoid fixed widths that overflow.
- Collapse dense structures (wide tables, multi-column) responsibly — scroll containers, stacked cards, or detail views.
- Touch targets meet the minimum size on small screens.

## Validation

- `no-horizontal-overflow` · `content-priority-preserved` · `touch-target-min-size`

## Related skills

layout.layout-foundations · navigation.navigation-patterns · data-tables.accessible-data-tables
