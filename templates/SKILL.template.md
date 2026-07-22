---
id: category.skill-name
name: skill-name
description: One sentence that front-loads the trigger words an agent would search for, and says what the skill helps produce.
version: 0.1.0
type: skill
category: category
tags: [category, keyword]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web]
  product_types: [saas]
knowledge: []
dependencies: []
related_skills: []
validation_rules: [rule-slug]
sources: [{ class: industry_practice, title: "Source title or original synthesis", url: "https://..." }]
quality: { evidence: 3, clarity: 3, implementation: 3, accessibility: 3, reusability: 3, maintainability: 3 }
status: draft
---

## Purpose

Why this skill exists and when an agent should reach for it.

## Rules

- Hard constraints. Each should map to an entry in `validation_rules`.

## Anti-patterns

What to avoid, and why it fails.

## Accessibility

Platform-specific accessibility requirements.

## Validation

The machine- or human-checkable tests that confirm a good result.

## Related skills

Related skill ids.
