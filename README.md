# Site du Restaurant L’Étoile

Le site de L’Étoile, rue de Genève 102 à Lausanne. Quatre pages : l’accueil, la carte,
les pizzas et le contact.

C’est un site en **HTML, CSS et JavaScript ordinaires**. Rien à installer, rien à
compiler, aucun outil. Vous ouvrez un fichier, vous le modifiez, vous l’envoyez.

**Le site est noir.** Un noir profond, très légèrement chaud, sur lequel les
photographies — toutes prises à la bougie — se détachent comme sur une nappe sombre.

Le principe : **la carte d’abord**. Un visiteur doit pouvoir lire tous les plats et
tous les prix en un clic, puis appeler. La réservation se fait au téléphone, donc le
bouton d’appel est présent partout, y compris dans une barre fixe en bas de l’écran
sur téléphone.

---

## Voir le site sur votre ordinateur

Double-cliquez sur **`index.html`**. Il s’ouvre dans votre navigateur. C’est tout.

Tout fonctionne ainsi, à une exception près : le plan d’accès et le formulaire de
contact demandent une vraie adresse `http://`. Pour les essayer, faites glisser le
dossier dans un petit serveur local, ou regardez-les directement en ligne.

---

## Ce qu’il y a dans le dossier

| Fichier ou dossier | Contenu |
| --- | --- |
| `index.html` | L’accueil |
| `carte.html` | La carte complète |
| `pizzas.html` | Les pizzas |
| `contact.html` | Contact, horaires, plan et formulaire |
| `404.html` | La page affichée quand une adresse n’existe pas |
| `css/` | Cinq feuilles de style, une par sujet (voir plus bas) |
| `js/` | Huit petits fichiers, un par comportement (voir plus bas) |
| `scripts/` | Un vérificateur de contraste des couleurs. Ne sert qu'à vous |
| `images/` | Toutes les photos et le logo |
| `fonts/` | Les polices du site, hébergées ici plutôt que chez Google |
| `photos-source/` | Les photos d’origine, avant recadrage. Ne sont pas publiées |
| `robots.txt`, `sitemap.xml` | Ce que Google lit pour référencer le site |
| `.nojekyll` | Indispensable à GitHub Pages. **Ne pas supprimer** (voir plus bas) |

Les trois documents de cadrage — `DIRECTION-ARTISTIQUE.md`, `PHOTOS-A-FOURNIR.md` et
`CONTENU-SITE-ACTUEL.md` — sont conservés à la racine.

---

## Modifier un prix ou un plat

Ouvrez le fichier de la page concernée dans un éditeur de texte, cherchez le nom du
plat, et modifiez ce qui l’entoure. Une ligne de carte ressemble à ceci :

```html
<li class="lignedeplat-plat">
  <p class="lignedeplat-ligne">
    <span class="lignedeplat-nom">Risotto aux morilles</span>
    <span class="lignedeplat-rappel" aria-hidden="true"></span>
    <span class="lignedeplat-prix">23.—</span>
  </p>
  <p class="lignedeplat-description">Crème fraîche, pointes de morilles</p>
</li>
```

- **Changer un prix** → modifiez le contenu de `lignedeplat-prix`. On écrit `23.—`
  pour 23 francs et `8.50` pour huit francs cinquante.
- **Ajouter un plat** → recopiez un bloc `<li>…</li>` entier au bon endroit et
  modifiez-le.
- **Retirer un plat** → supprimez son bloc `<li>…</li>` en entier, de la balise
  ouvrante à la fermante.

### Attention : certaines informations existent à plusieurs endroits

C’est la contrepartie d’un site en HTML écrit à la main. Si vous changez l’une de ces
informations, **cherchez-la dans les quatre pages** et corrigez-la partout :

| Information | Où elle apparaît |
| --- | --- |
| Le téléphone | En-tête, pied de page, barre du bas sur mobile, page Contact |
| Les horaires | Pied de page, page Contact, bande d'accès direct, et `js/horaires.js` |
| L’adresse | En-tête, pied de page, page Contact, menu mobile |
| Le nombre de plats d’une catégorie | Encadré « Tout est là » de l’accueil |

