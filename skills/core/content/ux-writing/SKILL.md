---
id: content.ux-writing
name: ux-writing
description: Write interface copy as design material — in the user's language, active voice, specific and honest — so labels, buttons, and messages guide action instead of decorating it.
version: 1.0.0
type: skill
category: content
tags: [content, microcopy, ux-writing, clarity]
priority: high
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [heuristics.match-system-and-real-world, principles.clarity-over-decoration, principles.feedback-for-every-action]
dependencies: [principles.design-principles]
related_skills: [states.error-states, buttons.button-design]
validation_rules: [copy-in-user-language, controls-state-outcome, errors-explain-and-recover]
sources: [{ class: industry_practice, title: "UX writing and content guidance across design systems" }]
quality: { evidence: 4, clarity: 5, implementation: 4, accessibility: 4, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Words are part of the design. Clear copy removes more confusion than most visual polish.

## Rules

- Use the user's vocabulary, not system/implementation terms (a person manages *notifications*, not *webhook config*).
- Active voice; controls name exactly what happens ("Publish" → toast "Published").
- Be specific over clever; front-load the important word.
- Errors say what went wrong and how to fix it — no blame, no apologies, no vagueness.
- Keep labels short and consistent; the same concept has the same name everywhere.

## Anti-patterns

Jargon leaking from the backend; "Oops! Something went wrong"; different words for the same thing across screens; clever copy that hides the action.

## Validation

`copy-in-user-language` · `controls-state-outcome` · `errors-explain-and-recover`

## Related skills

states.error-states · buttons.button-design
