---
id: anti-patterns.modal-for-everything
type: anti-pattern
name: A modal for every interaction
summary: Reaching for a modal dialog as the default container traps focus, breaks flow, stacks poorly, and fails on small screens.
status: stable
version: 1.0.0
tags: [modals, navigation, mobile]
relations: [{ kind: resolved_by, target: patterns.progressive-disclosure }]
sources: [{ class: industry_practice, title: "Dialog usage guidance across major design systems" }]
---

## Anti-pattern

Using a modal dialog for routine actions — editing a field, showing detail, confirming trivial operations — because it is the easiest container to reach for. Modals interrupt, trap focus, are hard to stack, and collapse awkwardly on mobile.

## Why it is a problem

- Every modal is a context switch that costs the user their place.
- Nested or stacked modals are confusing and often inaccessible.
- On small screens a modal frequently becomes a full-screen takeover that would have been better as a real page.

## Do this instead

- Use inline editing, expandable sections, or detail panels (see patterns.progressive-disclosure).
- Reserve modals for focused, interrupting decisions that genuinely must block the flow (e.g. destructive confirmation).
- On mobile, prefer full pages or bottom sheets over emulated desktop modals.
