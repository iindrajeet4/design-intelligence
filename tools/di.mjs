#!/usr/bin/env node
// Design Intelligence CLI — `di`
// Zero dependencies. Commands:
//   validate · build-index · list-skills · search · recommend · review
//   explain · graph · stats · quality · new-skill · help

import fs from "node:fs";
import path from "node:path";
import {
  validateAll, buildIndex, serializeIndex, indexPath,
  search, recommend, reviewHtml, loadContext,
  findById, relations, stats, qualityReport, ROOT,
} from "./lib/engine.mjs";

const [cmd, ...rest] = process.argv.slice(2);
const flag = (name) => rest.includes(name);
const arg = (name) => { const i = rest.indexOf(name); return i >= 0 ? rest[i + 1] : null; };
const positional = rest.filter((a) => !a.startsWith("--"));

function out(obj) { console.log(typeof obj === "string" ? obj : JSON.stringify(obj, null, 2)); }

switch (cmd) {
  case "validate": {
    const { errors, counts } = validateAll();
    if (errors.length) {
      console.error(`✗ ${errors.length} problem(s) found:\n`);
      for (const e of errors) console.error("  - " + e);
      process.exit(1);
    }
    console.log(`✓ valid — ${counts.skills} skills, ${counts.knowledge} knowledge objects, 0 problems`);
    break;
  }

  case "build-index": {
    const idx = buildIndex();
    const serialized = serializeIndex(idx);
    if (flag("--check")) {
      const current = fs.existsSync(indexPath()) ? fs.readFileSync(indexPath(), "utf8") : "";
      if (current !== serialized) {
        console.error("✗ index/skill-index.json is out of date — run: node tools/di.mjs build-index");
        process.exit(1);
      }
      console.log("✓ index is up to date");
    } else {
      fs.writeFileSync(indexPath(), serialized);
      console.log(`✓ wrote index/skill-index.json — ${idx.stats.skills} skills, ${idx.stats.knowledge} knowledge objects`);
    }
    break;
  }

  case "list-skills": {
    const idx = buildIndex();
    for (const s of idx.skills) console.log(`${s.status.padEnd(10)} ${s.id.padEnd(42)} ${s.category}`);
    console.log(`\n${idx.stats.skills} skills.`);
    break;
  }

  case "search": {
    if (!positional.length) { console.error("usage: di search <terms...>"); process.exit(1); }
    const hits = search(positional);
    if (!hits.length) { console.log("No matching skills."); break; }
    for (const s of hits) console.log(`• ${s.id}\n    ${s.description}`);
    break;
  }

  case "recommend": {
    const file = arg("--project") || positional[0];
    if (!file) { console.error("usage: di recommend <project.yaml>"); process.exit(1); }
    const { data, errors } = loadContext(file);
    if (errors.length) { console.error("✗ invalid project context:\n" + errors.map((e) => "  - " + e).join("\n")); process.exit(1); }
    out(recommend(data));
    break;
  }

  case "review": {
    const file = positional[0];
    if (!file) {
      out({ dimensions: ["ux", "ui", "accessibility", "responsive", "performance", "product"], note: "Pass an HTML file for the static heuristic pass: di review page.html. Full semantic review is run by an agent via engine/review-engine." });
      break;
    }
    out(reviewHtml(fs.readFileSync(file, "utf8")));
    break;
  }

  case "explain": {
    const id = positional[0];
    if (!id) { console.error("usage: di explain <id>   e.g. di explain forms.accessible-form-design"); process.exit(1); }
    const doc = findById(id);
    if (!doc) { console.error(`✗ no skill or knowledge object with id "${id}"`); process.exit(1); }
    if (flag("--json")) { out({ kind: doc.kind, id, path: doc.path, frontmatter: doc.data }); break; }
    console.log(`${doc.kind.toUpperCase()}  ${id}\n${doc.path}\n`);
    console.log(doc.body.trim());
    break;
  }

  case "graph": {
    out(relations(positional[0] || undefined));
    break;
  }

  case "stats": {
    out(stats());
    break;
  }

  case "quality": {
    out(qualityReport());
    break;
  }

  case "new-skill": {
    const category = positional[0];
    const name = positional[1];
    if (!category || !name) { console.error("usage: di new-skill <category> <name>   e.g. di new-skill toasts undo-toast"); process.exit(1); }
    if (!/^[a-z0-9-]+$/.test(category) || !/^[a-z0-9-]{1,64}$/.test(name)) {
      console.error("✗ category and name must be lowercase letters, digits, and hyphens only"); process.exit(1);
    }
    const scope = flag("--core") ? "core" : "community";
    const dir = path.join(ROOT, "skills", scope, category, name);
    const file = path.join(dir, "SKILL.md");
    if (fs.existsSync(file)) { console.error(`✗ already exists: ${file}`); process.exit(1); }
    const template = `---
id: ${category}.${name}
name: ${name}
description: TODO one-sentence description that front-loads the trigger words an agent would search for.
version: 0.1.0
type: skill
category: ${category}
tags: [${category}]
priority: medium
complexity: intermediate
applies_to:
  platforms: [web]
  product_types: [saas]
knowledge: []
related_skills: []
validation_rules: []
sources: [{ class: industry_practice, title: "TODO source or original synthesis" }]
quality: { evidence: 3, clarity: 3, implementation: 3, accessibility: 3, reusability: 3, maintainability: 3 }
status: draft
---

## Purpose
TODO why and when to use this skill.

## Rules
- TODO hard constraints; each should map to a validation rule.

## Anti-patterns
TODO what to avoid and why.

## Validation
TODO the checks that verify a good result.

## Related skills
TODO related skill ids.
`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, template);
    console.log(`✓ created ${path.relative(ROOT, file).split(path.sep).join("/")}\n  edit it, then run: node tools/di.mjs validate && node tools/di.mjs build-index`);
    break;
  }

  case "help":
  case undefined:
  case "--help": {
    out([
      "Design Intelligence CLI",
      "",
      "  di validate                     validate all skills + knowledge objects (CI gate)",
      "  di build-index [--check]        compile index/skill-index.json (--check = verify only)",
      "  di list-skills                  list every skill",
      "  di search <terms...>            find skills by keyword",
      "  di recommend <project.yaml>     contextual recommendations for a project",
      "  di review [page.html]           static design/accessibility heuristic pass",
      "  di explain <id> [--json]        print a skill or knowledge object",
      "  di graph [id]                   show the knowledge relation graph (or one node)",
      "  di stats                        counts by type, category, status, source class",
      "  di quality                      quality-score report across skills",
      "  di new-skill <cat> <name>       scaffold a new skill (--core for core scope)",
      "",
      "Zero dependencies — requires only Node >= 18.",
    ].join("\n"));
    break;
  }

  default:
    console.error(`unknown command: ${cmd}\nrun: node tools/di.mjs help`);
    process.exit(1);
}
