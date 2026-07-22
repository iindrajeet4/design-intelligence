#!/usr/bin/env node
// Design Intelligence — zero-dependency test suite.
// Run: node tools/test.mjs   (exit 0 = all pass, exit 1 = failures)

import { parseYAML, parseFrontmatter, validate } from "./lib/core.mjs";
import { loadSchemas, recommend, reviewHtml, findById, stats, relations } from "./lib/engine.mjs";

let pass = 0, fail = 0;
const j = (v) => JSON.stringify(v);
function eq(actual, expected, msg) {
  if (j(actual) === j(expected)) pass++;
  else { fail++; console.error(`✗ ${msg}\n    expected ${j(expected)}\n    got      ${j(actual)}`); }
}
function ok(cond, msg) { if (cond) pass++; else { fail++; console.error(`✗ ${msg}`); } }

// ---------- YAML subset ----------
eq(parseYAML("a: 1\nb: two"), { a: 1, b: "two" }, "scalar map with int + string");
eq(parseYAML("x: [a, b, c]"), { x: ["a", "b", "c"] }, "inline array");
eq(parseYAML("flag: true\nnothing: null"), { flag: true, nothing: null }, "boolean + null scalars");
eq(parseYAML("q: { evidence: 5, clarity: 4 }"), { q: { evidence: 5, clarity: 4 } }, "inline object with ints");
eq(parseYAML("applies_to:\n  platforms: [web, mobile]\n  product_types: [saas]"),
   { applies_to: { platforms: ["web", "mobile"], product_types: ["saas"] } }, "nested map with inline arrays");
eq(parseYAML("knowledge:\n  - rules.a\n  - patterns.b"), { knowledge: ["rules.a", "patterns.b"] }, "block scalar list");
eq(parseYAML('sources: [{ class: research, title: "A, B" }]'),
   { sources: [{ class: "research", title: "A, B" }] }, "inline object list with quoted comma");
eq(parseYAML("# comment\nk: v"), { k: "v" }, "comment lines ignored");

// ---------- frontmatter ----------
{
  const { data, body } = parseFrontmatter("---\nid: a.b\nstatus: stable\n---\n\n## Body\ntext");
  eq(data, { id: "a.b", status: "stable" }, "frontmatter parsed");
  ok(body.includes("## Body"), "body separated from frontmatter");
  eq(parseFrontmatter("no frontmatter here").data, {}, "missing frontmatter -> empty data");
}

// ---------- schema validation ----------
{
  const schema = loadSchemas().skill;
  const good = { id: "x.y", name: "y", description: "d", version: "1.0.0", type: "skill", category: "x", status: "stable" };
  eq(validate(good, schema), [], "valid skill -> no errors");
  ok(validate({ ...good, id: undefined, name: good.name }, schema).some((e) => /missing required "id"/.test(e)) ||
     validate((() => { const c = { ...good }; delete c.id; return c; })(), schema).some((e) => /missing required "id"/.test(e)),
     "missing required id -> error");
  ok(validate({ ...good, status: "active" }, schema).some((e) => /not one of/.test(e)), "bad enum status -> error");
  ok(validate({ ...good, name: "BadName" }, schema).some((e) => /does not match/.test(e)), "bad name pattern -> error");
  ok(validate({ ...good, extra: 1 }, schema).some((e) => /unexpected property/.test(e)), "additionalProperties -> error");
  ok(validate({ ...good, quality: { evidence: 9 } }, schema).some((e) => /above maximum/.test(e)), "quality > 5 -> error");
}

// ---------- engine: recommend ----------
{
  const r = recommend({ product_type: "saas", density: "high", platform: ["web", "mobile"], accessibility_target: { wcag: "AA" } });
  ok(Array.isArray(r.recommendations) && r.recommendations.length >= 5, "recommend returns several areas");
  ok(r.recommendations.every((x) => x.recommendation && x.reasoning && x.confidence), "every recommendation is explained");
  ok(r.conflicts.some((c) => /mobile/i.test(j(c))), "high-density + mobile conflict detected");
  const lux = recommend({ product_type: "ecommerce", brand_personality: ["luxury"], accessibility_target: { wcag: "AA" } });
  ok(lux.recommendations.some((x) => /editorial/i.test(x.recommendation)), "luxury -> editorial visual language");
}

// ---------- engine: review ----------
{
  const bad = reviewHtml('<html><body><img src="a.jpg"><form><input type="text"><button></button></form></body></html>');
  ok(bad.critical_issues >= 2, "bad html -> >=2 critical issues");
  ok(bad.score < 100, "bad html -> score below 100");
  ok(bad.by_dimension && bad.by_dimension.accessibility >= 2, "by_dimension summary present");
  const good = reviewHtml('<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head><body><h1>Hi</h1><style>a:focus-visible{outline:2px}</style></body></html>');
  ok(good.critical_issues === 0, "clean html -> no critical issues");
}

// ---------- engine: introspection over the real repo ----------
{
  const doc = findById("forms.accessible-form-design");
  ok(doc && doc.kind === "skill", "findById resolves a known skill");
  ok(findById("does.notexist") === null, "findById returns null for unknown id");
  const s = stats();
  ok(s.skills > 0 && s.knowledge > 0, "stats reports counts");
  ok(relations().edges > 0, "relations graph has edges");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
