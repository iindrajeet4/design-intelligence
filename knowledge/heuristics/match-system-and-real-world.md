---
id: heuristics.match-system-and-real-world
type: heuristic
name: Match the system to the real world
summary: Use the user's language and mental model, not internal system jargon — order information the way people expect it.
status: stable
version: 1.0.0
tags: [review, content, mental-model]
relations: [{ kind: related_to, target: heuristics.recognition-over-recall }]
sources: [{ class: research, title: "Match between system and the real world (Nielsen's heuristics)" }]
---

## Heuristic

Evaluate whether labels, messages, and structure speak the user's language. People manage
"notifications," not "webhook configs"; they "pay," they do not "commit a transaction."

## How to evaluate

- Are terms drawn from the user's domain, not the implementation?
- Does the order of information follow real-world expectations?
- Do icons and metaphors mean what users think they mean?

## Common failures

Surfacing database or API names in the UI; error messages written for engineers;
arranging fields by table schema rather than by how a person fills them in.
