---
id: engine.review-engine
name: review-engine
description: The structured design review procedure — score an implemented interface across UX, UI, accessibility, responsive, performance, and product dimensions, then drive the critique loop until quality holds. Run after implementing any interface.
version: 1.0.0
type: skill
category: engine
tags: [engine, review, critique, accessibility, quality]
priority: high
complexity: advanced
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, marketing, dashboard]
knowledge: [heuristics.primary-action-distinct, rules.contrast-meets-wcag-aa, rules.interactive-has-focus-state, rules.form-controls-have-labels]
related_skills: [engine.decision-engine, accessibility.accessibility-foundations]
sources: [{ class: official_standard, title: "WCAG 2.2", url: "https://www.w3.org/TR/WCAG22/" }, { class: industry_practice, title: "Original synthesis — six-dimension design review method" }]
quality: { evidence: 5, clarity: 5, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Prevent stopping at the first implementation. This skill is the procedure for reviewing generated UI and driving improvement until quality holds.

## The six dimensions

1. **UX** — user goal clarity · information hierarchy · navigation · interaction efficiency · cognitive load · discoverability.
2. **UI** — typography · spacing · alignment · consistency · visual hierarchy · density · component consistency.
3. **Accessibility** — keyboard paths · focus states · semantic HTML · contrast · labels · error association · touch targets · screen-reader behaviour.
4. **Responsive** — mobile/tablet/desktop layouts · overflow · content priority · breakpoint behaviour.
5. **Performance** — image usage · layout shift · animation cost · component complexity · loading behaviour.
6. **Product** — conversion · trust · retention · efficiency · user confidence.

## Procedure

1. Run the deterministic pass first: `node tools/di.mjs review <page.html>` catches mechanical accessibility/responsive failures.
2. Review each dimension against its heuristics (load the relevant skills' Validation sections for rubrics).
3. Record every issue in the output shape below; cite the knowledge object that defines the expectation.
4. Score: start at 100; subtract 25/critical, 10/high, 5/medium, 2/low.

## Output shape

```yaml
score: 82
critical_issues: 2
high_priority_issues: 4
recommendations:
  - issue: form inputs lack programmatic labels
    severity: critical
    dimension: accessibility
    reasoning: screen readers cannot announce the fields
    suggested_fix: associate a label with every control
    affected_skill: forms.accessible-form-design
    evidence: rules.form-controls-have-labels
```

## The critique loop

Generate → Review → Prioritise (critical → high → medium → low) → Apply improvements → **Review again.** Repeat until: score ≥ 85, zero critical issues, and no regression on previously passing dimensions. Report the final score and remaining known issues honestly — never claim a clean pass that did not happen.

## Related skills

engine.decision-engine · accessibility.accessibility-foundations
