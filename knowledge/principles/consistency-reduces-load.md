---
id: principles.consistency-reduces-load
type: principle
name: Consistency reduces cognitive load
summary: Reusing the same patterns, spacing, and language across an interface lets users transfer what they learned once to everywhere else.
status: stable
version: 1.0.0
tags: [consistency, systems, foundations]
relations: [{ kind: related_to, target: principles.hierarchy-reflects-priority }]
sources: [{ class: research, title: "Jakob's Law and consistency heuristics in usability research" }]
---

## Principle

Users spend most of their time in *other* interfaces. Meeting their existing expectations — and being internally consistent — means every screen teaches them how to use the next one. Inconsistency forces relearning and erodes trust.

## Why it matters

Consistency is what a design system exists to produce. When spacing, component behaviour, and terminology vary at random, the product feels unreliable even when it works.

## How to apply

- Derive spacing, type, and colour from a shared token scale — never ad-hoc values.
- Use one component for one job; do not invent a second table or a second button style.
- Keep interaction patterns (how things open, save, dismiss) identical across the product.
