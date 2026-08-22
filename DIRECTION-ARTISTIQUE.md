# Direction artistique — Restaurant L'Étoile (Lausanne)

> Version 1.1 — 21 août 2026 · révisée après retour client : une seule nuance claire, un seul aplat rouge, photos en chevauchement
> Statut : livrable exploitable directement en intégration front.
> Périmètre : refonte complète de https://www.restaurant-letoile.ch/

---

## 0. Ce qui a été analysé

| Source | Statut |
|---|---|
| 9 screenshots d'inspiration (Bureau) | Lus et analysés |
| Site actuel restaurant-letoile.ch (accueil + carte + contact) | Analysé |
| Logo officiel `cropped-LETOILE-logo-vecto.png` | Téléchargé et **échantillonné pixel par pixel** |
| DESIGN.md / PRODUCT.md / DA d'agence existante dans le projet | **Aucun trouvé** — pas de conflit à signaler |

**Couleurs réelles du logo, mesurées (et non estimées) :** le fichier ne contient **que deux couleurs opaques** — `#000000` (90,6 % des pixels : le script « L'étoile » et le mot « RESTAURANT ») et `#E9323C` (9,4 % : les coups de pinceau d'accent). Fond transparent.
C'est le socle non négociable de la palette. Le rouge de la marque est donc **exactement `#E9323C`** — un rouge légèrement froid (teinte 356,7°, saturation 80,6 %, luminosité 55,5 %), plus proche du carmin que du rouge tomate.

**Note sur le site actuel.** Structure saine côté contenu (Accueil / Carte / Pizza / Réservation / Contact), NAP complet, horaires détaillés, carte très fournie (entrées, assiettes froides, pasta, risotto, poissons, viandes, menu enfant). Réservation **par téléphone uniquement** : c'est une contrainte forte, elle doit devenir un parti pris de design (le bouton d'appel est un CTA de premier rang, pas un lien de bas de page).

---

## 1. Concept

# « NAPPE & ENCRE »
### Éditorial · Net · Chaleureux
### Principe fonctionnel : **la carte d'abord.**

L'Étoile n'a pas besoin de raconter une histoire — il a besoin de **donner faim en trois secondes et de montrer sa carte en un clic**. La direction artistique traite donc le site comme une **belle carte imprimée sur nappe blanche** : un blanc pur sans teinte, une encre noire éditoriale, un rouge qui ne sert qu'à une chose — signaler. Pas de décor, pas de fioriture, pas de récit familial. La photo de plat et la ligne de menu sont les deux seuls héros.

Trois surfaces, pas une de plus : **blanc, encre, et le rouge une seule fois par page.** Aucune demi-teinte, aucun gris de fond, aucun beige. C'est exactement la logique du logo, étendue à tout le site. Et puisqu'il n'existe plus de nuance intermédiaire pour adoucir les transitions, ce sont **les photos qui cousent les sections entre elles** en enjambant leurs frontières (§ 6.4).

Le luxe ici n'est pas dans l'ornement, il est dans **la précision** : un filet à 1 px, un prix parfaitement aligné, une hiérarchie typographique qui ne tremble pas. C'est ce qui permet d'être haut de gamme **sans être intimidant** : on lit une carte de quartier, très bien mise en page.

---

## 2. Ce que disent les inspirations

### 2.1 Hypothèse d'intention

Les neuf références n'ont pas la même palette ni la même ambiance, mais elles partagent toutes **la même mécanique** : un serif éditorial pour nommer les plats, une sans-serif discrète pour tout le reste, et un menu présenté comme une liste imprimée (nom → filet → prix). Aucune ne fait de l'« UI de startup ».

> **L'hypothèse : ce qui est aimé dans ces références n'est pas le luxe, c'est la lisibilité éditoriale.** Le mot « haut de gamme » du brief signifie en réalité « rigoureux et bien composé », pas « doré et solennel ».

### 2.2 Analyse individuelle

#### ⭐ Référence principale — `09.42.34` (« Company&Co »)

- **Ambiance** : nocturne, appétissante, rigoureuse, directe, chaleureuse.
- **Couleurs** : fond charbon ~`#161314` (≈70 %), texte crème `#F2EEE9` (≈20 %), gris de description ~`#8C8580`, **rouge accent réservé aux prix et à l'onglet actif** (≈2 %). Blanc pur uniquement pour les boutons circulaires.
- **Typographie** : serif à contraste moyen pour les titres et les noms de plats (mélange bas-de-casse + CAPITALES grasses sur la 2ᵉ ligne du H1) ; sans-serif en CAPITALES très espacées pour la nav, les onglets et les CTA ; corps de texte sans-serif gris, très petit. Écart titre/corps ≈ 4,5×.
- **Layout** : conteneur large, sections empilées, respiration verticale très généreuse entre les blocs mais **densité forte à l'intérieur des blocs**. Grille 3 colonnes pour les plats. Bloc menu en 2 colonnes : image à gauche, liste à droite.
- **Matières** : photos de plats vue de dessus sur fond sombre, coins vifs, **aucune ombre portée**, aucun arrondi sauf le bouton flèche circulaire.
- **Motion** : déductible — apparitions douces au scroll, flèche qui glisse au survol.
- **LE détail mémorable** : **la ligne de rappel entre le nom du plat et son prix**, et le **prix en rouge** aligné à droite. C'est la signature à reprendre.

#### `09.43.04` — VELVET
Bordeaux profond dégradé + crème, Didone à swashes, alternance de bandes pleine largeur crème/rouge, bouton rouge plein à coins doux.
**Retenu** : l'alternance stricte de bandes pleine largeur, et le bouton rouge plein comme unique CTA fort. **Rejeté** : le dégradé bordeaux et les swashes (théâtral, incompatible avec « accessible »).

#### `09.38.51` — Restaurant « Global Cuisine »
Base crème `#F7F4F0`, accent bronze, serif transitionnel (type Cormorant/EB Garamond), **eyebrows en micro-capitales espacées** au-dessus de chaque titre (« SPECIAL OFFER », « SERVICES »), liste de menu nom + description + prix aligné à droite séparée par des filets fins, cartes 3 colonnes centrées, coins vifs, « LEARN MORE » souligné.
**Retenu** : **l'eyebrow en micro-capitales**, le filet hairline comme unique séparateur, la liste de carte, les coins vifs. **Rejeté** : le bronze (on a déjà un rouge) et l'image en arche.

#### `09.39.06` — AMPHORA
Crème `#EFE9DC`, titres serif en CAPITALES très espacées, collage éditorial d'images superposées avec petites vignettes rondes détourées, prix affichés en trio avec label sous le chiffre, layout asymétrique.
**Retenu** : les **titres de section en capitales serif espacées**, et le bloc « prix en trio ». **Rejeté** : le collage superposé — coûteux à maintenir, fragile en responsive, et il raconte une histoire dont L'Étoile ne veut pas.

#### `09.39.26` — Aria Verde
Sable/olive, display à swashes avec lettres alternées italiques, très grandes photos, boutons oblongs.
**Retenu** : uniquement le **contraste d'échelle extrême** (très grand titre / très petit texte en capitales espacées). **Rejeté** : tout le reste. Cette référence tire vers l'immobilier de luxe, pas vers un restaurant de quartier.

