// Design Intelligence — zero-dependency core.
// A YAML-subset parser (sufficient for SKILL.md / knowledge frontmatter) plus a
// JSON-Schema-subset validator. No npm dependencies: `node` is the only requirement.
//
// Supported YAML: block maps, block scalar lists, one-level nesting, and inline
// flow style for arrays and objects (e.g. `[web, mobile]`, `{ class: x, title: "y" }`).
// Authoring convention: write lists-of-objects using inline flow style.

// ---------- frontmatter ----------

export function parseFrontmatter(text) {
  const m = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n([\s\S]*))?$/.exec(text);
  if (!m) return { data: {}, body: text, hasFrontmatter: false };
  return { data: parseYAML(m[1]), body: m[2] || "", hasFrontmatter: true };
}

// ---------- YAML subset ----------

export function parseYAML(text) {
  const lines = [];
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim()) continue;
    if (/^\s*#/.test(raw)) continue;
    const indent = raw.length - raw.replace(/^ +/, "").length;
    lines.push({ indent, text: raw.trim() });
  }
  if (!lines.length) return {};
  const [val] = parseBlock(lines, 0, lines[0].indent);
  return val;
}

function isListItem(t) { return t === "-" || t.startsWith("- "); }

function parseBlock(lines, i, indent) {
  if (i >= lines.length || lines[i].indent < indent) return [null, i];
  if (isListItem(lines[i].text)) return parseList(lines, i, indent);
  return parseMap(lines, i, indent);
}

function parseMap(lines, i, indent) {
  const obj = {};
  while (i < lines.length && lines[i].indent === indent && !isListItem(lines[i].text)) {
    const { key, rest } = splitKey(lines[i].text);
    i++;
    if (rest === "") {
      if (i < lines.length && lines[i].indent > indent) {
        const [v, ni] = parseBlock(lines, i, lines[i].indent);
        obj[key] = v; i = ni;
      } else obj[key] = null;
    } else {
      obj[key] = parseFlow(rest);
    }
  }
  return [obj, i];
}

function parseList(lines, i, indent) {
  const arr = [];
  while (i < lines.length && lines[i].indent === indent && isListItem(lines[i].text)) {
    const itemText = lines[i].text === "-" ? "" : lines[i].text.slice(2).trim();
    if (itemText === "") {
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const [v, ni] = parseBlock(lines, i + 1, lines[i + 1].indent);
        arr.push(v); i = ni;
      } else { arr.push(null); i++; }
    } else {
      arr.push(parseFlow(itemText)); i++;
    }
  }
  return [arr, i];
}

function splitKey(text) {
  const m = /^([^:]+):(?:\s+([\s\S]*))?$/.exec(text);
  if (!m) return { key: text.replace(/:$/, "").trim(), rest: "" };
  return { key: m[1].trim(), rest: m[2] === undefined ? "" : m[2].trim() };
}

// ---------- inline flow ----------

function parseFlow(s) {
  s = s.trim();
  if (s.startsWith("[") || s.startsWith("{")) return parseFlowValue(s, 0)[0];
  return parseScalar(s);
}

function parseFlowValue(s, i) {
  i = skipWs(s, i);
  const c = s[i];
  if (c === "[") return parseFlowArray(s, i);
  if (c === "{") return parseFlowObject(s, i);
  if (c === '"' || c === "'") return parseQuoted(s, i);
  let j = i;
  while (j < s.length && !",]}".includes(s[j])) j++;
  return [parseScalar(s.slice(i, j).trim()), j];
}

function parseFlowArray(s, i) {
  i++; const arr = []; i = skipWs(s, i);
  if (s[i] === "]") return [arr, i + 1];
  while (i < s.length) {
    let v; [v, i] = parseFlowValue(s, i); arr.push(v); i = skipWs(s, i);
    if (s[i] === ",") { i++; continue; }
    if (s[i] === "]") { i++; break; }
    break;
  }
  return [arr, i];
}

