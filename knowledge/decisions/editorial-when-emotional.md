---
id: decisions.editorial-when-emotional
type: decision
name: Use an editorial visual language when emotion and brand lead
summary: When the product's job is to make people feel and trust — luxury, lifestyle, storytelling — favour editorial layout over utilitarian density.
status: stable
version: 1.0.0
tags: [visual-language, brand, ecommerce]
applies_to:
  platforms: [web, mobile]
  product_types: [ecommerce, marketing, portfolio, lifestyle]
relations: [{ kind: related_to, target: principles.hierarchy-reflects-priority }]
sources: [{ class: industry_practice, title: "Editorial and luxury commerce layout conventions" }]
---

## Decision

**Use an editorial visual language** — large, high-quality imagery, generous whitespace, refined typography, and a restrained palette — when the product's success depends on emotion, aspiration, and trust rather than on packing in data.

## Reasoning

Emotional and luxury contexts reward calm, confident composition. Density and utilitarian chrome undercut the feeling of quality; whitespace and strong imagery build it. The tradeoff is lower information density, which these products can afford because the goal is to move and reassure, not to operate.

## Guardrails

Editorial restraint never overrides accessibility: maintain readable contrast and clear hierarchy even in a minimal palette (see rules.contrast-meets-wcag-aa).

## Confidence

High for luxury and lifestyle commerce; medium where a brand mixes emotional storytelling with transactional density (resolve with progressive disclosure).