#### `09.39.56` — L'Essence du Rouge
La plus proche de la contrainte couleur : **fond rouge profond pleine page**, cartes blanc cassé posées dessus, titres serif avec **italique en seule emphase** (« Art of fine dining », « is an art form »), micro-typo grise, mosaïques d'images, FAQ en accordéon, **logo géant en pied de page**.
**Retenu** : **l'italique serif comme unique ornement typographique**, le rouge en aplat de section, le logo géant en footer, l'accordéon FAQ.
⚠️ **Alerte imitation** : cette référence est un template Framer très diffusé et son identité (script rouge + italique) est déjà fortement associée. On en reprend les **principes**, jamais la composition.

#### `09.40.11` — FRESCO DI ITALIA
Crème chaud, **hero en carte avec marge** (la photo ne touche pas les bords), boutons rouges, **section rouge pleine largeur** avec grille de 4 photos de plats signature, **adresse en clair dans la barre supérieure**, logo centré.
**Retenu** : **l'adresse + horaires dans la barre utilitaire supérieure** (excellent pour le SEO local et pour un restaurant de quartier), et la **bande rouge pleine largeur** pour les plats signature. **Rejeté** : les boutons très arrondis.

#### `09.40.54` — Cappuccino's
Script cursif posé sur photo, vert olive, motif de fond, carte en 3 colonnes, et surtout **un bloc « infos pratiques » superposé sur la carte Google** (horaires + téléphone + adresse).
**Retenu** : **le bloc infos superposé sur le plan**. **Rejeté** : le script sur photo (le logo est déjà un script — en remettre un serait redondant), le motif de fond, le vert.

