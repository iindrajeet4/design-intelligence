---
id: decisions.tabs-vs-accordion
type: decision
name: Tabs vs accordion for sectioned content
summary: Use tabs for a few peer sections viewed one at a time on wide screens; use an accordion for many sections or on narrow screens where vertical stacking fits.
status: stable
version: 1.0.0
tags: [navigation, disclosure, layout]
applies_to:
  platforms: [web, mobile]
relations: [{ kind: related_to, target: patterns.progressive-disclosure }]
sources: [{ class: industry_practice, title: "Tabs and accordion usage guidance across design systems" }]
---

## Decision

**Prefer tabs** when there are a small number (roughly 2–6) of peer sections, users view
one at a time, and there is horizontal room — typical on desktop.

**Prefer an accordion** when there are many sections, content length varies a lot, users
may want several open, or space is narrow (mobile), where vertical stacking is natural.

## Reasoning

Tabs imply mutually exclusive peers and need horizontal space for labels; accordions
scale down and let users scan/expand on demand. Both are progressive disclosure — neither
should hide content users need immediately.

## Guardrails

Both must be keyboard operable per the ARIA pattern, indicate the selected/expanded
state clearly, and never bury the primary task.
