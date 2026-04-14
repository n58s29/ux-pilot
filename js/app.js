// ── Destructure hooks once (global scope shared across all babel scripts) ────
const { useState, useEffect, useRef, useCallback } = React;

// ── Loading messages per step ─────────────────────────────────────────────────
const STEP_MSGS = {
  cadrage:      ["Analyse du besoin...",       "Structuration du brief..."],
  personas:     ["Synthèse des profils...",    "Modélisation comportementale..."],
  stories:      ["Rédaction des stories...",   "Priorisation MoSCoW..."],
  journey:      ["Cartographie du parcours...", "Analyse émotionnelle..."],
  architecture: ["Conception arborescence...", "Organisation navigation..."],
  wireframes:   ["Esquisse des écrans...",     "Génération HTML..."],
  rgaa:         ["Audit critères RGAA 4.1...", "Contrôle des contrastes..."],
  v1:           ["Génération application...",  "Intégration composants...",   "Recommandations RGAA..."],
};

// ── GitHub Pages tutorial modal ───────────────────────────────────────────────
function GithubPagesTuto({ onClose }) {
  const [copied, setCopied] = useState(null);

  const copy = (id, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const S = {
    overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:24 },
    modal:   { background:"#0e1426", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"36px 40px", maxWidth:640, width:"100%", maxHeight:"88vh", overflowY:"auto", position:"relative" },
    step:    { display:"flex", gap:16, marginBottom:28 },
    num:     { width:28, height:28, minWidth:28, borderRadius:8, background:"rgba(0,211,168,0.12)", border:"1px solid rgba(0,211,168,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600, color:"#00d3a8", marginTop:2 },
    h3:      { fontSize:14, fontWeight:500, marginBottom:6, color:"#fff" },
    p:       { fontSize:13, fontWeight:300, color:"rgba(255,255,255,0.55)", lineHeight:1.7 },
    code:    { position:"relative", background:"rgba(0,0,0,0.45)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"14px 48px 14px 18px", fontFamily:"'SF Mono','Fira Code',monospace", fontSize:12, color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginTop:10, whiteSpace:"pre", overflowX:"auto", display:"block" },
    copy:    { position:"absolute", top:10, right:10, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"3px 9px", fontSize:10, color:"rgba(255,255,255,0.5)", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" },
    note:    { background:"rgba(0,211,168,0.06)", border:"1px solid rgba(0,211,168,0.15)", borderRadius:12, padding:"14px 18px", marginTop:4 },
    tip:     { background:"rgba(59,130,246,0.06)", border:"1px solid rgba(59,130,246,0.15)", borderRadius:12, padding:"14px 18px", marginTop:16 },
  };

  const CMD = `cd maquette/
git init
git add .
git commit -m "feat: initial release"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/NOM-DU-PROJET.git
git push -u origin main`;

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <button onClick={onClose} style={{ position:"absolute", top:20, right:20, background:"none", border:"none", color:"rgba(255,255,255,0.3)", fontSize:20, cursor:"pointer", lineHeight:1 }}>×</button>

        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,211,168,0.1)", border:"1px solid rgba(0,211,168,0.2)", borderRadius:20, padding:"5px 14px", fontSize:11, fontWeight:500, color:"#00d3a8", marginBottom:16 }}>
          🐙 DÉPLOIEMENT GITHUB PAGES
        </div>
        <h2 style={{ fontSize:22, fontWeight:500, letterSpacing:"-0.02em", marginBottom:6 }}>Mettre votre app en ligne</h2>
        <p style={{ fontSize:13, fontWeight:300, color:"rgba(255,255,255,0.4)", marginBottom:30, lineHeight:1.6 }}>
          L'app générée est du HTML/CSS/JS pur — GitHub Pages l'héberge gratuitement, sans serveur, en 3 minutes.
        </p>

        {/* Step 1 */}
        <div style={S.step}>
          <div style={S.num}>1</div>
          <div style={{ flex:1 }}>
            <h3 style={S.h3}>Télécharger les livrables</h3>
            <p style={S.p}>
              Cliquez sur <strong style={{ color:"rgba(255,255,255,0.75)" }}>Télécharger les livrables</strong> en bas de page.<br />
              Extrayez le ZIP — vous obtenez le dossier <code style={{ fontSize:12, background:"rgba(255,255,255,0.06)", borderRadius:4, padding:"1px 6px" }}>maquette/</code> avec trois fichiers séparés :
            </p>
            <div style={{ marginTop:12, display:"flex", gap:8 }}>
              {[
                { f:"index.html", c:"#00d3a8", desc:"structure" },
                { f:"style.css",  c:"#3b82f6", desc:"styles"    },
                { f:"script.js",  c:"#f59e0b", desc:"logique"   },
              ].map(({ f, c, desc }) => (
                <div key={f} style={{ flex:1, background:`${c}0d`, border:`1px solid ${c}30`, borderRadius:8, padding:"10px 12px", textAlign:"center" }}>
                  <div style={{ fontSize:11, fontWeight:500, color:c, marginBottom:2 }}>{f}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div style={S.step}>
          <div style={S.num}>2</div>
          <div style={{ flex:1 }}>
            <h3 style={S.h3}>Créer un repository GitHub</h3>
            <p style={S.p}>
              Sur <strong style={{ color:"rgba(255,255,255,0.75)" }}>github.com</strong> → <em>New repository</em><br />
              Choisissez un nom (ex. <code style={{ fontSize:12, background:"rgba(0,211,168,0.08)", borderRadius:4, padding:"1px 6px", color:"#00d3a8" }}>mon-projet</code>) · Visibilité : <strong style={{ color:"rgba(255,255,255,0.7)" }}>Public</strong> · Sans README.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div style={S.step}>
          <div style={S.num}>3</div>
          <div style={{ flex:1 }}>
            <h3 style={S.h3}>Pousser le dossier maquette/</h3>
            <div style={{ position:"relative" }}>
              <code style={S.code}>{CMD}</code>
              <button
                style={{ ...S.copy, ...(copied === "cmd" ? { color:"#00d3a8", borderColor:"rgba(0,211,168,0.3)" } : {}) }}
                onClick={() => copy("cmd", CMD)}
              >
                {copied === "cmd" ? "✓ copié" : "copier"}
              </button>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div style={S.step}>
          <div style={S.num}>4</div>
          <div style={{ flex:1 }}>
            <h3 style={S.h3}>Activer GitHub Pages</h3>
            <p style={S.p}>
              Dans le repository → <strong style={{ color:"rgba(255,255,255,0.7)" }}>Settings → Pages</strong><br />
              Source : <em>Deploy from a branch</em> · Branch : <code style={{ fontSize:12, background:"rgba(255,255,255,0.06)", borderRadius:4, padding:"1px 6px" }}>main</code> · <code style={{ fontSize:12, background:"rgba(255,255,255,0.06)", borderRadius:4, padding:"1px 6px" }}>/ (root)</code> → <strong style={{ color:"rgba(255,255,255,0.7)" }}>Save</strong>
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div style={{ ...S.step, marginBottom:20 }}>
          <div style={S.num}>5</div>
          <div style={{ flex:1 }}>
            <h3 style={S.h3}>Votre app est en ligne</h3>
            <p style={S.p}>Disponible après ~1 minute à l'adresse :</p>
            <div style={{ position:"relative" }}>
              <code style={{ ...S.code, color:"#00d3a8" }}>{"https://TON-USERNAME.github.io/NOM-DU-PROJET"}</code>
              <button
                style={{ ...S.copy, ...(copied === "url" ? { color:"#00d3a8", borderColor:"rgba(0,211,168,0.3)" } : {}) }}
                onClick={() => copy("url", "https://TON-USERNAME.github.io/NOM-DU-PROJET")}
              >
                {copied === "url" ? "✓ copié" : "copier"}
              </button>
            </div>
          </div>
        </div>

        <div style={S.note}>
          <div style={{ fontSize:11, fontWeight:500, color:"#00d3a8", marginBottom:5, letterSpacing:"0.06em" }}>ASTUCE — V1 COMPLÈTE</div>
          <p style={{ fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.55)", lineHeight:1.65 }}>
            Vous pouvez aussi déployer <code style={{ fontSize:11, background:"rgba(255,255,255,0.06)", borderRadius:3, padding:"1px 5px" }}>08-v1-production.html</code> seul : renommez-le en <code style={{ fontSize:11, background:"rgba(255,255,255,0.06)", borderRadius:3, padding:"1px 5px" }}>index.html</code> et poussez-le à la racine du repo. Tout est auto-contenu dans ce fichier.
          </p>
        </div>
        <div style={S.tip}>
          <div style={{ fontSize:11, fontWeight:500, color:"#3b82f6", marginBottom:5, letterSpacing:"0.06em" }}>MISES À JOUR</div>
          <p style={{ fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.55)", lineHeight:1.65 }}>
            Pour mettre à jour l'app après une nouvelle génération, remplacez les fichiers et faites <code style={{ fontSize:11, background:"rgba(255,255,255,0.06)", borderRadius:3, padding:"1px 5px" }}>git add . && git commit -m "update" && git push</code> — GitHub Pages se redéploie automatiquement.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── API key modal ─────────────────────────────────────────────────────────────
function ApiKeyModal({ onSave }) {
  const [k, setK] = useState("");
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>🔑 Clé API Anthropic</h2>
        <p>UX Pilot utilise Claude pour générer chaque livrable. Votre clé reste dans le navigateur et n'est jamais stockée.</p>
        <input
          type="password"
          value={k}
          onChange={e => setK(e.target.value)}
          placeholder="sk-ant-api03-..."
          autoFocus
          onKeyDown={e => e.key === "Enter" && k.trim() && onSave(k.trim())}
        />
        <button className="btn-go" onClick={() => k.trim() && onSave(k.trim())} disabled={!k.trim()}>
          Démarrer la mission
        </button>
        <div className="hint"><strong>BYOK</strong> — Clé stockée en localStorage. Persiste entre les refreshs.</div>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ step, res, running, onStepClick, onResetKey }) {
  return (
    <div style={{ width:220, minWidth:220, background:"linear-gradient(180deg,#0e1426,#080c18)", borderRight:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", padding:"20px 14px" }}>
      <div style={{ marginBottom:32, paddingLeft:4 }}>
        <div style={{ fontSize:17, fontWeight:500, letterSpacing:"-0.02em" }}>UX Pilot</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontWeight:300, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:2 }}>Mission Control</div>
      </div>

      <div style={{ flex:1, overflowY:"auto" }}>
        {STEPS.map((s, i) => {
          const done    = !!res[s.id];
          const active  = i === step;
          const pending = i > step && !done;
          return (
            <div
              key={s.id}
              className="nav-item"
              style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 8px", borderRadius:8, marginBottom:2, cursor:done ? "pointer" : "default", opacity:pending ? .35 : 1, background:active ? "rgba(255,255,255,0.04)" : "transparent", transition:"all 0.2s", position:"relative" }}
              onClick={() => done && onStepClick(i)}
            >
              {active && !done && (
                <div style={{ position:"absolute", left:0, top:11, width:6, height:6, borderRadius:"50%", background:"#00d3a8", animation:"glow 2s infinite" }} />
              )}
              <div style={{ width:24, height:24, borderRadius:6, background:done ? `${s.color}22` : "rgba(255,255,255,0.04)", border:`1.5px solid ${done ? s.color : active ? s.color+"88" : "rgba(255,255,255,0.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:done ? s.color : "rgba(255,255,255,0.4)", transition:"all 0.3s" }}>
                {done
                  ? "✓"
                  : active && running
                    ? <div style={{ width:10, height:10, border:"1.5px solid rgba(255,255,255,0.2)", borderTop:"1.5px solid #fff", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
                    : <span style={{ fontSize:11 }}>{s.icon}</span>
                }
              </div>
              <span style={{ fontSize:12.5, fontWeight:active || done ? 500 : 400, color:active || done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Engine badge */}
      <div style={{ background:"rgba(0,211,168,0.08)", border:"1px solid rgba(0,211,168,0.2)", borderRadius:10, padding:"10px 12px", display:"flex", alignItems:"center", gap:8, marginTop:12 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:"#00d3a8", animation:"pulse 2s infinite" }} />
        <div>
          <div style={{ fontSize:11, fontWeight:500, color:"#00d3a8" }}>AI ENGINE</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>Claude Sonnet 4</div>
        </div>
      </div>

      <button onClick={onResetKey} style={{ marginTop:10, background:"none", border:"none", color:"rgba(255,255,255,0.2)", fontSize:10, textDecoration:"underline", cursor:"pointer", padding:4 }}>
        Changer clé API
      </button>
    </div>
  );
}

// ── Landing page ──────────────────────────────────────────────────────────────
function Landing({ need, setNeed, onRun, running }) {
  return (
    <div style={{ maxWidth:740, margin:"0 auto", padding:"56px 32px" }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,211,168,0.1)", border:"1px solid rgba(0,211,168,0.2)", borderRadius:20, padding:"5px 14px", fontSize:11, fontWeight:500, color:"#00d3a8", marginBottom:24 }}>
        ⚡ AI-POWERED UX ENGINE
      </div>

      <h1 style={{ fontSize:"clamp(2.2rem,4.5vw,3.4rem)", fontWeight:500, lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:16 }}>
        De la demande métier à la V1 en un clic
      </h1>
      <p style={{ fontSize:15, fontWeight:300, color:"rgba(255,255,255,0.5)", lineHeight:1.7, marginBottom:36, maxWidth:540 }}>
        Accélérez votre phase de découverte. Notre IA analyse vos besoins business pour générer des assets UX haute fidélité en quelques secondes.
      </p>

      {/* Input */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:28 }}>
        <div style={{ ...R.eyebrow, marginBottom:10 }}>EXPRESSION DU BESOIN MÉTIER</div>
        <textarea
          value={need}
          onChange={e => setNeed(e.target.value)}
          placeholder="Décrivez votre projet, vos objectifs et vos cibles ici..."
          rows={5}
          style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"16px 18px", color:"#fff", fontSize:14, fontWeight:300, fontFamily:"inherit", resize:"vertical", lineHeight:1.7, boxSizing:"border-box" }}
        />

        {/* Examples */}
        <div style={{ marginTop:18, marginBottom:22 }}>
          <div style={{ ...R.eyebrow, marginBottom:10 }}>INSPIRATION RAPIDE</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {EXAMPLES.map((ex, i) => (
              <button key={i} className="example-btn" onClick={() => setNeed(ex.full)} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"8px 16px", color:"rgba(255,255,255,0.55)", fontSize:12, fontWeight:300, fontFamily:"inherit", transition:"all 0.2s" }}>
                "{ex.short}"
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onRun}
          disabled={!need.trim() || running}
          style={{ display:"block", margin:"0 auto", background:!need.trim() ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,rgba(0,211,168,0.9),rgba(0,132,212,0.9))", border:"none", borderRadius:28, padding:"14px 48px", color:"#fff", fontSize:15, fontWeight:500, fontFamily:"inherit", opacity:!need.trim() ? 0.4 : 1, transition:"all 0.3s", boxShadow:need.trim() ? "0 4px 24px rgba(0,211,168,0.25)" : "none" }}
        >
          Lancer le pipeline UX complet →
        </button>
      </div>

      {/* Feature cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginTop:40 }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{ ...R.card, padding:24 }}>
            <div style={{ fontSize:22, marginBottom:12, opacity:.7 }}>{f.icon}</div>
            <div style={{ fontSize:14, fontWeight:500, marginBottom:6 }}>{f.title}</div>
            <div style={{ fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", marginTop:40, fontSize:10, color:"rgba(255,255,255,0.2)" }}>
        <span>MODÈLE : CLAUDE-SONNET-4</span>
        <span>© 2025 UX PILOT — FAN</span>
      </div>
    </div>
  );
}

// ── Step result renderer ──────────────────────────────────────────────────────
function renderStep(id, res) {
  const d = res[id];
  if (!d) return null;
  switch (id) {
    case "cadrage":      return <CadrageView data={d} />;
    case "personas":     return <PersonasView data={d} />;
    case "stories":      return <StoriesView data={d} />;
    case "journey":      return <JourneyView data={d} />;
    case "architecture": return <ArchitectureView data={d} />;
    case "wireframes":   return <HtmlPreview html={d} label="WIREFRAME BASSE FIDÉLITÉ" />;
    case "rgaa":         return <RgaaView data={d} />;
    case "v1":           return <HtmlPreview html={d} label="PROTOTYPE V1 PRODUCTION" />;
    default:             return null;
  }
}

// ── Pipeline results view ─────────────────────────────────────────────────────
function Pipeline({ step, res, running, times, totalTime, msg, err, onReset }) {
  const mainRef  = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Auto-scroll when new content appears
  useEffect(() => {
    setTimeout(() => mainRef.current?.scrollTo({ top: mainRef.current.scrollHeight, behavior:"smooth" }), 200);
  }, [res, step]);

  const allDone = !running && Object.keys(res).length === STEPS.length;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generateArchive(res, res.cadrage?.titre || "projet");
    } catch(e) {
      console.error("Erreur génération archive :", e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }} ref={mainRef}>
      <div style={{ padding:"28px 28px 80px", maxWidth:960, margin:"0 auto" }}>

        {STEPS.map((s, i) => {
          const done = !!res[s.id];
          const gen  = i === step && running && !done;
          if (!done && !gen) return null;

          return (
            <div key={s.id} style={{ marginBottom:36, animation:"fadeUp 0.5s ease" }}>
              {/* Step header */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <span style={{ fontSize:10, fontWeight:500, padding:"3px 10px", borderRadius:4, border:"1px solid", background:`${s.color}15`, color:s.color, borderColor:`${s.color}33`, letterSpacing:"0.04em" }}>
                  {s.icon} ÉTAPE {i + 1}
                </span>
                <h2 style={{ fontSize:18, fontWeight:500 }}>{s.label}</h2>
                {times[s.id] && <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:300 }}>{times[s.id]}s</span>}
              </div>

              {/* Loading skeleton OR result */}
              {gen ? (
                <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:14, padding:36, textAlign:"center" }}>
                  <div style={{ width:180, height:3, background:"rgba(255,255,255,0.06)", borderRadius:2, margin:"0 auto 18px", overflow:"hidden" }}>
                    <div style={{ width:"40%", height:"100%", background:"linear-gradient(90deg,#00d3a8,#0084d4)", borderRadius:2, animation:"shimmer 1.5s infinite" }} />
                  </div>
                  <div style={{ fontSize:13, fontWeight:300, color:"rgba(255,255,255,0.4)" }}>{msg}</div>
                </div>
              ) : renderStep(s.id, res)}
            </div>
          );
        })}

        {/* Completion banner */}
        {allDone && (
          <div style={{ background:"linear-gradient(145deg,rgba(0,211,168,0.08),rgba(0,132,212,0.06))", border:"1px solid rgba(0,211,168,0.15)", borderRadius:16, padding:"36px 32px", marginTop:24 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,211,168,0.15)", border:"1px solid rgba(0,211,168,0.3)", borderRadius:6, padding:"4px 12px", fontSize:11, fontWeight:500, color:"#00d3a8", marginBottom:12 }}>
              ✓ MISSION ACCOMPLIE
            </div>
            <h2 style={{ fontSize:26, fontWeight:500, marginBottom:6 }}>Pipeline Terminé avec Succès</h2>
            <p style={{ fontSize:14, fontWeight:300, color:"rgba(255,255,255,0.5)", marginBottom:24 }}>
              La phase de conception V1 est finalisée. 8 livrables générés en {totalTime}s.
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
              <button
                onClick={handleDownload}
                disabled={downloading}
                style={{ display:"flex", alignItems:"center", gap:8, background: downloading ? "rgba(0,211,168,0.1)" : "linear-gradient(135deg,rgba(0,211,168,0.85),rgba(0,132,212,0.85))", border:"none", borderRadius:8, padding:"11px 22px", color:"#fff", fontSize:13, fontWeight:500, fontFamily:"inherit", cursor: downloading ? "default" : "pointer", opacity: downloading ? 0.7 : 1, transition:"all 0.2s", boxShadow: downloading ? "none" : "0 4px 20px rgba(0,211,168,0.2)" }}
              >
                {downloading
                  ? <><div style={{ width:12, height:12, border:"1.5px solid rgba(255,255,255,0.3)", borderTop:"1.5px solid #fff", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} /> Génération en cours…</>
                  : <>⬇ Télécharger les livrables (.zip)</>
                }
              </button>
              <button onClick={onReset} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, padding:"10px 20px", color:"#fff", fontSize:13, fontWeight:400, fontFamily:"inherit", cursor:"pointer" }}>
                Nouvelle mission
              </button>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)", fontWeight:300 }}>
                8 fichiers HTML + maquette séparée
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {err && (
          <div style={{ background:"rgba(220,88,42,0.1)", border:"1px solid rgba(220,88,42,0.25)", borderRadius:12, padding:16, color:"#dc582a", fontSize:13, fontWeight:300, marginTop:16 }}>
            {err}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
function App() {
  const [apiKey,    setApiKey]    = useState(getKey());
  const [need,      setNeed]      = useState("");
  const [step,      setStep]      = useState(-1);
  const [running,   setRunning]   = useState(false);
  const [res,       setRes]       = useState({});
  const [err,       setErr]       = useState(null);
  const [msg,       setMsg]       = useState("");
  const [times,     setTimes]     = useState({});
  const [totalTime, setTotalTime] = useState(null);
  const [showTuto,  setShowTuto]  = useState(false);

  // Cycle loading messages for the active step
  useEffect(() => {
    if (!running || step < 0) return;
    const m = STEP_MSGS[STEPS[step]?.id] || ["..."];
    let idx = 0;
    setMsg(m[0]);
    const iv = setInterval(() => { idx = (idx + 1) % m.length; setMsg(m[idx]); }, 2200);
    return () => clearInterval(iv);
  }, [running, step]);

  const run = useCallback(async () => {
    if (!need.trim() || !apiKey) return;
    setRunning(true);
    setErr(null);
    setRes({});
    setTimes({});
    setTotalTime(null);

    const r = {};
    const t0 = Date.now();

    for (let i = 0; i < STEPS.length; i++) {
      setStep(i);
      const s  = STEPS[i];
      const st = Date.now();

      try {
        let p;
        switch (s.id) {
          case "cadrage":      p = PR.cadrage(need);                                r.cadrage      = await callAPI(p.s, p.u, apiKey, false,  4000); break;
          case "personas":     p = PR.personas(r.cadrage);                          r.personas     = await callAPI(p.s, p.u, apiKey, false,  4000); break;
          case "stories":      p = PR.stories(r.cadrage, r.personas);               r.stories      = await callAPI(p.s, p.u, apiKey, false,  6000); break;
          case "journey":      p = PR.journey(r.cadrage, r.personas, r.stories);    r.journey      = await callAPI(p.s, p.u, apiKey, false,  6000); break;
          case "architecture": p = PR.architecture(r.cadrage, r.stories);           r.architecture = await callAPI(p.s, p.u, apiKey, false,  4000); break;
          case "wireframes":   p = PR.wireframes(r.cadrage, r.architecture);        r.wireframes   = await callAPI(p.s, p.u, apiKey, true,   6000); break;
          case "rgaa":         p = PR.rgaa(r.cadrage, r.architecture);              r.rgaa         = await callAPI(p.s, p.u, apiKey, false,  6000); break;
          case "v1":           p = PR.v1(r.cadrage, r.personas, r.stories, r.architecture, r.rgaa); r.v1 = await callAPI(p.s, p.u, apiKey, true, 32000); break;
        }
        setTimes(prev => ({ ...prev, [s.id]: ((Date.now() - st) / 1000).toFixed(1) }));
        setRes({ ...r });
      } catch (e) {
        setErr(`Erreur ${s.label}: ${e.message}`);
        break;
      }
    }

    setTotalTime(((Date.now() - t0) / 1000).toFixed(0));
    setRunning(false);
  }, [need, apiKey]);

  const reset = () => { setStep(-1); setRes({}); setTimes({}); setNeed(""); setTotalTime(null); setErr(null); };

  if (!apiKey) return <ApiKeyModal onSave={k => { localStorage.setItem("ux_pilot_key", k); setApiKey(k); }} />;

  const inPipeline = step > -1 || Object.keys(res).length > 0;

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"#0a0f1e" }}>
      {showTuto && <GithubPagesTuto onClose={() => setShowTuto(false)} />}

      <Sidebar step={step} res={res} running={running} onStepClick={setStep} onResetKey={() => { localStorage.removeItem("ux_pilot_key"); setApiKey(""); }} />

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Top bar */}
        <div style={{ height:48, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", borderBottom:"1px solid rgba(255,255,255,0.05)", flexShrink:0 }}>
          <div>
            {running && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,211,168,0.08)", border:"1px solid rgba(0,211,168,0.2)", borderRadius:20, padding:"4px 12px" }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:"#00d3a8", animation:"pulse 1.5s infinite" }} />
                <span style={{ fontSize:11, color:"#00d3a8" }}>MISSION LIVE</span>
              </div>
            )}
          </div>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            <button
              onClick={() => setShowTuto(true)}
              title="Déployer sur GitHub Pages"
              style={{ display:"flex", alignItems:"center", gap:6, height:32, padding:"0 12px", borderRadius:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:400, fontFamily:"inherit", cursor:"pointer", transition:"all 0.2s", letterSpacing:"0.01em" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.color="rgba(255,255,255,0.75)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.color="rgba(255,255,255,0.45)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Pages
            </button>
            <div style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.04)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"rgba(255,255,255,0.4)" }}>🔔</div>
            <div style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.04)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"rgba(255,255,255,0.4)" }}>⚙</div>
          </div>
        </div>

        {/* Main content */}
        {inPipeline
          ? <Pipeline step={step} res={res} running={running} times={times} totalTime={totalTime} msg={msg} err={err} onReset={reset} />
          : <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}><Landing need={need} setNeed={setNeed} onRun={run} running={running} /></div>
        }
      </div>
    </div>
  );
}

// ── Mount ─────────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
