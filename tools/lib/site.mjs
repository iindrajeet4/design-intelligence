// Design Intelligence — static catalog renderer.
// Returns a single self-contained HTML page (inline CSS + JS, registry data inlined
// as JSON). No external requests, so it works from file://, GitHub Pages, or any host.

const REPO = "https://github.com/iindrajeet4/design-intelligence";

export function renderSite(registry) {
  const data = JSON.stringify(registry).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design Intelligence — skill catalog</title>
<style>
  *,*::before,*::after{box-sizing:border-box}
  :root{
    --ground:#F7F8FB;--surface:#fff;--surface-2:#F1F3F7;--ink:#161A22;--muted:#565F70;
    --line:#E3E7EE;--accent:#985313;--accent-bg:#FBF1E3;--good:#2C7A69;--chip:#EDEFF3;
    --serif:"Iowan Old Style","Palatino Linotype",Palatino,Cambria,Georgia,serif;
    --sans:"Segoe UI",-apple-system,BlinkMacSystemFont,Arial,sans-serif;
    --mono:"Cascadia Code",Consolas,"SF Mono","Roboto Mono",monospace;
  }
  @media (prefers-color-scheme:dark){:root{
    --ground:#0F131B;--surface:#161B25;--surface-2:#1C222E;--ink:#E7EAF1;--muted:#98A2B4;
    --line:#252C3A;--accent:#E7A64E;--accent-bg:#241B0E;--good:#54B8A1;--chip:#1C222E;
  }}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);line-height:1.55}
  a{color:var(--accent);text-underline-offset:2px}
  .wrap{max-width:1100px;margin:0 auto;padding:0 20px}
  header{border-bottom:1px solid var(--line);padding:38px 0 22px;margin-bottom:22px}
  .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:0 0 10px}
  h1{font-family:var(--serif);font-weight:600;font-size:clamp(1.9rem,4vw,2.8rem);margin:0;letter-spacing:-.01em}
  .sub{color:var(--muted);max-width:60ch;margin:12px 0 0}
  .counts{font-family:var(--mono);font-size:12.5px;color:var(--muted);margin-top:14px}
  .controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:22px 0 6px;position:sticky;top:0;background:var(--ground);padding:12px 0;z-index:5;border-bottom:1px solid var(--line)}
  #q{flex:1;min-width:220px;font-family:var(--sans);font-size:15px;padding:9px 12px;border:1px solid var(--line);border-radius:9px;background:var(--surface);color:var(--ink)}
  #q:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  .cats{display:flex;flex-wrap:wrap;gap:6px}
  .cat{font-family:var(--mono);font-size:11.5px;padding:4px 10px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--muted);cursor:pointer}
  .cat[aria-pressed="true"]{background:var(--accent-bg);color:var(--accent);border-color:var(--accent)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px;margin:18px 0 40px}
  .card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:15px 16px;display:flex;flex-direction:column;gap:8px}
  .card .top{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
  .card .id{font-family:var(--mono);font-size:13px;color:var(--ink);word-break:break-word}
  .badge{font-family:var(--mono);font-size:10.5px;padding:2px 7px;border-radius:6px;background:var(--chip);color:var(--muted);white-space:nowrap}
  .desc{color:var(--muted);font-size:14px;margin:0}
  .meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;align-items:center}
  .q{font-family:var(--mono);font-size:11px;color:var(--good)}
  .tag{font-family:var(--mono);font-size:10.5px;color:var(--muted);background:var(--chip);padding:1px 7px;border-radius:999px}
  .src{font-family:var(--mono);font-size:11px}
  h2{font-family:var(--serif);font-weight:600;font-size:1.4rem;margin:34px 0 4px}
  .khead{color:var(--muted);margin:0 0 12px;font-size:14px}
  .klist{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}
  .k{background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:10px 12px}
  .k .id{font-family:var(--mono);font-size:12px}
  .k .t{font-size:10px;font-family:var(--mono);color:var(--accent);text-transform:uppercase;letter-spacing:.08em}
  .k .s{color:var(--muted);font-size:13px;margin-top:3px}
  footer{border-top:1px solid var(--line);padding:24px 0 60px;color:var(--muted);font-size:13px}
  .empty{color:var(--muted);font-style:italic;padding:20px 0}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <p class="eyebrow">Design Intelligence · catalog</p>
    <h1>A queryable design brain for AI coding agents</h1>
    <p class="sub">Browse the open skill library and knowledge graph. Each skill packages design knowledge an AI agent can load, apply, and be reviewed against.</p>
    <p class="counts" id="counts"></p>
  </header>

  <div class="controls">
    <input id="q" type="search" placeholder="Search skills — e.g. accessibility, dashboard, forms" aria-label="Search skills">
    <div class="cats" id="cats"></div>
  </div>
  <div class="grid" id="grid"></div>

  <h2>Knowledge graph</h2>
  <p class="khead">Atomic, typed objects (principles, patterns, rules, heuristics, decisions…) that skills reference.</p>
  <div class="klist" id="klist"></div>

  <footer>
    Open source · code Apache-2.0 · knowledge CC BY 4.0 ·
    <a href="${REPO}">${REPO.replace("https://", "")}</a>
  </footer>
