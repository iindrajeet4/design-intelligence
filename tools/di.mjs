#!/usr/bin/env node
// Design Intelligence CLI — `di`
// Zero dependencies. Commands: validate · build-index · list-skills · search · recommend · review · help

import fs from "node:fs";
import {
  validateAll, buildIndex, serializeIndex, indexPath,
  search, recommend, reviewHtml, loadContext,
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

  case "help":
  case undefined:
  case "--help": {
    out([
      "Design Intelligence CLI",
      "",
      "  di validate                 validate all skills + knowledge objects (CI gate)",
      "  di build-index [--check]    compile index/skill-index.json (--check = verify only)",
      "  di list-skills              list every skill",
      "  di search <terms...>        find skills by keyword",
      "  di recommend <project.yaml> contextual recommendations for a project",
      "  di review [page.html]       static design/accessibility heuristic pass",
      "",
      "Zero dependencies — requires only Node >= 18.",
    ].join("\n"));
    break;
  }

  default:
    console.error(`unknown command: ${cmd}\nrun: node tools/di.mjs help`);
    process.exit(1);
}
