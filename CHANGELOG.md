# Changelog

All notable changes to this project will be documented in this file.  
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] — 2026-04-14

### Added
- `export.js` — générateur d'archive ZIP en fin de pipeline via JSZip (CDN)
  - 8 pages HTML standalone stylées (dark theme, cohérent avec l'app) : cadrage, personas, user stories, parcours, architecture, wireframes, audit RGAA, V1 production
  - Dossier `maquette/` avec séparation HTML / CSS / JS du wireframe basse fidélité
  - Téléchargement déclenché via `Blob` + `URL.createObjectURL`
- Bouton **Télécharger les livrables (.zip)** dans le banner de fin de pipeline (avec état loading)
- `GithubPagesTuto` — modale tutoriel statique (zéro appel LLM) pour déployer l'**app générée** sur GitHub Pages
  - 5 étapes : télécharger les livrables → créer un repo → pousser `maquette/` → activer Pages → URL
  - Blocs de commandes git copiables en 1 clic (feedback visuel ✓)
  - Astuce : déploiement alternatif via `08-v1-production.html` renommé en `index.html`
  - Astuce mise à jour : `git add . && git commit && git push` pour redéployer
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
