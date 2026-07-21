---
id: navigation.navigation-patterns
name: navigation-patterns
description: Choose and structure navigation to match how often users switch contexts — sidebar for many frequently-visited sections, top nav for few, with clear current-location cues.
version: 1.0.0
type: skill
category: navigation
tags: [navigation, sidebar, information-architecture, wayfinding]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, enterprise, dashboard, ecommerce, marketing]
knowledge: [decisions.sidebar-when-frequent-switching]
dependencies: [principles.design-principles]
related_skills: [dashboard.dashboard-design, responsive.responsive-design]
validation_rules: [current-location-indicated, nav-keyboard-operable]
sources: [{ class: industry_practice, title: "Navigation-pattern conventions across major design systems" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Give users a reliable sense of where they are and how to get anywhere else.

## Choosing a pattern

- **Sidebar** — many top-level sections, frequent switching (dashboards, admin, enterprise SaaS).
- **Top navigation** — few destinations, or content/marketing sites where vertical space matters.
- **Mobile** — collapse the sidebar into a drawer or use bottom navigation for primary destinations.

## Rules

- Always indicate the current location clearly.
- Keep the information architecture shallow and predictable; group by user task, not org chart.
- Navigation must be fully keyboard operable, with logical order and visible focus.

## Anti-patterns

Deep nested menus; hiding primary destinations behind hover-only menus; a nav that gives no sense of current position.

## Validation

- `current-location-indicated` · `nav-keyboard-operable`

## Related skills

dashboard.dashboard-design · responsive.responsive-design
