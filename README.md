# Site du Restaurant L’Étoile

Le site de L’Étoile, rue de Genève 102 à Lausanne. Quatre pages : l’accueil, la carte,
les pizzas et le contact.

Le principe est simple : **la carte d’abord**. Un visiteur doit pouvoir lire tous les
plats et tous les prix en un clic, puis appeler. La réservation se fait au téléphone,
donc le bouton d’appel est présent partout, y compris dans une barre fixe en bas de
l’écran sur téléphone.

---

## Lancer le site sur votre ordinateur

Une seule fois, pour installer :

```bash
npm install
```

Puis, à chaque fois que vous voulez voir le site :

```bash
npm run dev
```

Ouvrez ensuite l’adresse que le terminal affiche — en général
**http://localhost:3000**. Toute modification apparaît immédiatement, sans rien
relancer.

Pour arrêter : `Ctrl + C` dans la fenêtre du terminal.

---

## Modifier un prix ou un plat

Tout le contenu de la carte tient dans trois fichiers texte du dossier `data/`. Il n’y a
**rien d’autre à toucher** : l’affichage, le plan du site et les informations envoyées à
Google se mettent à jour tout seuls.

### La carte

Ouvrez **`data/menu.ts`**. Chaque plat tient sur une ligne :

```
{ nom: 'Risotto aux morilles', description: 'Crème fraîche, pointes de morilles', prix: 23 },
```

- **Changer un prix** → modifiez le nombre après `prix:`. Écrivez `23` pour 23.— et
  `8.5` pour 8.50. N’écrivez jamais « CHF » ni « .— », le site s’en charge.
- **Ajouter un plat** → recopiez une ligne entière au bon endroit et modifiez-la.
  Vérifiez qu’elle se termine bien par une virgule.
- **Retirer un plat** → supprimez sa ligne.
- **Changer un texte de catégorie** → modifiez `titre:`. Ne touchez pas à `id:`, qui
  sert aux liens de la page.

### Les pizzas

Même principe dans **`data/pizzas.ts`** :

```
{ nom: 'Margherita', garniture: 'Sauce tomate, mozzarella et origan', prix: 17 },
```

### Les garnitures et les sauces

Le bloc de fin de carte se modifie dans **`data/accompagnements.ts`** : la liste des
garnitures comprises, et les sauces avec leur supplément.

### Les horaires, le téléphone, l’adresse

Tout est dans **`data/restaurant.ts`**. Attention : ces informations doivent rester
**strictement identiques** à celles de votre fiche Google, de local.ch et de search.ch.
La moindre différence affaiblit votre position dans les recherches.

### Quelques règles d’écriture

- L’apostrophe s’écrit toujours `’` (courbe), jamais `'`. Faites un copier-coller depuis
  une ligne existante en cas de doute.
- On écrit « L’Étoile », avec le É majuscule accentué.
- Après avoir modifié un fichier, regardez le site : s’il affiche une erreur rouge,
  c’est presque toujours une virgule oubliée en fin de ligne.

---

## Remplacer une photo

Déposez votre fichier dans `public/images/` **avec exactement le même nom** que celui
que vous remplacez, en `.jpg`. Rien d’autre à faire.

Les noms contiennent un millésime — `hero-salle-2026-08c.jpg`. Gardez-le : les navigateurs
retiennent les images d’après leur adresse, et une photo remplacée sous le même nom
continuerait de s’afficher en ancienne version chez les visiteurs déjà venus.

La liste complète des emplacements, avec le format et la taille attendus, est dans
**`PHOTOS-A-FOURNIR.md`** — c’est aussi le document à remettre au photographe.

**Pour remplacer tout un jeu de photos**, déposez les originaux dans
`photos-source/2026-08-client/`, indiquez dans `scripts/preparer-photos.mjs` quel original
va à quel emplacement, changez `VERSION_PHOTOS` dans `data/photos.ts`, puis lancez :

```bash
node scripts/preparer-photos.mjs
```

Le script recadre tout aux bons formats, renomme au nouveau millésime et supprime
l’ancien jeu. Il n’y a rien d’autre à installer : il se sert de la bibliothèque d’images
déjà livrée avec le site.

---

## Mettre le site en ligne

```bash
npm run build
```

Cette commande fabrique la version définitive. **Ne la lancez jamais pendant que
`npm run dev` tourne** : les deux utilisent le même dossier de travail et se gênent.
Arrêtez le mode dev, construisez, puis relancez si besoin.

### Le formulaire de contact

Le formulaire de la page Contact envoie les messages vers une adresse de réception
définie côté serveur, dans une variable nommée `CONTACT_WEBHOOK_URL` (un service de
formulaire type Formspree, ou une automatisation maison). Tant que cette variable n’est
pas renseignée, le formulaire l’annonce clairement au visiteur et le renvoie vers le
téléphone et l’e-mail du restaurant — il n’avale jamais un message en silence.

C’est volontairement **un formulaire de contact, pas de réservation** : une demande de
table qui n’aboutirait pas serait pire qu’un numéro bien visible.

---

## Ce qu’il y a dans le dossier

| Dossier | Contenu |
| --- | --- |
| `data/` | Tout le contenu : la carte, les pizzas, les horaires, la liste des photos |
| `src/app/` | Les quatre pages |
| `src/components/` | Les éléments réutilisables : en-tête, ligne de carte, galerie… |
| `src/styles/` | Les couleurs, les typographies et les espacements, définis une seule fois |
| `src/fonts/` | Les polices du site, hébergées ici plutôt que chez Google |
| `public/images/` | Toutes les photos et le logo |
| `photos-source/` | Les photos d’origine, avant recadrage |
| `scripts/` | Les outils de préparation des photos et des polices |

Les deux documents de cadrage du projet, `DIRECTION-ARTISTIQUE.md` et
`CONTENU-SITE-ACTUEL.md`, sont conservés à la racine.

---

## Bon à savoir

- Le site est **entièrement pré-calculé** : les pages sont fabriquées une fois pour
  toutes, ce qui les rend très rapides à afficher et faciles à lire pour Google.
- L’indication « ouvert / fermé » en haut de page est calculée en direct, à l’heure de
  Lausanne, quel que soit le pays depuis lequel on consulte le site.
- Le plan d’accès ne contacte aucun service extérieur tant que le visiteur n’a pas
  cliqué dessus.
- Le site reste entièrement lisible même si le JavaScript ne se charge pas, et respecte
  le réglage « réduire les animations » du système.
