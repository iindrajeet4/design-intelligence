# Using Design Intelligence in your AI coding agent

How to make this repository's design knowledge usable inside the agent you actually
work with. Everything below reflects the **official documentation of each platform as
of July 2026** — sources are listed at the end. Where a platform's behaviour is not
officially documented, it is called out honestly.

---

## Three ways to consume it

Every integration is one of these three models. Pick per platform using the table.

| Model | What it is | Best when |
|---|---|---|
| **A · Agent Skills** | Copy/symlink the `SKILL.md` folders where the agent discovers skills. Uses the [Agent Skills](https://agentskills.io) open standard. | The agent implements Agent Skills (Claude Code, Codex, Cursor, Copilot, Gemini CLI). |
| **B · Instruction file** | Point the agent at the repo from `AGENTS.md` / `CLAUDE.md` and let it shell out to the CLI. | Any agent that reads a project instruction file and can run a terminal. |
| **C · MCP server** | Run `tools/di-mcp.mjs` and register it. The agent calls `search / recommend / review` as tools. | The cleanest **universal** path — works everywhere MCP is supported, and sidesteps skill-folder layout entirely. |

| Platform | A · Skills | B · AGENTS.md/CLAUDE.md | C · MCP |
|---|:--:|:--:|:--:|
| Claude Code | ✅ | ✅ `CLAUDE.md` | ✅ |
| OpenAI Codex | ✅ | ✅ `AGENTS.md` | ✅ |
| Cursor | ✅ (2.4+) | ✅ `AGENTS.md` | ✅ |
| GitHub Copilot | ✅ | ✅ `AGENTS.md` + `copilot-instructions.md` | ✅ |
| Gemini CLI | ✅ | ✅ `GEMINI.md` | ✅ |
| Windsurf / Devin | — | ✅ `AGENTS.md` | ✅ |
| Emergent | — | prompt / GitHub import | ✅ (recommended) |
| Web chat (ChatGPT, Claude.ai, Lovable, v0, Bolt) | — | bootstrap prompt | — |

> **A note on skill layout.** This repo stores skills nested under
> `skills/core/<category>/<name>/SKILL.md` and `engine/<name>/SKILL.md`. Most agents
> expect each skill as a top-level folder inside *their* skills directory, so the
> file-based steps below copy/symlink the folders flat. **The MCP route (Model C)
> avoids this entirely** — the server reads all skills regardless of nesting.

Flatten helper (macOS/Linux) — copies every skill folder into `$TARGET`:

```bash
TARGET=.claude/skills   # or .agents/skills, .github/skills, .cursor/skills …
mkdir -p "$TARGET"
find skills engine -name SKILL.md -print0 | while IFS= read -r -d '' f; do
  d=$(dirname "$f"); cp -r "$d" "$TARGET/$(basename "$d")"
done
```

---

## Claude Code

**Inside this repo** — nothing to do; [`CLAUDE.md`](../CLAUDE.md) wires the workflow.

```bash
git clone https://github.com/iindrajeet4/design-intelligence.git
cd design-intelligence   # Claude Code reads CLAUDE.md automatically
```

**In your own project** (choose one):

- **One-command plugin (easiest)** — the repo is its own plugin marketplace:

  ```text
  /plugin marketplace add iindrajeet4/design-intelligence
  /plugin install design-intelligence@design-intelligence
  /reload-plugins
  ```
  Skills appear namespaced (`/design-intelligence:color-system`, `/design-intelligence:decision-engine`). Verify with `/plugin`.

- **Vendor + skills** — add the repo, expose skills where Claude Code looks
  (`.claude/skills/` project, or `~/.claude/skills/` personal), and import the entry point:

  ```bash
  git submodule add https://github.com/iindrajeet4/design-intelligence vendor/design-intelligence
  ```
  Use the flatten helper into `.claude/skills`, then add to your project `CLAUDE.md`:
  `@vendor/design-intelligence/CLAUDE.md`. Type `/` in Claude Code to confirm the skills appear.

- **MCP (recommended, no layout fuss):**

  ```bash
  claude mcp add design-intelligence -- node /abs/path/design-intelligence/tools/di-mcp.mjs
  ```

- **Quick ad-hoc:** `claude --add-dir /abs/path/design-intelligence` grants file access for one session.

---

## OpenAI Codex

Codex implements the **same `SKILL.md` standard** as Claude Code and reads **`AGENTS.md`**
natively — so this repo works with minimal setup.

- **Skills** — Codex discovers `.agents/skills/` (repo root, cwd, parent), `~/.agents/skills/`
  (all projects), and `/etc/codex/skills`. Symlinks are followed:

  ```bash
  git clone https://github.com/iindrajeet4/design-intelligence ~/design-intelligence
  mkdir -p ~/.agents/skills
  # flatten helper with TARGET=~/.agents/skills, run from ~/design-intelligence
  ```
  Verify with `/skills` in the Codex TUI. (If a skill doesn't appear, confirm the path —
  the official docs use `.agents/skills`; some third-party guides wrongly say `~/.codex/skills`.)

- **AGENTS.md** — in your project's root `AGENTS.md`, add a "Design system" section telling
  Codex to consult the skills and run `node <path>/design-intelligence/tools/di.mjs …`.
  Working *inside* a repo that only has `CLAUDE.md`? Add to `~/.codex/config.toml`:
  `project_doc_fallback_filenames = ["CLAUDE.md"]`.

- **MCP:** `codex mcp add design-intelligence -- node /abs/path/tools/di-mcp.mjs` (verify with `codex mcp list`).

- **Codex Cloud:** only committed repo files count — vendor `.agents/skills/` and `AGENTS.md`
  into your project repo (user-level `~/.agents/skills` and `~/.codex/config.toml` don't travel to the cloud container).

---

## Cursor (2.4+)

- **Skills** — Cursor scans `.cursor/skills/`, `.agents/skills/` (and `~/.cursor/skills/`,
  `~/.agents/skills/`). Use the flatten helper into `.cursor/skills`.
- **Instructions** — Cursor reads root **`AGENTS.md`** (recommended cross-tool baseline), or a
  `.cursor/rules/*.mdc` rule. (Do **not** use legacy `.cursorrules` — deprecated.)
- **MCP** — add to `.cursor/mcp.json`:
  ```json
  { "mcpServers": { "design-intelligence": { "command": "node", "args": ["/abs/path/tools/di-mcp.mjs"] } } }
  ```
- Verify: type `/` in Agent chat; the design skills appear in the slash menu.

---

## GitHub Copilot

- **Skills** — the Copilot coding agent supports `.github/skills/`, `.claude/skills/`, or
  `.agents/skills/` (no nesting). Flatten helper into `.github/skills`. In VS Code you can
  instead point at them in place: `.vscode/settings.json` →
  `"chat.agentSkillsLocations": ["vendor/design-intelligence/skills", "vendor/design-intelligence/engine"]`.
- **Instructions** — create `.github/copilot-instructions.md` (read by every Copilot surface)
  describing the repo and the CLI contract, and/or a root **`AGENTS.md`** (VS Code Chat loads it
  since v1.104; the coding agent supports it since Aug 2025). Path-scoped rules go in
  `.github/instructions/design.instructions.md` with `applyTo: "**/*.{css,scss,tsx,jsx,vue,svelte,html}"`.
- **MCP** — register in `.vscode/mcp.json` (`{"servers": {"design-intelligence": {"type":"stdio","command":"node","args":["…/tools/di-mcp.mjs"]}}}`).

---

## Google Gemini CLI

- **Skills** — install natively:
  ```bash
  gemini skills install https://github.com/iindrajeet4/design-intelligence --scope user
  ```
- **Context** — Gemini CLI won't read `CLAUDE.md` by default. Add a thin `GEMINI.md` to your
  project that points at the repo (it supports `@./path` imports), or set `contextFileName`.
- **MCP** — register `node tools/di-mcp.mjs` as a stdio MCP server in your Gemini settings.

---

## Windsurf / Devin Desktop

- **Instructions (zero-config)** — add an **`AGENTS.md`** at your workspace root; Windsurf/Devin
  auto-discovers it (case-insensitive, always-on). Point it at the repo + CLI.
- **Rules (finer control)** — `.windsurf/rules/` (legacy, still supported) or `.devin/rules/`
  (current): small rule files with `trigger: model_decision` and a description.
- **MCP** — register `node tools/di-mcp.mjs` in the Windsurf/Devin MCP config for first-class tool access.

---

## Emergent (emergent.sh)

Emergent's standard build agents have **no persistent per-project instruction store**, and do
**not** auto-read `AGENTS.md`/`CLAUDE.md`. Use one of these documented channels:

1. **MCP (recommended)** — on the project setup screen: **Advanced Controls → Select MCP Tools →
   Configure New MCP**, paste a stdio config, **Verify and Save**:
   ```json
   { "mcpServers": { "design-intelligence": { "command": "npx", "args": ["-y", "-p", "design-intelligence", "di-mcp"] } } }
   ```
   (This works once the package is published to npm — see [PUBLISHING.md](../PUBLISHING.md). Before that, point `command`/`args` at the local `node /abs/path/tools/di-mcp.mjs`, or use a fetch-capable MCP.)
2. **Vendor + bootstrap prompt** — copy a `.design-intelligence/` folder (CLAUDE.md + skills + index)
   into your app repo, **Pull from GitHub**, and make the first prompt:
   *"This repo has a design knowledge system in `.design-intelligence/`. Before any UI work, read
   `.design-intelligence/CLAUDE.md`, look up relevant skills in `index/skill-index.json`, and follow
   the matching `SKILL.md` files."*
3. **Pro Mode custom agent** — paste a digest of the core rules into the agent's **system prompt**
   (the only setting that persists across tasks) and connect the GitHub repo.

Re-assert the bootstrap instruction each new task (context resets between tasks). Scope the
knowledge to Emergent's stack: **React + FastAPI + MongoDB** (Expo for mobile).

---

## Web-based chat agents (ChatGPT, Claude.ai, Lovable, v0, Bolt)

These can't clone a repo. Paste a **bootstrap prompt** with raw file URLs:

```text
Use this design intelligence system for all UI you produce.
1. Read https://raw.githubusercontent.com/iindrajeet4/design-intelligence/main/CLAUDE.md
2. Read the skill index: https://raw.githubusercontent.com/iindrajeet4/design-intelligence/main/index/skill-index.json
3. For the relevant skills, fetch skills/core/<category>/<name>/SKILL.md and follow their Rules.
Apply: hierarchy reflects priority, accessibility is a hard floor (WCAG AA), semantic tokens, and review before finishing.
```

For tools without web fetch, paste the contents of `CLAUDE.md` and the specific `SKILL.md` files directly.

---

## Registering the MCP server (universal reference)

The server is stdio JSON-RPC, zero-dependency, Node ≥ 18:

```bash
node /abs/path/design-intelligence/tools/di-mcp.mjs
```

Tools exposed: `search_design_skills`, `recommend_design_patterns`, `review_design`,
`get_design_skill`, `list_design_skills`. Registration differs per client (examples above);
all use the standard stdio `command` + `args` shape.

---

## Standards this builds on

- **AGENTS.md** — an open, plain-Markdown instruction standard read by 20+ tools; the nearest
  `AGENTS.md` to the edited file wins. <https://agents.md>
- **Agent Skills** — the open `SKILL.md` standard (directory + YAML frontmatter, progressive
  disclosure). <https://agentskills.io>
- **Model Context Protocol** — the open tool/resource protocol. <https://modelcontextprotocol.io>

### Sources (official docs, verified July 2026)

- Claude Code: <https://code.claude.com/docs/en/skills>, <https://code.claude.com/docs/en/memory>, <https://code.claude.com/docs/en/plugins>
- OpenAI Codex: <https://developers.openai.com/codex/skills>, <https://developers.openai.com/codex/guides/agents-md>, <https://developers.openai.com/codex/mcp>
- Cursor: <https://cursor.com/docs/skills>, <https://cursor.com/docs/context/rules>, <https://cursor.com/docs/context/mcp>
- GitHub Copilot: <https://docs.github.com/en/copilot/reference/custom-instructions-support>, <https://code.visualstudio.com/docs/agent-customization/agent-skills>
- Gemini CLI: <https://geminicli.com/docs/cli/skills/>, <https://geminicli.com/docs/cli/gemini-md/>
- Windsurf/Devin: <https://docs.devin.ai/desktop/cascade/agents-md>
- Emergent: <https://help.emergent.sh/mcp-model-context-protocol>, <https://help.emergent.sh/github-integration>, <https://help.emergent.sh/main-agents-in-emergent>

> These reflect fast-moving products. Exact menu labels and discovery paths can change — after
> installing, verify (e.g. `/skills`, `codex mcp list`, or the slash menu) and consult the linked
> official docs.
