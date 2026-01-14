# 🚀 Portfolio V2 - Ewen Bréhélin

> **Portfolio ultra-moderne** avec menu latéral fixe, animations avancées, particules animées et design professionnel.

[![Version](https://img.shields.io/badge/version-2.0-blue.svg)](https://github.com/brehelin-e/portfolio)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Caractéristiques principales

### 🎨 Design & UX
- ✅ **Menu latéral fixe gauche** - Navigation minimaliste toujours visible
- ✅ **Effet glassmorphism** - Transparence moderne et élégante
- ✅ **Animations au scroll** - Reveal progressif avec AOS
- ✅ **Particules animées** - Canvas interactif sur le Hero
- ✅ **Grille animée** - Fond tech dynamique
- ✅ **Effet glitch** - Sur le titre principal
- ✅ **Typewriter effect** - Animation du sous-titre
- ✅ **Beaucoup d'espace blanc** - Design aéré et respirable

### 🎯 Sections
1. **Hero** - Introduction impactante avec 3 CTAs
2. **À propos** - Photo + bio + compétences + PIX
3. **Projets** - 4 projets en cards modernes avec modales détaillées
4. **Compétences** - 4 catégories avec barres de progression
5. **Contact** - Formulaire + liens directs

### 🚀 Technologies

**Frontend:**
- HTML5 sémantique
- CSS3 moderne (Variables CSS, Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- AOS (Animate On Scroll)

**Librairies:**
- Google Fonts (Inter + Space Grotesk)
- FormSubmit (formulaire de contact)
- Canvas API (particules animées)

---

## 📦 Structure des fichiers

```
portfolio-v2/
├── portfolio-v2.html       # HTML complet (1500+ lignes)
├── portfolio-v2.css        # CSS minifié (312 lignes)
├── portfolio-v2.js         # JavaScript (384 lignes)
├── README-V2.md            # Ce fichier
│
├── /image/                 # À créer par l'utilisateur
│   ├── avatar.jpeg         # Photo de profil (500×500px min)
│   └── CV V2 Ewen.pdf      # CV téléchargeable
│
└── /logos/                 # Logos entreprises (optionnel)
    ├── darty.png
    ├── cd29.png
    ├── save.png
    ├── pelik356.png
    └── tdo.png
```

---

## 🎨 Palette de couleurs

```css
/* Primaires */
--primary: #6366f1    /* Bleu indigo */
--secondary: #8b5cf6  /* Violet */
--accent: #06b6d4     /* Cyan */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-cyan: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)

/* Backgrounds */
--bg-white: #ffffff
--bg-light: #f9fafb
--bg-darker: #0f172a

/* Texte */
--text-dark: #1f2937
--text-gray: #6b7280
```

---

## 🚀 Installation & Utilisation

### 1️⃣ Télécharger les fichiers

Télécharge les 3 fichiers principaux :
- `portfolio-v2.html`
- `portfolio-v2.css`
- `portfolio-v2.js`

### 2️⃣ Ajouter les assets

Crée les dossiers requis :

```bash
mkdir image logos
```

Ajoute tes fichiers :
- `image/avatar.jpeg` - Ta photo de profil (500×500px minimum)
- `image/CV V2 Ewen.pdf` - Ton CV au format PDF

### 3️⃣ Tester localement

Ouvre `portfolio-v2.html` dans ton navigateur préféré :

```bash
# Chrome, Firefox, Safari, Edge...
open portfolio-v2.html
```

### 4️⃣ Déployer en ligne

**Méthode 1 : Vercel** (Recommandé)
```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

**Méthode 2 : Netlify**
1. Glisse-dépose ton dossier sur [netlify.com/drop](https://app.netlify.com/drop)
2. C'est tout ! 🎉

**Méthode 3 : GitHub Pages**
```bash
# Push sur GitHub
git init
git add .
git commit -m "Portfolio V2"
git push origin main

# Activer GitHub Pages dans Settings
```

---

## ✅ Checklist de tests

### Desktop (≥768px)
- [ ] Menu latéral toujours visible
- [ ] Navigation smooth scroll fonctionnelle
- [ ] Particules animées sur Hero
- [ ] Hover cards projets avec overlay
- [ ] Modales projets s'ouvrent correctement
- [ ] Fermeture modales (X, backdrop, Escape)
- [ ] Barres de compétences s'animent au scroll
- [ ] Formulaire de contact fonctionne

### Mobile (<768px)
- [ ] Menu latéral masqué
- [ ] Tout le contenu reste accessible
- [ ] Scroll fluide
- [ ] Boutons tactiles suffisamment grands
- [ ] Images responsive

---

## 🎯 Personnalisation

### Changer les couleurs

Édite les variables CSS dans `portfolio-v2.css` :

```css
:root {
  --primary: #6366f1;      /* Ta couleur principale */
  --secondary: #8b5cf6;    /* Ta couleur secondaire */
  --accent: #06b6d4;       /* Ta couleur d'accent */
}
```

### Modifier le contenu

Tout le contenu est dans `portfolio-v2.html` :
- Lignes 158-185 : Hero (titre, description)
- Lignes 218-290 : À propos
- Lignes 306-450 : Projets
- Lignes 466-590 : Compétences
- Lignes 606-710 : Contact

### Ajouter des projets

Duplique une `.project-card` (lignes 324-365) et modifie :
- Titre du projet
- Description
- Technologies
- Lien vers la modale
- Crée une nouvelle modale en copiant une existante

---

## 🔧 Fonctionnalités avancées

### Particules animées
Configurables dans `portfolio-v2.js` ligne 30 :
```javascript
const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
```

### Animations AOS
Personnalisables ligne 13 :
```javascript
AOS.init({
  duration: 800,      // Durée animation
  easing: 'ease-out', // Type d'easing
  once: true,         // Animer une seule fois
  offset: 100         // Offset déclenchement
});
```

### Formulaire de contact
Utilise **FormSubmit** (gratuit, sans backend) :
- Change l'email ligne 656 : `action="https://formsubmit.co/TON-EMAIL"`

---

## 📊 Performance

### Lighthouse Scores (cibles)
- 🎯 Performance : 95+
- ♿ Accessibilité : 95+
- 🔧 Best Practices : 95+
- 🔍 SEO : 100

### Optimisations incluses
- ✅ CSS minifié
- ✅ Lazy loading images
- ✅ Animations GPU-accelerated
- ✅ Debouncing scroll events
- ✅ Fonts optimisées (Google Fonts)

---

## 🐛 Résolution de problèmes

### Menu latéral pas visible sur desktop
→ Vérifie que `--sidebar-width: 80px` dans `:root`

### Particules ne s'affichent pas
→ Vérifie la console (F12) pour les erreurs JS

### Modales ne s'ouvrent pas
→ Vérifie que les IDs des modales correspondent aux liens `href`

### Formulaire ne fonctionne pas
→ Vérifie l'email dans `action="https://formsubmit.co/..."`

---

## 📝 Changelog

### Version 2.0 (Décembre 2024)
- ✨ **NOUVEAU** : Menu latéral fixe gauche
- ✨ **NOUVEAU** : Particules animées sur Hero
- ✨ **NOUVEAU** : Effet glassmorphism
- ✨ **NOUVEAU** : Grille animée en fond
- ✨ **NOUVEAU** : Effet glitch sur titre
- ✨ **NOUVEAU** : Typewriter effect
- ✨ **NOUVEAU** : 4 modales projets détaillées
- 🎨 Design ultra-moderne
- 📱 100% responsive
- ⚡ Performances optimisées

### Version 1.0 (Novembre 2024)
- 🎉 Première version publique
- Navigation hamburger mobile
- Sections classiques
- Modales simples

---

## 💡 Inspirations

Ce portfolio s'inspire des meilleurs designs modernes :
- [marincadro.netlify.app](https://marincadro.netlify.app) - Organisation claire
- [kothanromeo.dev](https://kothanromeo.dev) - Animations fluides
- [hugocoytte.fr](https://hugocoytte.fr) - Professionnalisme

---

## 📧 Contact

**Ewen Bréhélin**
- 📧 Email : [brehelin-e@saint-louis29.net](mailto:brehelin-e@saint-louis29.net)
- 💼 LinkedIn : [ewen-bréhélin](https://www.linkedin.com/in/ewen-bréhélin-63305a307)
- 🐙 GitHub : [brehelin-e](https://github.com/brehelin-e)
- 📱 Téléphone : 07 72 72 04 38

---

## 📄 Licence

MIT © 2025 Ewen Bréhélin

---

## 🙏 Remerciements

- **Inter & Space Grotesk** - Google Fonts
- **AOS** - Michał Sajnóg
- **FormSubmit** - Service gratuit de formulaires
- **Vercel** - Hébergement et déploiement

---

**💜 Créé avec passion par Ewen Bréhélin**

*Si ce portfolio t'a aidé, n'hésite pas à me contacter ou à laisser une ⭐ sur GitHub !*
