// ── export.js — Archive ZIP : dashboard livrables + webapp générée ─────────────

// ── Helpers ────────────────────────────────────────────────────────────────────
function escH(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
// Escape pour attribut srcdoc (guillemets simples en entité)
function escSrcdoc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;');
}

// ── Sections de contenu (HTML inline, sans wrapper complet) ───────────────────

function sectionCadrage(d) {
  const fields = [
    { key:'contexte',       label:'Contexte',       color:'#00d3a8' },
    { key:'probleme',       label:'Problème',        color:'#f59e0b' },
    { key:'objectif',       label:'Objectif',        color:'#3b82f6' },
    { key:'cibles',         label:'Cibles',          color:'#8b5cf6' },
    { key:'perimetre',      label:'Périmètre',       color:'#00d3a8' },
    { key:'hors_perimetre', label:'Hors périmètre',  color:'#dc582a' },
  ];
  return `
    <div class="grid2">
      ${fields.map(f=>`
        <div class="card">
          <div class="ey" style="color:${f.color}">${f.label}</div>
          <p class="body">${escH(d[f.key]||'—')}</p>
        </div>`).join('')}
    </div>
    ${d.contraintes?.length?`<div class="card mt">
      <div class="ey">Contraintes</div>
      <div class="pills mt6">${d.contraintes.map(c=>`<span class="pill" style="--c:#f59e0b">${escH(c)}</span>`).join('')}</div>
    </div>`:''}
    ${d.kpis?.length?`<div class="card mt">
      <div class="ey">KPIs</div>
      <div class="pills mt6">${d.kpis.map(k=>`<span class="pill" style="--c:#00d3a8">${escH(k)}</span>`).join('')}</div>
    </div>`:''}`;
}

function sectionPersonas(d) {
  return `<div class="grid3">${(d.personas||[]).map(p=>`
    <div class="card" style="padding:28px">
      <div style="text-align:center;margin-bottom:18px">
        <div style="font-size:3rem;margin-bottom:6px">${escH(p.emoji||'👤')}</div>
        <div style="font-size:15px;font-weight:500">${escH(p.nom||'—')}</div>
        <div style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.4);margin-top:2px">${p.age?escH(p.age)+' ans':''}${p.age&&p.role?' · ':''}${escH(p.role||'')}</div>
      </div>
      <p class="body" style="margin-bottom:14px">${escH(p.contexte||'')}</p>
      ${p.objectifs?.length?`<div class="ey" style="color:#00d3a8;margin-bottom:5px">Objectifs</div>${p.objectifs.map(o=>`<div class="listitem">• ${escH(o)}</div>`).join('')}`:''}
      ${p.frustrations?.length?`<div class="ey" style="color:#dc582a;margin-top:10px;margin-bottom:5px">Frustrations</div>${p.frustrations.map(f=>`<div class="listitem">• ${escH(f)}</div>`).join('')}`:''}
      ${p.citation?`<div class="quote">"${escH(p.citation)}"</div>`:''}
    </div>`).join('')}</div>`;
}

function sectionStories(d) {
  const cols = [
    {key:'Must',   label:'Must Have',   color:'#00d3a8'},
    {key:'Should', label:'Should Have', color:'#3b82f6'},
    {key:'Could',  label:'Could Have',  color:'#f59e0b'},
    {key:'Wont',   label:"Won't Have",  color:'#dc582a'},
  ];
  const b = {Must:[],Should:[],Could:[],Wont:[]};
  (d.stories||[]).forEach(s=>{
    const p=(s.priorite||'').replace(/['']/g,'');
    const k=Object.keys(b).find(k=>p.toLowerCase().startsWith(k.toLowerCase()))||'Could';
    b[k].push(s);
  });
  return `<div class="grid2">${cols.map(col=>`
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <div style="width:9px;height:9px;border-radius:50%;background:${col.color}"></div>
        <span style="font-size:12px;font-weight:500;color:${col.color}">${col.label}</span>
        <span class="count">${b[col.key].length}</span>
      </div>
      ${b[col.key].length===0
        ?`<div class="card" style="text-align:center;color:rgba(255,255,255,0.2);font-size:12px;padding:12px">—</div>`
        :b[col.key].map(s=>`
        <div class="card" style="margin-bottom:7px;padding:14px">
          ${s.id?`<div style="font-size:10px;color:rgba(255,255,255,0.3);margin-bottom:3px">${escH(s.id)}</div>`:''}
          <p style="font-size:12px;color:rgba(255,255,255,0.8);line-height:1.55;margin-bottom:5px">
            En tant que <strong>${escH(s.en_tant_que||'...')}</strong>, je veux <strong>${escH(s.je_veux||'...')}</strong> afin de ${escH(s.afin_de||'...')}
          </p>
          ${s.criteres?.length?`<div style="padding-top:7px;border-top:1px solid rgba(255,255,255,0.06)">${s.criteres.map(c=>`<div style="font-size:11px;color:rgba(255,255,255,0.35);padding:1px 0">✓ ${escH(c)}</div>`).join('')}</div>`:''}
        </div>`).join('')}
    </div>`).join('')}</div>`;
}

