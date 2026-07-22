---
id: tokens.motion-duration-scale
type: token
name: Motion duration scale
summary: A small semantic set of motion durations (instant, fast, base, slow) so animation feels consistent and purposeful rather than arbitrary.
status: stable
version: 1.0.0
tags: [tokens, motion, animation]
applies_to:
  platforms: [web, mobile, desktop]
relations: [{ kind: related_to, target: rules.respect-reduced-motion }]
sources: [{ class: official_standard, title: "W3C Design Tokens Community Group — Format Module", url: "https://www.designtokens.org/tr/drafts/format/" }]
---

## Token group

Define durations semantically, not by scattering millisecond values:

- `motion-duration-instant` — ~75ms · micro-feedback (press, toggle)
- `motion-duration-fast` — ~150ms · small transitions (hover, small reveals)
- `motion-duration-base` — ~250ms · standard transitions (panels, menus)
- `motion-duration-slow` — ~400ms · large or entrance transitions

## Rationale

Consistent, short durations make motion feel intentional; long or varied durations feel
sluggish and unsystematic. Pair with an easing scale and always honour reduced-motion
(`rules.respect-reduced-motion`) — durations collapse toward instant when motion is reduced.

## Format

Emit in the W3C DTCG shape, e.g. `{ "$type": "duration", "$value": "250ms" }`, so tools
like Style Dictionary can consume them.
