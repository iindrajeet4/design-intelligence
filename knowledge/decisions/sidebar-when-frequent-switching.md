---
id: decisions.sidebar-when-frequent-switching
type: decision
name: Use sidebar navigation for frequent section switching
summary: When users move often between many top-level areas, a persistent sidebar keeps destinations visible and switching cheap; a top nav suits few destinations.
status: stable
version: 1.0.0
tags: [navigation, layout, dashboard]
applies_to:
  platforms: [web, desktop]
  product_types: [saas, enterprise, dashboard, admin]
relations: [{ kind: related_to, target: principles.consistency-reduces-load }]
sources: [{ class: industry_practice, title: "Application-shell navigation conventions across major design systems" }]
---

## Decision

**Prefer a persistent sidebar** when the product has many top-level sections and users switch between them frequently (typical of dashboards, admin tools, and enterprise SaaS).

**Prefer top navigation** when there are only a handful of destinations, or on marketing and content sites where vertical space for content matters more.

## Reasoning

A sidebar keeps many destinations always visible and one click away, which lowers the cost of frequent switching. Its tradeoff is horizontal space, which dense data views can usually afford and content-first pages usually cannot.

## Confidence

High for data-dense, multi-section applications. On mobile, collapse the sidebar into a drawer or bottom navigation.
