---
id: search.search-ux
name: search-ux
description: Design search that helps users find things — forgiving input, suggestions, fast relevant results, clear filters, and helpful zero-result states — favouring recognition over recall.
version: 1.0.0
type: skill
category: search
tags: [search, findability, filters, ux]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [heuristics.recognition-over-recall, patterns.progressive-disclosure, principles.feedback-for-every-action]
dependencies: [principles.design-principles]
related_skills: [states.empty-states, forms.accessible-form-design]
validation_rules: [zero-results-helps, filters-clear-and-reversible, input-forgiving]
sources: [{ class: industry_practice, title: "Search UX conventions across products" }]
quality: { evidence: 3, clarity: 4, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Search is often the primary way users navigate large content. Make it forgiving, fast,
and transparent.

## Rules

- Forgiving input: tolerate typos/synonyms; offer suggestions and recent/popular queries (recognition over recall).
- Show what was searched and any active filters; make filters obviously reversible (clear all).
- Keep results relevant and scannable; highlight the match; support keyboard use.
- Zero-results is a helpful state, not a dead end: suggest broadening, fixing spelling, or clearing filters (see states.empty-states).

## Anti-patterns

Exact-match-only search; hidden active filters; a bare "No results"; losing the query on navigation back.

## Validation

`zero-results-helps` · `filters-clear-and-reversible` · `input-forgiving`

## Related skills

states.empty-states · forms.accessible-form-design
