# Worked example — luxury jewelry landing page

A real, end-to-end run of the Design Intelligence loop for a fictional luxury jewelry
store ("Aurelia"). Every step below was produced by the actual tooling in this repo — the
outputs are real, not illustrative.

```
brief → recommend → generate tokens → build → review → improve → review
```

## 1. The brief → context

[`project.yaml`](project.yaml): an `ecommerce` product, `brand_personality: [luxury,
elegant, trustworthy]`, `density: low`, `conversion_priority: high`, WCAG `AA`.

## 2. Decision engine

```bash
node tools/di.mjs recommend examples/luxury-jewelry/project.yaml
```

Key recommendations (each with reasoning, confidence, tradeoffs, alternatives):

- **visual-language** → *editorial hierarchy — large imagery, generous whitespace,
  restrained palette* (confidence **high**) — because the brand priority is emotional.
- **navigation** → *top navigation* — few top-level destinations.
- **conversion** → *one clear primary path; visible trust signals; no dark patterns.*
- **accessibility** → *WCAG AA — semantic HTML, focus, labels, contrast, keyboard, reduced-motion.*

Detected **conflicts** and their resolutions:

- *restrained luxury palette* ⟂ *WCAG AA contrast* → keep the premium palette but darken
  ink / lighten ground until text passes; never grey-on-grey.
- *editorial storytelling* ⟂ *transactional clarity* → lead with an editorial hero, then a
  clear structured path to action; avoid carousels for key content.

## 3. Generate the design system

```bash
node tools/di.mjs tokens examples/luxury-jewelry/project.yaml --out examples/luxury-jewelry/tokens
```

Produced [`tokens/tokens.json`](tokens/tokens.json) (W3C DTCG) and
[`tokens/tokens.css`](tokens/tokens.css): an **amber** accent (chosen for a luxury brand),
**sharp** radii (2/4/8 px), a 16 px base scale (low density), and full light + dark themes.
[`index.html`](index.html) inlines these tokens and styles everything through
`var(--color-…)`, `var(--space-…)`, `var(--radius-…)`.

## 4–6. Build → review → improve

A first draft had the gaps AI-generated pages routinely ship with. The review engine
caught them:

```bash
node tools/di.mjs review draft.html
```
> **score 33** · 1 critical, 3 high — missing `alt`, no `lang`, no viewport, an icon
> button with no accessible name, skipped heading levels, no visible focus.

Applying the flagged skills (`accessibility-foundations`, `responsive-design`,
`buttons`, `logical-heading-order`, …) produced the final page:

```bash
node tools/di.mjs review examples/luxury-jewelry/index.html
```
> **score 100** · 0 issues.

## Skills applied

`principles.design-principles` · `hierarchy.visual-hierarchy` · `typography` · `color` ·
`spacing` · `responsive-design` · `mobile-patterns` · `accessibility-foundations` ·
`buttons.button-design` · `conversion.trust-and-conversion` · `content.ux-writing` ·
`states` (loading/empty/error, for the full build) · plus the three `engine/*` procedures.

## Reproduce it

```bash
node tools/di.mjs recommend examples/luxury-jewelry/project.yaml
node tools/di.mjs tokens    examples/luxury-jewelry/project.yaml --css
node tools/di.mjs review    examples/luxury-jewelry/index.html
```

Open [`index.html`](index.html) in a browser to see the result (self-contained — no build,
no external assets).
