# Site du Restaurant L’Étoile

Le site de L’Étoile, rue de Genève 102 à Lausanne. Quatre pages : l’accueil, la carte,
les pizzas et le contact.

C’est un site en **HTML, CSS et JavaScript ordinaires**. Rien à installer, rien à
compiler, aucun outil. Vous ouvrez un fichier, vous le modifiez, vous l’envoyez.

Deux principes tiennent le dessin :

- **Le téléphone d’abord.** Tout est composé pour un écran de 390 pixels, puis
  élargi. Rien ne se fait défiler horizontalement, rien n’est caché derrière un
  geste.
- **La carte d’abord.** Un visiteur doit lire tous les plats et tous les prix en un
  clic, puis appeler. La réservation se fait au téléphone : le bouton d’appel est
  présent partout, y compris dans une barre fixe en bas de l’écran sur téléphone.

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
| `js/script.js` | Les six comportements de la page (voir plus bas) |
| `images/` | Toutes les photos et le logo |
| `fonts/` | Les deux polices du site, hébergées ici plutôt que chez Google |
| `photos-source/` | Les photos d’origine, avant recadrage. Ne sont pas publiées |
| `robots.txt`, `sitemap.xml` | Ce que Google lit pour référencer le site |
| `.nojekyll` | Indispensable à GitHub Pages. **Ne pas supprimer** (voir plus bas) |

Les trois documents de cadrage — `DIRECTION-ARTISTIQUE.md`, `PHOTOS-A-FOURNIR.md` et
`CONTENU-SITE-ACTUEL.md` — sont conservés à la racine.

---

## Le dessin en trois lignes

Quatre couleurs franches, comme une enseigne : la **crème** est le papier, le
**rouge** vient du logo, le **vert** porte les grands aplats, le **jaune** ne sert
qu’à ponctuer.

Deux polices : **Bitter** — une slab serif épaisse — pour les titres en capitales,
**Archivo** pour le texte courant.

Un motif : **l’étoile** du nom. Elle marque la page en cours, sépare les sections,
ponctue le menu et le pied de page.

Tout se règle au même endroit : le bloc `:root` en haut de `css/style.css`. Changez
`--rouge` là, il change partout.

---

## Modifier un prix ou un plat

Ouvrez le fichier de la page concernée dans un éditeur de texte, cherchez le nom du
plat, et modifiez ce qui l’entoure. Une ligne de carte ressemble à ceci :

```html
<li class="plat">
  <p class="plat__ligne">
    <span class="plat__nom">Risotto aux morilles</span>
    <span class="plat__rappel" aria-hidden="true"></span>
    <span class="plat__prix">23.—</span>
  </p>
  <p class="plat__description">Crème fraîche, pointes de morilles</p>
</li>
```

- **Changer un prix** → modifiez le contenu de `plat__prix`. On écrit `23.—` pour
  23 francs et `8.50` pour huit francs cinquante.
- **Ajouter un plat** → recopiez un bloc `<li>…</li>` entier au bon endroit et
  modifiez-le.
- **Retirer un plat** → supprimez son bloc `<li>…</li>` en entier, de la balise
  ouvrante à la fermante.

### Attention : certaines informations existent à plusieurs endroits

C’est la contrepartie d’un site en HTML écrit à la main. Si vous changez l’une de ces
informations, **cherchez-la dans les cinq pages** et corrigez-la partout :

| Information | Où elle apparaît |
| --- | --- |
| Le téléphone | En-tête, menu, pied de page, barre du bas sur mobile, page Contact |
| Les horaires | Accueil (« Venir chez nous »), page Contact, et `js/script.js` (bloc `HORAIRES`) |
| L’adresse | En-tête, menu, pied de page, page Contact |
| Le nombre de plats ou de pizzas | Encadrés « Les cartes » de l’accueil, en-têtes des pages Carte et Pizzas |

Un moteur de recherche compare ces informations à votre fiche Google, à local.ch et à
search.ch : la moindre différence affaiblit votre position dans les recherches locales.

### Les horaires servent deux fois

La pastille « Ouvert / Fermé » de l’en-tête est calculée en direct, à l’heure de
Lausanne, quel que soit le pays depuis lequel on consulte le site. Ce calcul lit ses
propres horaires, dans **`js/script.js`**, au bloc commenté `HORAIRES`. Si vous changez
une heure d’ouverture, changez-la là aussi — sinon la pastille annoncera « Ouvert »
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

Les neuf `ruban-1` à `ruban-9` sont les tirages réduits (560 × 420) de la bande qui
défile sur l’accueil. Ils sont volontairement légers : la bande est décorative, elle ne
doit pas peser le poids des grandes photographies.

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

1. **Le diaporama de l’accueil** fait se succéder trois vues en fondu, et va chercher
   les deux dernières une fois la page affichée.
2. **La bande d’images** charge ses photos quand on approche d’elle.
3. **Le menu de téléphone** s’ouvre et se ferme.
4. **Ouvert / Fermé** se calcule à l’heure de Lausanne.
5. **La barre d’appel** apparaît en bas de l’écran sur téléphone.
6. **Le plan** ne contacte OpenStreetMap qu’au clic du visiteur.
7. **Le formulaire de contact** vérifie les champs et affiche la réponse sur place.

Le site reste **entièrement lisible sans ce fichier** : les liens sont de vrais liens,
la carte est écrite en entier dans les pages, le formulaire s’envoie tout seul, et la
première vue du diaporama est déjà affichée. Seule la bande d’images ne s’affiche pas
— elle est décorative, et une rangée de cadres vides vaudrait moins que rien. Le
script n’ajoute que du confort.

Un septième comportement, l’apparition des blocs au défilement, est écrit directement
dans l’en-tête de chaque page : il doit s’exécuter avant le premier affichage, sinon
les blocs se verraient puis disparaîtraient avant de réapparaître.

---

## Bon à savoir

- Le site respecte le réglage « réduire les animations » du système : le diaporama
  s’arrête, la bande cesse de défiler, les blocs ne montent plus.
- Le plan d’accès ne contacte aucun service extérieur tant que le visiteur n’a pas
  cliqué dessus.
- Les polices sont hébergées avec le site, elles ne sont pas demandées à Google.
- L’apostrophe s’écrit toujours `’` (courbe), jamais `'`. Faites un copier-coller
  depuis une ligne existante en cas de doute. On écrit « L’Étoile », avec le É
  majuscule accentué.
