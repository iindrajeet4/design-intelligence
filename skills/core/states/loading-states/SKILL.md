---
id: states.loading-states
name: loading-states
description: Communicate progress honestly during waits — skeletons for structured content, spinners for short indeterminate waits — while preserving layout and avoiding jank.
version: 1.0.0
type: skill
category: states
tags: [states, loading, skeleton, perceived-performance]
priority: medium
complexity: basic
applies_to:
  platforms: [web, mobile]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [principles.clarity-over-decoration]
related_skills: [states.empty-states, states.error-states]
validation_rules: [layout-stable-during-load, loading-announced]
sources: [{ class: industry_practice, title: "Loading and perceived-performance conventions across major design systems" }]
quality: { evidence: 3, clarity: 4, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Make waiting feel shorter and safer by showing what is happening and where content will appear.

## Rules

- Use **skeletons** that mirror the final layout for structured content; use a **spinner** only for short, indeterminate waits.
- Reserve space so content does not shift when it arrives (avoid layout shift).
- For long operations, show progress and, where possible, allow the user to keep working.
- Announce loading and completion to assistive tech (e.g. `aria-busy`, live region).

## Anti-patterns

Full-page spinners that block everything; content that jumps in and reflows the page; infinite spinners with no timeout or error path.

## Validation

- `layout-stable-during-load` — no cumulative layout shift when content loads.
- `loading-announced` — loading state is exposed to assistive tech.

## Related skills

states.empty-states · states.error-states
