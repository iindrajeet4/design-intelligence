// Design Intelligence — knowledge engine.
// Walks the repository, validates, compiles the retrieval index, and provides the
// deterministic reference implementations of search / recommend / review. These are
// the machine-checkable baseline; the full contextual reasoning is performed by an
// agent following engine/decision-engine and engine/review-engine.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter, parseYAML, validate } from "./core.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

function walk(dir, filter) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, filter));
    else if (filter(e.name)) out.push(p);
  }
  return out;
}

export function skillFiles() {
  return [...walk(path.join(ROOT, "skills"), (n) => n === "SKILL.md"),
          ...walk(path.join(ROOT, "engine"), (n) => n === "SKILL.md")].sort();
}
export function knowledgeFiles() {
  return walk(path.join(ROOT, "knowledge"), (n) => n.endsWith(".md")).sort();
}

function readDoc(file) {
  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  return { data, body, file, path: rel(file) };
}

export function loadSchemas() {
  const read = (n) => JSON.parse(fs.readFileSync(path.join(ROOT, "schemas", n), "utf8"));
  return {
    skill: read("skill.schema.json"),
    knowledge: read("knowledge-object.schema.json"),
    context: read("project-context.schema.json"),
  };
}

// ---------- validation ----------

export function validateAll() {
  const schemas = loadSchemas();
  const errors = [];
  const ids = new Set();
  const skills = [], knowledge = [];

  for (const f of skillFiles()) {
    const d = readDoc(f);
    skills.push(d);
    for (const e of validate(d.data, schemas.skill)) errors.push(`${d.path} :: ${e}`);
    if (d.data.id) { if (ids.has(d.data.id)) errors.push(`${d.path} :: duplicate id ${d.data.id}`); ids.add(d.data.id); }
  }
  for (const f of knowledgeFiles()) {
    const d = readDoc(f);
    knowledge.push(d);
    for (const e of validate(d.data, schemas.knowledge)) errors.push(`${d.path} :: ${e}`);
    if (d.data.id) { if (ids.has(d.data.id)) errors.push(`${d.path} :: duplicate id ${d.data.id}`); ids.add(d.data.id); }
  }

  // referential integrity
  const refFields = (d, keys) => keys.flatMap((k) => Array.isArray(d.data[k]) ? d.data[k] : []);
  for (const d of skills) {
    for (const t of refFields(d, ["knowledge", "dependencies", "related_skills"]))
      if (!ids.has(t)) errors.push(`${d.path} :: references unknown id "${t}"`);
    if (d.data.supersedes && !ids.has(d.data.supersedes)) errors.push(`${d.path} :: supersedes unknown id "${d.data.supersedes}"`);
  }
  for (const d of knowledge) {
    for (const r of (Array.isArray(d.data.relations) ? d.data.relations : []))
      if (r && r.target && !ids.has(r.target)) errors.push(`${d.path} :: relation target unknown id "${r.target}"`);
  }
  return { errors, counts: { skills: skills.length, knowledge: knowledge.length } };
}

// ---------- index ----------

export function buildIndex() {
  const skills = skillFiles().map(readDoc).map((d) => ({
    id: d.data.id,
    name: d.data.name,
    category: d.data.category,
    description: d.data.description,
    priority: d.data.priority || null,
    complexity: d.data.complexity || null,
    status: d.data.status,
    platforms: d.data.applies_to?.platforms || [],
    product_types: d.data.applies_to?.product_types || [],
    tags: d.data.tags || [],
    knowledge: d.data.knowledge || [],
    path: d.path,
  })).sort((a, b) => (a.id > b.id ? 1 : -1));

  const knowledge = knowledgeFiles().map(readDoc).map((d) => ({
    id: d.data.id,
    type: d.data.type,
    name: d.data.name,
    summary: d.data.summary,
    status: d.data.status,
    tags: d.data.tags || [],
    path: d.path,
  })).sort((a, b) => (a.id > b.id ? 1 : -1));

  return {
    schemaVersion: "0.1",
    stats: { skills: skills.length, knowledge: knowledge.length },
    skills,
    knowledge,
  };
}

export function serializeIndex(idx) { return JSON.stringify(idx, null, 2) + "\n"; }
export function indexPath() { return path.join(ROOT, "index", "skill-index.json"); }

// ---------- search ----------