</div>

<script id="registry" type="application/json">${data}</script>
<script>
  var REG = JSON.parse(document.getElementById("registry").textContent);
  var BLOB = "${REPO}/blob/main/";
  var esc = function(s){ return String(s==null?"":s).replace(/[&<>"]/g, function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); };
  var active = null, query = "";

  document.getElementById("counts").textContent = REG.counts.skills + " skills · " + REG.counts.knowledge + " knowledge objects";

  var cats = Array.from(new Set(REG.skills.map(function(s){return s.category;}))).sort();
  var catBox = document.getElementById("cats");
  cats.forEach(function(c){
    var b = document.createElement("button");
    b.className = "cat"; b.textContent = c; b.setAttribute("aria-pressed","false");
    b.onclick = function(){ active = (active===c)?null:c; render(); Array.from(catBox.children).forEach(function(x){x.setAttribute("aria-pressed", x.textContent===active?"true":"false");}); };
    catBox.appendChild(b);
  });

  function match(s){
    if (active && s.category !== active) return false;
    if (!query) return true;
    var hay = (s.id+" "+s.category+" "+s.description+" "+(s.tags||[]).join(" ")+" "+(s.product_types||[]).join(" ")).toLowerCase();
    return query.toLowerCase().split(/\\s+/).every(function(t){return hay.indexOf(t)>=0;});
  }

  function render(){
    var grid = document.getElementById("grid");
    var list = REG.skills.filter(match);
    grid.innerHTML = "";
    if (!list.length){ grid.innerHTML = '<p class="empty">No skills match.</p>'; }
    list.forEach(function(s){
      var q = s.quality_overall!=null ? '<span class="q">★ '+s.quality_overall+'/5</span>' : '';
      var tags = (s.tags||[]).slice(0,4).map(function(t){return '<span class="tag">'+esc(t)+'</span>';}).join("");
      var plats = (s.platforms||[]).join(" · ");
      var el = document.createElement("div");
      el.className = "card";
      el.innerHTML =
        '<div class="top"><span class="id">'+esc(s.id)+'</span><span class="badge">'+esc(s.category)+'</span></div>'+
        '<p class="desc">'+esc(s.description)+'</p>'+
        '<div class="meta">'+q+(plats?'<span class="tag">'+esc(plats)+'</span>':"")+tags+'</div>'+
        '<div class="meta"><span class="badge">'+esc(s.status)+(s.version?' · v'+esc(s.version):"")+'</span>'+
        '<a class="src" href="'+BLOB+esc(s.path)+'">source →</a></div>';
      grid.appendChild(el);
    });
  }

  var klist = document.getElementById("klist");
  REG.knowledge.forEach(function(k){
    var el = document.createElement("div");
    el.className = "k";
    el.innerHTML = '<div class="t">'+esc(k.type)+'</div><div class="id">'+esc(k.id)+'</div><div class="s">'+esc(k.summary)+'</div>';
    klist.appendChild(el);
  });

  document.getElementById("q").addEventListener("input", function(e){ query = e.target.value; render(); });
  render();
</script>
</body>
</html>
`;
}
