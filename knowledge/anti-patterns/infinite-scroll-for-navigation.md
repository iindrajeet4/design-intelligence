---
id: anti-patterns.infinite-scroll-for-navigation
type: anti-pattern
name: Infinite scroll where users need to find and return
summary: Infinite scroll breaks the footer, position memory, and "get back to that item" — bad for goal-directed lists, even when fine for casual feeds.
status: stable
version: 1.0.0
tags: [navigation, lists, pagination]
relations: [{ kind: related_to, target: patterns.progressive-disclosure }]
sources: [{ class: research, title: "Infinite scroll vs pagination usability research" }]
---

## Anti-pattern

Using infinite scroll for content users need to search, compare, or return to (search
results, product listings, data). It makes the footer unreachable, loses scroll position
on back-navigation, and removes any sense of "where am I / how much is left."

## Why it is a problem

- No stable way to return to a previously seen item.
- Unreachable footer content and controls.
- No sense of scope or progress; heavy on memory and performance.

## Do this instead

Use pagination or "load more" for goal-directed lists; keep positions bookmarkable and
restore scroll on return. Reserve true infinite scroll for casual, exploratory feeds, and
still provide a way back.