Un moteur de recherche compare ces informations à votre fiche Google, à local.ch et à
search.ch : la moindre différence affaiblit votre position dans les recherches locales.

### Les horaires servent deux fois

Le bandeau « Ouvert / Fermé » en haut de page est calculé en direct, à l’heure de
Lausanne, quel que soit le pays depuis lequel on consulte le site. Ce calcul lit ses
propres horaires, dans **`js/horaires.js`**, au bloc `HORAIRES`. Si vous changez
une heure d’ouverture, changez-la là aussi — sinon le bandeau annoncera « Ouvert »
quand la porte est fermée.

---

## Remplacer une photo

Déposez votre fichier dans `images/` **avec exactement le même nom** que celui que vous
remplacez, et **aux mêmes dimensions**. Rien d’autre à faire.

Les noms contiennent un millésime — `hero-salle-2026-08d.jpg`. Gardez-le : les
navigateurs retiennent les images d’après leur adresse, et une photo remplacée sous le
même nom continuerait de s’afficher en ancienne version chez les visiteurs déjà venus.
Pour forcer le changement, donnez un nouveau millésime au fichier **et** corrigez son
nom dans les pages qui l’utilisent.

La liste complète des emplacements, avec le format et la taille attendus, est dans
**`PHOTOS-A-FOURNIR.md`** — c’est aussi le document à remettre au photographe.

---

## Mettre le site en ligne

Il n’y a rien à construire. Les fichiers du dossier **sont** le site.

### Sur le FTP d’Infomaniak

Envoyez tout le contenu du dossier à la racine du site (souvent `web/` ou
`public_html/`), à l’exception de `photos-source/` et des trois fichiers `.md`, qui ne
servent qu’à vous.

### Sur GitHub Pages

Settings → Pages → Source → **Deploy from a branch** → branche `main`, dossier `/ (root)`.

Rien d’autre. Le fichier `.nojekyll` à la racine est ce qui empêche GitHub de tenter
d’interpréter le site avec Jekyll — **ne le supprimez pas**, sans lui la mise en page
disparaît.

---

## Le formulaire de contact

Le site n’a pas de serveur : il ne peut donc pas recevoir un message lui-même. Le
formulaire s’adresse à un **service de réception** — Formspree, Basin, Formcarry, ou
un script sur votre hébergement.

Dans **`contact.html`**, cherchez `formspree.io/f/VOTRE-IDENTIFIANT` et remplacez cette
adresse par la vôtre. Tant que ce n’est pas fait, l’envoi échoue proprement : le
visiteur voit un message et le numéro de téléphone du restaurant.

C’est volontairement **un formulaire de contact, pas de réservation** : une demande de
table qui n’aboutirait pas serait pire qu’un numéro bien visible.

---

## Les feuilles de style

Cinq fichiers, du plus général au plus particulier. Chaque page les appelle tous les
cinq, dans cet ordre :

| Fichier | Ce qu'il contient |
| --- | --- |
| `css/tokens.css` | **Les réglages du site** : les trois polices, toutes les couleurs, les tailles de texte, les espacements. C'est le seul fichier à ouvrir pour changer l'allure du site |
| `css/base.css` | La remise à zéro du navigateur, les titres, les colonnes |
| `css/composants.css` | Les boutons, l'en-tête, le menu du téléphone, le pied de page |
| `css/accueil.css` | Uniquement la page d'accueil |
| `css/pages.css` | La carte, les pizzas, le contact, la page d'erreur |

**Pour changer une couleur, ouvrez `css/tokens.css` et rien d'autre.** Toutes les
couleurs y sont nommées une seule fois ; le reste du site s'y réfère.

Les trois noirs du site :

| Réglage | Où | Couleur |
| --- | --- | --- |
| `--nuit` | Le fond de presque tout | `#0A0908` |
| `--nuit-claire` | Les bandes qui se détachent | `#131110` |
| `--nuit-profonde` | Le pied de page | `#050404` |

