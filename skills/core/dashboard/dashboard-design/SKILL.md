---
id: dashboard.dashboard-design
name: dashboard-design
description: Design dashboards that answer questions, not just display data — summary before detail, state encoded in form, a clear scan path, and progressive depth via drill-down.
version: 1.0.0
type: skill
category: dashboard
tags: [dashboard, data-viz, information-density, analytics]
priority: high
complexity: advanced
applies_to:
  platforms: [web, desktop]
  product_types: [saas, enterprise, dashboard, analytics]
knowledge: [decisions.sidebar-when-frequent-switching, principles.hierarchy-reflects-priority, patterns.progressive-disclosure]
dependencies: [hierarchy.visual-hierarchy, data-tables.accessible-data-tables]
related_skills: [data-tables.accessible-data-tables, navigation.navigation-patterns]
validation_rules: [summary-before-detail, state-encoded-in-form, single-scan-path]
sources: [{ class: industry_practice, title: "Dashboard and data-visualisation conventions across major design systems" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 4, reusability: 4, maintainability: 4 }
status: stable
---

## Purpose

A dashboard is scanned and operated, not read top to bottom. Design it to answer the user's real questions quickly and let them go deeper on demand.

## Rules

- **Summary before detail.** Lead with the few numbers that matter; put supporting detail below or behind drill-down.
- **Encode state in form, not just number.** A pill, chip, or severity stripe lets what needs attention read at a glance.
- **One clear scan path.** Order tiles by importance; do not present a uniform grid where everything looks equal.
- **Semantic colour is separate from the accent** (good/warning/critical), and never the only signal.
- **Progressive depth.** Overview → filter → drill into a table or detail view (see progressive-disclosure).
- Give charts the same care as type: a faint grid, an emphasised endpoint, honest scales.

## Anti-patterns

A wall of identical cards; vanity metrics with no decision attached; dense charts with no hierarchy; colour-only status.

## Validation

- `summary-before-detail` · `state-encoded-in-form` · `single-scan-path`

## Related skills

data-tables.accessible-data-tables · navigation.navigation-patterns · hierarchy.visual-hierarchy