function parseFlowObject(s, i) {
  i++; const obj = {}; i = skipWs(s, i);
  if (s[i] === "}") return [obj, i + 1];
  while (i < s.length) {
    let key;
    if (s[i] === '"' || s[i] === "'") { [key, i] = parseQuoted(s, i); }
    else { let j = i; while (j < s.length && s[j] !== ":") j++; key = s.slice(i, j).trim(); i = j; }
    i = skipWs(s, i);
    if (s[i] === ":") i++;
    let v; [v, i] = parseFlowValue(s, i); obj[key] = v; i = skipWs(s, i);
    if (s[i] === ",") { i++; continue; }
    if (s[i] === "}") { i++; break; }
    break;
  }
  return [obj, i];
}

function parseQuoted(s, i) {
  const q = s[i]; i++; let out = "";
  while (i < s.length && s[i] !== q) {
    if (s[i] === "\\" && q === '"') { out += s[i + 1]; i += 2; }
    else { out += s[i]; i++; }
  }
  return [out, i + 1];
}

function skipWs(s, i) { while (i < s.length && /\s/.test(s[i])) i++; return i; }

function parseScalar(s) {
  s = s.trim();
  if (s === "") return null;
  if (s[0] === '"' || s[0] === "'") return s.slice(1, -1);
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null" || s === "~") return null;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
  return s;
}

// ---------- JSON Schema subset validator ----------
// Supports: type, enum, required, properties, additionalProperties(false),
// items, pattern, minLength, maxLength, minimum, maximum, and $ref to #/$defs.

export function validate(instance, schema, root = schema) {
  const errors = [];
  check(instance, schema, root, "", errors);
  return errors;
}

function resolveRef(ref, root) {
  const parts = ref.replace(/^#\//, "").split("/");
  let cur = root;
  for (const p of parts) cur = cur && cur[p];
  return cur;
}

function check(inst, schema, root, path, errors) {
  const at = path || "(root)";
  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref, root);
    if (!resolved) { errors.push(`${at}: cannot resolve ${schema.$ref}`); return; }
    schema = resolved;
  }
  if (schema.type && !typeOk(inst, schema.type)) {
    errors.push(`${at}: expected ${schema.type}, got ${jsType(inst)}`);
    return;
  }
  if (schema.enum && !schema.enum.includes(inst)) {
    errors.push(`${at}: "${inst}" is not one of [${schema.enum.join(", ")}]`);
  }
  if (typeof inst === "string") {
    if (schema.maxLength != null && inst.length > schema.maxLength) errors.push(`${at}: exceeds maxLength ${schema.maxLength}`);
    if (schema.minLength != null && inst.length < schema.minLength) errors.push(`${at}: below minLength ${schema.minLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(inst)) errors.push(`${at}: "${inst}" does not match /${schema.pattern}/`);
  }
  if (typeof inst === "number") {
    if (schema.minimum != null && inst < schema.minimum) errors.push(`${at}: below minimum ${schema.minimum}`);
    if (schema.maximum != null && inst > schema.maximum) errors.push(`${at}: above maximum ${schema.maximum}`);
  }
  if (inst && typeof inst === "object" && !Array.isArray(inst)) {
    if (schema.required) for (const r of schema.required) if (!(r in inst)) errors.push(`${at}: missing required "${r}"`);
    for (const k of Object.keys(inst)) {
      if (schema.properties && schema.properties[k]) {
        check(inst[k], schema.properties[k], root, path ? `${path}.${k}` : k, errors);
      } else if (schema.additionalProperties === false) {
        errors.push(`${path ? path + "." : ""}${k}: unexpected property`);
      }
    }
  }
  if (Array.isArray(inst) && schema.items) {
    inst.forEach((it, idx) => check(it, schema.items, root, `${path}[${idx}]`, errors));
  }
}

function typeOk(inst, type) {
  switch (type) {
    case "object": return inst != null && typeof inst === "object" && !Array.isArray(inst);
    case "array": return Array.isArray(inst);
    case "string": return typeof inst === "string";
    case "number": return typeof inst === "number";
    case "integer": return typeof inst === "number" && Number.isInteger(inst);
    case "boolean": return typeof inst === "boolean";
    case "null": return inst === null;
    default: return true;
  }
}

function jsType(v) { return v === null ? "null" : Array.isArray(v) ? "array" : typeof v; }
