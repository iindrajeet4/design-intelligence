#!/usr/bin/env node
// Design Intelligence — minimal, zero-dependency MCP server (stdio, JSON-RPC 2.0).
// Exposes the knowledge engine as MCP tools so ANY MCP-capable agent — Claude Code,
// OpenAI Codex, Cursor, GitHub Copilot, Gemini CLI, Windsurf, Emergent, etc. — can
// query the design intelligence layer without reading the repository.
//
// Register (examples):
//   Claude Code : claude mcp add design-intelligence -- node /abs/path/tools/di-mcp.mjs
//   Codex       : codex mcp add design-intelligence -- node /abs/path/tools/di-mcp.mjs
//   VS Code     : .vscode/mcp.json -> { "servers": { "design-intelligence": { "type": "stdio", "command": "node", "args": ["/abs/path/tools/di-mcp.mjs"] } } }

import fs from "node:fs";
import path from "node:path";
import { ROOT, buildIndex, search, recommend, reviewHtml } from "./lib/engine.mjs";

const SERVER = { name: "design-intelligence", version: "0.1.0" };
const PROTOCOL = "2025-06-18";

const TOOLS = [
  {
    name: "search_design_skills",
    description: "Search design skills by keyword (e.g. 'dashboard accessibility'). Returns matching skills with descriptions.",
    inputSchema: { type: "object", properties: { query: { type: "string", description: "Space-separated search terms" } }, required: ["query"] },
  },
  {
    name: "recommend_design_patterns",
    description: "Given a project context, return contextual, explained design recommendations (navigation, visual language, accessibility) with reasoning, confidence, tradeoffs, alternatives, and detected conflicts.",
    inputSchema: {
      type: "object",
      properties: {
        product_type: { type: "string", description: "e.g. saas, ecommerce, enterprise, dashboard, marketing" },
        density: { type: "string", enum: ["low", "medium", "high"] },
        platform: { type: "array", items: { type: "string" } },
        brand_personality: { type: "array", items: { type: "string" } },
        accessibility_target: { type: "object", properties: { wcag: { type: "string" } } },
      },
      required: ["product_type"],
    },
  },
  {
    name: "review_design",
    description: "Static heuristic design/accessibility review of an HTML string. Returns a score (0-100) and structured issues (missing alt, unlabeled inputs, missing lang/viewport, empty buttons, missing focus styling).",
    inputSchema: { type: "object", properties: { html: { type: "string" } }, required: ["html"] },
  },
  {
    name: "get_design_skill",
    description: "Return the full SKILL.md content of a skill by id (e.g. 'forms.accessible-form-design').",
    inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  },
  {
    name: "list_design_skills",
    description: "List all available design skills (id, category, description).",
    inputSchema: { type: "object", properties: {} },
  },
];

function callTool(name, args) {
  args = args || {};
  switch (name) {
    case "search_design_skills": {
      const terms = String(args.query || "").split(/\s+/).filter(Boolean);
      return search(terms).map((s) => ({ id: s.id, category: s.category, description: s.description }));
    }
    case "recommend_design_patterns":
      return recommend(args);
    case "review_design":
      return reviewHtml(String(args.html || ""));
    case "get_design_skill": {
      const entry = buildIndex().skills.find((s) => s.id === args.id);
      if (!entry) throw new Error(`unknown skill id: ${args.id}`);
      return { id: entry.id, content: fs.readFileSync(path.join(ROOT, entry.path), "utf8") };
    }
    case "list_design_skills":
      return buildIndex().skills.map((s) => ({ id: s.id, category: s.category, description: s.description }));
    default:
      throw new Error(`unknown tool: ${name}`);
  }
}

function send(msg) { process.stdout.write(JSON.stringify(msg) + "\n"); }

function handle(req) {
  const { id, method, params } = req;
  const isNotification = id === undefined || id === null;
  try {
    let result;
    switch (method) {
      case "initialize":
        result = { protocolVersion: (params && params.protocolVersion) || PROTOCOL, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER };
        break;
      case "notifications/initialized":
      case "notifications/cancelled":
        return; // notifications get no response
      case "ping":
        result = {};
        break;
      case "tools/list":
        result = { tools: TOOLS };
        break;
      case "tools/call": {
        const out = callTool(params && params.name, params && params.arguments);
        result = { content: [{ type: "text", text: JSON.stringify(out, null, 2) }] };
        break;
      }
      default:
        if (!isNotification) send({ jsonrpc: "2.0", id, error: { code: -32601, message: `method not found: ${method}` } });
        return;
    }
    if (!isNotification) send({ jsonrpc: "2.0", id, result });
  } catch (e) {
    if (isNotification) return;
    if (method === "tools/call") {
      send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: String(e && e.message || e) }], isError: true } });
    } else {
      send({ jsonrpc: "2.0", id, error: { code: -32603, message: String(e && e.message || e) } });
    }
  }
}

let buf = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buf += chunk;
  let nl;
  while ((nl = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    let req;
    try { req = JSON.parse(line); } catch { continue; }
    if (Array.isArray(req)) req.forEach(handle); else handle(req);
  }
});
process.stdin.on("end", () => process.exit(0));
process.stderr.write("design-intelligence MCP server ready (stdio)\n");
