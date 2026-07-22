---
id: anti-patterns.carousel-for-key-content
type: anti-pattern
name: Carousels for key content
summary: Hiding important content in an auto-rotating carousel buries most of it — users rarely see slides past the first, and motion and controls add friction.
status: stable
version: 1.0.0
tags: [carousel, hierarchy, conversion]
relations: [{ kind: related_to, target: principles.hierarchy-reflects-priority }]
sources: [{ class: research, title: "Carousel usability findings in UX research" }]
---

## Anti-pattern

Placing primary messages or offers in a rotating carousel/slider. Engagement drops
sharply after the first slide, auto-advance fights the reader, and small dot controls are
poor targets.

## Why it is a problem

- Most users never see slides 2+, so real content is effectively hidden.
- Auto-rotation moves content out from under the reader and harms accessibility.
- It signals indecision about what matters most.

## Do this instead

Choose the single most important message and give it a clear, static hero. If multiple
items truly matter, lay them out so several are visible at once, and make any rotation
user-controlled, paused by default, and reduced-motion aware.