#### `09.41.17` — « Taste of Adventure »
Nav verticale fixe à gauche, **alternance stricte noir / blanc cassé**, **onglets de catégories + grille de cartes plats**, carrousel manuel, formulaire de réservation, contacts avec plan.
**Retenu** : **l'alternance noir / blanc cassé** et le système d'onglets. **Rejeté** : la nav verticale latérale (mauvaise en mobile, mauvaise pour l'accès direct à la carte).

### 2.3 Convergences → le cœur de la DA

| Convergence | Occurrences | Décision |
|---|---|---|
| Serif éditorial pour les titres + sans-serif pour le corps | 8 / 9 | **Adopté, sans discussion** |
| Menu = nom · description grise · prix aligné à droite, séparé par un filet fin | 5 / 9 | **Adopté — c'est le composant central du site** |
| Eyebrow en micro-capitales très espacées au-dessus des titres | 4 / 9 | **Adopté** |
| Coins vifs ou quasi vifs | 6 / 9 | **Adopté (rayon 2 px max)** |
| Aucune ombre portée douce | 8 / 9 | **Adopté — la bordure remplace l'ombre** |
| Onglets horizontaux de catégories de plats | 2 / 9 (dont la réf. principale) | **Adopté** |
| Photos de plats vue de dessus, fond sombre, lumière rasante | 7 / 9 | **Adopté** |
| Alternance de bandes claires / sombres pleine largeur | 4 / 9 | **Adopté comme rythme de page** |
| Rouge utilisé comme signal (prix, état actif, CTA) et non comme décor | 4 / 9 | **Adopté — règle absolue** |

### 2.4 Divergences → tranchées

| Tension | Camp A | Camp B | **Décision & justification** |
|---|---|---|---|
| **Fond général** | Sombre (réf. principale, 09.41.17) | Clair (09.38.51, 09.39.06, 09.40.11) | **Alternance binaire blanc pur `#FFFFFF` / encre `#121110`.** Décision client : **une seule nuance claire, pas deux** — le blanc cassé et sa nuance secondaire sont supprimés. Le site n'a donc que trois surfaces : blanc, encre, et le rouge une fois. C'est la traduction exacte du logo (noir + rouge sur blanc), sans demi-teinte. Un site 100 % sombre lirait « bistrot de nuit » ; un site 100 % clair perdrait l'appétence de la référence principale. L'alternance tranchée donne les deux. |
| **Ce qui relie les bandes** | — | — | **La photo.** Puisqu'il n'y a plus de nuance intermédiaire pour adoucir les passages, ce sont **les images qui enjambent la frontière entre deux bandes**. Voir § 6.4 — c'est le dispositif de composition signature du site. |
| **Caractère du serif** | Display à swashes (09.43.04, 09.39.26) | Serif sobre (09.38.51, réf. principale) | **Serif sobre.** Le logo est déjà un script manuscrit expressif : ajouter une typo à swashes crée deux voix décoratives qui se disputent. Le serif du site doit être le **faire-valoir silencieux** du logo. |
| **Forme des boutons** | Oblongs / pill (09.39.26, 09.40.11) | Rectangulaires (09.38.51, réf. principale) | **Rectangulaires, rayon 2 px.** Une seule exception conservée : **le bouton circulaire à flèche** de la référence principale, gardé comme signature de navigation. Le contraste rond/rectangle devient un signe, pas une incohérence. |
| **Traitement des images** | Collage superposé (09.39.06) | Grille alignée (09.38.51, 09.40.11) | **Grille alignée**, avec **une seule asymétrie autorisée** : le bandeau d'accès direct qui chevauche le bas du hero de −40 px. On garde l'intention éditoriale d'Amphora sans son coût de maintenance. |
| **Rouge : décor ou signal ?** | Aplat massif (09.39.56, 09.40.11) | Micro-accent (réf. principale) | **Signal d'abord, aplat une seule fois.** Le rouge est réservé aux prix, aux états actifs et au CTA. Il ne s'étale en pleine largeur qu'**une fois par page** : sur le bandeau infos pratiques. Un rouge qui est partout ne signale plus rien. |

### 2.5 Signaux faibles retenus

1. **La ligne de rappel (leader line)** entre le nom du plat et le prix — présente dans la référence principale, c'est le détail le plus mémorable de tout le corpus.
2. **Le filet 1 px comme unique séparateur.** Jamais de fond gris, jamais de carte dans une carte.
3. **Le tracking positif systématique sur les micro-textes** (~+0,12 em au-dessus de 12 px en capitales) — présent dans 6 références sur 9, jamais verbalisé.
4. **Le prix n'est jamais en gras énorme.** Il est petit, aligné à droite, et c'est la couleur qui fait le travail.
5. **Zéro ombre portée.** Ce qui donne l'impression « imprimé » plutôt que « interface ».

### 2.6 Anti-références (ce qu'aucune inspiration ne fait — donc interdit)

Aucune des neuf références n'utilise : de dégradé multicolore, d'ombre douce diffuse, de rayon supérieur à 12 px sur une carte, d'icône colorée ou d'emoji, de badge arrondi coloré, de carrousel qui défile tout seul, de bordure épaisse colorée, d'effet verre/glassmorphism, de fond à motif géométrique animé.
**Ces absences sont des interdits.**

---

## 3. Palette

Tous les contrastes ci-dessous ont été **calculés** (formule WCAG 2.1 relative luminance), pas estimés.

### 3.1 Tokens de marque — rampe rouge dérivée du logo

```css
:root {
  /* Rampe construite mathématiquement autour du rouge exact du logo.
     Teinte constante : 356,7°. --red-500 est la valeur pipetée dans le fichier logo. */
  --red-50:  #FDEFF0;
  --red-100: #FBDADC;
  --red-200: #F8ABAF;
  --red-300: #F76E75;  /* rouge lisible SUR fond noir */
  --red-400: #F5444E;
  --red-500: #E9323C;  /* ★ ROUGE OFFICIEL DU LOGO — identité */
  --red-600: #C11F28;  /* rouge d'ACTION : tout ce qui porte du texte */
  --red-700: #A1171E;  /* aplat de section */
  --red-800: #7F1016;
  --red-900: #5C0A0F;
}
```

> **Règle d'or du rouge — à respecter absolument.**
> `--red-500` (#E9323C) n'atteint que **4,21:1** sur le blanc pur. Il **échoue** au niveau AA pour du texte courant.
> → **`--red-500` est une couleur de SURFACE et d'IDENTITÉ** : logo, filets, soulignement d'onglet actif, focus ring, gros chiffres. Jamais de texte < 24 px dessus ni en dessous.
> → **`--red-600` (#C11F28) est le rouge de TEXTE et de BOUTON** : 6,01:1 sur blanc, et blanc sur `--red-600` = 6,01:1. C'est lui qui porte les prix et les CTA.
> Même teinte, même famille, aucune perte d'identité — et l'accessibilité est garantie.

### 3.2 Tokens sémantiques

```css
:root {
  /* ---------- SURFACES — trois, pas une de plus ---------- */
  --surface:          #FFFFFF;  /* BLANC PUR — unique surface claire, ~55 % de la page */
  --surface-ink:      #121110;  /* ENCRE — unique surface sombre, ~25 % */
  --surface-ink-soft: #1D1B19;  /* uniquement pour un encart posé SUR l'encre */
  --surface-brand:    #A1171E;  /* aplat rouge — UNE SEULE section par page, ~5 % */

  /* ---------- TEXTE sur blanc ---------- */
  --text-primary:   #16130F;  /* 17,92:1 — AAA */
  --text-secondary: #5A5248;  /*  7,68:1 — AAA (descriptions de plats) */
  --text-tertiary:  #6E665C;  /*  5,66:1 — AA  (légendes, mentions) */

  /* ---------- TEXTE sur encre ---------- */
  --text-on-ink:           #FFFFFF;  /* 19,00:1 — AAA (le blanc pur, ici aussi) */
  --text-on-ink-secondary: #B0ABA5;  /*  8,26:1 — AAA (descriptions de plats) */
  --text-on-ink-tertiary:  #8C867F;  /*  5,27:1 — AA  (légendes) */
  --text-on-ink-accent:    #F76E75;  /*  6,68:1 — AA  (prix sur encre) */

  /* ---------- TEXTE sur aplat rouge ---------- */
  --text-on-brand: #FFFFFF;  /* sur --surface-brand : 7,95:1 — AAA */

  /* ---------- BORDURES — gris neutres à peine chauds ---------- */
  --border-hairline:    #E7E4DF;  /* filet décoratif par défaut, 1 px */
  --border-default:     #D5D1CA;  /* séparateur de section */
  --border-interactive: #8A857E;  /* 3,66:1 — conforme WCAG 1.4.11 : champs, cases */
  --border-ink:         #2A2724;  /* filet sur fond noir */
  --border-ink-strong:  #6B645B;  /* 3,23:1 — champs sur fond noir */

  /* ---------- ÉTATS ---------- */
  --action:          var(--red-600);
  --action-hover:    var(--red-700);
  --action-active:   var(--red-800);
  --action-subtle:   var(--red-50);
  --focus-ring:      var(--red-500);   /* 4,21:1 sur blanc, 4,48:1 sur encre — OK non-texte */
  --state-success:   #0F6B3F;   /* 6,55:1 sur blanc — AA (« Ouvert ») */
  --state-warning:   #8A5A00;   /* 5,91:1 sur blanc — AA (« Fermé le dimanche ») */
  --state-disabled-bg:   #F0EEEB;
  --state-disabled-text: #8A857E;
}
```

> **Il n'existe pas de gris de fond.** Aucun encart, aucune carte, aucun champ ne reçoit un fond gris ou beige
> pour se distinguer du blanc. La distinction se fait par le **filet 1 px** ou par le **passage à l'encre**.
> C'est la conséquence directe de la règle « une seule nuance claire », et c'est ce qui garde le rendu net.

### 3.3 Proportions cibles sur une page d'accueil

```
Blanc pur   ███████████████████████████ 55 %
Encre       ████████████                25 %
Photo       ███████                     15 %   ← les images portent la matière
Rouge       ██                           5 %   ← ne jamais dépasser
```

Le blanc cassé disparaît de la palette : la chaleur ne vient plus de la teinte du papier, elle vient
**exclusivement de la photographie**. C'est ce qui rend l'intégration des images critique (§ 8).

### 3.4 Combinaisons interdites

| Interdit | Raison |
|---|---|
| Texte `--red-500` sur blanc, en dessous de 24 px | 4,21:1 → échoue AA. Utiliser `--red-600` (6,01:1). |
| Texte blanc sur `--red-500` en dessous de 19 px gras | 4,21:1 → échoue AA. Utiliser `--red-600`. |
| **Toute nuance claire autre que `#FFFFFF`** — crème, beige, gris clair, `#FAFAFA` | Décision client : une seule nuance claire. Un deuxième blanc réintroduit exactement ce qui a été refusé. |
| **Un deuxième aplat rouge sur la même page** | Le rouge ne signale plus rien s'il est deux fois. |
| `--surface-brand` (rouge) collé à `--surface-ink` (encre) sans respiration | vibration optique, effet « alerte » |
| Rouge sur photo de plat (tomate, viande, vin) | le rouge disparaît dans le sujet, le signal est perdu |
| Noir pur `#000000` en fond d'écran | réservé au **logo uniquement** ; les fonds utilisent `#121110` |
| Rouge + vert dans le même écran | cliché « italien » que le brief refuse |

---

## 4. Typographie

**Deux familles, Google Fonts, variables, auto-hébergées (`woff2`, `font-display: swap`, `preload` des 2 fichiers critiques).**

### 4.1 Les deux familles

**Titres, noms de plats, citations → `Newsreader`**
Serif éditorial à contraste modéré, axe variable 200→800, **avec italique vrai**. Choisie parce qu'elle est la seule Google Font qui tient à la fois en 72 px (titre de hero) et en 17 px (nom de plat dans la carte) sans devenir fragile — condition indispensable puisque le nom de plat est le composant le plus répété du site. Son italique fournit l'unique ornement typographique retenu (signal faible de la réf. `09.39.56`).
*Alternatives acceptées si contrainte : `Newsreader` → `Spectral` (même esprit) ou `Source Serif 4`. **Ne pas** substituer par Playfair Display (trop Didone, trop vu) ni par Cormorant (trop fin, illisible en dessous de 18 px).*

**Interface, corps, eyebrows, prix, boutons → `Archivo`**
Grotesque néo-classique variable (100→900 + axe de chasse), dessiné pour l'écran et les petites tailles. Elle est le pendant open-source des grotesques suisses de haute qualité, et elle fait écho au mot « RESTAURANT » du logo (grotesque large, très espacé). Excellente en capitales trackées.
*Alternatives acceptées : `Archivo` → `Inter Tight` ou `Public Sans`. **Ne pas** substituer par Inter standard, Poppins ou Montserrat.*

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Ne charger que : Newsreader 400 + 500 + italic 400 ; Archivo 400 + 500 + 600 -->
```

### 4.2 Échelle modulaire — mobile-first

Base 16 px. Ratio 1,20 en mobile → 1,25 en desktop, interpolé en `clamp()` (aucun media query nécessaire pour la typo).

```css
:root {
  /* --- DISPLAY & TITRES (Newsreader) --- */
  --fs-display: clamp(2.75rem, 1.60rem + 5.75vw, 5.00rem); /*  44 →  80 px  hero */
  --fs-h1:      clamp(2.00rem, 1.40rem + 3.00vw, 3.50rem); /*  32 →  56 px */
  --fs-h2:      clamp(1.625rem, 1.24rem + 1.93vw, 2.50rem);/*  26 →  40 px */
  --fs-h3:      clamp(1.25rem, 1.11rem + 0.70vw, 1.625rem);/*  20 →  26 px */
  --fs-dish:    clamp(1.0625rem, 1.02rem + 0.22vw, 1.25rem);/* 17 →  20 px  nom de plat */

  /* --- TEXTE (Archivo) --- */
  --fs-lead:    clamp(1.0625rem, 1.01rem + 0.28vw, 1.25rem); /* 17 → 20 px  chapô */
  --fs-body:    1rem;        /* 16 px — plancher absolu, évite le zoom iOS sur input */
  --fs-body-sm: 0.9375rem;   /* 15 px — descriptions de plats */
  --fs-caption: 0.8125rem;   /* 13 px — légendes, mentions */
  --fs-eyebrow: 0.75rem;     /* 12 px — micro-capitales */
}
```

### 4.3 Rôles, graisses, casse, interlignage, tracking

| Rôle | Famille | Taille | Graisse | Casse | Interlignage | Tracking |
|---|---|---|---|---|---|---|
| Hero (H1) | Newsreader | `--fs-display` | 400 | Phrase, **avec un mot en italique** | 0,98 | −0,02em |
| Titre de section (H2) | Newsreader | `--fs-h2` | 400 | Phrase | 1,08 | −0,015em |
| Titre de section alt. | Newsreader | `--fs-h3` | 500 | **CAPITALES** | 1,15 | **+0,10em** |
| Sous-titre (H3) | Newsreader | `--fs-h3` | 500 | Phrase | 1,20 | −0,01em |
| **Nom de plat** | Newsreader | `--fs-dish` | **500** | Phrase | 1,25 | 0 |
| **Description de plat** | Archivo | `--fs-body-sm` | 400 | phrase | 1,50 | 0 |
| **Prix** | Archivo | `--fs-body-sm` | **600** | — | 1,25 | +0,01em, `tabular-nums` |
| Chapô | Archivo | `--fs-lead` | 400 | Phrase | 1,55 | 0 |
| Corps courant | Archivo | `--fs-body` | 400 | Phrase | 1,65 | 0 |
| **Eyebrow** | Archivo | `--fs-eyebrow` | **600** | **CAPITALES** | 1,20 | **+0,14em** |
| Nav / onglets | Archivo | `--fs-caption` | 600 | **CAPITALES** | 1,00 | **+0,12em** |
| Bouton | Archivo | `--fs-caption` | 600 | **CAPITALES** | 1,00 | **+0,10em** |
| Légende / mention | Archivo | `--fs-caption` | 400 | Phrase | 1,45 | +0,01em |

### 4.4 Règles typographiques non négociables

- **Un seul H1 par page**, contenant systématiquement « L'Étoile » et « Lausanne » (SEO local).
- **L'italique de Newsreader est le SEUL ornement autorisé.** Un mot en italique par titre, jamais deux.
- **Jamais de graisse 700+ sur Newsreader.** Le maximum est 500. La hiérarchie se fait par la taille et l'espace, pas par le gras.
- **Prix en `font-variant-numeric: tabular-nums`** : les colonnes de prix doivent s'aligner au pixel.
- **Largeur de texte plafonnée à 68 caractères** (`max-width: 68ch`), 60ch pour les chapôs.
- **Aucun texte en dessous de 13 px** nulle part, y compris les mentions légales.
- **Apostrophe typographique `’`** partout (« L'Étoile », pas « L'Etoile »), et **É majuscule accentué**. Le site actuel écrit « L'Etoile » : c'est à corriger.
- `text-wrap: balance` sur les H1/H2, `text-wrap: pretty` sur les paragraphes.

---

## 5. Layout et espace

### 5.1 Grille

| Palier | Colonnes | Gouttière | Marge latérale |
|---|---|---|---|
| Mobile (< 640) | 4 | 16 px | 20 px |
| Tablette (640–1023) | 8 | 24 px | 32 px |
| Desktop (≥ 1024) | 12 | 32 px | 48 px |

```css
:root {
  --container-max:  1280px; /* conteneur général */
  --container-wide: 1440px; /* galerie, bandes pleine largeur */
  --container-read:  720px; /* colonne de lecture ET colonne de menu */
  --measure:          68ch;
}
```

**Décision de composition :** la **section carte est en une seule colonne centrée de 720 px max**, même en 1440 px de large. Un menu réparti sur 12 colonnes devient un tableau ; sur 720 px il reste une carte imprimée. C'est le choix le plus structurant du layout.

### 5.2 Échelle d'espacement (base 4 px)

```css
:root {
  --sp-1: 0.25rem;  /*  4 */
  --sp-2: 0.5rem;   /*  8 */
  --sp-3: 0.75rem;  /* 12 */
  --sp-4: 1rem;     /* 16 */
  --sp-5: 1.5rem;   /* 24 */
  --sp-6: 2rem;     /* 32 */
  --sp-7: 3rem;     /* 48 */
  --sp-8: 4rem;     /* 64 */
  --sp-9: 6rem;     /* 96 */
  --sp-10: 8rem;    /* 128 */

  /* Rythme vertical des sections — mobile → desktop */
  --section-y:       clamp(4rem, 2.5rem + 7.5vw, 7.5rem);  /* 64 → 120 px */
  --section-y-tight: clamp(2.5rem, 1.75rem + 3.75vw, 4rem);/* 40 →  64 px */

  /* Chevauchement des images sur la frontière de deux bandes (§ 6.4) */
  --overlap:       clamp(2.5rem, 1rem + 7.5vw, 7.5rem);    /* 40 → 120 px */
  --overlap-small: clamp(1.5rem, 0.75rem + 3.75vw, 3rem);  /* 24 →  48 px */
}
```

**Rythme vertical :** espace entre eyebrow et titre = `--sp-3`. Entre titre et chapô = `--sp-4`. Entre chapô et contenu = `--sp-6`. Entre deux sections = `--section-y`. **Aucune valeur intermédiaire improvisée.**

### 5.3 Densité

Le corpus enseigne un rythme précis : **respiration forte entre les blocs, densité forte à l'intérieur**. Une ligne de menu ne doit pas « flotter » : `padding: var(--sp-4) 0`, filet de séparation, et c'est tout. La générosité est verticale entre les sections, pas à l'intérieur des listes.

### 5.4 Rayons

```css
:root {
  --radius-0:    0;       /* PHOTOS, images, galerie — toujours coins vifs */
  --radius-sm:   2px;     /* boutons, champs, encarts, onglets — valeur par défaut */
  --radius-md:   4px;     /* modale, menu mobile plein écran */
  --radius-full: 9999px;  /* EXCEPTION UNIQUE : bouton circulaire à flèche */
}
```
Toute autre valeur de rayon est un bug.

### 5.5 Ombres et bordures

**La bordure remplace l'ombre.** Trois ombres existent, et uniquement pour des éléments qui flottent réellement au-dessus du contenu :

```css
:root {
  --shadow-none:   none;                                  /* défaut partout */
  --shadow-sticky: 0 1px 0 0 #E7E4DF;                     /* header compacté au scroll */
  --shadow-overlay:0 8px 32px -8px rgb(18 17 16 / 0.20);  /* menu mobile, lightbox */
  --shadow-focus:  0 0 0 2px #FFFFFF, 0 0 0 4px #E9323C;  /* anneau de focus sur blanc */
  --shadow-focus-ink: 0 0 0 2px #121110, 0 0 0 4px #E9323C;
}
```
**Interdit :** toute ombre sur une carte de plat, une image, un bouton ou un encart de contenu.
**Y compris sur une image qui chevauche deux sections** (§ 6.4) : c'est le décalage de la frontière qui crée
la profondeur, pas une ombre. Une ombre à cet endroit ferait « composant collé », l'effet recherché est
« photo posée dans la maquette ».

---

## 6. Vocabulaire de composants

### 6.1 Header / navigation

**Structure à deux étages (desktop) :**

- **Étage 1 — barre utilitaire**, fond `--surface-ink`, hauteur 36 px, texte `--text-on-ink-secondary` 13 px :
  `Rue de Genève 102, 1004 Lausanne`  ·  `Aujourd'hui : 11h45–13h30 · 18h45–22h00` (calculé en direct, pastille `--state-success` si ouvert, `--state-warning` si fermé)  ·  `+41 21 625 15 44` à droite, en lien `tel:`.
  → Ce bandeau est un **atout SEO local direct** : NAP + horaires visibles sur toutes les pages, cohérents avec le JSON-LD.
- **Étage 2 — navigation**, fond `--surface`, hauteur 72 px, filet bas `--border-hairline` :
  logo à gauche (hauteur 32 px, version noir + rouge sur fond clair) · nav centrée `LA CARTE · PIZZAS · LE RESTAURANT · GALERIE · CONTACT` en Archivo 13/600/CAPS/+0,12em · à droite le bouton primaire `RÉSERVER · 021 625 15 44`.

**Comportement au scroll :** les deux étages fusionnent en une barre de 56 px, fond `--surface` à 92 % + `backdrop-filter: blur(8px)`, `--shadow-sticky`. Transition 240 ms.

**Mobile :** logo centré, bouton menu à gauche, bouton téléphone à droite. Le panneau de navigation s'ouvre en plein écran sur `--surface-ink`, liens en Newsreader 32 px, apparition en cascade de 40 ms.

**Barre d'action fixe en bas d'écran (mobile uniquement, apparaît après 320 px de scroll) :** deux boutons pleine largeur à parts égales — `LA CARTE` (fond `--surface-ink`) et `APPELER` (fond `--red-600`). Hauteur 56 px + `env(safe-area-inset-bottom)`.
→ **C'est la réponse concrète au « menu en 1 clic ».**

### 6.2 Hero

- Photo pleine largeur, hauteur `72svh` mobile / `80vh` desktop, `object-fit: cover`, `fetchpriority="high"`, `loading="eager"`.
- Voile : `linear-gradient(to top, rgb(18 17 16 / 0.82) 0%, rgb(18 17 16 / 0.35) 45%, rgb(18 17 16 / 0.12) 100%)`. Toujours ce dégradé, jamais un aplat uniforme.
- Contenu aligné à gauche, ancré en bas, à `--sp-8` du bord bas.
  Eyebrow `RESTAURANT · LAUSANNE-MALLEY` → H1 Newsreader `--fs-display` en `--text-on-ink`, avec **un seul mot en italique** → chapô 1 ligne max, `--text-on-ink-secondary`.
- **Pas de bouton dans le hero.** Les CTA vivent dans le bandeau d'accès direct juste en dessous — c'est plus efficace et ça évite l'empilement.
- **Une seule photo, fixe. Pas de carrousel de hero.**

### 6.3 Bandeau d'accès direct (composant signature)

Encart `--surface` (blanc pur), largeur `--container-max`, **chevauchant le bas du hero de `--overlap-small`** (`margin-top: calc(-1 * var(--overlap-small))`, `position: relative; z-index: 2`). C'est la première occurrence du principe de chevauchement (§ 6.4) — ici c'est un bloc de contenu qui enjambe, ailleurs ce sont les photos.

Quatre cellules séparées par des filets verticaux `--border-hairline` (2×2 en mobile) :
`VOIR LA CARTE` · `RÉSERVER PAR TÉLÉPHONE` · `HORAIRES` · `ITINÉRAIRE`.
Chaque cellule : eyebrow + une ligne d'information + un chevron. Zone cliquable minimum 56 px de haut.
**Au survol** — puisqu'il n'existe pas de gris de fond : liseré supérieur 2 px `--red-500`, eyebrow qui passe en `--red-600`, chevron translaté de 4 px vers la droite. Jamais de fond gris ni de fond beige.

### 6.4 L'image-charnière — **le dispositif de composition signature**

Le site n'ayant plus qu'une seule nuance claire, il n'existe plus de teinte intermédiaire pour adoucir le passage du blanc à l'encre. Ce sont donc **les photos qui font la couture** : elles enjambent la frontière entre deux bandes. C'est ce qui empêche l'alternance binaire de ressembler à un empilement de blocs, et c'est ce qui donne aux images le statut qu'elles méritent — elles portent 15 % de la surface et toute la chaleur du site.

#### Variante A — Charnière verticale *(le dispositif principal)*

L'image est ancrée dans une bande et déborde dans la suivante de `--overlap` (40 px en mobile → 120 px en desktop).

```css
/* L'image enjambe la frontière */
.hinge {
  position: relative;
  z-index: 2;
  margin-bottom: calc(-1 * var(--overlap));
}
.hinge img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-0);   /* coins vifs, toujours */
  /* width/height dans le HTML + aspect-ratio en CSS : CLS = 0 */
}
/* La section qui reçoit le débordement compense son padding */
.section--receives-hinge {
  position: relative;
  z-index: 1;
  padding-top: calc(var(--section-y) + var(--overlap));
}
```

**Règles de la charnière — non négociables :**

1. **Sens unique : la lumière verse dans l'encre.** L'image est toujours ancrée dans la bande blanche et déborde dans la bande d'encre. L'inverse (une image qui remonte du noir vers le blanc) fait flotter l'image et casse la lecture.
   *Seule exception : le bandeau d'accès direct (§ 6.3), qui est un bloc de contenu, pas une photo, et qui descend du hero.*
2. **Trois charnières par page au maximum**, jamais deux consécutives. Au-delà, le procédé devient un tic et la page se met à onduler.
3. **Aucune ombre, aucune bordure, aucun arrondi.** La profondeur vient du décalage de la frontière — une ombre transformerait la photo en composant collé.
4. **Le conteneur ne doit jamais avoir `overflow: hidden`**, sinon le débordement est rogné. À vérifier explicitement en intégration.
5. **Rien de critique dans la zone de chevauchement** : ni titre, ni prix, ni bouton. La bande qui reçoit commence son contenu sous l'image.
6. **Mobile** : l'overlap tombe automatiquement à `--overlap-small` via le `clamp()`. Le chevauchement reste perceptible mais ne mange plus l'écran.

#### Variante B — Bord perdu latéral

L'image sort de la grille et touche le bord de l'écran d'un seul côté, tandis que le texte reste dans le conteneur. Utilisée pour les blocs « plat signature » et « la salle ». Technique robuste, sans `100vw` (qui provoque un débordement horizontal quand la barre de défilement est visible) :

```css
.section-grid {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--gutter), 1fr)
    [content-start] min(var(--container-max), 100% - var(--gutter) * 2) [content-end]
    minmax(var(--gutter), 1fr) [full-end];
}
.section-grid > *          { grid-column: content; }
.section-grid > .bleed-end { grid-column: content-start / full-end; }
```

#### Variante C — Respiration pleine largeur

Photo en 21:9 sur toute la largeur, intercalée **toutes les deux catégories** dans la section carte. Aucun texte dessus. Elle sert à aérer une longue liste sans en interrompre la lecture.

#### Où les photos vivent, sur la page d'accueil

| Position | Variante | Ratio | Rôle |
|---|---|---|---|
| Hero | Pleine largeur, pleine hauteur | 16:9 desktop / 4:5 mobile | Donner faim immédiatement |
| Plats signature | Grille 1 / 2 / 4 colonnes | 4:5 | Montrer, pas décrire |
| Entrée de la section carte | **Charnière A** (blanc → encre) | 3:2 | Coudre la bascule vers la carte |
| Dans la carte | Variante C | 21:9 | Respiration |
| Sortie de la section carte | **Charnière A** (blanc → encre du footer) | 3:2 | Coudre la fin de page |
| Bloc « la salle » | **Bord perdu B** | 4:5 | Situer le lieu |
| Galerie | Mosaïque alignée sur la grille | 3:2 et 2:3 | Prouver la régularité |

### 6.5 Section carte — **le cœur du site**

Fond `--surface-ink`, pleine largeur, `padding-block: --section-y`. C'est ici qu'on cite ouvertement la référence principale.

1. **En-tête** : eyebrow `LA CARTE` + H2 Newsreader en `--text-on-ink` + une ligne de contexte + un lien `TÉLÉCHARGER LA CARTE (PDF)` en tertiaire.
2. **Onglets de catégories** — `position: sticky; top: 56px`, fond `--surface-ink`, filet bas `--border-ink`, défilement horizontal en mobile avec fondu de bord :
   `ENTRÉES · ASSIETTES FROIDES · PASTA · RISOTTO · POISSONS · VIANDES · PIZZAS · MENU ENFANT`
   Archivo 13/600/CAPS/+0,12em. Inactif : `--text-on-ink-tertiary`. **Actif : `--text-on-ink` + soulignement 2 px `--red-500`** (glissant en 240 ms).
   ⚠️ Les onglets doivent être de **vrais liens `<a href="#pasta">`** vers des ancres, avec le contenu de toutes les catégories présent dans le HTML — condition indispensable pour l'indexation des plats.
3. **Liste de plats**, colonne `--container-read` centrée. Chaque ligne :
   ```
   Tagliatelle aux morilles ······················  32.—
   Crème, morilles fraîches, parmesan 24 mois
   ```
   - Nom : Newsreader 500 `--fs-dish`, `--text-on-ink`.
   - **Ligne de rappel** : `border-bottom: 1px dotted var(--border-ink-strong)` sur un `<span>` `flex: 1`, aligné sur la ligne de base du nom. **C'est la signature visuelle du site.**
   - Prix : Archivo 600 `--fs-body-sm`, `tabular-nums`, `--text-on-ink`, aligné à droite, format suisse `32.—`.
   - Description : Archivo 400 `--fs-body-sm`, `--text-on-ink-secondary`, `max-width: 60ch`.
   - Séparation entre plats : `padding-block: var(--sp-4)` + `border-bottom: 1px solid var(--border-ink)` (sauf le dernier).
   - Allergènes / options : petites capitales `--text-on-ink-tertiary` 12px, jamais de pictogramme coloré.
4. **Titres de catégorie** : Newsreader 500 CAPITALES +0,10em, `--text-on-ink`, précédés de `--sp-8`.
5. Une photo de plat pleine largeur intercalée **toutes les deux catégories** (ratio 21:9, coins vifs), pour aérer sans casser la lecture.

### 6.6 Carte de plat (plats signature)

Utilisée uniquement dans la section « Nos plats signature », sur `--surface`. Grille 1 / 2 / 4 colonnes.

- Photo ratio **4:5**, `--radius-0`, `object-fit: cover`, aucune ombre, aucune bordure.
- Sous la photo, à `--sp-4` : nom (Newsreader 500 `--fs-dish`, `--text-primary`) → description 2 lignes max (`--text-secondary`, `-webkit-line-clamp: 2`) → prix (`--red-600`, Archivo 600).
- **Aucun bouton dans la carte.** La carte entière est cliquable et amène à l'ancre correspondante dans la section carte.
- Survol : image `scale(1.04)` sur 600 ms, `overflow: hidden` sur le conteneur ; le nom passe en `--red-600`. **Pas de translation de la carte, pas d'ombre qui apparaît.**

### 6.7 Bandeau infos pratiques

**Le seul aplat rouge de la page.** Fond `--surface-brand` (`#A1171E`), texte `--text-on-brand` (7,14:1 — AAA).
Trois colonnes séparées par des filets `rgb(246 243 238 / 0.22)` :

| HORAIRES | ADRESSE | CONTACT |
|---|---|---|
| Lun–Sam 11h45–13h30 · Lun–Jeu 18h45–22h00 · Ven–Sam 18h45–22h30 · **Dimanche fermé** | Rue de Genève 102, 1004 Lausanne · Parking en face · *Itinéraire →* | +41 21 625 15 44 · etoile.restaurant@hotmail.com · *Réservation par téléphone* |

Chaque colonne : eyebrow en `rgb(246 243 238 / 0.72)` + contenu en `--text-on-brand`.
Boutons sur ce fond : contour `--text-on-brand` 1 px, fond transparent → au survol, fond `--text-on-brand` et texte `--surface-brand`.

En dessous, **le plan** : carte statique en niveaux de gris (`filter: grayscale(1) contrast(0.92)`), hauteur 400 px, avec un marqueur `--red-500`, et un encart `--surface` (blanc pur) superposé en haut à gauche (inspiration `09.40.54`) reprenant le NAP. Chargement de la carte interactive **au clic uniquement** (performance + RGPD).

### 6.8 Galerie

Fond `--surface`. Mosaïque asymétrique **mais alignée sur la grille** : rangée 1 = 2/3 + 1/3, rangée 2 = 1/3 + 1/3 + 1/3, rangée 3 = 1/3 + 2/3. Gouttière `--sp-2` (8 px seulement — les images se serrent, l'espace est ailleurs). Coins vifs, aucune bordure, aucune ombre.
Lightbox : fond `rgb(18 17 16 / 0.94)`, navigation clavier, `alt` descriptif sur chaque image. **Aucun défilement automatique.**

### 6.9 Footer

Fond `--surface-ink`, `padding-block: --section-y`.
- Ligne 1 : NAP complet + horaires + navigation, sur 4 colonnes, `--text-on-ink-secondary`, filet de séparation `--border-ink`.
- Ligne 2 : **le logo L'Étoile en très grand** (largeur 100 % du conteneur, opacité 0,14, monochrome `--text-on-ink`) — repris de `09.39.56`, mais en filigrane plutôt qu'en aplat, pour rester sobre.
- Ligne 3 : mentions légales, 13 px, `--text-on-ink-tertiary`.

### 6.10 Boutons et CTA

| Variante | Fond | Texte | Bordure | Survol | Usage |
|---|---|---|---|---|---|
| **Primaire** | `--red-600` | `#FFFFFF` (6,01:1) | aucune | fond `--red-700` | Réserver, Appeler |
| **Secondaire** | transparent | `--text-primary` | 1 px `--border-interactive` | fond `--surface-ink`, texte `--text-on-ink` | Voir la carte, Itinéraire |
| **Secondaire sur noir** | transparent | `--text-on-ink` | 1 px `--border-ink-strong` | fond `rgb(246 243 238 / 0.08)` | dans la section carte |
| **Tertiaire** | aucun | `--red-600` | soulignement 1 px, `text-underline-offset: 4px` | soulignement `--red-500` 2 px | liens de section |
| **Circulaire ★** | `--surface` (blanc) | `--text-primary` | 1 px `--border-default` | flèche translatée de 3 px | signature, navigation de galerie |

```css
.btn {
  font: 600 var(--fs-caption)/1 'Archivo', system-ui, sans-serif;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 0 var(--sp-5);
  min-height: 48px;              /* 56px pour les CTA principaux mobile */
  border-radius: var(--radius-sm);
  transition: background-color 200ms cubic-bezier(.22,.61,.36,1),
              color 200ms cubic-bezier(.22,.61,.36,1),
              border-color 200ms cubic-bezier(.22,.61,.36,1);
}
.btn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
```

**Le bouton d'appel est un CTA de premier rang**, pas un lien de contact : `<a href="tel:+41216251544">`, avec `data-analytics="call"`. La réservation étant téléphonique, la performance du site se mesure au nombre d'appels.

### 6.11 Formulaire de contact (page Contact uniquement — pas de réservation en ligne)

Champs : fond `--surface` (blanc pur — jamais un gris de champ), bordure 1 px `--border-interactive` (3,66:1 ✓), rayon `--radius-sm`, hauteur 48 px, `font-size: 16px` **impératif** (évite le zoom automatique iOS). Label toujours visible au-dessus, jamais de placeholder en guise de label. Focus : bordure `--text-primary` + `--shadow-focus`. Erreur : bordure `--red-600` + message 13 px `--red-700` + `aria-describedby`.

---

## 7. Motion

**Principe : le mouvement révèle, il ne divertit jamais.** Si une animation attire l'attention sur elle-même, elle est supprimée.

```css
:root {
  --dur-fast:  160ms;  /* micro-états : couleur, bordure, opacité */
  --dur-base:  240ms;  /* survols, onglets, ouverture de menu */
  --dur-slow:  400ms;  /* apparitions au scroll */
  --dur-image: 600ms;  /* zoom d'image au survol */

  --ease-out:  cubic-bezier(0.22, 0.61, 0.36, 1);   /* entrées, défaut */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* déplacements */
}
```

| Élément | Animation | Durée / courbe |
|---|---|---|
| Apparition de section au scroll | `opacity 0→1` + `translateY(12px→0)` | `--dur-slow` / `--ease-out`, **une seule fois** (`IntersectionObserver`, seuil 0,15) |
| Liste de plats | même effet, **en cascade de 60 ms**, plafonnée à 8 éléments | `--dur-slow` |
| Soulignement d'onglet actif | glissement horizontal | `--dur-base` / `--ease-in-out` |
| Survol d'image | `scale(1) → scale(1.04)` | `--dur-image` / `--ease-out` |
| Survol de bouton | couleur uniquement | `--dur-fast` |
| Flèche circulaire | `translateX(0 → 3px)` | `--dur-fast` |
| Header compacté | hauteur + fond + flou | `--dur-base` / `--ease-in-out` |
| Menu mobile | voile en fondu, puis liens en cascade de 40 ms | `--dur-base` |
| Compteur / chiffre | **aucun** | — |

**Interdits de motion :** parallaxe, défilement détourné (scroll-jacking), curseur personnalisé, éléments qui rebondissent (`spring` visible), carrousel automatique, texte qui s'écrit lettre par lettre, apparition d'une section à chaque re-passage du scroll, animation supérieure à 600 ms.

**`prefers-reduced-motion` — implémentation obligatoire, pas optionnelle :**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Le contenu doit être visible SANS le script d'apparition */
  [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```
Les changements de couleur au survol restent actifs (ils portent une information d'état). Seuls les transformations et les défilements sont neutralisés. **Le contenu doit rester lisible même si JavaScript échoue** : `opacity: 0` par défaut est interdit sans classe `.js` sur `<html>`.

---

## 8. Imagerie et matières

Les photos de plats existantes du site actuel sont réutilisées — c'est une contrainte, elle se gère par un **traitement d'harmonisation systématique**.

### 8.1 Direction photo

- **Sujet** : le plat seul, ou le plat dans les mains du serveur. Pas de personnel qui pose, pas de photo de l'équipe, pas de portrait de chef (le brief exclut le storytelling).
- **Angles** : vue de dessus (90°) pour les pastas, risottos et pizzas ; vue à 45° pour les viandes et les assiettes construites. Une seule vue par grille, jamais un mélange dans la même rangée.
- **Fond** : sombre et mat (ardoise, bois foncé, nappe grise). Aucun fond blanc surexposé.
- **Lumière** : unique, latérale et rasante, ombres nettes assumées. Pas de flash frontal, pas d'éclairage annulaire.
- **Cadrage** : le plat occupe 60–75 % du cadre, avec une marge de sécurité de 8 % pour permettre les recadrages en 4:5, 3:2 et 21:9.

### 8.2 Traitement d'harmonisation (à appliquer à tout le fonds existant)

```
Température      +150 K  (vers le chaud — la photo est désormais la SEULE source
                          de chaleur de la page, le fond n'en apporte plus)
Exposition       +0,15 EV
Contraste        +8
Hautes lumières  −12  (récupérer les sauces brûlées)
Noirs            −6   (ancrer l'image dans le fond sombre)
Saturation       −4   (éviter le rouge criard qui concurrence la marque)
Vibrance         +6   (relever les verts et les jaunes)
Netteté          +20, rayon 0,8
Vignettage       −8, très doux
```
**Aucun filtre de couleur, aucun noir et blanc, aucun virage sépia.** Le grain est interdit sur les plats (il lit « sale » sur de la nourriture) ; il est toléré à 2 % maximum sur les photos d'ambiance de salle.

### 8.3 Formats et ratios

| Usage | Ratio | Largeurs `srcset` |
|---|---|---|
| Hero | 16:9 (desktop) / 4:5 (mobile, via `<picture>`) | 800 / 1200 / 1600 / 2000 |
| Carte de plat | 4:5 | 400 / 600 / 800 |
| Séparateur de carte | 21:9 | 800 / 1400 / 2000 |
| Galerie | 3:2 et 2:3 alternés | 600 / 900 / 1200 |

AVIF avec repli WebP, `<img>` toujours doté de `width`/`height` (zéro CLS), `loading="lazy"` partout **sauf le hero**, `alt` descriptif orienté SEO local (« Tagliatelle aux morilles servies au Restaurant L'Étoile à Lausanne »).

### 8.4 Matières et textures

**La page n'a aucune texture.** Le blanc `#FFFFFF` est un aplat pur — pas de papier scanné, pas de bruit, pas de motif, pas de teinte. La matière vient **exclusivement de la photographie**. C'est ce qui garde le rendu « clean » exigé par le brief, et c'est aussi ce qui rend le fonds photographique critique : sur un fond blanc pur, une photo terne ou mal cadrée n'a plus rien pour se rattraper.

> **Conséquence directe sur la production.** Avec une seule nuance claire et 15 % de la surface en images, la qualité photo n'est plus un confort, c'est la condition du résultat. Les visuels du site actuel sont compressés par Wix : il faut soit les originaux, soit une séance photo. C'est le point de blocage n° 1 du projet.

Seule exception tolérée : un `background-blend-mode: multiply` avec un bruit à 1,5 % d'opacité sur `--surface-ink`, pour éviter le banding du dégradé du hero sur les grands écrans.

### 8.5 Iconographie

Trait 1,5 px, coins carrés, `currentColor`, **jamais de remplissage, jamais de couleur propre**. Jeu limité à 8 icônes : téléphone, épingle, horloge, chevron, flèche, croix, menu, PDF. Source recommandée : Lucide, corrigé en `stroke-width: 1.5`. **Aucun emoji nulle part**, y compris dans les listes et les titres.

---

## 9. Ce qu'on ne fait pas — interdits explicites

### 9.1 Tics d'IA et de template (rejet immédiat)

- Dégradé violet/indigo, ou tout dégradé multicolore — **la seule dégradé du site est le voile noir du hero**.
- `Inter` en typographie de titre, `Poppins`, `Montserrat`, `Playfair Display`.
- Cartes à `border-radius: 16px` avec ombre douce diffuse.
- **Cartes dans des cartes** : un encart posé sur un fond gris posé sur un fond blanc. Interdit à tous les niveaux.
- Badges arrondis colorés (« Nouveau », « Populaire », « Chef's choice »).
- Grilles de « features » avec une icône ronde colorée au-dessus de chaque titre.
- Sections « Nos valeurs », « Notre histoire depuis 19XX », « Notre philosophie » — **le brief les exclut explicitement**.
- Compteurs animés (« 20 ans d'expérience », « 5000 clients heureux »).
- Bouton fantôme blanc translucide posé sur photo.
- Glassmorphism, neumorphism, bordure en dégradé, halo lumineux.

### 9.2 Interdits propres à ce projet

- **Une deuxième nuance claire.** Blanc cassé, crème, beige, `#FAFAFA`, gris très clair : tous interdits en fond, en carte, en champ de formulaire et en survol. Il n'existe qu'un seul clair, `#FFFFFF`.
- **Un gris de fond pour distinguer un bloc.** La distinction se fait par le filet 1 px ou par le passage à l'encre, jamais par une nuance.
- **Le rouge en fond de plus d'une section.** Un seul aplat rouge par page, sur le bandeau infos pratiques.
- **Une image qui remonte du noir vers le blanc.** Les charnières vont toujours dans le sens clair → encre (§ 6.4).
- **Plus de trois chevauchements par page**, ou deux consécutifs : le procédé devient un tic et la page ondule.
- **Une ombre portée sous une image qui chevauche.** La profondeur vient du décalage, pas de l'ombre.
- **Le rouge en texte courant** (`--red-500` échoue AA — utiliser `--red-600`).
- **Le noir pur `#000000` en fond.** Il est réservé au logo.
- **Un deuxième script/cursive** : le logo est déjà manuscrit.
- **La carte en PDF seule.** Le PDF est un complément téléchargeable ; la carte doit exister en HTML indexable, sinon aucun plat ne remonte dans Google.
- **Un carrousel pour présenter la carte.** Chaque plat masqué est un plat non indexé et non lu.
- **Un formulaire de réservation en ligne** tant que le restaurant réserve par téléphone : un formulaire qui n'aboutit pas est pire qu'un numéro visible.
- **Plus de 5 entrées de navigation** dans le header.
- **Plus de 2 CTA visibles simultanément** dans une même zone.
- **Le vert** dans la palette (cliché italien + risque de collision avec le rouge).
- **Faire défiler horizontalement autre chose que les onglets de catégories.**
- **Écrire « L'Etoile »** sans accent ni apostrophe typographique.
- **Copier la composition de `09.39.56` (L'Essence du Rouge)** : template Framer largement diffusé, identité trop reconnaissable. On en reprend les principes, jamais la mise en page.
- **Copier la référence principale telle quelle** : elle est intégralement sombre. Notre version est claire, ponctuée de noir. C'est cet écart qui fait l'identité de L'Étoile.

---

## 10. Repères techniques pour l'intégration

**SEO local — non négociable :**
- JSON-LD `Restaurant` en tête de chaque page : `name`, `address` (PostalAddress complet), `telephone`, `geo`, `openingHoursSpecification` (les 4 plages réelles, dimanche fermé), `servesCuisine: ["Italienne","Brasserie"]`, `priceRange`, `acceptsReservations: "Telephone"`, `hasMenu` pointant vers `/carte`.
- JSON-LD `Menu` + `MenuSection` + `MenuItem` avec `offers.price` et `priceCurrency: "CHF"` sur la page carte.
- NAP **strictement identique** entre le site, Google Business Profile, search.ch, local.ch et TheFork.
- URLs : `/carte`, `/pizzas`, `/reservation`, `/contact`. `<title>` de la carte : « La carte — Restaurant L'Étoile, Lausanne-Malley ».
- Un `<h1>` unique par page contenant la ville.

**Performance (objectifs) :** LCP < 2,0 s (hero en AVIF préchargé), CLS = 0 (dimensions sur toutes les images), INP < 200 ms, poids de la page d'accueil < 900 Ko. Deux fichiers de police seulement en chargement critique. Aucune bibliothèque d'animation supérieure à 15 Ko — `IntersectionObserver` + transitions CSS suffisent à tout ce qui est décrit ici.

**Accessibilité :** cible **WCAG 2.1 AA**, tous les couples de couleur du § 3 étant déjà vérifiés. Navigation clavier complète, `:focus-visible` toujours visible (jamais `outline: none` sans remplacement), lien d'évitement vers le contenu, zones tactiles ≥ 48 × 48 px, `lang="fr-CH"`.

---

## 11. En une phrase

> **L'Étoile, c'est une carte de restaurant magnifiquement imprimée sur nappe blanche : blanc pur, encre noire éditoriale, un rouge qui ne sert qu'à montrer où regarder — et des photos qui enjambent les sections pour tout tenir ensemble.**
