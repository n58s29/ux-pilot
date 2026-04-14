// ── export.js — Archive HTML de tous les livrables UX Pilot ──────────────────
// Génère un ZIP contenant 8 pages HTML standalone + dossier maquette/ (HTML/CSS/JS séparés)

// ── Wrapper HTML commun ────────────────────────────────────────────────────────
function htmlDoc(title, body) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escH(title)} — UX Pilot</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0f1e; color: #fff; line-height: 1.6; }
    .page { max-width: 960px; margin: 0 auto; padding: 48px 32px 80px; }
    .hdr { margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(0,211,168,0.1); border: 1px solid rgba(0,211,168,0.2); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-weight: 500; color: #00d3a8; letter-spacing: 0.06em; margin-bottom: 12px; }
    h1 { font-size: 2rem; font-weight: 500; letter-spacing: -0.03em; margin-bottom: 6px; }
    .sub { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.4); }
    .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 24px; }
    .ey { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 6px; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
    .pill { display: inline-block; font-size: 11px; border-radius: 6px; padding: 3px 10px; margin: 2px; }
    .ftr { margin-top: 64px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,0.2); letter-spacing: 0.05em; }
  </style>
</head>
<body>
  <div class="page">
    ${body}
    <div class="ftr">
      <span>UX PILOT — LIVRABLE GÉNÉRÉ PAR IA · CLAUDE SONNET 4</span>
      <span>${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>
  </div>
</body>
</html>`;
}

function escH(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── 01 — Cadrage ──────────────────────────────────────────────────────────────
function genCadrageHTML(d) {
  const fields = [
    { key: 'contexte',       label: 'Contexte',        color: '#00d3a8' },
    { key: 'probleme',       label: 'Problème',         color: '#f59e0b' },
    { key: 'objectif',       label: 'Objectif',         color: '#3b82f6' },
    { key: 'cibles',         label: 'Cibles',           color: '#8b5cf6' },
    { key: 'perimetre',      label: 'Périmètre',        color: '#00d3a8' },
    { key: 'hors_perimetre', label: 'Hors périmètre',   color: '#dc582a' },
  ];
  const body = `
    <div class="hdr">
      <div class="badge">📋 ÉTAPE 1</div>
      <h1>${escH(d.titre || 'Cadrage Express')}</h1>
      <p class="sub">Brief projet structuré</p>
    </div>
    <div class="grid2" style="margin-bottom:16px">
      ${fields.map(f => `
        <div class="card">
          <div class="ey" style="color:${f.color}">${f.label}</div>
          <p style="font-size:13px;font-weight:300;color:rgba(255,255,255,0.75);line-height:1.7">${escH(d[f.key] || '—')}</p>
        </div>`).join('')}
    </div>
    ${d.contraintes?.length ? `
    <div class="card" style="margin-bottom:16px">
      <div class="ey">Contraintes</div>
      <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">
        ${d.contraintes.map(c => `<span class="pill" style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);color:#f59e0b">${escH(c)}</span>`).join('')}
      </div>
    </div>` : ''}
    ${d.kpis?.length ? `
    <div class="card">
      <div class="ey">KPIs</div>
      <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">
        ${d.kpis.map(k => `<span class="pill" style="background:rgba(0,211,168,0.08);border:1px solid rgba(0,211,168,0.2);color:#00d3a8">${escH(k)}</span>`).join('')}
      </div>
    </div>` : ''}`;
  return htmlDoc('Cadrage Express', body);
}

