---
id: patterns.optimistic-ui
type: pattern
name: Optimistic UI
summary: Reflect the likely result of an action immediately, then reconcile with the server — making the interface feel instant while handling failure gracefully.
status: stable
version: 1.0.0
tags: [feedback, performance, state]
applies_to:
  platforms: [web, mobile]
relations: [{ kind: refines, target: principles.feedback-for-every-action }]
sources: [{ class: industry_practice, title: "Optimistic update patterns in modern UI frameworks" }]
---

## Pattern

Apply the expected outcome to the UI at once (mark as liked, add the row), then confirm
with the server in the background. If the server rejects, roll back and explain.

## When to use

High-frequency, low-risk actions where latency hurts flow (toggles, reordering, adding
items). Avoid for high-stakes actions (payments) where a confirmed result matters more
than speed.

## Cautions

Always handle the rollback path and tell the user when an optimistic action failed —
never leave the UI showing a success that did not happen.
