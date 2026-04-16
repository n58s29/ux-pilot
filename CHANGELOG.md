# Changelog

Format basé sur [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.3.2] — 2026-04-16

### Fixed
- **Export "Spec maquette"** — refonte complète du JSON généré : centré sur le produit UX à maquetter, plus sur ZENITH
  - Clé `A_LIRE_EN_PREMIER` avec instructions explicites 🚫 / ✅ pour guider le LLM
  - `ux_reference` contient uniquement les livrables générés du projet (personas, sitemap, user flows…) comme matière première
  - `guide_ecrans` pointe vers sitemap et user flows pour dériver les vrais écrans du produit
  - `charte_fan` : design system FAN clairement positionné comme charte à *appliquer*, pas à recréer
  - Suppression de toute référence à la structure UI de ZENITH (sidebar projets, grille phases, livrables)

---

## [2.3.1] — 2026-04-16

### Removed
- `zenith-mockup-spec.json` supprimé du repo — la spec est désormais générée à la volée par le bouton "⬡ Spec maquette" directement dans l'app

---

## [2.3.0] — 2026-04-16

### Added
- **Bouton "⬡ Spec maquette"** dans le header du projet (vue d'ensemble) et dans la vue synthèse
  - Génère et télécharge un JSON `nom-projet-mockup-spec.json` directement depuis l'app
  - Contient le design system complet (tokens CSS, couleurs, animations), les données réelles du projet (phases, statuts, contenu de chaque livrable généré), les specs UI (4 écrans, 5 modales, composants, interactions) et les instructions d'implémentation
  - Différent de "Exporter JSON" : format orienté outil de maquettage / LLM, pas réimportation ZENITH

---

## [2.2.0] — 2026-04-16

### Added
- **Spécification maquette JSON** (`zenith-mockup-spec.json`) — expression de besoin complète pour produire une maquette HTML/JS/CSS vanilla semi-fonctionnelle
  - Design system complet : tokens couleurs, typographie, espacements, animations, ombres
  - 29 livrables UX avec contenu mock réaliste (données SNCF contextualisées)
  - 4 écrans spécifiés composant par composant (landing, phases overview, phase detail, synthesis)
  - 5 modales documentées (welcome, new project, rename, delete, settings)
  - Bibliothèque de composants : sidebar, boutons, form controls, toast, loading indicator
  - Graphe de navigation complet (15 transitions entre écrans et modales)
  - 6 interactions clés détaillées (génération mockée, export JSON, clipboard, filtrage sidebar…)
  - Instructions d'implémentation ordonnées + bonnes pratiques vanilla JS

---

## [2.1.0] — 2026-04-16

### Added
- **Design System FAN** — charte graphique Fabrique de l'Adoption Numérique appliquée intégralement
  - Palette institutionnelle : `--primaire` (#001b44), `--cerulean` (#0088cc), `--menthe` (#00b388), `--lavande` (#8374d1), `--ambre`, `--ocre`, `--bourgogne`
  - Typographie Avenir (police système) — Light 300 / Roman 400 / Medium 500, aucune graisse > 500
  - Principe "Zéro bordure" : séparation par empilement tonal (`--surface-basse` / `--surface` / `--surface-flottante` / `--surface-haute`), pas de `border: 1px solid`
  - Sidebar header en `--primaire` (navy institutionnel) avec texte blanc
  - Cartes de phase : bordure top 3px colorée par phase (cerulean → menthe → lavande → ambre → ocre → bourgogne)
  - Barre de progression : dégradé `--cerulean → --menthe`
  - Boutons FAN : primaire navy / secondaire surface-haute / ghost cerulean / danger ocre
  - Formulaires : fond `--surface-haute`, bordure bottom au focus uniquement
  - Modal : fond `--surface-flottante`, overlay navy translucide, ombre ambiante teintée
  - Toast : fond `--primaire`
  - Landing : eyebrow animé (point vivant) + mention "Fabrique de l'Adoption Numérique"
  - Footer sidebar : signature FAN en 9px uppercase
  - Scrollbar : couleur `--surface-haute` / hover `--bleu-horizon`
  - Responsive : breakpoint 900px avec layout vertical

### Removed
- Police Spectral (Google Fonts) — suppression des deux balises `<link>` Google Fonts

---

## [2.0.0] — 2026-04-15

> Refonte complète. L'ancienne app React (pipeline 8 étapes) est remplacée par ZENITH,  
> un gestionnaire de projets UX multi-phases en vanilla JS.

### Added
- **6 phases UX** : Discovery, Research, Idéation, Design, Tests, Handoff
- **29 livrables IA** contextualisés, avec prompts structurés par livrable
- **Contexte cumulatif** : chaque phase s'appuie sur les livrables des phases précédentes
- **Gestion multi-projets** : CRUD complet, recherche, sidebar avec progression
- **Persistance localStorage** : données survivent aux rechargements
- **Export / Import JSON** : sauvegarde et partage de projets
- **Vue synthèse** : tous les livrables générés en une page, navigation directe, export PDF
- **Sauvegarde automatique** : debounce 600 ms sur tous les champs texte
- **Statut par phase** : À faire / En cours / Terminé
- **Modale de bienvenue** : saisie de la clé API au premier lancement
- **Toast notifications** : retour haptique sur toutes les actions
- Nom du produit : **ZENITH**

### Removed
- App React + Babel CDN (pipeline 8 étapes)
- Dépendances : JSZip, Google Fonts (Spectral)
- Export ZIP des livrables
- Modale tutoriel GitHub Pages
- Design system optionnel (champ V1)

---

## Historique — UX Pilot Pipeline (v1.x)

> Ces versions correspondent à l'ancienne application React (pipeline linéaire 8 étapes).  
> Remplacée par ZENITH en v2.0.0.

### [1.4.0] — 2026-04-14
- Design system optionnel pour la V1 (bloc collapsible avec textarea de tokens)
- Persistance clé API : `sessionStorage` → `localStorage`

### [1.3.0] — 2026-04-14
- Correction wireframe et V1 vides (strip des balises markdown autour du HTML)
- Prompt V1 réécrit : navigation SPA, handlers JS réels, formulaires avec validation, données mockées
- `max_tokens` V1 : 4 096 → 32 000

### [1.2.0] — 2026-04-14
- `detectRequirements()` dans `export.js` : analyse statique du HTML généré, 3 niveaux (erreur / avertissement / info)

### [1.1.0] — 2026-04-14
- Export ZIP : dashboard `index.html` + dossier `webapp/` (V1 production)
- Modale tutoriel GitHub Pages avec commandes copiables

### [1.0.0] — 2026-04-14
- Pipeline 8 étapes : Cadrage, Personas, User Stories, Journey Map, Architecture, Wireframes, Audit RGAA, V1 Production
- BYOK Anthropic API, React 18 CDN + Babel, JSZip
