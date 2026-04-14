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
| 8 | **V1 Production** — application HTML/CSS/JS opérationnelle (navigation, boutons, formulaires, données mockées) |

## Stack

- **React 18** (UMD CDN) + **Babel Standalone** — pas de build step
- **Claude Sonnet 4** via l'API Anthropic (BYOK — clé côté navigateur) — jusqu'à 32 000 tokens pour la V1
- **JSZip** (CDN) — génération de l'archive ZIP des livrables
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
    ├── export.js     # Générateur d'archive ZIP (templates HTML + maquette séparée)
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

## Déploiement GitHub Pages

UX Pilot est 100% statique — aucun serveur requis. Déploiement en 3 étapes :

```bash
git init && git add . && git commit -m "feat: initial release"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/ux-pilot.git
git push -u origin main
```

Puis dans le repository : **Settings → Pages → Deploy from branch → main / (root) → Save**.

L'app est accessible sur `https://TON-USERNAME.github.io/ux-pilot` après ~1 minute.  
Un tutoriel interactif est disponible directement dans l'app via le bouton **GitHub Pages** dans la barre du haut.

## Export des livrables

En fin de pipeline, le bouton **Télécharger les livrables** génère une archive ZIP :

```
ux-pilot-[nom-projet].zip
└── ux-pilot-[nom-projet]/
    ├── index.html   ← dashboard de navigation entre tous les livrables
    └── webapp/
        └── index.html   ← V1 production (app générée)
```

Le `index.html` est un dashboard autonome (dark theme, aucune dépendance externe) avec une sidebar de navigation entre les 7 livrables UX (cadrage, personas, user stories, parcours, architecture, wireframes en iframe, audit RGAA) et un bouton **Ouvrir l'app V1** qui pointe vers `webapp/index.html`.

### Détection des implémentations requises

À la génération du ZIP, `export.js` analyse statiquement la V1 et affiche dans la sidebar du dashboard les points nécessitant une implémentation complémentaire, classés en trois niveaux :

| Niveau | Cas détectés |
|--------|-------------|
| 🔴 Erreur | `process.env`, placeholders de clé API |
| 🟡 Avertissement | Appels backend `/api/`, auth sans service, BDD externe, formulaires sans handler |
| 🔵 Info | Persistance `localStorage` uniquement, pattern BYOK |

## Sécurité

- La clé API n'est jamais envoyée à un serveur tiers — les appels partent directement du navigateur vers `api.anthropic.com`.
- L'en-tête `anthropic-dangerous-direct-browser-access: true` est requis pour les appels CORS depuis le navigateur.
- **Ne pas utiliser en production** avec une clé ayant des droits étendus.