// ── 02 — Personas ─────────────────────────────────────────────────────────────
function genPersonasHTML(d) {
  const personas = d.personas || [];
  const body = `
    <div class="hdr">
      <div class="badge">👥 ÉTAPE 2</div>
      <h1>Personas Utilisateurs</h1>
      <p class="sub">${personas.length} profil(s) modélisé(s)</p>
    </div>
    <div class="grid3">
      ${personas.map(p => `
        <div class="card" style="padding:28px">
          <div style="text-align:center;margin-bottom:20px">
            <div style="font-size:3rem;margin-bottom:8px">${escH(p.emoji || '👤')}</div>
            <div style="font-size:16px;font-weight:500">${escH(p.nom || '—')}</div>
            <div style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.4);margin-top:3px">${p.age ? escH(p.age)+' ans' : ''}${p.age && p.role ? ' · ' : ''}${escH(p.role || '')}</div>
          </div>
          <p style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.5);line-height:1.65;margin-bottom:16px">${escH(p.contexte || '')}</p>
          ${p.objectifs?.length ? `
          <div style="margin-bottom:12px">
            <div class="ey" style="color:#00d3a8">Objectifs</div>
            ${p.objectifs.map(o => `<div style="font-size:12px;color:rgba(255,255,255,0.65);padding:2px 0 2px 12px">• ${escH(o)}</div>`).join('')}
          </div>` : ''}
          ${p.frustrations?.length ? `
          <div style="margin-bottom:12px">
            <div class="ey" style="color:#dc582a">Frustrations</div>
            ${p.frustrations.map(f => `<div style="font-size:12px;color:rgba(255,255,255,0.65);padding:2px 0 2px 12px">• ${escH(f)}</div>`).join('')}
          </div>` : ''}
          ${p.citation ? `<div style="margin-top:14px;padding:12px;background:rgba(255,255,255,0.03);border-left:2px solid rgba(255,255,255,0.12);border-radius:0 8px 8px 0;font-size:12px;font-style:italic;color:rgba(255,255,255,0.45)">"${escH(p.citation)}"</div>` : ''}
        </div>`).join('')}
    </div>`;
  return htmlDoc('Personas Utilisateurs', body);
}

// ── 03 — User Stories ─────────────────────────────────────────────────────────
function genStoriesHTML(d) {
  const stories = d.stories || [];
  const cols = [
    { key: 'Must',   label: 'Must Have',   color: '#00d3a8', bg: 'rgba(0,211,168,0.08)',   border: 'rgba(0,211,168,0.2)'  },
    { key: 'Should', label: 'Should Have', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)' },
    { key: 'Could',  label: 'Could Have',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)' },
    { key: 'Wont',   label: "Won't Have",  color: '#dc582a', bg: 'rgba(220,88,42,0.08)',   border: 'rgba(220,88,42,0.2)'  },
  ];
  const buckets = { Must: [], Should: [], Could: [], Wont: [] };
  stories.forEach(s => {
    const p = (s.priorite || '').replace(/['']/g, '');
    const k = Object.keys(buckets).find(k => p.toLowerCase().startsWith(k.toLowerCase())) || 'Could';
    buckets[k].push(s);
  });
  const body = `
    <div class="hdr">
      <div class="badge">📝 ÉTAPE 3</div>
      <h1>User Stories</h1>
      <p class="sub">${stories.length} story(ies) · Priorisation MoSCoW</p>
    </div>
    <div class="grid2">
      ${cols.map(col => `
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <div style="width:10px;height:10px;border-radius:50%;background:${col.color}"></div>
            <span style="font-size:12px;font-weight:500;color:${col.color}">${col.label}</span>
            <span style="font-size:10px;color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.05);border-radius:10px;padding:1px 7px">${buckets[col.key].length}</span>
          </div>
          ${buckets[col.key].length === 0
            ? `<div class="card" style="padding:14px;text-align:center;color:rgba(255,255,255,0.2);font-size:12px">—</div>`
            : buckets[col.key].map(s => `
              <div class="card" style="margin-bottom:8px;padding:16px">
                ${s.id ? `<div style="font-size:10px;color:rgba(255,255,255,0.3);margin-bottom:4px">${escH(s.id)}</div>` : ''}
                <p style="font-size:12px;color:rgba(255,255,255,0.8);line-height:1.55;margin-bottom:6px">
                  En tant que <strong>${escH(s.en_tant_que||'...')}</strong>, je veux <strong>${escH(s.je_veux||'...')}</strong> afin de ${escH(s.afin_de||'...')}
                </p>
                ${s.criteres?.length ? `
                <div style="padding-top:8px;border-top:1px solid rgba(255,255,255,0.06)">
                  ${s.criteres.map(c => `<div style="font-size:11px;color:rgba(255,255,255,0.4);padding:1px 0">✓ ${escH(c)}</div>`).join('')}
                </div>` : ''}
              </div>`).join('')}
        </div>`).join('')}
    </div>`;
  return htmlDoc('User Stories', body);
}

