// ── Pipeline steps ──────────────────────────────────────────────────────────
const STEPS = [
  { id:"cadrage",      label:"Cadrage Express",     icon:"◎", color:"#0084d4", desc:"Structuration du besoin" },
  { id:"personas",     label:"Personas",             icon:"◈", color:"#00d3a8", desc:"Profils utilisateurs cibles" },
  { id:"stories",      label:"User Stories",         icon:"◰", color:"#eed484", desc:"Fonctionnalités priorisées" },
  { id:"journey",      label:"Parcours Utilisateur", icon:"◫", color:"#8374d1", desc:"Expérience étape par étape" },
  { id:"architecture", label:"Architecture Info",    icon:"⬡", color:"#dc582a", desc:"Arborescence & navigation" },
  { id:"wireframes",   label:"Wireframes",           icon:"◧", color:"#0084d4", desc:"Maquettes fil de fer" },
  { id:"rgaa",         label:"Audit RGAA",           icon:"◉", color:"#00d3a8", desc:"Conformité accessibilité" },
  { id:"v1",           label:"V1 Production",        icon:"⚡", color:"#eed484", desc:"Application fonctionnelle" },
];

// ── Landing examples ─────────────────────────────────────────────────────────
const EXAMPLES = [
  {
    short: "Créer une plateforme SaaS de gestion RH pour PME...",
    full:  "Une application de réservation de salles de réunion pour les agents SNCF. Voir les disponibilités en temps réel, réserver, annuler, recevoir des confirmations. Accessible sur mobile.",
  },
  {
    short: "Optimiser le checkout d'un site e-commerce luxe...",
    full:  "Un tableau de bord de suivi des incidents ferroviaires pour les managers. Visualisation en cours, historique, filtres par ligne/gare, export PDF hebdomadaire.",
  },
  {
    short: "Audit RGAA pour une application bancaire mobile...",
    full:  "Un outil de gestion des habilitations agents de maintenance. Suivi certifications, alertes expiration, planning formations, génération attestations.",
  },
];

// ── Landing feature cards ────────────────────────────────────────────────────
const FEATURES = [
  { icon:"◈", title:"Analyse Cognitive",  desc:"Extraction automatique des intentions business et des points de douleur utilisateurs." },
  { icon:"◦", title:"Cartographie Info",  desc:"Architecture de l'information générée dynamiquement selon les patterns sectoriels." },
  { icon:"◧", title:"Auto-Wireframing",   desc:"Génération de structures basse fidélité prêtes pour l'exploitation." },
];

// ── Shared inline-style tokens ───────────────────────────────────────────────
const R = {
  wrap:   { background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:24 },
  card:   { background:"rgba(255,255,255,0.03)", borderRadius:10, padding:16, border:"1px solid rgba(255,255,255,0.06)" },
  eyebrow:{ fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.35)" },
  label:  { fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.08em" },
  h3:     { fontSize:18, fontWeight:500, marginTop:4 },
  body:   { fontSize:13, fontWeight:300, color:"rgba(255,255,255,0.65)", lineHeight:1.6 },
  li:     { fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.55)", lineHeight:1.6, paddingLeft:4, marginBottom:3, display:"flex", gap:6 },
  pills:  { display:"flex", flexWrap:"wrap", gap:6 },
  pill:   { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:300, color:"rgba(255,255,255,0.6)" },
};

// ── Session key helper ───────────────────────────────────────────────────────
function getKey() { return sessionStorage.getItem("ux_pilot_key") || ""; }
