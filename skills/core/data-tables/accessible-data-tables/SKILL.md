---
id: data-tables.accessible-data-tables
name: accessible-data-tables
description: Present tabular data so it is scannable and operable — real table semantics, aligned columns, sensible density, sorting/filtering, and responsible responsive behaviour.
version: 1.0.0
type: skill
category: data-tables
tags: [tables, data, density, sorting, accessibility]
priority: high
complexity: advanced
applies_to:
  platforms: [web, desktop]
  product_types: [saas, enterprise, dashboard, admin]
knowledge: [rules.interactive-has-focus-state, patterns.progressive-disclosure]
dependencies: [accessibility.accessibility-foundations]
related_skills: [dashboard.dashboard-design, responsive.responsive-design]
validation_rules: [semantic-table-markup, numeric-columns-aligned, table-keyboard-operable]
sources: [{ class: industry_practice, title: "Data-table conventions across major design systems" }, { class: official_standard, title: "WAI-ARIA Authoring Practices Guide — Table/Grid", url: "https://www.w3.org/WAI/ARIA/apg/" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Make dense data legible and workable — the core surface of most enterprise and analytics products.

## Rules

- Use real table semantics (`table`, `th` with scope, `caption`) — not divs pretending to be a table.
- Right-align numeric columns and use tabular figures so digits line up; left-align text.
- Choose a density that matches the users; give a comfortable/compact toggle for power users.
- Provide sorting and filtering for large sets; keep headers visible (sticky) on long tables.
- Make row actions keyboard operable with visible focus; expose selection state clearly.

## Responsive

Wide tables scroll inside their own container (never the page). On small screens, consider a prioritised subset with detail on demand (progressive disclosure) rather than shrinking everything.

## Validation

- `semantic-table-markup` · `numeric-columns-aligned` · `table-keyboard-operable`

## Related skills

dashboard.dashboard-design · responsive.responsive-design · accessibility.accessibility-foundations
