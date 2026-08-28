# Site du Restaurant L’Étoile

Le site de L’Étoile, rue de Genève 102 à Lausanne. Quatre pages : l’accueil, la carte,
les pizzas et le contact.

C’est un site en **HTML, CSS et JavaScript ordinaires**. Rien à installer, rien à
compiler, aucun outil. Vous ouvrez un fichier, vous le modifiez, vous l’envoyez.

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
| `css/style.css` | Toutes les couleurs, tailles et espacements du site |
| `js/script.js` | Les sept comportements de la page (voir plus bas) |
| `images/` | Toutes les photos et le logo |
| `fonts/` | Les deux polices du site, hébergées ici plutôt que chez Google ou Fontshare |
| `photos-source/` | Les photos d’origine, avant recadrage. Ne sont pas publiées |
| `robots.txt`, `sitemap.xml` | Ce que Google lit pour référencer le site |
| `.nojekyll` | Indispensable à GitHub Pages. **Ne pas supprimer** (voir plus bas) |

Les documents de cadrage — `DIRECTION-ARTISTIQUE.md`, `PHOTOS-A-FOURNIR.md`,
`CONTENU-SITE-ACTUEL.md` et la planche `planche-da.html` — sont conservés à la racine. Ils
ne font pas partie du site et ne sont pas mis en ligne. Ils décrivent la **première**
direction artistique : la palette et la typographie ont depuis été révisées, et chacun
s’ouvre sur un encadré qui dit ce qui a changé. **La référence à jour, ce sont les jetons
de `css/style.css`.**

---

## Les cinq pièces de l’accueil

L’accueil n’est plus une suite de blocs de même taille. Cinq pièces lui donnent son
rythme, et chacune est **la seule de son espèce** : répétées, elles redeviendraient un
gabarit.

| Pièce | Où la modifier |
| --- | --- |
| **Le bandeau plein écran** | `index.html`, `<section class="hero">`. La photographie s’y trouve en deux cadrages : le vertical sous 700 px, le large au-dessus |
| **Le ruban de mots** | `index.html`, `<div class="ruban">`. Les cinq mots sont écrits **deux fois** — c’est ce qui rend la boucle invisible. Si vous en changez un, changez-le dans les deux copies |
| **Le mur de chiffres** | `index.html`, `<dl class="chiffres-mur">`. Quatre nombres, à garder d’accord avec la carte |
| **Le ruban d’images** | `index.html`, `<ul class="galerie-bande">`. Huit images, écrites deux fois elles aussi. La seconde copie porte `aria-hidden` : elle ne dit rien de plus |
| **Le bouton fixe** | Présent sur les cinq pages, en bas de chaque fichier. Le script le montre passé 520 px de défilement |

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
| Le téléphone | En-tête, pied de page, barre du bas sur mobile, page Contact, `js/script.js` |
| Les horaires | Pied de page, page Contact, bandeau du haut, et `js/script.js` (bloc `HORAIRES`) |
| L’adresse | En-tête, pied de page, page Contact, menu mobile |
| Le nombre de plats d’une catégorie | Encadré « Tout est là » de l’accueil |

Un moteur de recherche compare ces informations à votre fiche Google, à local.ch et à
search.ch : la moindre différence affaiblit votre position dans les recherches locales.

### Les horaires servent deux fois

Le bandeau « Ouvert / Fermé » en haut de page est calculé en direct, à l’heure de
Lausanne, quel que soit le pays depuis lequel on consulte le site. Ce calcul lit ses
propres horaires, dans **`js/script.js`**, au bloc commenté `HORAIRES`. Si vous changez
une heure d’ouverture, changez-la là aussi — sinon le bandeau annoncera « Ouvert »
quand la porte est fermée.

---

## Les couleurs et les polices

Tout se règle au même endroit, dans le bloc `:root` en haut de **`css/style.css`**. Les
couleurs y sont nommées deux fois : d’abord la palette brute (`--red-500`, `--surface-ink`,
`--surface`…), puis les rôles qui s’en servent (`--accent`, `--encre`, `--fond`…). On change
la palette, jamais les rôles.

| Jeton | Valeur | Ce que c’est |
| --- | --- | --- |
| `--red-500` | `#C8322A` | Le rouge d’identité — celui du logo. Un rouge laqué, chaud |
| `--red-600` | `#AB2117` | Le rouge du texte et des liens sur le papier |
| `--red-700` | `#8E1B14` | Le rouge des bandeaux pleins et du ruban |
| `--surface-ink` | `#0E0B0A` | Le noir des sections sombres |
| `--surface` | `#F7F1E7` | Le papier |
| `--laiton` | `#C39B5A` | Un laiton, pour les détails. Réservé, presque jamais employé |

**Si vous changez `--red-500`, changez aussi le rouge du logo** : il est écrit en dur dans
`images/logo-letoile.svg`, `logo-letoile-clair.svg` et `logo-mono.svg`. Cherchez la valeur
et remplacez-la dans les trois.

Les deux polices sont **Fraunces** (les titres, les noms de plats, les prix) et **Switzer**
(tout le reste). Switzer est dessinée par l’Indian Type Foundry et distribuée sur
[Fontshare](https://www.fontshare.com/fonts/switzer) ; les quatre graisses employées sont
dans `fonts/`, et rien n’est demandé à un serveur extérieur. Pour en changer, déposez le
`.woff2` dans `fonts/` et corrigez les blocs `@font-face` en haut de la feuille de style —
puis les deux `<link rel="preload">` en tête de chaque page.

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

## Ce que fait `js/script.js`

Sept comportements, indépendants les uns des autres, chacun dans son bloc commenté :

1. **L’en-tête** se compacte après quarante pixels de défilement. Sur l’accueil, il devient
   en plus transparent tant que la photographie d’ouverture est derrière lui.
2. **Le bouton « Réserver » fixe** (grand écran) et **le filet de lecture** en haut de page.
3. **La barre d’appel** apparaît en bas de l’écran sur téléphone.
4. **Le menu mobile** s’ouvre et se ferme.
5. **Ouvert / Fermé** se calcule à l’heure de Lausanne.
6. **Le plan** ne contacte OpenStreetMap qu’au clic du visiteur.
7. **Le formulaire de contact** vérifie les champs et affiche la réponse sur place.

Le site reste **entièrement lisible sans ce fichier** : les liens sont de vrais liens,
la carte est écrite en entier dans les pages, le formulaire s’envoie tout seul. Le
script n’ajoute que du confort.

Un septième comportement, l’apparition des blocs au défilement, est écrit directement
dans l’en-tête de chaque page : il doit s’exécuter avant le premier affichage, sinon
les blocs se verraient puis disparaîtraient avant de réapparaître.

---

## Bon à savoir

- Le site respecte le réglage « réduire les animations » du système.
- Le plan d’accès ne contacte aucun service extérieur tant que le visiteur n’a pas
  cliqué dessus.
- Les polices sont hébergées avec le site : ni Google ni Fontshare ne sont contactés.
- L’apostrophe s’écrit toujours `’` (courbe), jamais `'`. Faites un copier-coller
  depuis une ligne existante en cas de doute. On écrit « L’Étoile », avec le É
  majuscule accentué.
