---
id: media.responsive-images
name: responsive-images
description: Serve images responsibly — right size and format per device, reserved dimensions to prevent layout shift, meaningful alt text, and lazy-loading below the fold.
version: 1.0.0
type: skill
category: media
tags: [images, media, performance, accessibility]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile]
  product_types: [ecommerce, marketing, saas, portfolio]
knowledge: [principles.clarity-over-decoration, rules.contrast-meets-wcag-aa]
dependencies: [principles.design-principles]
related_skills: [responsive.responsive-design, states.loading-states]
validation_rules: [images-have-dimensions, images-have-alt, right-sized-per-device]
sources: [{ class: industry_practice, title: "Responsive image and web-performance guidance" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Images are usually the heaviest thing on a page and a common cause of layout shift. Serve
them well and they carry a product; serve them carelessly and they break performance and layout.

## Rules

- Provide appropriately sized sources per viewport (`srcset`/`sizes`, or a component that does this) and modern formats with fallbacks.
- Always set intrinsic dimensions (width/height or aspect-ratio) so nothing shifts as images load.
- Alt text: describe meaning for informative images; empty `alt=""` for purely decorative ones.
- Lazy-load below-the-fold media; prioritise the hero (LCP) image.
- Text over images must still meet contrast — add a scrim if needed.

## Validation

`images-have-dimensions` · `images-have-alt` · `right-sized-per-device`

## Related skills

responsive.responsive-design · states.loading-states
