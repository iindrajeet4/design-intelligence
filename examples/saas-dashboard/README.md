# Worked example — enterprise SaaS dashboard

The second end-to-end run of the Design Intelligence loop — deliberately the **opposite
context** from [`../luxury-jewelry/`](../luxury-jewelry/), to demonstrate that the system
reasons from context instead of applying one template. All outputs below were produced by
the repo's actual tooling.

## 1. The brief → context

[`project.yaml`](project.yaml): an `enterprise_saas` product for marketing managers and
analysts, `brand_personality: [professional, trustworthy, calm]`, `density: high`,
`interaction_frequency: high`, `conversion_priority: low`, WCAG `AA`.

## 2. Decision engine

```bash
node tools/di.mjs recommend examples/saas-dashboard/project.yaml
```

- **navigation** → *persistent sidebar* (confidence **high**) — frequent switching across sections.
- **visual-language** → *structured, high-legibility system with clear hierarchy*.
- **typography** → *compact, highly legible scale; tabular numerals for data* (**high**).
- **spacing-and-density** → *compact density with a comfortable-mode toggle*.
- **feedback-and-states** / **accessibility** → as always: states designed, WCAG AA hard floor.
- **No conversion recommendation** — not a commerce context.
- Top relevant skills: `dashboard.dashboard-design`, `data-tables.accessible-data-tables`,
  `charts.data-visualization`, `accessibility.accessibility-foundations`.

## 3. Generate the design system

```bash
node tools/di.mjs tokens examples/saas-dashboard/project.yaml --out examples/saas-dashboard/tokens
```

**Blue** accent (trustworthy/professional brand), **14 px** base type (high density),
softer radii (4/8/12), full light + dark. [`index.html`](index.html) styles everything
through these tokens.

## 4–6. Build → review

[`index.html`](index.html) applies the recommended skills: app shell with sidebar
(current page marked), KPI tiles with sparklines and semantic deltas, an honest
zero-based bar chart, traffic-source bars, and a real `<table>` (th + scope, right-aligned
tabular numerals, status pills that don't rely on colour alone). Wide content scrolls in
its own container; skip link, focus states, reduced-motion, and both themes included.

```bash
node tools/di.mjs review examples/saas-dashboard/index.html
```
> **score 100** · 0 issues.

## The point — same engine, opposite answers

| Decision | Jewelry (luxury, low density) | Dashboard (enterprise, high density) |
|---|---|---|
| Navigation | top navigation | **persistent sidebar** |
| Visual language | editorial, whitespace-led | **structured, data-led** |
| Typography | expressive serif display, 16 px | **compact sans, tabular numerals, 14 px** |
| Accent | amber | **blue** |
| Radii | sharp (2/4/8) | **soft (4/8/12)** |
| Conversion guidance | yes — trust signals, one path | **none (not commerce)** |

## Reproduce it

```bash
node tools/di.mjs recommend examples/saas-dashboard/project.yaml
node tools/di.mjs tokens    examples/saas-dashboard/project.yaml --css
node tools/di.mjs review    examples/saas-dashboard/index.html
```
