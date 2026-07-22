---
id: patterns.skeleton-loading
type: pattern
name: Skeleton loading
summary: Show a low-fidelity placeholder that mirrors the coming content's layout, so the wait feels shorter and nothing shifts when data arrives.
status: stable
version: 1.0.0
tags: [loading, perceived-performance, layout]
applies_to:
  platforms: [web, mobile]
relations: [{ kind: refines, target: principles.clarity-over-decoration }]
sources: [{ class: industry_practice, title: "Skeleton screen conventions across design systems" }]
---

## Pattern

Render a neutral outline of the eventual layout — blocks where text and media will be —
while data loads. Reserve the real dimensions so content does not jump in.

## When to use

Structured content with a predictable shape (lists, cards, tables, profiles). For short
indeterminate waits, a single spinner is fine; for a whole structured view, a skeleton
reads better and prevents layout shift.

## Cautions

Match the skeleton to the real layout; a skeleton that differs from the result is more
jarring than a spinner. Keep the shimmer subtle and honour reduced-motion.
