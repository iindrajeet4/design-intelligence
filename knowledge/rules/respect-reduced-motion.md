---
id: rules.respect-reduced-motion
type: rule
name: Respect reduced-motion preferences
summary: Honour the user's reduced-motion setting — disable or soften non-essential animation for people who experience motion discomfort.
status: stable
version: 1.0.0
tags: [accessibility, motion, animation]
applies_to:
  platforms: [web, mobile, desktop]
relations: [{ kind: related_to, target: tokens.motion-duration-scale }]
sources: [{ class: official_standard, title: "WCAG 2.2 — Animation from Interactions (2.3.3); CSS prefers-reduced-motion", url: "https://www.w3.org/TR/WCAG22/" }]
---

## Rule

When the user requests reduced motion (`prefers-reduced-motion: reduce`), remove or
substantially reduce non-essential animation — parallax, large transitions, autoplay,
motion-heavy reveals. Keep essential motion (e.g. a loading indicator) but calm it.

## How to satisfy

- Gate decorative transitions behind the media query; provide a still or crossfade fallback.
- Never rely on motion alone to convey meaning.
- Avoid content that flashes more than three times per second.

## Validation

`reduced-motion-respected` — a reduced-motion preference visibly calms the interface.