function sectionJourney(d) {
  const ec=e=>e==='positif'?'#00d3a8':e==='negatif'?'#dc582a':'#f59e0b';
  const el=e=>e==='positif'?'😊 Positif':e==='negatif'?'😟 Négatif':'😐 Neutre';
  return `<div style="position:relative">
    <div style="position:absolute;left:16px;top:0;bottom:0;width:2px;background:rgba(255,255,255,0.06);border-radius:1px"></div>
    ${(d.etapes||[]).map((e,i)=>`
    <div style="padding-left:44px;padding-bottom:24px;position:relative">
      <div style="position:absolute;left:9px;top:6px;width:16px;height:16px;border-radius:50%;background:${ec(e.emotions)};box-shadow:0 0 10px ${ec(e.emotions)}55"></div>
      <div class="card">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap">
          <span style="font-size:10px;letter-spacing:.07em;color:rgba(255,255,255,0.3)">ÉTAPE ${i+1}</span>
          <h3 style="font-size:14px;font-weight:500;flex:1">${escH(e.phase||'—')}</h3>
          <span style="font-size:11px;color:${ec(e.emotions)}">${el(e.emotions)}</span>
        </div>
        ${e.pensees?`<p style="font-size:12px;font-style:italic;color:rgba(255,255,255,0.38);margin-bottom:10px;padding:9px 12px;background:rgba(255,255,255,0.025);border-radius:7px">"${escH(e.pensees)}"</p>`:''}
        <div class="grid2">
          ${e.actions?.length?`<div><div class="ey">Actions</div>${e.actions.map(a=>`<div class="listitem">• ${escH(a)}</div>`).join('')}</div>`:'<div></div>'}
          ${e.opportunites?.length?`<div><div class="ey" style="color:#00d3a8">Opportunités</div>${e.opportunites.map(o=>`<div class="listitem" style="color:rgba(0,211,168,0.75)">→ ${escH(o)}</div>`).join('')}</div>`:'<div></div>'}
        </div>
        ${e.touchpoints?.length?`<div class="pills" style="margin-top:8px">${e.touchpoints.map(t=>`<span class="pill" style="--c:#3b82f6">${escH(t)}</span>`).join('')}</div>`:''}
      </div>
    </div>`).join('')}
  </div>`;
}

function sectionArchitecture(d) {
  return `<div class="grid2">${(d.pages||[]).map(p=>`
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px;flex-wrap:wrap">
        <strong style="font-size:13px">${escH(p.nom||'—')}</strong>
        ${p.url?`<code class="tag-code">${escH(p.url)}</code>`:''}
      </div>
      ${p.description?`<p class="body" style="margin-bottom:10px">${escH(p.description)}</p>`:''}
      ${p.composants?.length?`<div class="ey">Composants</div><div class="pills mt6">${p.composants.map(c=>`<span class="pill" style="--c:rgba(255,255,255,.5)">${escH(c)}</span>`).join('')}</div>`:''}
      ${p.sous_pages?.length?`<div class="ey" style="margin-top:10px">Sous-pages</div>${p.sous_pages.map(sp=>{const n=typeof sp==='string'?sp:sp.nom||'';const u=typeof sp==='object'?sp.url||'':'';return`<div class="listitem"><span style="opacity:.4">└</span> ${escH(n)}${u?` <code class="tag-code" style="font-size:10px">${escH(u)}</code>`:''}</div>`;}).join('')}`:''}
    </div>`).join('')}</div>`;
}

