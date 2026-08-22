# Photos à fournir — Restaurant L’Étoile

> Ce document est le brief de la séance photo. Il liste, emplacement par emplacement,
> ce que le site attend : le sujet, la forme de l’image et sa taille minimale.

## Où en est-on

**Mise à jour du 21 août 2026.** Le restaurant a fourni 25 photographies professionnelles :
plats dressés sur fond sombre en vue de dessus, salle, bar, vins. Elles remplacent
intégralement les visuels de l’ancien site et sont sans commune mesure avec eux. Les
originaux sont conservés dans `photos-source/2026-08-client/`, et les anciens visuels Wix
dans `photos-source/`.

Les 13 emplacements du site sont donc remplis avec ces photos.

**Une règle est née de ce jeu de photos, et elle vaut pour les suivants.** Les 25 clichés
sont cadrés en hauteur. Or le site a des emplacements en largeur — le bandeau d’ouverture,
les grandes images qui enjambent deux sections, les bandeaux de la carte. Y placer une
photo verticale n’en garde qu’une bande centrale : sur un gros plan, le sujet devient
méconnaissable et l’image paraît démesurément agrandie.

Deux décisions en découlent. D’abord, **les grandes images qui enjambent deux sections sont
passées en format vertical**, rangées le long d’un bord sur une colonne étroite plutôt
qu’étalées d’un bord à l’autre de l’écran : elles gardent ainsi leur cadrage d’origine,
restent nettes, et le vide laissé en face fait respirer la page. Ensuite, les emplacements
restés en largeur — le bandeau d’ouverture, les bandeaux de la carte — ne reçoivent que des **plans
larges** : une salle, un bar, une assiette entière avec de la marge autour.

C’est aussi pour cela que **les sept photos les plus rapprochées ne sont pas utilisées** :
macros de pâtes, de pizza, de carpaccio, de fruits de mer, cocktails, bouteilles de vin
blanc. Elles restent en réserve.

> **Pour la prochaine séance :** demander quelques prises **cadrées en largeur**, en
> particulier de la salle et du bar. Ce sont les plus utiles au site et les seules qu’il
> ne peut pas fabriquer par recadrage.

### Le seul manque qui subsiste : la résolution

Les fichiers reçus font tous **1290 pixels de large**. C’est confortable pour une vignette
de plat, mais court pour le bandeau d’ouverture, qui occupe toute la largeur de l’écran :
sur un grand écran d’ordinateur récent, l’image du haut de la page d’accueil manquera un
peu de netteté.

**Ce qu’il faut demander au restaurant (ou au photographe) :** les fichiers d’origine de
ces mêmes photos, non redimensionnés — en particulier celle de la salle. Rien d’autre à
refaire : la séance photo a déjà eu lieu et elle est bonne.

Deux sujets ne figurent dans aucune photo et manqueraient si on voulait les montrer un
jour : **la façade et l’entrée du restaurant** (utile pour être reconnu depuis la rue) et
**la terrasse**, si le restaurant en a une.

## Comment remplacer une photo

Les fichiers portent un **millésime** dans leur nom : `hero-salle-2026-08c.jpg`. Ce n’est
pas une coquetterie. Les navigateurs gardent les images en mémoire d’après leur adresse :
si on remplace une photo sans changer son nom, les visiteurs déjà venus continuent de voir
l’ancienne, parfois pendant des semaines. Changer le millésime règle le problème d’un coup.

**Pour un remplacement ponctuel**, déposez le fichier neuf dans `public/images/` sous
exactement le même nom, millésime compris. Rien d’autre à faire.

**Pour un nouveau jeu de photos :**

1. Déposez les originaux dans `photos-source/2026-08-client/`.
2. Dans `scripts/preparer-photos.mjs`, indiquez quel original va à quel emplacement.
3. Dans `data/photos.ts`, changez `VERSION_PHOTOS` (par exemple `'2026-09'`).
4. Lancez `node scripts/preparer-photos.mjs`.

Le script recadre tout aux bons formats, renomme au nouveau millésime et supprime
l’ancien jeu. Si un fichier venait à manquer, le site ne casse pas : il affiche à sa
place un cadre sombre indiquant le format attendu.

## Ce qu’on cherche

- **Le sujet** : le plat seul, ou le plat dans les mains du serveur. Pas de personnel
  qui pose, pas de portrait.
- **L’angle** : vue de dessus pour les pâtes, les risottos et les pizzas ; vue à 45°
  pour les viandes et les assiettes construites.
