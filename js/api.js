// ── Core API call ────────────────────────────────────────────────────────────
async function callAPI(sys, usr, apiKey, raw = false, mt = 2000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: mt,
      system: sys,
      messages: [{ role: "user", content: usr }],
    }),
  });

  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error?.message || `Erreur ${res.status}`);
  }

  const data = await res.json();
  const text = data.content?.map(b => b.type === "text" ? b.text : "").join("") || "";

  if (raw) return text;

  const jm = text.match(/\{[\s\S]*\}/);
  if (jm) { try { return JSON.parse(jm[0]); } catch {} }
  return text;
}

// ── Prompt builders (PR) ─────────────────────────────────────────────────────
const PR = {
  cadrage: n => ({
    s: `Tu es un expert en cadrage de projets numériques. Réponds UNIQUEMENT en JSON valide, sans markdown. Format: {"titre":"...","contexte":"...","probleme":"...","objectif":"...","cibles":"...","contraintes":["..."],"kpis":["..."],"perimetre":"...","hors_perimetre":"..."}`,
    u: `Demande:\n${n}\n\nStructure en brief.`,
  }),

  personas: b => ({
    s: `Tu es un UX researcher. Génère 3 personas. JSON uniquement: {"personas":[{"nom":"...","age":30,"role":"...","contexte":"...","objectifs":["..."],"frustrations":["..."],"competence_num":"...","citation":"...","emoji":"..."}]}`,
    u: `Brief:\n${JSON.stringify(b)}\n\nGénère 3 personas.`,
  }),

  stories: (b, p) => ({
    s: `Tu es un PO. User stories MoSCoW. JSON uniquement: {"stories":[{"id":"US01","en_tant_que":"...","je_veux":"...","afin_de":"...","priorite":"Must|Should|Could|Wont","criteres":["..."]}]}`,
    u: `Brief:\n${JSON.stringify(b)}\nPersonas:\n${JSON.stringify(p)}\n\n10-12 stories.`,
  }),

  journey: (b, p, st) => ({
    s: `Tu es un UX designer. Parcours utilisateur. JSON uniquement: {"persona_principal":"...","etapes":[{"phase":"...","actions":["..."],"pensees":"...","emotions":"positif|neutre|negatif","touchpoints":["..."],"opportunites":["..."]}]}`,
    u: `Brief:\n${JSON.stringify(b)}\nPersona:${JSON.stringify(p?.personas?.[0])}\nStories Must:\n${JSON.stringify(st?.stories?.filter(s => s.priorite === "Must"))}\n\nParcours.`,
  }),

  architecture: (b, st) => ({
    s: `Architecte d'information. JSON uniquement: {"pages":[{"nom":"...","url":"...","description":"...","composants":["..."],"sous_pages":[{"nom":"...","url":"..."}]}]}`,
    u: `Brief:\n${JSON.stringify(b)}\nStories:\n${JSON.stringify(st)}\n\nArchitecture.`,
  }),

  wireframes: (b, a) => ({
    s: `UX designer. Wireframe HTML complet basse fidélité (gris, placeholders). CSS inline. HTML autonome. Réponds UNIQUEMENT avec le code HTML.`,
    u: `Brief:\n${JSON.stringify(b)}\nArchi:\n${JSON.stringify(a)}\n\nWireframe.`,
  }),

  rgaa: (b, a) => ({
    s: `Auditeur RGAA 4.1. JSON uniquement: {"score_global":75,"niveau_vise":"AA","criteres":[{"thematique":"...","critere":"...","statut":"Conforme|Non conforme|Non applicable","recommandation":"...","impact":"Majeur|Modéré|Mineur"}],"synthese":"...","points_forts":["..."],"axes_amelioration":["..."]}`,
    u: `Brief:\n${JSON.stringify(b)}\nArchi:\n${JSON.stringify(a)}\n\nAudit RGAA.`,
  }),

  v1: (b, p, st, a, r) => ({
    s: `Dev frontend expert. V1 HTML/CSS/JS complète. Design moderne (fond blanc, bleu #00205b), responsive, RGAA. Un fichier HTML. Réponds UNIQUEMENT avec le code HTML.`,
    u: `Brief:\n${JSON.stringify(b)}\nPersona:\n${JSON.stringify(p?.personas?.[0])}\nStories:\n${JSON.stringify(st?.stories?.filter(s => ["Must","Should"].includes(s.priorite)))}\nArchi:\n${JSON.stringify(a)}\nRGAA:\n${JSON.stringify(r?.axes_amelioration)}\n\nV1.`,
  }),
};
