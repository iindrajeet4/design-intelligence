---
id: principles.hierarchy-reflects-priority
type: principle
name: Visual hierarchy should reflect user priority
summary: The most important thing for the user should be the most prominent thing on the screen; visual weight is a budget spent on what matters most.
status: stable
version: 1.0.0
tags: [hierarchy, layout, foundations]
relations: [{ kind: reviewed_by, target: heuristics.primary-action-distinct }]
sources: [{ class: industry_practice, title: "Established typographic and visual-hierarchy practice across major design systems" }]
---

## Principle

An interface communicates priority through contrast — in size, weight, colour, and spacing. When everything is emphasised, nothing is. Hierarchy is therefore a *budget*: the more elements compete for attention, the less any one of them receives.

## Why it matters

Users scan before they read. A hierarchy that mirrors the user's goal lets them find the next action in a glance; a hierarchy driven by decoration forces them to hunt.

## How to apply

- Rank the elements on a screen by user priority *before* styling anything.
- Give the single most important element the most contrast; step everything else down.
- Prefer one primary action per view. Demote secondary actions in weight, not just position.
- Use whitespace to group and separate — proximity is hierarchy too.
