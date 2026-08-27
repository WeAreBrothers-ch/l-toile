# Photos à fournir — Restaurant L’Étoile

> Ce document est le brief de la séance photo. Il liste, emplacement par emplacement,
> ce que le site attend : le sujet, la forme de l’image et sa taille minimale.

## Où en est-on

**Mise à jour du 21 août 2026.** Le restaurant a fourni 25 photographies professionnelles :
plats dressés sur fond sombre en vue de dessus, salle, bar, vins. Elles remplacent
intégralement les visuels de l’ancien site et sont sans commune mesure avec eux. Les
originaux sont conservés dans `photos-source/2026-08-client/`, et les anciens visuels Wix
dans `photos-source/`.

Les 18 emplacements du site sont donc remplis avec ces photos.

**Une règle est née de ce jeu de photos, et elle vaut pour les suivants.** Les 25 clichés
sont cadrés en hauteur. Or le site a des emplacements en largeur — le bandeau d’ouverture,
les grandes images qui enjambent deux sections, les bandeaux de la carte. Y placer une
photo verticale n’en garde qu’une bande centrale : sur un gros plan, le sujet devient
méconnaissable et l’image paraît démesurément agrandie.

Deux décisions en découlent. D’abord, **les grandes images occupent une demi-page en face
d’un texte** — c’est le « duo » du § 6.4 de la direction artistique. Une demi-page est
exactement ce que demande un 4:5 : la photographie y garde son cadrage d’origine, elle est
servie à sa définition native, et rien n’est laissé vide en face d’elle. *(Une version
précédente rangeait ces images le long d’un bord et laissait l’autre moitié de l’écran
libre. Le vide se voulait une respiration ; sur un grand écran, il se lisait comme un
trou.)* Ensuite, les emplacements restés en largeur — le bandeau d’ouverture, les bandeaux
de la carte — ne reçoivent que des **plans larges** : une salle, un bar, une assiette
entière avec de la marge autour.

Les photographies d’ambiance — le bar, la salle, les cocktails, les vins — qui n’étaient
pas employées le sont désormais : elles remplissent la galerie de l’accueil. **Sept photos
restent en réserve**, pour l’essentiel des macros de pâtes, de carpaccio et de fruits de
mer : le site n’a plus d’emplacement qui les accueillerait sans redite.

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

## Les 18 emplacements

La colonne « Photo en place » indique le fichier d’origine utilisé aujourd’hui, dans
`photos-source/2026-08-client/`. Les tailles sont des **minimums** : fournir plus grand
est toujours mieux.

| Nom du fichier | Format | Taille minimale | Photo en place | Où ça apparaît et ce qu’on y voit |
| --- | --- | --- | --- | --- |
| `hero-salle-2026-08d.jpg` | 16:9 | 2000 × 1125 | `IMG_2653` ⚠️ 1290 px | Accueil, image d’ouverture sur grand écran — la salle, miroir et tables dressées |
| `hero-salle-portrait-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2637` | Accueil, image d’ouverture sur téléphone — table dressée, lumière tamisée |
| `plat-plateau-mer-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2661` | Accueil, plats signature — le plateau de fruits de mer grillés |
| `plat-carpaccio-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2657` | Accueil, plats signature — le carpaccio de bœuf |
| `plat-pizza-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2650` | Accueil, plats signature — la pizza au jambon cru, vue de dessus |
| `plat-linguine-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2640` | Accueil, plats signature — les linguine à l’ail et tomates cerises |
| `duo-maison-2026-08d.jpg` | 4:5 | 1400 × 1750 | `IMG_2645` | Accueil, duo « la maison » — le bar et ses verres suspendus |
| `duo-carte-2026-08d.jpg` | 4:5 | 1400 × 1750 | `IMG_2659` | Page Carte, duo d’ouverture — gambas à l’ail et riz safrané, servis en salle |
| `duo-pizzas-2026-08d.jpg` | 4:5 | 1400 × 1750 | `IMG_2650` | Page Pizzas, duo d’ouverture — la pizza au jambon cru, entière |
| `duo-contact-2026-08d.jpg` | 4:5 | 1400 × 1750 | `IMG_2652` | Page Contact, duo d’ouverture — la salle vue de l’entrée |
| `galerie-1-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2656` | Accueil, galerie d’ambiance — un cocktail au bar |
| `galerie-2-2026-08d.jpg` | 1:1 | 1200 × 1200 | `IMG_2652` | Accueil, galerie d’ambiance — la salle en journée |
| `galerie-3-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2666` | Accueil, galerie d’ambiance — une bouteille ouverte et des verres |
| `galerie-4-2026-08d.jpg` | 1:1 | 1200 × 1200 | `IMG_2664` | Accueil, galerie d’ambiance — une viande grillée sur ardoise |
| `galerie-5-2026-08d.jpg` | 4:5 | 1200 × 1500 | `IMG_2654` | Accueil, galerie d’ambiance — les vins |
| `respiration-carte-1-2026-08d.jpg` | 2:1 | 2000 × 1000 | `IMG_2663` | Carte, bandeau entre deux catégories — fruits de mer grillés |
| `respiration-carte-2-2026-08d.jpg` | 2:1 | 2000 × 1000 | `IMG_2667` | Carte, bandeau entre deux catégories — paccheri à la burrata |
| `og-2026-08d.jpg` | 1200 × 630 | — | `IMG_2650` | Vignette de partage sur WhatsApp, Facebook, messages |

⚠️ **Le seul emplacement en tension est `hero-salle-2026-08d.jpg`** : il occupe toute la largeur de
l’écran et l’original ne fait que 1290 px de large. Demander le fichier non redimensionné
de cette photo au photographe suffit à le régler.

**Les cinq images de la galerie montrent le lieu, pas la carte.** C’est le seul endroit du
site qui ne vend rien — le bar, la salle, une bouteille ouverte, les vins. Y placer une
quatrième assiette ferait mentir son titre. Ce sont donc les photographies à privilégier
lors de la prochaine séance : le site en manque, alors qu’il a des plats en réserve.

**Les deux bandeaux de la carte sont les seuls emplacements où un gros plan est admis** :
rogné en bande, il ne montre plus un plat mais une matière, ce qui est exactement ce qu’on
demande à une respiration entre deux listes de prix.

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
