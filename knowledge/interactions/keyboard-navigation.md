---
id: interactions.keyboard-navigation
type: interaction
name: Keyboard navigation
summary: The entire interface must be operable by keyboard alone, in a logical order, with visible focus and standard key conventions.
status: stable
version: 1.0.0
tags: [accessibility, keyboard, interaction]
applies_to:
  platforms: [web, desktop]
relations: [{ kind: requires, target: rules.interactive-has-focus-state }]
sources: [{ class: official_standard, title: "WCAG 2.2 — Keyboard (2.1.1) and No Keyboard Trap (2.1.2)", url: "https://www.w3.org/TR/WCAG22/" }, { class: official_standard, title: "WAI-ARIA Authoring Practices Guide — keyboard interaction patterns", url: "https://www.w3.org/WAI/ARIA/apg/" }]
---

## Interaction

Every action must be reachable and operable from the keyboard: Tab/Shift+Tab to move,
Enter/Space to activate, arrow keys within composite widgets (menus, tabs, grids), Esc to
dismiss. Focus order follows reading order; there are no traps.

## How to apply

- Use native interactive elements — they come with keyboard behaviour for free.
- For custom widgets, follow the ARIA APG keyboard pattern for that role.
- Manage focus on route changes, modal open/close, and dynamic content.
- Never remove focus outlines without an equal-or-better replacement.
