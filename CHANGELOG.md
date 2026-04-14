# Changelog

All notable changes to this project will be documented in this file.  
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.0] — 2026-04-14

### Fixed
- **Wireframe & V1 vides** : `callAPI` en mode `raw` strip désormais les balises markdown (` ```html `) que le modèle ajoutait autour du HTML — l'iframe affiche maintenant le rendu correct
- **V1 = maquette non fonctionnelle** : prompt système V1 entièrement réécrit avec 10 exigences explicites (navigation SPA, boutons avec handlers JS réels, formulaires avec validation, données mockées, zéro placeholder)

### Changed
- `max_tokens` V1 : 4 096 → **32 000** — place suffisante pour une application complète et opérationnelle
- `max_tokens` wireframe : 4 000 → 6 000
- `max_tokens` relevés sur toutes les étapes JSON : cadrage/personas/architecture 2 000 → 4 000, stories/journey/RGAA 3 000 → 6 000
- Prompt wireframe : ajout instruction explicite "HTML brut sans markdown"

---

## [1.2.0] — 2026-04-14

### Added
- `detectRequirements(v1Html)` dans `export.js` — analyse statique du HTML généré à l'export
  - **Erreurs bloquantes** : `process.env` / `import.meta.env`, placeholders de clé API (`YOUR_API_KEY`…)
  - **Avertissements** : appels backend `/api/`, fonctions d'auth sans service, Firebase/Supabase/MongoDB, `<form>` sans handler `onsubmit`
  - **Infos** : persistance `localStorage` uniquement, pattern BYOK
  - Résultats affichés dans la sidebar du dashboard (label + détail explicatif), groupés par niveau, visibles depuis tous les onglets

## [1.1.0] — 2026-04-14

### Added
- `export.js` — générateur d'archive ZIP en fin de pipeline via JSZip (CDN)
  - `index.html` dashboard : sidebar de navigation entre tous les livrables (cadrage, personas, user stories, parcours, architecture, wireframes en iframe srcdoc, audit RGAA), dark theme cohérent avec l'app
  - Dossier `webapp/` contenant la V1 production, ouverture via bouton "Ouvrir l'app V1"
  - Téléchargement déclenché via `Blob` + `URL.createObjectURL`
- Bouton **Télécharger les livrables (.zip)** dans le banner de fin de pipeline (avec état loading)
- `GithubPagesTuto` — modale tutoriel statique (zéro appel LLM) pour déployer l'**app générée** sur GitHub Pages
  - 5 étapes : télécharger les livrables → créer un repo → pousser `webapp/` → activer Pages → URL
  - Blocs de commandes git copiables en 1 clic (feedback visuel ✓)
- Bouton **GitHub Pages** (icône + label) dans la top bar, accessible depuis tous les écrans

---

## [1.0.0] — 2026-04-14

### Added
- Initial release — full 8-step UX pipeline powered by Claude Sonnet 4
- `CadrageView` — structured brief (context, problem, objective, KPIs, constraints)
- `PersonasView` — 3 user personas with goals, frustrations, and citation
- `StoriesView` — MoSCoW-prioritised user stories in kanban columns
- `JourneyView` — user journey map with SVG emotion curve
- `ArchitectureView` — sitemap with pages, components, and sub-pages
- `HtmlPreview` — sandboxed iframe preview for wireframes and V1 (desktop / mobile toggle)
- `RgaaView` — RGAA 4.1 audit with donut score and criteria table
- `ApiKeyModal` — BYOK flow with sessionStorage persistence
- `Sidebar` — step-by-step navigation with live/done/pending states
- `Landing` — input form with quick-fill examples and feature cards
- `Pipeline` — live result feed with per-step loading skeletons and timing
- CSS hover states for nav items, example buttons, and preview mode toggle