// ── 04 — Parcours Utilisateur ─────────────────────────────────────────────────
function genJourneyHTML(d) {
  const etapes = d.etapes || [];
  const emotColor = e => e === 'positif' ? '#00d3a8' : e === 'negatif' ? '#dc582a' : '#f59e0b';
  const emotLabel = e => e === 'positif' ? '😊 Positif' : e === 'negatif' ? '😟 Négatif' : '😐 Neutre';
  const body = `
    <div class="hdr">
      <div class="badge">🗺 ÉTAPE 4</div>
      <h1>Parcours Utilisateur</h1>
      <p class="sub">${d.persona_principal ? 'Persona : '+escH(d.persona_principal)+' · ' : ''}${etapes.length} étape(s)</p>
    </div>
    <div style="position:relative">
      <div style="position:absolute;left:16px;top:0;bottom:0;width:2px;background:rgba(255,255,255,0.06);border-radius:1px"></div>
      ${etapes.map((e, i) => `
        <div style="padding-left:44px;padding-bottom:28px;position:relative">
          <div style="position:absolute;left:9px;top:6px;width:16px;height:16px;border-radius:50%;background:${emotColor(e.emotions)};box-shadow:0 0 12px ${emotColor(e.emotions)}55"></div>
          <div class="card">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">
              <span style="font-size:10px;font-weight:500;letter-spacing:0.08em;color:rgba(255,255,255,0.3)">ÉTAPE ${i+1}</span>
              <h3 style="font-size:15px;font-weight:500;flex:1">${escH(e.phase||'—')}</h3>
              <span style="font-size:11px;font-weight:300;color:${emotColor(e.emotions)}">${emotLabel(e.emotions)}</span>
            </div>
            ${e.pensees ? `<p style="font-size:12px;font-style:italic;color:rgba(255,255,255,0.4);margin-bottom:12px;padding:10px 14px;background:rgba(255,255,255,0.025);border-radius:8px">"${escH(e.pensees)}"</p>` : ''}
            <div class="grid2">
              ${e.actions?.length ? `
              <div>
                <div class="ey">Actions</div>
                ${e.actions.map(a => `<div style="font-size:12px;color:rgba(255,255,255,0.6);padding:2px 0">• ${escH(a)}</div>`).join('')}
              </div>` : '<div></div>'}
              ${e.opportunites?.length ? `
              <div>
                <div class="ey" style="color:#00d3a8">Opportunités</div>
                ${e.opportunites.map(o => `<div style="font-size:12px;color:rgba(0,211,168,0.8);padding:2px 0">→ ${escH(o)}</div>`).join('')}
              </div>` : '<div></div>'}
            </div>
            ${e.touchpoints?.length ? `
            <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:5px">
              ${e.touchpoints.map(t => `<span class="pill" style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);color:#3b82f6">${escH(t)}</span>`).join('')}
            </div>` : ''}
          </div>
        </div>`).join('')}
    </div>`;
  return htmlDoc('Parcours Utilisateur', body);
}

// ── 05 — Architecture ─────────────────────────────────────────────────────────
function genArchitectureHTML(d) {
  const pages = d.pages || [];
  const body = `
    <div class="hdr">
      <div class="badge">🏗 ÉTAPE 5</div>
      <h1>Architecture de l'Information</h1>
      <p class="sub">${pages.length} page(s) principale(s)</p>
    </div>
    <div class="grid2">
      ${pages.map(p => `
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;flex-wrap:wrap">
            <h3 style="font-size:14px;font-weight:500">${escH(p.nom||'—')}</h3>
            ${p.url ? `<code style="font-size:10px;color:rgba(0,211,168,0.7);background:rgba(0,211,168,0.07);padding:2px 8px;border-radius:4px">${escH(p.url)}</code>` : ''}
          </div>
          ${p.description ? `<p style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.5);line-height:1.6;margin-bottom:12px">${escH(p.description)}</p>` : ''}
          ${p.composants?.length ? `
          <div style="margin-bottom:10px">
            <div class="ey">Composants</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">
              ${p.composants.map(c => `<span class="pill" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.55)">${escH(c)}</span>`).join('')}
            </div>
          </div>` : ''}
          ${p.sous_pages?.length ? `
          <div>
            <div class="ey">Sous-pages</div>
            <div style="margin-top:6px">
              ${p.sous_pages.map(sp => {
                const nom = typeof sp === 'string' ? sp : sp.nom || '';
                const url = typeof sp === 'object' ? sp.url || '' : '';
                return `<div style="font-size:12px;color:rgba(255,255,255,0.5);padding:3px 0;display:flex;align-items:center;gap:6px"><span style="color:rgba(255,255,255,0.2)">└</span>${escH(nom)}${url ? ` <code style="font-size:10px;color:rgba(0,211,168,0.45)">${escH(url)}</code>` : ''}</div>`;
              }).join('')}
            </div>
          </div>` : ''}
        </div>`).join('')}
    </div>`;
  return htmlDoc("Architecture de l'Information", body);
}

// ── 07 — Audit RGAA ───────────────────────────────────────────────────────────
function genRgaaHTML(d) {
  const criteres  = d.criteres || [];
  const lvlColor  = l => (l === 'A' || l === 'AA') ? '#00d3a8' : '#f59e0b';
  const statColor = s => s === 'conforme' ? '#00d3a8' : s === 'non conforme' ? '#dc582a' : '#f59e0b';
  const body = `
    <div class="hdr">
      <div class="badge">♿ ÉTAPE 7</div>
      <h1>Audit RGAA 4.1</h1>
      <p class="sub">Accessibilité · Niveau visé : ${escH(d.niveau_vise||'AA')}</p>
    </div>
    <div class="grid2" style="margin-bottom:20px">
      <div class="card" style="text-align:center;padding:36px 24px">
        <div style="font-size:4rem;font-weight:300;color:#00d3a8;margin-bottom:4px">${escH(String(d.score_global ?? '—'))}<span style="font-size:1.5rem">%</span></div>
        <div style="font-size:11px;font-weight:500;letter-spacing:0.08em;color:rgba(255,255,255,0.35)">SCORE GLOBAL</div>
      </div>
      <div class="card">
        <div class="ey" style="margin-bottom:10px">Synthèse</div>
        <p style="font-size:13px;font-weight:300;color:rgba(255,255,255,0.6);line-height:1.7">${escH(d.synthese||'—')}</p>
        ${d.points_forts?.length ? `
        <div style="margin-top:14px">
          <div class="ey" style="color:#00d3a8;margin-bottom:6px">Points forts</div>
          ${d.points_forts.map(p => `<div style="font-size:12px;color:rgba(0,211,168,0.8);padding:2px 0">✓ ${escH(p)}</div>`).join('')}
        </div>` : ''}
        ${d.axes_amelioration?.length ? `
        <div style="margin-top:12px">
          <div class="ey" style="color:#f59e0b;margin-bottom:6px">Axes d'amélioration</div>
          ${d.axes_amelioration.map(a => `<div style="font-size:12px;color:rgba(245,158,11,0.8);padding:2px 0">→ ${escH(a)}</div>`).join('')}
        </div>` : ''}
      </div>
    </div>
    ${criteres.length ? `
    <div class="card">
      <div class="ey" style="margin-bottom:14px">Critères détaillés (${criteres.length})</div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;min-width:540px">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08)">
              <th style="text-align:left;font-size:10px;font-weight:500;color:rgba(255,255,255,0.3);padding:8px 12px;letter-spacing:0.08em">CRITÈRE</th>
              <th style="text-align:center;font-size:10px;font-weight:500;color:rgba(255,255,255,0.3);padding:8px 12px;letter-spacing:0.08em">NIVEAU</th>
              <th style="text-align:left;font-size:10px;font-weight:500;color:rgba(255,255,255,0.3);padding:8px 12px;letter-spacing:0.08em">STATUT</th>
              <th style="text-align:left;font-size:10px;font-weight:500;color:rgba(255,255,255,0.3);padding:8px 12px;letter-spacing:0.08em">COMMENTAIRE</th>
            </tr>
          </thead>
          <tbody>
            ${criteres.map((c, i) => `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.04);${i%2===1?'background:rgba(255,255,255,0.015)':''}">
              <td style="padding:10px 12px;font-size:12px;color:rgba(255,255,255,0.7)">${c.numero?`<strong style="color:rgba(255,255,255,0.4);margin-right:6px">${escH(c.numero)}</strong>`:''}${escH(c.nom||'—')}</td>
              <td style="padding:10px 12px;text-align:center"><span style="font-size:11px;font-weight:500;color:${lvlColor(c.niveau)};background:${lvlColor(c.niveau)}18;border-radius:4px;padding:2px 7px">${escH(c.niveau||'—')}</span></td>
              <td style="padding:10px 12px;font-size:12px;color:${statColor(c.statut)}">${escH(c.statut||'—')}</td>
              <td style="padding:10px 12px;font-size:12px;color:rgba(255,255,255,0.4)">${escH(c.commentaire||'')}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}`;
  return htmlDoc('Audit RGAA 4.1', body);
}

// ── Wireframe HTML (wrapping sécurisé si pas de doctype) ──────────────────────
function wrapWireframe(html) {
  if (/<!doctype/i.test(html)) return html;
  return `<!DOCTYPE html>\n<!-- UX Pilot — Wireframe Basse Fidélité -->\n${html}`;
}

// ── Séparation maquette en HTML / CSS / JS ────────────────────────────────────
function splitMaquette(rawHtml) {
  let html = rawHtml;
  const cssBlocks = [];
  const jsBlocks  = [];

  // Extraire <style>
  html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (_, attr, content) => {
    cssBlocks.push(content.trim());
    return '';
  });

  // Extraire <script> sans attribut src
  html = html.replace(/<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi, (_, content) => {
    const trimmed = content.trim();
    if (trimmed) jsBlocks.push(trimmed);
    return '';
  });

  const css = cssBlocks.join('\n\n/* ─── */\n\n');
  const js  = jsBlocks.join('\n\n/* ─── */\n\n');

  // Injecter les liens vers les fichiers séparés
  if (css) {
    html = html.includes('</head>')
      ? html.replace('</head>', '  <link rel="stylesheet" href="style.css">\n</head>')
      : `<link rel="stylesheet" href="style.css">\n${html}`;
  }
  if (js) {
    html = html.includes('</body>')
      ? html.replace('</body>', '  <script src="script.js"></script>\n</body>')
      : `${html}\n<script src="script.js"></script>`;
  }

  // Nettoyer les lignes vides excessives
  html = html.replace(/\n{4,}/g, '\n\n');

  return { html: html.trim(), css, js };
}

// ── Générateur principal d'archive ZIP ───────────────────────────────────────
async function generateArchive(res, projectTitle) {
  const zip    = new JSZip();
  const folder = zip.folder('ux-pilot-livrables');
  const title  = (res.cadrage?.titre || projectTitle || 'projet');

  // 01 — Cadrage
  if (res.cadrage)      folder.file('01-cadrage.html',      genCadrageHTML(res.cadrage));
  // 02 — Personas
  if (res.personas)     folder.file('02-personas.html',     genPersonasHTML(res.personas));
  // 03 — User Stories
  if (res.stories)      folder.file('03-user-stories.html', genStoriesHTML(res.stories));
  // 04 — Parcours
  if (res.journey)      folder.file('04-parcours.html',     genJourneyHTML(res.journey));
  // 05 — Architecture
  if (res.architecture) folder.file('05-architecture.html', genArchitectureHTML(res.architecture));
  // 06 — Wireframes (HTML brut complet)
  if (res.wireframes)   folder.file('06-wireframes.html',   wrapWireframe(res.wireframes));
  // 07 — RGAA
  if (res.rgaa)         folder.file('07-audit-rgaa.html',   genRgaaHTML(res.rgaa));
  // 08 — V1 Production (HTML brut tel quel)
  if (res.v1)           folder.file('08-v1-production.html', res.v1);

  // maquette/ — wireframe avec HTML/CSS/JS séparés
  if (res.wireframes) {
    const { html, css, js } = splitMaquette(res.wireframes);
    const maquette = folder.folder('maquette');
    maquette.file('index.html', html);
    if (css) maquette.file('style.css', css);
    if (js)  maquette.file('script.js', js);
  }

  // Générer et déclencher le téléchargement
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `ux-pilot-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 8000);
}
