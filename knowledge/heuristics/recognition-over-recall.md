---
id: heuristics.recognition-over-recall
type: heuristic
name: Favour recognition over recall
summary: Show options, context, and prior choices rather than making users remember them — minimise what the user must hold in their head.
status: stable
version: 1.0.0
tags: [review, cognitive-load, usability]
relations: [{ kind: related_to, target: principles.consistency-reduces-load }]
sources: [{ class: research, title: "Recognition rather than recall (Nielsen's heuristics)" }]
---

## Heuristic

Evaluate whether the interface makes users remember information across steps. Good design
keeps needed information visible or easily retrievable at the moment of use.

## How to evaluate

- Are actions and options visible where needed, not hidden behind memory?
- Are prior inputs preserved and shown (e.g. in multi-step flows, summaries)?
- Do inputs offer suggestions, recent items, or examples instead of demanding recall?

## Common failures

Reference codes the user must memorise between screens; hidden commands with no
discoverable affordance; forms that clear context between steps.