Après toute retouche, lancez **`node scripts/verifier-contraste.mjs`** : il compare les
vingt couples texte/fond du site à la norme d'accessibilité et vous dit lesquels sont
devenus trop pâles pour être lus.

### La machine à écrire

Les petits textes qu'on repère sans les lire — intertitres, boutons, légendes,
chiffres — sont composés dans une **machine à écrire**. C'est ce qui donne au site
son air de document imprimé plutôt que d'interface.

Le fichier de la bonne police n'a pas pu être téléchargé depuis ici. En attendant, le
site utilise le Courier de l'appareil, qui fait le travail. **Pour installer la version
définitive, une seule commande à lancer depuis le dossier du site :**

```
curl -L -o fonts/courier-prime.woff2 "https://cdn.jsdelivr.net/fontsource/fonts/courier-prime@latest/latin-400-normal.woff2"
```

Rien d'autre à faire : le site la prendra tout seul au prochain rafraîchissement.

---

### L'apparition des photos

La page ne s'ouvre pas sur une photographie : d'abord une phrase sur du papier, puis les
photographies en ruban, en pleine lumière. C'est voulu — un grand visuel en ouverture
oblige à poser du texte blanc dessus, donc à assombrir la photo, donc à choisir entre lire
et voir.

Les blocs montent de trente pixels en apparaissant, sur près de deux secondes et demie.
C'est volontairement très lent : c'est cette lenteur qui donne l'impression de calme.
Une apparition rapide, on la remarque.

Les photographies, elles, glissent doucement à l'intérieur de leur cadre pendant qu'on
descend la page — le cadre ne bouge pas, l'image oui. Elle paraît alors se trouver
derrière la page plutôt que posée dessus.

Les trois réglages sont en haut de `css/tokens.css`, sous le titre
**« L'apparition des photographies »** :

| Réglage | Effet | Valeur |
| --- | --- | --- |
| `--dur-apparition` | Durée de la montée | `2.4s` |
| `--retard-apparition` | Temps mort avant qu'elle commence | `0.2s` |
| `--montee-apparition` | Hauteur de la montée | `30px` |

Tout s'arrête si l'ordinateur ou le téléphone est réglé sur « réduire les animations ».

---

## Ce que font les fichiers de `js/`

Un fichier par comportement, indépendants les uns des autres :

| Fichier | Ce qu'il fait |
| --- | --- |
| `js/apparitions.js` | Fait apparaître les blocs en douceur au défilement |
| `js/entete.js` | Rend l'en-tête opaque dès qu'on a commencé à lire |
| `js/barre-action.js` | Fait monter la barre d'appel en bas de l'écran, sur téléphone |
| `js/menu-mobile.js` | Ouvre et ferme le menu du téléphone |
| `js/horaires.js` | Calcule « Ouvert / Fermé » à l'heure de Lausanne |
| `js/galerie.js` | Les deux flèches du ruban de photographies de l'accueil |
| `js/plan.js` | Ne contacte OpenStreetMap qu'au clic du visiteur |
| `js/formulaire.js` | Vérifie le formulaire de contact et affiche la réponse sur place |

Le site reste **entièrement lisible sans ces fichiers** : les liens sont de vrais liens,
la carte est écrite en entier dans les pages, le ruban de photographies se fait glisser
au doigt, et le formulaire s'envoie tout seul. Ils n'ajoutent que du confort.

`js/apparitions.js` est le seul appelé dans l'en-tête du document plutôt qu'en bas de
page : il doit s'exécuter avant le premier affichage, sinon les blocs se verraient puis
disparaîtraient avant de réapparaître.

---

## Bon à savoir

- Le site respecte le réglage « réduire les animations » du système.
- Le plan d’accès ne contacte aucun service extérieur tant que le visiteur n’a pas
  cliqué dessus.
- Les polices sont hébergées avec le site, elles ne sont pas demandées à Google.
- L’apostrophe s’écrit toujours `’` (courbe), jamais `'`. Faites un copier-coller
  depuis une ligne existante en cas de doute. On écrit « L’Étoile », avec le É
  majuscule accentué.
