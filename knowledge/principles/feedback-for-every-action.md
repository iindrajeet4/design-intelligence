---
id: principles.feedback-for-every-action
type: principle
name: Every action gets visible feedback
summary: When a user does something, the interface must acknowledge it — a state change, confirmation, or progress — so they are never left wondering whether it worked.
status: stable
version: 1.0.0
tags: [feedback, state, trust]
relations: [{ kind: related_to, target: patterns.optimistic-ui }, { kind: related_to, target: principles.clarity-over-decoration }]
sources: [{ class: research, title: "Visibility of system status (Nielsen's heuristics)" }]
---

## Principle

Every user action — a click, a submit, a drag — must produce a perceptible response
within a moment. Silence breeds doubt: users re-click, abandon, or lose trust.

## How to apply

- Reflect state immediately (pressed, loading, saved) even before the server responds.
- Confirm success as clearly as you report failure.
- For waits over ~1s, show progress; over ~10s, allow the user to continue elsewhere.
- Keep feedback proportional — a toast for a save, not a full-screen modal.
