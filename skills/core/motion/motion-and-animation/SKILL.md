---
id: motion.motion-and-animation
name: motion-and-animation
description: Use motion with purpose — to show relationships, feedback, and continuity — on a small duration/easing scale, always honouring reduced-motion, never as decoration.
version: 1.0.0
type: skill
category: motion
tags: [motion, animation, tokens, accessibility]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, marketing, dashboard]
knowledge: [rules.respect-reduced-motion, tokens.motion-duration-scale, principles.clarity-over-decoration]
dependencies: [principles.design-principles]
related_skills: [states.loading-states, color.color-system]
validation_rules: [motion-has-purpose, reduced-motion-respected, motion-on-scale]
sources: [{ class: industry_practice, title: "Motion guidance across design systems (purposeful motion)" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Motion should help users understand change — where something came from, that an action
registered, how two states relate. If it does not aid understanding, cut it.

## Rules

- Every animation has a job: feedback, continuity, or spatial relationship.
- Use a small duration scale (see tokens.motion-duration-scale) and consistent easing; keep transitions short.
- Honour `prefers-reduced-motion` — collapse non-essential motion to instant or a crossfade.
- Animate cheap properties (transform, opacity); avoid animating layout.

## Anti-patterns

Motion for spectacle; long, slow transitions; parallax and autoplay that fight the reader; ignoring reduced-motion.

## Validation

`motion-has-purpose` · `reduced-motion-respected` · `motion-on-scale`

## Related skills

states.loading-states · color.color-system