- **Le fond** : sombre et mat — ardoise, bois foncé, nappe grise. Jamais de fond blanc
  surexposé.
- **La lumière** : une seule source, latérale et rasante. Ombres nettes assumées.
  Pas de flash de face, pas d’anneau lumineux.
- **Le cadrage** : le plat occupe 60 à 75 % de l’image, avec une marge de sécurité
  de 8 % tout autour — le site recadre la même photo en plusieurs formats.
- **Le fichier** : JPEG de qualité, à pleine résolution, sans filtre. Si la photo est déjà
  étalonnée par son auteur, tant mieux : le site ne la retouche pas, il la recadre et lui
  rend la netteté perdue à la réduction.

## Les 13 emplacements

La colonne « Photo en place » indique le fichier d’origine utilisé aujourd’hui, dans
`photos-source/2026-08-client/`. Les tailles sont des **minimums** : fournir plus grand
est toujours mieux.

| Nom du fichier | Format | Taille minimale | Photo en place | Où ça apparaît et ce qu’on y voit |
| --- | --- | --- | --- | --- |
| `hero-salle-2026-08c.jpg` | 16:9 | 2000 × 1125 | `IMG_2653` ⚠️ 1290 px | Accueil, image d’ouverture sur grand écran — la salle, miroir et tables dressées |
| `hero-salle-portrait-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2637` | Accueil, image d’ouverture sur téléphone — table dressée, lumière tamisée |
| `plat-plateau-mer-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2661` | Accueil, plats signature — le plateau de fruits de mer grillés |
| `plat-carpaccio-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2657` | Accueil, plats signature — le carpaccio de bœuf |
| `plat-pizza-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2650` | Accueil, plats signature — la pizza au jambon cru, vue de dessus |
| `plat-linguine-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2640` | Accueil, plats signature — les linguine à l’ail et tomates cerises |
| `charniere-carte-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2645` | Accueil, grande image avant la carte — le bar et ses verres suspendus |
| `charniere-carte-page-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2659` | Page Carte, grande image — gambas à l’ail et riz safrané, servis en salle |
| `charniere-pizzas-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2650` | Page Pizzas, grande image — la pizza au jambon cru, entière |
| `charniere-contact-2026-08c.jpg` | 4:5 | 1200 × 1500 | `IMG_2652` | Page Contact, grande image — la salle vue de l’entrée |
| `respiration-carte-1-2026-08c.jpg` | 3:2 | 1800 × 1200 | `IMG_2661` | Carte, bandeau entre deux catégories — le plateau de fruits de mer |
| `respiration-carte-2-2026-08c.jpg` | 3:2 | 1800 × 1200 | `IMG_2667` | Carte, bandeau entre deux catégories — paccheri à la burrata |
| `og-2026-08c.jpg` | 1200 × 630 | — | `IMG_2650` | Vignette de partage sur WhatsApp, Facebook, messages |

⚠️ **Le seul emplacement en tension est `hero-salle-2026-08c.jpg`** : il occupe toute la largeur de
l’écran et l’original ne fait que 1290 px de large. Demander le fichier non redimensionné
de cette photo au photographe suffit à le régler.

**Les deux images de la carte sont calées sur la largeur de la colonne de menu**, et non
sur celle de l'écran. Une photo étirée d'un bord à l'autre ne se lit plus comme une
respiration mais comme une interruption. Une assiette entière y fonctionne très bien.

## Un visuel à part

| Fichier | Rôle | Remarque |
| --- | --- | --- |
| `plan.jpg` (1440 × 800) | Fond du plan d’accès | Généré à partir d’OpenStreetMap. À ne remplacer que si l’adresse change |

## Ce qui reste à confirmer avec le restaurant

- **Le logo en fichier vectoriel** (SVG ou Illustrator). En attendant, le logo du site a
  été retracé à partir de l’image de l’ancien site : il est parfaitement net à toutes
  les tailles, mais un fichier d’origine reste préférable.
- **Réseaux sociaux** (Instagram, Facebook) : absents de l’ancien site. Dès qu’ils
  existent, ils doivent être ajoutés au pied de page et aux données envoyées à Google.
- **Terrasse, parking, vente à l’emporter, livraison** : à préciser. Ce sont des
  informations que Google affiche directement dans les résultats de recherche locale.
- **Le plat du jour** : sera-t-il mis à jour, et par qui ?
- **La carte en PDF** de l’ancien site n’a volontairement pas été reprise : elle date de
  2022 et ses prix ne correspondent plus à ceux du site. Un PDF qui contredit la page
  fait plus de mal que de bien.