function sectionWireframes(html) {
  // Embed wireframe in a sandboxed iframe via srcdoc
  return `<div style="border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.07)">
    <iframe
      srcdoc="${escSrcdoc(html)}"
      sandbox="allow-scripts"
      style="width:100%;height:600px;border:none;display:block;background:#fff"
      title="Wireframe basse fidélité"
    ></iframe>
  </div>`;
}

function sectionRgaa(d) {
  const lc=l=>(l==='A'||l==='AA')?'#00d3a8':'#f59e0b';
  const sc=s=>s==='conforme'?'#00d3a8':s==='non conforme'?'#dc582a':'#f59e0b';
  const criteres=d.criteres||[];
  return `
    <div class="grid2" style="margin-bottom:18px">
      <div class="card" style="text-align:center;padding:32px">
        <div style="font-size:3.5rem;font-weight:300;color:#00d3a8;line-height:1">${escH(String(d.score_global??'—'))}<span style="font-size:1.4rem">%</span></div>
        <div style="font-size:11px;letter-spacing:.07em;color:rgba(255,255,255,0.35);margin-top:6px">SCORE GLOBAL · ${escH(d.niveau_vise||'AA')}</div>
      </div>
      <div class="card">
        <div class="ey" style="margin-bottom:8px">Synthèse</div>
        <p class="body">${escH(d.synthese||'—')}</p>
        ${d.points_forts?.length?`<div class="ey" style="color:#00d3a8;margin-top:12px;margin-bottom:5px">Points forts</div>${d.points_forts.map(p=>`<div class="listitem" style="color:rgba(0,211,168,.75)">✓ ${escH(p)}</div>`).join('')}`:''}
        ${d.axes_amelioration?.length?`<div class="ey" style="color:#f59e0b;margin-top:10px;margin-bottom:5px">Axes d'amélioration</div>${d.axes_amelioration.map(a=>`<div class="listitem" style="color:rgba(245,158,11,.75)">→ ${escH(a)}</div>`).join('')}`:''}
      </div>
    </div>
    ${criteres.length?`<div class="card"><div class="ey" style="margin-bottom:12px">Critères (${criteres.length})</div>
    <div style="overflow-x:auto"><table class="tbl">
      <thead><tr>
        <th>Critère</th><th style="text-align:center">Niveau</th><th>Statut</th><th>Commentaire</th>
      </tr></thead>
      <tbody>${criteres.map((c,i)=>`
        <tr class="${i%2===1?'alt':''}">
          <td>${c.numero?`<span style="color:rgba(255,255,255,.35);margin-right:5px">${escH(c.numero)}</span>`:''}${escH(c.nom||'—')}</td>
          <td style="text-align:center"><span class="badge" style="--c:${lc(c.niveau)}">${escH(c.niveau||'—')}</span></td>
          <td style="color:${sc(c.statut)}">${escH(c.statut||'—')}</td>
          <td style="color:rgba(255,255,255,.35)">${escH(c.commentaire||'')}</td>
        </tr>`).join('')}
      </tbody>
    </table></div></div>`:''}`;
}

// ── Dashboard complet (fichier index.html) ────────────────────────────────────
function generateDashboard(res, projectTitle) {
  const titre = escH(res.cadrage?.titre || projectTitle || 'Projet');
  const date  = new Date().toLocaleDateString('fr-FR', {year:'numeric',month:'long',day:'numeric'});

  const tabs = [
    { id:'cadrage',      icon:'📋', label:'Cadrage',        html: res.cadrage      ? sectionCadrage(res.cadrage)           : null },
    { id:'personas',     icon:'👥', label:'Personas',       html: res.personas     ? sectionPersonas(res.personas)         : null },
    { id:'stories',      icon:'📝', label:'User Stories',   html: res.stories      ? sectionStories(res.stories)           : null },
    { id:'journey',      icon:'🗺', label:'Parcours',       html: res.journey      ? sectionJourney(res.journey)           : null },
    { id:'architecture', icon:'🏗', label:'Architecture',   html: res.architecture ? sectionArchitecture(res.architecture) : null },
    { id:'wireframes',   icon:'🖼', label:'Wireframes',     html: res.wireframes   ? sectionWireframes(res.wireframes)     : null },
    { id:'rgaa',         icon:'♿', label:'Audit RGAA',     html: res.rgaa         ? sectionRgaa(res.rgaa)                 : null },
  ].filter(t => t.html !== null);

  const sectionsHTML = tabs.map((t, i) => `
    <section id="sec-${t.id}" class="section${i===0?'':' hidden'}">
      <h2 class="sec-title">${t.icon} ${t.label}</h2>
      ${t.html}
    </section>`).join('');

  const navHTML = tabs.map((t, i) => `
    <button class="nav-btn${i===0?' active':''}" onclick="show('${t.id}',this)">
      <span class="nav-icon">${t.icon}</span>
      <span>${t.label}</span>
    </button>`).join('');

  const hasV1 = !!res.v1;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titre} — Livrables UX</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0f1e; color: #fff; height: 100vh; display: flex; overflow: hidden; }

    /* ── Layout ── */
    .sidebar { width: 220px; min-width: 220px; background: linear-gradient(180deg,#0e1426,#080c18); border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding: 24px 14px; overflow-y: auto; }
    .main    { flex: 1; overflow-y: auto; padding: 36px 36px 80px; }

    /* ── Sidebar ── */
    .logo-title { font-size: 15px; font-weight: 500; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .logo-sub   { font-size: 10px; color: rgba(255,255,255,.3); letter-spacing: .08em; text-transform: uppercase; }
    .logo-date  { font-size: 10px; color: rgba(255,255,255,.2); margin-top: 2px; }
    .divider    { height: 1px; background: rgba(255,255,255,.06); margin: 16px 0; }
    .nav-btn {
      display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px 10px;
      background: none; border: none; border-radius: 8px; color: rgba(255,255,255,.45);
      font-size: 12.5px; font-family: inherit; cursor: pointer; text-align: left;
      transition: all .15s; margin-bottom: 2px;
    }
    .nav-btn:hover  { background: rgba(255,255,255,.04); color: rgba(255,255,255,.8); }
    .nav-btn.active { background: rgba(255,255,255,.06); color: #fff; font-weight: 500; }
    .nav-icon { font-size: 14px; width: 20px; text-align: center; }
    .btn-app {
      display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 10px 14px; border-radius: 10px; margin-bottom: 16px;
      background: linear-gradient(135deg,rgba(0,211,168,.85),rgba(0,132,212,.85));
      color: #fff; font-size: 12px; font-weight: 500; text-decoration: none;
      transition: opacity .2s;
    }
    .btn-app:hover { opacity: .85; }
    .btn-app-disabled {
      display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 10px 14px; border-radius: 10px; margin-bottom: 16px;
      background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
      color: rgba(255,255,255,.3); font-size: 12px;
    }
    .engine { background: rgba(0,211,168,.07); border: 1px solid rgba(0,211,168,.18); border-radius: 10px; padding: 10px 12px; margin-top: auto; display: flex; align-items: center; gap: 8px; }
    .dot    { width: 7px; height: 7px; border-radius: 50%; background: #00d3a8; }
    .engine-label { font-size: 11px; font-weight: 500; color: #00d3a8; }
    .engine-sub   { font-size: 10px; color: rgba(255,255,255,.3); }

    /* ── Content ── */
    .section  { max-width: 880px; }
    .hidden   { display: none; }
    .sec-title { font-size: 22px; font-weight: 500; letter-spacing: -.02em; margin-bottom: 24px; }

    /* ── Cards & grids ── */
    .card  { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 14px; padding: 20px; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .grid3 { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 18px; }
    .mt    { margin-top: 14px; }
    .mt6   { margin-top: 6px; }
    .ey    { font-size: 10px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35); margin-bottom: 4px; }
    .body  { font-size: 13px; font-weight: 300; color: rgba(255,255,255,.65); line-height: 1.7; }
    .pills { display: flex; flex-wrap: wrap; gap: 5px; }
    .pill  { font-size: 11px; border-radius: 5px; padding: 3px 9px; background: color-mix(in srgb, var(--c) 12%, transparent); border: 1px solid color-mix(in srgb, var(--c) 28%, transparent); color: var(--c); }
    .listitem  { font-size: 12px; color: rgba(255,255,255,.6); padding: 2px 0 2px 4px; line-height: 1.5; }
    .quote     { margin-top: 14px; padding: 11px 14px; background: rgba(255,255,255,.03); border-left: 2px solid rgba(255,255,255,.12); border-radius: 0 8px 8px 0; font-size: 12px; font-style: italic; color: rgba(255,255,255,.4); }
    .count     { font-size: 10px; color: rgba(255,255,255,.3); background: rgba(255,255,255,.05); border-radius: 10px; padding: 1px 7px; }
    .tag-code  { font-size: 10px; color: rgba(0,211,168,.7); background: rgba(0,211,168,.07); border-radius: 4px; padding: 2px 7px; font-family: 'SF Mono','Fira Code',monospace; }
    .badge     { font-size: 11px; font-weight: 500; border-radius: 4px; padding: 2px 7px; background: color-mix(in srgb, var(--c) 15%, transparent); color: var(--c); }

    /* ── Table ── */
    .tbl { width: 100%; border-collapse: collapse; min-width: 500px; }
    .tbl th { text-align: left; font-size: 10px; font-weight: 500; color: rgba(255,255,255,.3); padding: 8px 12px; letter-spacing: .08em; border-bottom: 1px solid rgba(255,255,255,.08); }
    .tbl td { padding: 9px 12px; font-size: 12px; color: rgba(255,255,255,.65); border-bottom: 1px solid rgba(255,255,255,.04); }
    .tbl tr.alt td { background: rgba(255,255,255,.015); }

    /* ── Footer ── */
    .footer { margin-top: 64px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.06); display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,.2); letter-spacing: .05em; }
  </style>
</head>
<body>

  <aside class="sidebar">
    <div style="margin-bottom:20px">
      <div class="logo-title" title="${titre}">${titre}</div>
      <div class="logo-sub">Livrables UX</div>
      <div class="logo-date">${date}</div>
    </div>

    ${hasV1
      ? `<a href="webapp/index.html" target="_blank" class="btn-app">🚀 Ouvrir l'app V1</a>`
      : `<div class="btn-app-disabled">App V1 non générée</div>`}

    <div class="divider"></div>
    <nav>${navHTML}</nav>

    <div style="flex:1"></div>
    <div class="engine">
      <div class="dot"></div>
      <div>
        <div class="engine-label">UX PILOT</div>
        <div class="engine-sub">Claude Sonnet 4</div>
      </div>
    </div>
  </aside>

  <main class="main">
    ${sectionsHTML}
    <div class="footer">
      <span>UX PILOT — LIVRABLES GÉNÉRÉS PAR IA</span>
      <span>${date}</span>
    </div>
  </main>

  <script>
    function show(id, btn) {
      document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('sec-' + id).classList.remove('hidden');
      if (btn) btn.classList.add('active');
    }
  </script>
</body>
</html>`;
}

// ── Générateur d'archive ZIP ──────────────────────────────────────────────────
async function generateArchive(res, projectTitle) {
  const title   = res.cadrage?.titre || projectTitle || 'projet';
  const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const zip     = new JSZip();
  const folder  = zip.folder(`ux-pilot-${safeName}`);

  // Dashboard principal
  folder.file('index.html', generateDashboard(res, title));

  // Webapp V1 dans un sous-dossier
  if (res.v1) {
    folder.folder('webapp').file('index.html', res.v1);
  }

  // Téléchargement
  const blob = await zip.generateAsync({ type:'blob', compression:'DEFLATE', compressionOptions:{ level:6 } });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `ux-pilot-${safeName}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 8000);
}
