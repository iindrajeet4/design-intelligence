---
id: lists.pagination-and-lists
name: pagination-and-lists
description: Present long collections so users can navigate, return, and sense scope — pagination or load-more for goal-directed lists, position memory, and infinite scroll only for casual feeds.
version: 1.0.0
type: skill
category: lists
tags: [lists, pagination, infinite-scroll, navigation]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [anti-patterns.infinite-scroll-for-navigation, patterns.progressive-disclosure, heuristics.recognition-over-recall]
dependencies: [principles.design-principles]
related_skills: [data-tables.accessible-data-tables, search.search-ux]
validation_rules: [scope-is-visible, position-restored-on-return, footer-reachable]
sources: [{ class: research, title: "Pagination vs infinite scroll usability research" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Long lists need a way to move through them, come back to a spot, and understand how much
there is.

## Rules

- Goal-directed lists (search, catalog, data) → pagination or "load more"; keep items bookmarkable and restore scroll on back-navigation.
- Show scope/progress (page count, result count) so users sense where they are.
- Reserve true infinite scroll for casual, exploratory feeds — and still keep a reachable footer and a way back.
- Sort and filter belong with long lists; make the active order/filters visible.

## Anti-patterns

Infinite scroll on a comparison or search list; unreachable footer; losing position on back; no total/scope.

## Validation

`scope-is-visible` · `position-restored-on-return` · `footer-reachable`

## Related skills

data-tables.accessible-data-tables · search.search-ux