export function search(terms) {
  const idx = buildIndex();
  const q = terms.map((t) => t.toLowerCase());
  const scored = idx.skills.map((s) => {
    const hay = [s.id, s.category, s.description, ...(s.tags || []), ...(s.product_types || [])].join(" ").toLowerCase();
    let score = 0;
    for (const t of q) { if (hay.includes(t)) score += 1; if (s.id.toLowerCase().includes(t)) score += 2; if ((s.tags || []).some((x) => x.toLowerCase() === t)) score += 1; }
    return { s, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  return scored.map((x) => x.s);
}

// ---------- recommend (deterministic baseline) ----------

export function recommend(context) {
  const idx = buildIndex();
  const pt = (context.product_type || "").toLowerCase();
  const density = context.density || "medium";
  const platforms = context.platform || [];
  const devices = context.devices || [];
  const brand = (context.brand_personality || []).map((b) => b.toLowerCase());
  const wcag = context.accessibility_target?.wcag || "AA";
  const conv = context.conversion_priority || "medium";

  const emotional = brand.some((b) => ["luxury", "premium", "elegant", "editorial", "playful", "bold", "warm"].includes(b));
  const dataHeavy = ["saas", "enterprise", "dashboard", "analytics", "admin", "b2b"].some((k) => pt.includes(k)) || density === "high";
  const isMobile = platforms.includes("mobile") || devices.includes("mobile");
  const commerce = ["ecommerce", "commerce", "shop", "store", "retail", "marketing"].some((k) => pt.includes(k));

  const recs = [];
  recs.push(dataHeavy
    ? { area: "navigation", recommendation: "persistent sidebar", confidence: "high", reasoning: "frequent switching across many sections", tradeoffs: "consumes horizontal space", alternatives: ["top-nav", "command-palette"], evidence: "decisions.sidebar-when-frequent-switching" }
    : { area: "navigation", recommendation: "top navigation", confidence: "medium", reasoning: "few top-level destinations", tradeoffs: "limited room for many items", alternatives: ["sidebar"], evidence: "decisions.sidebar-when-frequent-switching" });

  recs.push(emotional
    ? { area: "visual-language", recommendation: "editorial hierarchy — large imagery, generous whitespace, restrained palette", confidence: "high", reasoning: "emotional/visual brand priority", tradeoffs: "lower information density", alternatives: ["utilitarian dense layout"], evidence: "decisions.editorial-when-emotional" }
    : { area: "visual-language", recommendation: "structured, high-legibility system with clear hierarchy", confidence: "medium", reasoning: "functional priority over emotional impact", tradeoffs: "less distinctive", alternatives: ["editorial"], evidence: "principles.hierarchy-reflects-priority" });

  recs.push(dataHeavy
    ? { area: "typography", recommendation: "compact, highly legible type scale; tabular numerals for data", confidence: "high", reasoning: "dense data must stay scannable", tradeoffs: "less expressive", alternatives: ["larger editorial scale"], evidence: "typography.typography-system" }
    : { area: "typography", recommendation: "expressive display paired with a readable body on a clear scale", confidence: "medium", reasoning: "type carries brand character here", tradeoffs: "needs careful pairing", alternatives: ["single neutral family"], evidence: "typography.typography-system" });

  recs.push({ area: "spacing-and-density", recommendation: density === "high" ? "compact density with a comfortable-mode toggle" : "generous spacing on a consistent scale", confidence: "medium", reasoning: `density target is ${density}`, tradeoffs: density === "high" ? "risk of crowding — protect touch targets" : "more scrolling", alternatives: ["the other density"], evidence: "spacing.spacing-system" });

  recs.push({ area: "feedback-and-states", recommendation: "design loading (skeletons), empty, and error states for every async view; give visible feedback to every action", confidence: "high", reasoning: "generated UIs routinely omit these states", tradeoffs: "more states to build", alternatives: [], evidence: "principles.feedback-for-every-action" });

  recs.push({ area: "accessibility", recommendation: `target WCAG ${wcag} — semantic HTML, visible focus, labels, contrast, keyboard paths, reduced-motion`, confidence: "high", reasoning: "accessibility is a hard constraint, never optional", tradeoffs: "none worth trading", alternatives: [], evidence: "accessibility.accessibility-foundations" });

  if (commerce || conv === "high") {
    recs.push({ area: "conversion", recommendation: "one clear primary path per step; visible trust signals; no dark patterns", confidence: "high", reasoning: commerce ? "commerce context" : "high conversion priority", tradeoffs: "fewer competing calls-to-action", alternatives: [], evidence: "conversion.trust-and-conversion" });
  }

  // conflict detection
  const conflicts = [];
  if (density === "high" && isMobile) conflicts.push({ between: ["information density (high)", "mobile simplicity"], severity: "high", resolution: "progressive disclosure on mobile — prioritise, collapse, and defer secondary content", evidence: "patterns.progressive-disclosure" });
  if (emotional && (wcag === "AA" || wcag === "AAA")) conflicts.push({ between: ["restrained/luxury palette", `WCAG ${wcag} contrast`], severity: "medium", resolution: "keep the premium palette but darken ink / lighten ground until text meets contrast; never grey-on-grey", evidence: "rules.contrast-meets-wcag-aa" });
  if (emotional && commerce) conflicts.push({ between: ["editorial storytelling", "transactional clarity"], severity: "medium", resolution: "lead with an editorial hero, then a clear structured path to action; avoid carousels for key content", evidence: "anti-patterns.carousel-for-key-content" });

  // relevant skills by applicability score
  const relevant = idx.skills.map((s) => {
    let score = 0;
    if (s.product_types.some((x) => pt.includes(x) || x === pt)) score += 3;
    if (platforms.some((p) => s.platforms.includes(p))) score += 2;
    if (s.priority === "high") score += 1;
    if (s.category === "accessibility") score += 1;
    if (isMobile && (s.category === "mobile" || s.category === "responsive")) score += 2;
    if (commerce && (s.category === "conversion" || s.category === "media")) score += 1;
    if (dataHeavy && (s.category === "data-tables" || s.category === "dashboard" || s.category === "charts")) score += 1;
    return { id: s.id, category: s.category, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 10);

  return { context: { product_type: context.product_type, density, platforms, wcag, conversion_priority: conv }, recommendations: recs, conflicts, relevant_skills: relevant };
}

// ---------- review (static heuristic baseline) ----------

export function reviewHtml(html) {
  const issues = [];
  const add = (severity, dimension, reasoning, fix, evidence) => issues.push({ severity, dimension, reasoning, suggested_fix: fix, evidence });

  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const imgsNoAlt = imgs.filter((t) => !/\balt\s*=/.test(t));
  if (imgsNoAlt.length) add("critical", "accessibility", `${imgsNoAlt.length} image(s) missing alt text`, "add descriptive alt (or alt=\"\" if decorative)", "media.responsive-images");

  const inputs = html.match(/<input\b[^>]*>/gi) || [];
  const inputsNoLabel = inputs.filter((t) => !/aria-label|aria-labelledby|\btype\s*=\s*["']?(hidden|submit|button)/i.test(t) && !/\bid\s*=/.test(t));
  if (inputsNoLabel.length) add("critical", "accessibility", `${inputsNoLabel.length} input(s) with no associable label`, "add a <label for> or aria-label", "rules.form-controls-have-labels");

  if (!/<html[^>]*\blang\s*=/i.test(html)) add("high", "accessibility", "html element has no lang attribute", "add lang=\"en\" (or the correct language)", "accessibility.accessibility-foundations");
  if (!/<meta[^>]*name\s*=\s*["']?viewport/i.test(html)) add("high", "responsive", "no viewport meta tag", "add <meta name=viewport content=\"width=device-width, initial-scale=1\">", "responsive.responsive-design");

  const emptyButtons = (html.match(/<button\b[^>]*>\s*<\/button>/gi) || []).length;
  if (emptyButtons) add("high", "accessibility", `${emptyButtons} button(s) with no accessible text`, "provide button text or aria-label", "buttons.button-design");

  const emptyLinks = (html.match(/<a\b[^>]*>\s*<\/a>/gi) || []).length;
  if (emptyLinks) add("high", "accessibility", `${emptyLinks} link(s) with no text`, "give the link visible text or an aria-label", "accessibility.accessibility-foundations");

  // heading outline
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  if (levels.length) {
    const h1c = levels.filter((l) => l === 1).length;
    if (h1c === 0) add("medium", "accessibility", "no h1 heading", "add a single h1 describing the page", "rules.logical-heading-order");
    else if (h1c > 1) add("medium", "accessibility", `${h1c} h1 headings (should be exactly one)`, "use one h1; nest sections with h2+", "rules.logical-heading-order");
    let skipped = false;
    for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) { skipped = true; break; }
    if (skipped) add("medium", "accessibility", "heading levels skip (e.g. h2 to h4)", "do not skip heading levels", "rules.logical-heading-order");
  }

  if (/<table\b/i.test(html) && !/<th\b/i.test(html)) add("medium", "accessibility", "table has no header cells (th)", "use th with scope for column/row headers", "data-tables.accessible-data-tables");
  if (/<(video|audio)\b[^>]*\bautoplay/i.test(html)) add("medium", "accessibility", "autoplaying media", "avoid autoplay; provide controls and respect reduced-motion", "rules.respect-reduced-motion");

  if (!/:focus|focus-visible|outline/i.test(html)) add("medium", "accessibility", "no visible focus styling detected", "ensure interactive elements have a visible focus state", "rules.interactive-has-focus-state");
  if (/<head\b/i.test(html) && !/<meta[^>]*charset/i.test(html)) add("low", "ui", "no meta charset declared", "add <meta charset=\"utf-8\"> as the first head element", "accessibility.accessibility-foundations");

  const weights = { critical: 25, high: 10, medium: 5, low: 2 };
  const score = Math.max(0, 100 - issues.reduce((a, i) => a + (weights[i.severity] || 0), 0));
  const by_dimension = {};
  for (const i of issues) by_dimension[i.dimension] = (by_dimension[i.dimension] || 0) + 1;
  return {
    score,
    critical_issues: issues.filter((i) => i.severity === "critical").length,
    high_priority: issues.filter((i) => i.severity === "high").length,
    by_dimension,
    note: "Static heuristic pass only. Semantic UX/UI/product review is performed by an agent via engine/review-engine.",
    issues,
  };
}

export function loadContext(file) {
  const raw = fs.readFileSync(file, "utf8");
  const data = file.endsWith(".md") ? parseFrontmatter(raw).data : parseYAML(raw);
  const errors = validate(data, loadSchemas().context);
  return { data, errors };
}

// ---------- introspection ----------

function allDocs() {
  return [
    ...skillFiles().map((f) => ({ f, kind: "skill" })),
    ...knowledgeFiles().map((f) => ({ f, kind: "knowledge" })),
  ].map(({ f, kind }) => {
    const { data, body } = parseFrontmatter(fs.readFileSync(f, "utf8"));
    return { kind, data, body, path: rel(f) };
  });
}

export function findById(id) {
  return allDocs().find((d) => d.data.id === id) || null;
}

export function relations(id) {
  const nodes = knowledgeFiles().map((f) => parseFrontmatter(fs.readFileSync(f, "utf8")).data).filter((d) => d.id);
  const edges = [];
  for (const n of nodes)
    for (const r of (Array.isArray(n.relations) ? n.relations : []))
      if (r && r.kind && r.target) edges.push({ from: n.id, kind: r.kind, to: r.target });
  if (!id) return { nodes: nodes.length, edges: edges.length, graph: edges };
  return {
    id,
    outgoing: edges.filter((e) => e.from === id),
    incoming: edges.filter((e) => e.to === id),
  };
}

export function stats() {
  const idx = buildIndex();
  const tally = (arr, key) => arr.reduce((m, x) => { const k = x[key] || "unknown"; m[k] = (m[k] || 0) + 1; return m; }, {});
  const kdocs = knowledgeFiles().map((f) => parseFrontmatter(fs.readFileSync(f, "utf8")).data);
  const sources = {};
  for (const f of [...skillFiles(), ...knowledgeFiles()]) {
    const d = parseFrontmatter(fs.readFileSync(f, "utf8")).data;
    for (const s of (Array.isArray(d.sources) ? d.sources : [])) if (s && s.class) sources[s.class] = (sources[s.class] || 0) + 1;
  }
  return {
    skills: idx.stats.skills,
    knowledge: idx.stats.knowledge,
    knowledge_by_type: tally(kdocs, "type"),
    skills_by_category: tally(idx.skills, "category"),
    skills_by_status: tally(idx.skills, "status"),
    source_classes: sources,
  };
}

export function qualityReport() {
  const criteria = ["evidence", "clarity", "implementation", "accessibility", "reusability", "maintainability"];
  const skills = skillFiles().map((f) => parseFrontmatter(fs.readFileSync(f, "utf8")).data).filter((d) => d.id);
  const withQ = skills.filter((s) => s.quality);
  const missing = skills.filter((s) => !s.quality).map((s) => s.id);
  const avg = {};
  for (const c of criteria) {
    const vals = withQ.map((s) => s.quality[c]).filter((v) => typeof v === "number");
    avg[c] = vals.length ? Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2)) : null;
  }
  const overall = (s) => { const v = criteria.map((c) => s.quality[c]).filter((n) => typeof n === "number"); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };
  const ranked = withQ.map((s) => ({ id: s.id, score: Number(overall(s).toFixed(2)) })).sort((a, b) => a.score - b.score);
  return { scored: withQ.length, missing_quality: missing, average_by_criterion: avg, lowest: ranked.slice(0, 5), highest: ranked.slice(-5).reverse() };
}

// ---------- token generator ----------
// Produces a coherent STARTER design-token set from a project context, in the W3C
// Design Tokens (DTCG) JSON shape plus CSS custom properties (light + dark). Every
// token carries a rationale ($description). Contrast must be verified before shipping.

export function generateTokens(context = {}) {
  const brand = (context.brand_personality || []).map((b) => String(b).toLowerCase());
  const density = context.density || "medium";
  const has = (...xs) => brand.some((b) => xs.includes(b));

  const accent = has("luxury", "premium", "elegant", "editorial")
    ? { name: "amber", 500: "#C98A3C", 600: "#A66A22", 700: "#824F14" }
    : has("playful", "bold", "vibrant", "energetic", "fun")
    ? { name: "violet", 500: "#7C5CFC", 600: "#6845E0", 700: "#5433BE" }
    : has("trustworthy", "professional", "calm", "corporate", "secure")
    ? { name: "blue", 500: "#2F6FED", 600: "#1F57C8", 700: "#17429B" }
    : { name: "indigo", 500: "#4F46E5", 600: "#4338CA", 700: "#3730A3" };

  const neutral = { 0: "#FFFFFF", 50: "#F7F8FA", 100: "#EDEFF3", 200: "#DCE0E8", 300: "#C2C8D4", 400: "#98A1B2", 500: "#6B7280", 600: "#4B5563", 700: "#374151", 800: "#1F2633", 900: "#11151C" };
  const status = { success: "#2C7A69", warning: "#B26B00", danger: "#C0392B" };

  const radius = has("luxury", "premium", "elegant", "editorial", "serious")
    ? { sm: "2px", md: "4px", lg: "8px" }
    : has("playful", "bold", "fun", "friendly")
    ? { sm: "8px", md: "14px", lg: "24px" }
    : { sm: "4px", md: "8px", lg: "12px" };

  const baseFont = density === "high" ? 14 : 16;
  const c = (v, d) => ({ $type: "color", $value: v, $description: d });
  const dim = (v, d) => ({ $type: "dimension", $value: v, $description: d });
  const dur = (v, d) => ({ $type: "duration", $value: v, $description: d });

  const dtcg = {
    color: {
      neutral: Object.fromEntries(Object.entries(neutral).map(([k, v]) => [k, c(v, `neutral ${k} — chosen cool-grey ramp`)])),
      accent: { 500: c(accent[500], `${accent.name} accent, base`), 600: c(accent[600], `${accent.name} accent, action`), 700: c(accent[700], `${accent.name} accent, hover/active`) },
      status: { success: c(status.success, "success"), warning: c(status.warning, "warning"), danger: c(status.danger, "danger/critical") },
      text: { primary: c("{color.neutral.900}", "primary text on default surface"), muted: c("{color.neutral.600}", "secondary text — verify >= 4.5:1"), inverse: c("{color.neutral.0}", "text on dark/accent surfaces") },
      surface: { default: c("{color.neutral.0}", "page/base surface"), raised: c("{color.neutral.50}", "cards, raised surfaces"), sunken: c("{color.neutral.100}", "wells, insets") },
      border: { subtle: c("{color.neutral.200}", "hairline separators"), strong: c("{color.neutral.300}", "emphasis borders") },
      action: { primary: c("{color.accent.600}", "primary action background"), "primary-hover": c("{color.accent.700}", "primary action hover"), "focus-ring": c("{color.accent.500}", "keyboard focus indicator") },
    },
    space: Object.fromEntries([["1", "4px"], ["2", "8px"], ["3", "12px"], ["4", "16px"], ["5", "24px"], ["6", "32px"], ["8", "48px"], ["10", "64px"]].map(([k, v]) => [k, dim(v, `spacing step ${k}`)])),
    radius: { sm: dim(radius.sm, "small radius"), md: dim(radius.md, "default radius"), lg: dim(radius.lg, "large radius") },
    "font-size": Object.fromEntries([["xs", baseFont - 3], ["sm", baseFont - 1], ["base", baseFont], ["lg", Math.round(baseFont * 1.25)], ["xl", Math.round(baseFont * 1.6)], ["2xl", Math.round(baseFont * 2.1)], ["3xl", Math.round(baseFont * 2.7)]].map(([k, v]) => [k, dim(`${v}px`, `type scale ${k} (base ${baseFont}px, density=${density})`)])),
    "motion-duration": { instant: dur("75ms", "micro-feedback"), fast: dur("150ms", "small transitions"), base: dur("250ms", "standard transitions"), slow: dur("400ms", "large transitions") },
    component: {
      "button-primary-background": c("{color.action.primary}", "primary button background"),
      "button-primary-foreground": c("{color.text.inverse}", "primary button text"),
      "input-border": c("{color.border.strong}", "form control border"),
      "focus-ring": c("{color.action.focus-ring}", "focus ring across components"),
    },
  };

  const light = {
    "color-text-primary": neutral[900], "color-text-muted": neutral[600], "color-text-inverse": neutral[0],
    "color-surface-default": neutral[0], "color-surface-raised": neutral[50], "color-surface-sunken": neutral[100],
    "color-border-subtle": neutral[200], "color-border-strong": neutral[300],
    "color-action-primary": accent[600], "color-action-primary-hover": accent[700], "color-focus-ring": accent[500],
    "color-success": status.success, "color-warning": status.warning, "color-danger": status.danger,
  };
  const dark = {
    "color-text-primary": neutral[50], "color-text-muted": neutral[400], "color-text-inverse": neutral[900],
    "color-surface-default": neutral[900], "color-surface-raised": neutral[800], "color-surface-sunken": "#0B0E13",
    "color-border-subtle": neutral[700], "color-border-strong": neutral[600],
    "color-action-primary": accent[500], "color-action-primary-hover": accent[600], "color-focus-ring": accent[500],
    "color-success": "#3FA894", "color-warning": "#D79A2B", "color-danger": "#E06B5E",
  };
  const scale = { "space-1": "4px", "space-2": "8px", "space-3": "12px", "space-4": "16px", "space-5": "24px", "space-6": "32px", "space-8": "48px", "space-10": "64px", "radius-sm": radius.sm, "radius-md": radius.md, "radius-lg": radius.lg, "font-size-base": `${baseFont}px`, "motion-fast": "150ms", "motion-base": "250ms" };
  const block = (obj) => Object.entries(obj).map(([k, v]) => `  --${k}: ${v};`).join("\n");
  const css = `/* Generated starter tokens — brand=${accent.name}, density=${density}. Verify WCAG AA before shipping. */
:root {
${block({ ...light, ...scale })}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${block(dark)}
  }
}
:root[data-theme="dark"] {
${block(dark)}
}
`;

  return { brand: accent.name, density, dtcg, css };
}

// ---------- certification (automated gate) ----------
// The automated half of "certified = validated + reviewed" (see GOVERNANCE.md).
// Human maintainer review is the other half and is not automatable.

export function certify(id) {
  const doc = findById(id);
  if (!doc) return { id, found: false };
  const checks = [];
  const schemaErrors = validate(doc.data, doc.kind === "skill" ? loadSchemas().skill : loadSchemas().knowledge);
  checks.push({ name: "schema-valid", pass: schemaErrors.length === 0, detail: schemaErrors.length ? schemaErrors.slice(0, 3).join("; ") : "conforms to schema" });
  checks.push({ name: "has-sources", pass: Array.isArray(doc.data.sources) && doc.data.sources.length > 0, detail: "at least one classified source" });
  checks.push({ name: "status-not-draft", pass: doc.data.status && doc.data.status !== "draft", detail: `status is "${doc.data.status}"` });

  if (doc.kind === "skill") {
    const q = doc.data.quality || {};
    const crit = ["evidence", "clarity", "implementation", "accessibility", "reusability", "maintainability"];
    checks.push({ name: "has-quality", pass: crit.every((c) => typeof q[c] === "number"), detail: "all six quality criteria scored" });
    checks.push({ name: "has-validation-rules", pass: Array.isArray(doc.data.validation_rules) && doc.data.validation_rules.length > 0, detail: "declares machine-checkable validation rules" });
    const body = doc.body || "";
    const sections = /##\s*Purpose/i.test(body) && /##\s*(Rules|Principles)/i.test(body) && /##\s*Validation/i.test(body);
    checks.push({ name: "body-sections", pass: sections, detail: "body has Purpose, Rules/Principles, and Validation" });
  }

  return {
    id,
    kind: doc.kind,
    automated_pass: checks.every((c) => c.pass),
    note: "Automated gate only — full certification also requires maintainer review (see GOVERNANCE.md).",
    checks,
  };
}
