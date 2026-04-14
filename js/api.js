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

  if (raw) {
    // Strip markdown code fences (```html ... ``` or ``` ... ```)
    return text.replace(/^```(?:html|HTML)?\s*/m, "").replace(/\s*```\s*$/m, "").trim();
  }

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
    s: `Tu es UX designer. Génère un wireframe basse fidélité en HTML/CSS pur, autonome. Palette strictement grise (#f5f5f5, #e0e0e0, #9e9e9e, #616161). Rectangles de placeholder pour images. Navigation entre écrans fonctionnelle (JS show/hide). CSS entièrement inline ou dans un <style>. IMPORTANT: réponds UNIQUEMENT avec le code HTML brut, sans aucun markdown, sans backticks, sans explication.`,
    u: `Brief:\n${JSON.stringify(b)}\nArchitecture:\n${JSON.stringify(a)}\n\nGénère le wireframe HTML maintenant.`,
  }),

  rgaa: (b, a) => ({
    s: `Auditeur RGAA 4.1. JSON uniquement: {"score_global":75,"niveau_vise":"AA","criteres":[{"thematique":"...","critere":"...","statut":"Conforme|Non conforme|Non applicable","recommandation":"...","impact":"Majeur|Modéré|Mineur"}],"synthese":"...","points_forts":["..."],"axes_amelioration":["..."]}`,
    u: `Brief:\n${JSON.stringify(b)}\nArchi:\n${JSON.stringify(a)}\n\nAudit RGAA.`,
  }),

  v1: (b, p, st, a, r) => ({
    s: `Tu es un développeur frontend senior. Génère une application web V1 COMPLÈTE et OPÉRATIONNELLE en un seul fichier HTML autonome.

EXIGENCES OBLIGATOIRES — chaque point doit être respecté:
1. NAVIGATION: toutes les pages de l'architecture sont accessibles via un menu fonctionnel (JS SPA: show/hide de sections, ou <a href="#section">)
2. BOUTONS FONCTIONNELS: chaque bouton déclenche une action réelle (ouverture modal, filtrage, soumission, navigation, animation état)
3. FORMULAIRES: validation HTML5 + JS inline (required, pattern, messages d'erreur visibles)
4. DONNÉES MOCKÉES: listes, tableaux, cartes avec des vraies données fictives cohérentes avec le projet (10-20 entrées minimum)
5. ÉTAT INTERACTIF: favoris, sélection, pagination ou filtres selon les user stories
6. DESIGN: fond blanc #ffffff, couleur principale #00205b (marine SNCF), accents #e2001a, typographie system-ui, ombres et transitions CSS
7. RESPONSIVE: fonctionne sur mobile (375px) et desktop (1280px+), grilles CSS Grid/Flexbox
8. ACCESSIBILITÉ: aria-label sur boutons icon, contraste AA, focus visible, alt sur images
9. ZÉRO placeholder: aucun texte "Lorem ipsum", "À implémenter", "TODO", "Coming soon", lien "#" sans action
10. AUTONOME: tout en un seul fichier, aucune dépendance externe CDN

IMPORTANT: réponds UNIQUEMENT avec le code HTML brut, sans aucun markdown, sans backticks, sans commentaire avant ou après le code.`,
    u: `Brief:\n${JSON.stringify(b)}\nPersona principal:\n${JSON.stringify(p?.personas?.[0])}\nUser Stories Must+Should:\n${JSON.stringify(st?.stories?.filter(s => ["Must","Should"].includes(s.priorite)))}\nArchitecture (pages à implémenter):\n${JSON.stringify(a)}\nPoints RGAA à corriger:\n${JSON.stringify(r?.axes_amelioration)}\n\nGénère l'application V1 complète et opérationnelle maintenant.`,
  }),
};
