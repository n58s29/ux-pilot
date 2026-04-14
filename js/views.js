// All view components — depend on R from config.js
// Each script tag runs in global scope (Babel standalone), so R is available.

// ── Cadrage ──────────────────────────────────────────────────────────────────
function CadrageView({ data: d }) {
  if (!d || typeof d === "string") return null;
  return (
    <div style={R.wrap}>
      <div style={{ marginBottom: 20 }}>
        <div style={R.eyebrow}>INSIGHT OVERVIEW</div>
        <h3 style={R.h3}>{d.titre || "Brief Projet"}</h3>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[
          { l:"Contexte",         v:d.contexte,        c:"#0084d4" },
          { l:"Problème",         v:d.probleme,        c:"#dc582a" },
          { l:"Objectif",         v:d.objectif,        c:"#00d3a8" },
          { l:"Cibles",           v:d.cibles,          c:"#8374d1" },
          { l:"Périmètre",        v:d.perimetre,       c:"#0084d4" },
          { l:"Hors périmètre",   v:d.hors_perimetre,  c:"#dc582a" },
        ].map((x, i) => (
          <div key={i} style={{ ...R.card, borderLeft:`3px solid ${x.c}` }}>
            <div style={{ ...R.label, color:x.c }}>{x.l}</div>
            <div style={R.body}>{x.v}</div>
          </div>
        ))}
      </div>

      {d.contraintes?.length > 0 && (
        <div style={{ marginTop:14 }}>
          <div style={{ ...R.label, color:"#eed484", marginBottom:6 }}>Contraintes</div>
          <div style={R.pills}>
            {d.contraintes.map((c, i) => <span key={i} style={R.pill}>{c}</span>)}
          </div>
        </div>
      )}

      {d.kpis?.length > 0 && (
        <div style={{ marginTop:10 }}>
          <div style={{ ...R.label, color:"#00d3a8", marginBottom:6 }}>KPIs</div>
          <div style={R.pills}>
            {d.kpis.map((k, i) => (
              <span key={i} style={{ ...R.pill, borderColor:"rgba(0,211,168,0.25)", background:"rgba(0,211,168,0.08)" }}>{k}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Personas ─────────────────────────────────────────────────────────────────
function PersonasView({ data: d }) {
  const ps = d?.personas || [];
  const cols = ["#0084d4", "#00d3a8", "#8374d1"];
  return (
    <div style={R.wrap}>
      <div style={{ ...R.eyebrow, marginBottom:16 }}>PERSONA GENERATION</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {ps.map((p, i) => (
          <div key={i} style={{ ...R.card, borderTop:`3px solid ${cols[i]}`, padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <div style={{
                width:48, height:48, borderRadius:"50%",
                background:`linear-gradient(135deg,${cols[i]}44,${cols[i]}22)`,
                border:`2px solid ${cols[i]}66`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:24,
              }}>
                {p.emoji || "🤷"}
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:500 }}>{p.nom}, {p.age}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", fontWeight:300 }}>{p.role}</div>
              </div>
            </div>

            <div style={{ fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.55)", lineHeight:1.6, marginBottom:12 }}>{p.contexte}</div>

            <div style={{ fontSize:13, fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.6)", borderLeft:`3px solid ${cols[i]}`, paddingLeft:14, marginBottom:14, lineHeight:1.5 }}>
              "{p.citation}"
            </div>

            <div>
              <div style={{ ...R.label, color:"#00d3a8", marginBottom:5 }}>CORE GOALS</div>
              {p.objectifs?.map((o, j) => <div key={j} style={R.li}>↷ {o}</div>)}
            </div>

            <div style={{ marginTop:10 }}>
              <div style={{ ...R.label, color:"#dc582a", marginBottom:5 }}>FRUSTRATIONS</div>
              {p.frustrations?.map((f, j) => <div key={j} style={R.li}>✕ {f}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── User Stories ──────────────────────────────────────────────────────────────
function StoriesView({ data: d }) {
  const stories = d?.stories || [];
  const g = { Must:[], Should:[], Could:[], Wont:[] };
  stories.forEach(s => { if (g[s.priorite]) g[s.priorite].push(s); });
  const pc = { Must:"#dc582a", Should:"#eed484", Could:"#0084d4", Wont:"rgba(255,255,255,0.25)" };

  return (
    <div style={R.wrap}>
      <div style={{ display:"flex", gap:12, overflowX:"auto" }}>
        {Object.entries(g).filter(([, v]) => v.length > 0).map(([pr, items]) => (
          <div key={pr} style={{ flex:1, minWidth:200 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:10, marginBottom:10, borderBottom:`2px solid ${pc[pr]}` }}>
              <span style={{ color:pc[pr], fontWeight:500, fontSize:13 }}>{pr}</span>
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"2px 8px" }}>{items.length}</span>
            </div>
            {items.map((s, i) => (
              <div key={i} style={{ ...R.card, padding:12, marginBottom:8 }}>
                <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.08em", color:pc[pr], marginBottom:4 }}>{s.id}</div>
                <div style={{ fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.6)", lineHeight:1.5 }}>
                  En tant que <span style={{ fontWeight:500, color:"#fff" }}>{s.en_tant_que}</span>,
                  {" "}je veux <span style={{ fontWeight:500, color:"#fff" }}>{s.je_veux}</span>
                  {" "}afin de {s.afin_de}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Journey ───────────────────────────────────────────────────────────────────
function JourneyView({ data: d }) {
  if (!d?.etapes) return null;
  const em = {
    positif: { i:"😊", c:"#00d3a8" },
    neutre:  { i:"😐", c:"#eed484" },
    negatif: { i:"😤", c:"#dc582a" },
  };
  const n = d.etapes.length;

  return (
    <div style={R.wrap}>
      <div style={{ ...R.eyebrow, marginBottom:16 }}>USER EMOTION JOURNEY</div>

      {/* Emotion curve SVG */}
      <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"20px 24px", marginBottom:24, border:"1px solid rgba(255,255,255,0.06)" }}>
        <svg viewBox="0 0 600 80" style={{ width:"100%", height:80 }}>
          {d.etapes.map((e, i) => {
            const x = i * (600 / ((n - 1) || 1));
            const y = e.emotions === "positif" ? 15 : e.emotions === "negatif" ? 65 : 40;
            const col = em[e.emotions]?.c || "#eed484";
            return (
              <React.Fragment key={i}>
                {i > 0 && (
                  <line
                    x1={(i - 1) * (600 / ((n - 1) || 1))}
                    y1={d.etapes[i-1].emotions === "positif" ? 15 : d.etapes[i-1].emotions === "negatif" ? 65 : 40}
                    x2={x} y2={y}
                    stroke={col} strokeWidth="2"
                    strokeDasharray={e.emotions === "negatif" ? "4,4" : ""}
                  />
                )}
                <circle cx={x} cy={y} r="5" fill={col} />
                <text x={x} y={78} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="DM Sans">
                  {e.phase?.substring(0, 14)}
                </text>
              </React.Fragment>
            );
          })}
        </svg>
      </div>

      {/* Step list */}
      {d.etapes.map((e, i) => {
        const emo = em[e.emotions] || em.neutre;
        return (
          <div key={i} style={{ display:"flex", gap:16 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:32 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:emo.c, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:500, color:"#fff", flexShrink:0 }}>
                {i + 1}
              </div>
              {i < n - 1 && <div style={{ width:2, flex:1, background:"rgba(255,255,255,0.08)", minHeight:20 }} />}
            </div>

            <div style={{ flex:1, paddingLeft:14, paddingBottom:20, borderLeft:`2px solid ${emo.c}44` }}>
              <div style={{ fontSize:14, fontWeight:500, display:"flex", justifyContent:"space-between" }}>
                <span>{e.phase}</span>
                <span style={{ fontSize:18 }}>{emo.i}</span>
              </div>
              <div style={{ marginTop:6 }}>
                {e.actions?.map((a, j) => <div key={j} style={R.li}>▸ {a}</div>)}
              </div>
              <div style={{ fontSize:12, fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.4)", marginTop:8 }}>
                💭 {e.pensees}
              </div>
              {e.opportunites?.length > 0 && (
                <div style={{ marginTop:10, background:"rgba(0,211,168,0.06)", borderRadius:8, padding:"8px 12px", border:"1px solid rgba(0,211,168,0.12)" }}>
                  <span style={{ color:"#00d3a8", fontWeight:500, fontSize:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>Opportunités</span>
                  {e.opportunites.map((o, j) => <div key={j} style={{ ...R.li, fontSize:12 }}>💡 {o}</div>)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Architecture ──────────────────────────────────────────────────────────────
function ArchitectureView({ data: d }) {
  const pages = d?.pages || [];
  const cols = ["#0084d4","#00d3a8","#eed484","#8374d1","#dc582a"];
  const totalNodes = pages.reduce((a, p) => a + 1 + (p.sous_pages?.length || 0), 0);

  return (
    <div style={R.wrap}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={R.eyebrow}>SITEMAP ARCHITECTURE</div>
        <span style={{ ...R.pill, borderColor:"rgba(0,211,168,0.3)", background:"rgba(0,211,168,0.1)", color:"#00d3a8" }}>
          NODES: {totalNodes}
        </span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {pages.map((p, i) => (
          <div key={i} style={{ ...R.card, borderTop:`3px solid ${cols[i % 5]}` }}>
            <div style={{ fontSize:14, fontWeight:500, color:cols[i % 5], marginBottom:4 }}>{p.nom}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"monospace", marginBottom:8 }}>{p.url}</div>
            <div style={{ fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.55)", lineHeight:1.5, marginBottom:10 }}>{p.description}</div>

            {p.composants?.length > 0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:8 }}>
                {p.composants.map((c, j) => (
                  <span key={j} style={{ fontSize:10, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:4, padding:"2px 8px", color:"rgba(255,255,255,0.45)" }}>{c}</span>
                ))}
              </div>
            )}

            {p.sous_pages?.length > 0 && (
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:8 }}>
                {p.sous_pages.map((sp, j) => (
                  <div key={j} style={{ fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.5)", marginBottom:3 }}>
                    <span style={{ color:cols[i % 5], marginRight:8, fontSize:10 }}>↳</span>
                    {sp.nom}
                    <span style={{ fontSize:10, color:"rgba(255,255,255,0.25)", fontFamily:"monospace", marginLeft:8 }}>{sp.url}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── HTML Preview (wireframes & V1) ────────────────────────────────────────────
function HtmlPreview({ html, label }) {
  const [mode, setMode] = React.useState("desktop");
  return (
    <div style={R.wrap}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <span style={R.eyebrow}>{label}</span>
        <div style={{ display:"flex", gap:6 }}>
          {["Desktop","Mobile"].map(m => (
            <button
              key={m}
              className="mode-btn"
              onClick={() => setMode(m.toLowerCase())}
              style={{
                background: mode === m.toLowerCase() ? "#0084d4" : "rgba(255,255,255,0.06)",
                border: `1px solid ${mode === m.toLowerCase() ? "#0084d4" : "rgba(255,255,255,0.1)"}`,
                borderRadius:6, padding:"5px 14px", color:"#fff", fontSize:12, fontWeight:400,
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div style={{ borderRadius:12, overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", background:"#1a1a2e", padding:12 }}>
        {/* Fake browser chrome */}
        <div style={{ display:"flex", gap:5, marginBottom:10 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#dc582a" }} />
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#eed484" }} />
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#00d3a8" }} />
          <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:4, height:10, marginLeft:8 }} />
        </div>

        <div style={{
          borderRadius:8, overflow:"hidden", background:"#fff", margin:"0 auto",
          maxWidth: mode === "mobile" ? 375 : "100%",
          height: mode === "mobile" ? 600 : 480,
          transition: "all 0.3s",
        }}>
          <iframe srcDoc={html} style={{ width:"100%", height:"100%", border:"none" }} title={label} sandbox="allow-scripts allow-same-origin" />
        </div>
      </div>
    </div>
  );
}

// ── RGAA ──────────────────────────────────────────────────────────────────────
function RgaaView({ data: d }) {
  if (!d?.criteres) return null;
  const sc = { "Conforme":"#00d3a8", "Non conforme":"#dc582a", "Non applicable":"rgba(255,255,255,0.25)" };

  return (
    <div style={R.wrap}>
      <div style={{ display:"flex", gap:28, alignItems:"flex-start", marginBottom:24, flexWrap:"wrap" }}>
        {/* Score donut */}
        <div style={{ textAlign:"center", flexShrink:0 }}>
          <div style={R.eyebrow}>SCORE D'ACCESSIBILITÉ</div>
          <svg viewBox="0 0 140 140" width="140" height="140" style={{ marginTop:12 }}>
            <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <circle
              cx="70" cy="70" r="58" fill="none"
              stroke={d.score_global >= 70 ? "#00d3a8" : "#dc582a"}
              strokeWidth="10"
              strokeDasharray={`${(d.score_global / 100) * 364} 364`}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ filter:`drop-shadow(0 0 8px ${d.score_global >= 70 ? "rgba(0,211,168,0.4)" : "rgba(220,88,42,0.4)"})` }}
            />
            <text x="70" y="66" textAnchor="middle" fill="#fff" fontSize="32" fontWeight="500" fontFamily="DM Sans">{d.score_global}%</text>
            <text x="70" y="84" textAnchor="middle" fill={d.score_global >= 70 ? "#00d3a8" : "#dc582a"} fontSize="10" fontWeight="500">CONFORME</text>
          </svg>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:8 }}>Niveau : {d.niveau_vise}</div>
        </div>

        {/* Summary */}
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:300, color:"rgba(255,255,255,0.65)", lineHeight:1.7, marginBottom:14 }}>{d.synthese}</div>
          {d.points_forts?.length > 0 && (
            <div style={{ marginBottom:10 }}>
              <div style={{ ...R.label, color:"#00d3a8", marginBottom:5 }}>Points forts</div>
              {d.points_forts.map((p, i) => <div key={i} style={R.li}><span style={{ color:"#00d3a8" }}>✓</span> {p}</div>)}
            </div>
          )}
          {d.axes_amelioration?.length > 0 && (
            <div>
              <div style={{ ...R.label, color:"#dc582a", marginBottom:5 }}>Axes d'amélioration</div>
              {d.axes_amelioration.map((a, i) => <div key={i} style={R.li}><span style={{ color:"#dc582a" }}>✗ </span> {a}</div>)}
            </div>
          )}
        </div>
      </div>

      {/* Criteria table */}
      <div style={{ ...R.eyebrow, marginBottom:10 }}>DÉTAIL DES CRITÈRES</div>
      {d.criteres.slice(0, 10).map((c, i) => (
        <div key={i} style={{ display:"flex", gap:10, padding:"10px 0", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
          <span style={{ width:20, textAlign:"center", color:sc[c.statut], fontSize:14, fontWeight:500 }}>
            {c.statut === "Conforme" ? "✓" : c.statut === "Non conforme" ? "✕" : "○"}
          </span>
          <span style={{ flex:3, fontSize:12, fontWeight:400 }}>{c.critere}</span>
          <span style={{ flex:2, fontSize:11, color:"rgba(255,255,255,0.4)" }}>{c.thematique}</span>
          <span style={{
            fontSize:10, fontWeight:500,
            color: c.impact === "Majeur" ? "#dc582a" : c.impact === "Modéré" ? "#eed484" : "#0084d4",
            background: c.impact === "Majeur" ? "rgba(220,88,42,0.1)" : c.impact === "Modéré" ? "rgba(238,212,132,0.1)" : "rgba(0,132,212,0.1)",
            padding:"2px 8px", borderRadius:4,
          }}>
            {c.impact}
          </span>
        </div>
      ))}
    </div>
  );
}
