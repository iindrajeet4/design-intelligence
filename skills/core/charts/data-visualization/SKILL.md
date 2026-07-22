---
id: charts.data-visualization
name: data-visualization
description: Choose the right chart for the question, encode data honestly, and give charts the same care as type — clear hierarchy, accessible colour, direct labels, and non-colour-only meaning.
version: 1.0.0
type: skill
category: charts
tags: [charts, data-viz, dashboard, accessibility]
priority: high
complexity: advanced
applies_to:
  platforms: [web, desktop]
  product_types: [saas, enterprise, dashboard, analytics]
knowledge: [principles.hierarchy-reflects-priority, rules.contrast-meets-wcag-aa, principles.clarity-over-decoration]
dependencies: [color.color-system]
related_skills: [dashboard.dashboard-design, color.color-system]
validation_rules: [chart-fits-question, honest-scales, meaning-not-color-only]
sources: [{ class: industry_practice, title: "Data-visualisation conventions and accessible chart guidance" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 4, maintainability: 4 }
status: stable
---

## Purpose

A chart exists to answer a question faster than a table would. Pick the form that fits
the question and encode the data truthfully.

## Rules

- Match form to question: trend → line; comparison → bar; part-to-whole → stacked/bar (avoid pie for many slices); relationship → scatter.
- Honest scales: bar charts start at zero; label axes; don't distort with truncation or dual axes without reason.
- Give one clear focal series; de-emphasise the rest. Add a faint grid, direct labels, and an emphasised endpoint rather than a legend the eye must cross-reference.
- Colour is accessible and never the only encoding — pair with labels, patterns, or position.

## Anti-patterns

3D charts; pie charts with many slices; rainbow palettes; truncated axes that exaggerate; charts with no clear takeaway.

## Validation

`chart-fits-question` · `honest-scales` · `meaning-not-color-only`

## Related skills

dashboard.dashboard-design · color.color-system
