# ZENITH — Gestion de projets UX

> Outil de gestion de projets UX multi-phases avec génération de livrables par IA.  
> Fabrique de l'Adoption Numérique · e.SNCF Solutions

## Présentation

ZENITH accompagne les projets UX de la découverte au handoff en 6 phases structurées. Pour chaque phase, l'IA génère des livrables professionnels directement utilisables, contextualisés au projet et enrichis par les phases précédentes.

| Phase | Intitulé | Livrables |
|-------|----------|-----------|
| 1 | **Discovery & Cadrage** | Problem Statement, Research Plan, Stakeholder Map, JTBD Canvas |
| 2 | **Research Utilisateur** | Guide d'entretien, Synthesis Template, Personas, Journey Map, Insight Cards |
| 3 | **Idéation & Architecture** | Sitemap, User Flows, Design Principles, HMW, Concept Brief |
| 4 | **Design UI & Prototypage** | Content Inventory, Annotation Template, Accessibility Checklist, Motion Guidelines, Design QA |
| 5 | **Tests Utilisateurs** | Test Plan, Script de test, Rapport de test, Affinity Map, Prioritisation Matrix |
| 6 | **Handoff & Amélioration** | Handoff Doc, Dev Checklist, UX Metrics Plan, Post-Launch Research, Retrospective |

**29 livrables au total**, générés par Claude avec contexte cumulatif (chaque phase s'appuie sur les livrables des phases précédentes).

## Stack

- **Vanilla JS** — aucun framework, aucun build step, aucune dépendance npm
- **Claude Sonnet 4** via l'API Anthropic (BYOK — clé stockée en `localStorage`)
- **localStorage** — persistance des projets côté navigateur
- **Design System FAN** — charte graphique Fabrique de l'Adoption Numérique (Avenir, palette institutionnelle)

## Démarrage

Aucune installation requise. Ouvrez `index.html` dans un navigateur ou servez le dossier :

```bash
# VS Code Live Server — clic droit > Open with Live Server
# ou
npx serve .
# ou
python -m http.server 8080
```

Au premier lancement, ZENITH demande une **clé API Anthropic** (`sk-ant-…`). Elle est stockée dans `localStorage` et jamais envoyée à un tiers — les appels partent directement du navigateur vers `api.anthropic.com`.

## Structure du projet

```
ux-pilot/
├── index.html        # Application complète (HTML + CSS + JS dans un seul fichier)
├── css/              # Styles de l'ancienne version (non utilisés)
├── js/                         # Scripts de l'ancienne version (non utilisés)
├── README.md
└── CHANGELOG.md
```

ZENITH est une **single-file app** — toute la logique est dans `index.html`.

## Fonctionnalités

### Gestion de projets
- Créer, renommer, supprimer des projets
- Recherche par nom dans la sidebar
- Indicateur de progression par phase (0/6)
- Export JSON du projet complet
- Export "Spec maquette" JSON — format orienté outil de maquettage / LLM, avec données réelles du projet
- Import JSON (restauration ou partage)

### Phases et livrables
- Vue d'ensemble des 6 phases avec statut et progression des livrables
- Champ "Contexte de phase" et "Notes libres" par phase
- Statut par phase : À faire / En cours / Terminé
- Génération IA de chaque livrable avec contexte cumulatif
- Édition manuelle et sauvegarde automatique (debounce 600 ms)
- Copie en un clic

### Vue synthèse
- Tableau de bord de tous les livrables générés, organisé par phase
- Navigation directe vers un livrable depuis la synthèse
- Export PDF via l'impression navigateur

## Sécurité

- La clé API n'est jamais envoyée à un serveur tiers
- L'en-tête `anthropic-dangerous-direct-browser-access: true` est requis pour les appels CORS depuis le navigateur
- Les données projet sont stockées uniquement dans `localStorage` du navigateur local
- Ne pas utiliser en production avec une clé ayant des droits étendus
