---
id: heuristics.primary-action-distinct
type: heuristic
name: The primary action is visually distinct
summary: On any view, the single most important action should be immediately distinguishable from secondary and tertiary actions.
status: stable
version: 1.0.0
tags: [review, hierarchy, actions]
relations: [{ kind: related_to, target: principles.hierarchy-reflects-priority }]
sources: [{ class: industry_practice, title: "Action-hierarchy conventions across major design systems" }]
---

## Heuristic

When reviewing a screen, locate the primary action. It should be obvious within a second, and clearly more prominent than the alternatives. If two actions look equally important, the hierarchy has failed.

## How to evaluate

- Is there exactly one visually dominant action per view?
- Are secondary actions clearly subordinate (lighter weight, less colour), not merely placed elsewhere?
- Are destructive actions styled distinctly and never given the primary emphasis by default?

## Common failures

Two filled buttons of equal weight side by side; a "Cancel" as prominent as "Save"; primary actions that blend into the surface.
