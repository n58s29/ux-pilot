# UX Pilot — Mission Control

> Pipeline UX complet propulsé par IA. De la demande métier à la V1 en 8 étapes automatisées.

## Présentation

UX Pilot génère l'intégralité d'une phase de découverte UX à partir d'une simple expression de besoin métier. Il suffit de décrire votre projet en langage naturel : l'IA enchaîne 8 livrables en quelques minutes.

| Étape | Livrable |
|---|---|
| 1 | **Cadrage Express** — brief structuré (contexte, problème, objectif, KPIs) |
| 2 | **Personas** — 3 profils utilisateurs avec objectifs et frustrations |
| 3 | **User Stories** — 10-12 stories priorisées MoSCoW |
| 4 | **Parcours Utilisateur** — journey map avec courbe émotionnelle |
| 5 | **Architecture de l'information** — sitemap & navigation |
| 6 | **Wireframes** — maquettes fil de fer HTML basse fidélité |
| 7 | **Audit RGAA** — conformité accessibilité RGAA 4.1 niveau AA |
| 8 | **V1 Production** — prototype HTML/CSS/JS fonctionnel |

## Stack

- **React 18** (UMD CDN) + **Babel Standalone** — pas de build step
- **Claude Sonnet 4** via l'API Anthropic (BYOK — clé côté navigateur)
- HTML / CSS / JS vanilla, aucune dépendance npm

## Structure

```
ux-pilot/
├── index.html        # Shell HTML + chargement des scripts
├── css/
│   └── styles.css    # Styles globaux, animations, classes utilitaires
└── js/
    ├── config.js     # Constantes : STEPS, EXAMPLES, FEATURES, tokens de style
    ├── api.js        # callAPI() + constructeurs de prompts (PR)
    ├── views.js      # Composants de rendu par étape
    └── app.js        # App, Sidebar, Landing, Pipeline + ReactDOM.createRoot
```

## Lancer le projet

Aucune installation requise. Ouvrez `index.html` dans un navigateur ou servez le dossier avec n'importe quel serveur statique :

```bash
# avec VS Code Live Server (extension) — clic droit > Open with Live Server
# ou avec npx
npx serve .
# ou avec Python
python -m http.server 8080
```

Au premier lancement, l'application demande une **clé API Anthropic** (`sk-ant-…`). Elle est stockée en `sessionStorage` et effacée à la fermeture de l'onglet.

## Sécurité

- La clé API n'est jamais envoyée à un serveur tiers — les appels partent directement du navigateur vers `api.anthropic.com`.
- L'en-tête `anthropic-dangerous-direct-browser-access: true` est requis pour les appels CORS depuis le navigateur.
- **Ne pas utiliser en production** avec une clé ayant des droits étendus.
