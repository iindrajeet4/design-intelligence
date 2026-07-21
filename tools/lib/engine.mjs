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
  const brand = (context.brand_personality || []).map((b) => b.toLowerCase());
  const wcag = context.accessibility_target?.wcag || "AA";

  const recs = [];
  const emotional = brand.some((b) => ["luxury", "premium", "elegant", "editorial", "playful", "bold"].includes(b));
  const dataHeavy = ["saas", "enterprise", "dashboard", "analytics", "admin", "b2b"].some((k) => pt.includes(k)) || density === "high";

  recs.push(dataHeavy
    ? { area: "navigation", recommendation: "persistent sidebar", confidence: "high", reasoning: "frequent switching across many sections", tradeoffs: "consumes horizontal space", alternatives: ["top-nav", "command-palette"], evidence: "decisions.sidebar-when-frequent-switching" }
    : { area: "navigation", recommendation: "top navigation", confidence: "medium", reasoning: "few top-level destinations", tradeoffs: "limited room for many items", alternatives: ["sidebar"], evidence: "decisions.sidebar-when-frequent-switching" });

  recs.push(emotional
    ? { area: "visual-language", recommendation: "editorial hierarchy — large imagery, generous whitespace, restrained palette", confidence: "high", reasoning: "emotional/visual brand priority", tradeoffs: "lower information density", alternatives: ["utilitarian dense layout"], evidence: "decisions.editorial-when-emotional" }
    : { area: "visual-language", recommendation: "structured, high-legibility system with clear hierarchy", confidence: "medium", reasoning: "functional priority over emotional impact", tradeoffs: "less distinctive", alternatives: ["editorial"], evidence: "principles.hierarchy-reflects-priority" });

  recs.push({ area: "accessibility", recommendation: `target WCAG ${wcag} — visible focus, labels, contrast, keyboard paths`, confidence: "high", reasoning: "accessibility is a hard constraint, never optional", tradeoffs: "none worth trading", alternatives: [], evidence: "rules.contrast-meets-wcag-aa" });

  // conflict detection
  const conflicts = [];
  if (density === "high" && platforms.includes("mobile")) {
    conflicts.push({ between: ["information density (high)", "mobile simplicity"], severity: "high", resolution: "progressive disclosure on mobile — prioritise, collapse, and defer secondary content", evidence: "patterns.progressive-disclosure" });
  }

  // relevant skills by applicability score
  const relevant = idx.skills.map((s) => {
    let score = 0;
    if (s.product_types.some((x) => pt.includes(x) || x === pt)) score += 3;
    if (platforms.some((p) => s.platforms.includes(p))) score += 2;
    if (s.priority === "high") score += 1;
    if (s.category === "accessibility") score += 1;
    return { id: s.id, category: s.category, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

  return { context: { product_type: context.product_type, density, platforms, wcag }, recommendations: recs, conflicts, relevant_skills: relevant };
}

// ---------- review (static heuristic baseline) ----------

export function reviewHtml(html) {
  const issues = [];
  const add = (severity, dimension, reasoning, fix, evidence) => issues.push({ severity, dimension, reasoning, suggested_fix: fix, evidence });

  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const imgsNoAlt = imgs.filter((t) => !/\balt\s*=/.test(t));
  if (imgsNoAlt.length) add("critical", "accessibility", `${imgsNoAlt.length} image(s) missing alt text`, "add descriptive alt (or alt=\"\" if decorative)", "rules.contrast-meets-wcag-aa");

  const inputs = html.match(/<input\b[^>]*>/gi) || [];
  const inputsNoLabel = inputs.filter((t) => !/aria-label|aria-labelledby|\btype\s*=\s*["']?(hidden|submit|button)/i.test(t) && !/\bid\s*=/.test(t));
  if (inputsNoLabel.length) add("critical", "accessibility", `${inputsNoLabel.length} input(s) with no associable label`, "add a <label for> or aria-label", "rules.form-controls-have-labels");

  if (!/<html[^>]*\blang\s*=/i.test(html)) add("high", "accessibility", "html element has no lang attribute", "add lang=\"en\" (or the correct language)", "rules.contrast-meets-wcag-aa");
  if (!/<meta[^>]*name\s*=\s*["']?viewport/i.test(html)) add("high", "responsive", "no viewport meta tag", "add <meta name=viewport content=\"width=device-width, initial-scale=1\">", "principles.hierarchy-reflects-priority");

  const emptyButtons = (html.match(/<button\b[^>]*>\s*<\/button>/gi) || []).length;
  if (emptyButtons) add("high", "accessibility", `${emptyButtons} button(s) with no accessible text`, "provide button text or aria-label", "heuristics.primary-action-distinct");

  if (!/:focus|focus-visible|outline/i.test(html)) add("medium", "accessibility", "no visible focus styling detected", "ensure interactive elements have a visible focus state", "rules.interactive-has-focus-state");

  const weights = { critical: 25, high: 10, medium: 5, low: 2 };
  const score = Math.max(0, 100 - issues.reduce((a, i) => a + (weights[i.severity] || 0), 0));
  return {
    score,
    critical_issues: issues.filter((i) => i.severity === "critical").length,
    high_priority: issues.filter((i) => i.severity === "high").length,
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
