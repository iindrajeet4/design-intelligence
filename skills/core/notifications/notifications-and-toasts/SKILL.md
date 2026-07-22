---
id: notifications.notifications-and-toasts
name: notifications-and-toasts
description: Communicate events at the right level and urgency — inline confirmation, transient toasts, or persistent alerts — accessibly announced and never used to hide errors that need action.
version: 1.0.0
type: skill
category: notifications
tags: [notifications, toasts, feedback, accessibility]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web, mobile, desktop]
  product_types: [saas, ecommerce, enterprise, dashboard]
knowledge: [principles.feedback-for-every-action, rules.contrast-meets-wcag-aa]
dependencies: [principles.design-principles]
related_skills: [states.error-states, content.ux-writing]
validation_rules: [notification-level-matches-urgency, transient-not-for-critical, announced-to-at]
sources: [{ class: official_standard, title: "WAI-ARIA Authoring Practices — live regions and alerts", url: "https://www.w3.org/WAI/ARIA/apg/" }]
quality: { evidence: 4, clarity: 4, implementation: 4, accessibility: 5, reusability: 5, maintainability: 4 }
status: stable
---

## Purpose

Tell users what happened without hijacking their attention more than the event deserves.

## Choosing a form

- **Inline confirmation** — feedback tied to the thing acted on (a saved field).
- **Toast** — brief, transient, non-critical ("Copied"). Auto-dismiss; never require action.
- **Persistent alert/banner** — important, action-needed, or ongoing status. Stays until resolved.

## Rules

- Match urgency to form; never put a critical, action-required message in an auto-dismissing toast.
- Announce to assistive tech via appropriate live regions (`status` for polite, `alert` for assertive).
- Keep copy short and specific; give an action where one is possible; allow dismissal.
- Don't stack many toasts; queue or collapse.

## Validation

`notification-level-matches-urgency` · `transient-not-for-critical` · `announced-to-at`

## Related skills

states.error-states · content.ux-writing
