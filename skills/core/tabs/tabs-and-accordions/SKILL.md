---
id: tabs.tabs-and-accordions
name: tabs-and-accordions
description: Organise sectioned content with tabs or accordions chosen by count and screen width, following the ARIA keyboard patterns, with a clear selected/expanded state and no essential content hidden.
version: 1.0.0
type: skill
category: tabs
tags: [tabs, accordion, disclosure, accessibility]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [decisions.tabs-vs-accordion, patterns.progressive-disclosure, interactions.keyboard-navigation]
dependencies: [principles.design-principles]
related_skills: [navigation.navigation-patterns, modals.dialog-design]
validation_rules: [tabs-follow-aria-pattern, selected-state-clear, no-essential-content-hidden]
sources: [{ class: official_standard, title: "WAI-ARIA Authoring Practices Guide — Tabs and Accordion", url: "https://www.w3.org/WAI/ARIA/apg/" }]
quality: { evidence: 5, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Break long content into sections users choose between, without burying anything they
need at once.

## Choosing

Tabs for a few peer sections viewed one at a time on wide screens; accordions for many
sections, variable length, or narrow screens (see decisions.tabs-vs-accordion).

## Rules

- Follow the ARIA APG keyboard pattern (arrow keys move between tabs; Enter/Space and arrows for accordion headers).
- Make the selected tab / expanded panel unmistakable — not colour-only.
- Don't hide primary tasks or critical information behind a closed panel by default.
- Preserve state sensibly (don't reset the open panel on every interaction).

## Validation

`tabs-follow-aria-pattern` · `selected-state-clear` · `no-essential-content-hidden`

## Related skills

navigation.navigation-patterns · modals.dialog-design
