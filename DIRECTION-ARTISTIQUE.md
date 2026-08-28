# Direction artistique — Restaurant L’Étoile (Lausanne)

> Version 2.0 — 28 août 2026 · **refonte complète**, sans reprise de la version 1.
> Statut : livrée et intégrée. Ce document décrit le site tel qu’il est en ligne,
> pas une intention.
> Périmètre : `index.html`, `carte.html`, `pizzas.html`, `contact.html`, `404.html`.

La version 1 de cette DA — papier blanc, Newsreader, photos en chevauchement — a été
rejetée par le client : trop froide, trop proche du site d’origine, « ça fait IA ».
Elle n’est pas amendée ici, elle est remplacée. Rien n’en a été repris que le logo,
les photographies et les informations du restaurant.

---

## 1. Le parti pris

**Une enseigne, pas une carte de visite.**

L’Étoile est une trattoria de quartier à Malley : on y va pour une pizza au four et
une entrecôte, pas pour un dîner de représentation. Le site devait cesser de se faire
passer pour une table gastronomique et prendre le ton de ce qu’il est — franc, coloré,
un peu artisanal.

D’où trois décisions, dont tout le reste découle :

1. **Quatre couleurs pleines, aucun dégradé.** Une enseigne peinte n’a pas de
   dégradés. Elle a des aplats.
2. **Des bords tracés à la main.** Aucun rayon uniforme, aucune ombre portée, aucune
   pilule. Un contour qui ne se referme pas exactement, comme un trait de feutre.
3. **L’étoile du nom devient le motif.** Le restaurant s’appelle L’Étoile : c’est le
   seul ornement dont le site a besoin, et il est gratuit.

Et une contrainte qui commande la mise en page : **les photographies disponibles ne
sont pas assez bonnes** (voir §7). Le dessin ne doit donc jamais dépendre d’une seule
grande image.

---

## 2. La palette

Quatre couleurs, pas une de plus. Elles sont déclarées dans `:root`, en haut de
`css/style.css`, et rien dans la feuille n’écrit une couleur en dur.

| Rôle | Jeton | Valeur | Emploi |
| --- | --- | --- | --- |
| Le papier | `--creme` | `#f6efe2` | Le fond de toutes les pages |
| Le papier, appuyé | `--creme-fonce` | `#ece1cd` | Filets, séparateurs sur crème |
| La marque | `--rouge` | `#c8102e` | Prix, titres de section, bouton d’appel |
| La marque, appuyée | `--rouge-sombre` | `#9e0c24` | État actif du bouton rouge |
| Le grand aplat | `--vert` | `#17604a` | En-têtes de page, bande d’images, pied, menu |
| Le grand aplat, appuyé | `--vert-sombre` | `#0f4535` | État actif sur vert |
| La ponctuation | `--jaune` | `#f4c24a` | L’étoile, les intertitres sur vert. **Jamais un aplat** |
| L’encre | `--encre` | `#1b1714` | Le texte, le fond des photographies |

**Le rouge.** `#c8102e` est un cran plus chaud et plus dense que le rouge mesuré du
logo (`#e9323c`). C’est délibéré : le rouge du logo, tenu sur de grandes surfaces ou en
petit texte, vire au rose et tombe sous le seuil de contraste. Le logo garde le sien —
il est en image, il n’est pas retouché.

**Le vert.** Le vert d’enseigne italienne, choisi assez sombre pour porter du texte
crème à 4,5:1. C’est lui qui donne au site son identité de couleur : sans lui, crème et
rouge feraient une boulangerie.

**Le jaune ne porte jamais de paragraphe.** Sur vert il passe pour un intertitre court
et pour l’étoile. Sur crème il ne passe pas du tout — il n’y est pas employé.

---

## 3. La typographie

| | Police | Usage | Fichier |
| --- | --- | --- | --- |
| Titres | **Bitter** 400–800 | Capitales, interlettrage serré | `fonts/bitter-latin.woff2` + `-ext` |
| Courant | **Archivo** 400–600 | Paragraphes, libellés, navigation | `fonts/archivo.woff2` |

Bitter est une slab serif : des empattements carrés, épais, qui tiennent la capitale
sans devenir décoratifs. C’est le dessin d’un panneau émaillé, pas d’un menu de palace.
Elle remplace le Newsreader italique de la v1, que le client a jugé daté — à raison :
un serif à haut contraste en italique est la signature typographique de tous les sites
de restaurant des quinze dernières années.

Les deux fichiers sont **hébergés avec le site**, jamais demandés à Google, et découpés
par `unicode-range` : un navigateur qui n’affiche que du latin de base ne télécharge
pas le latin étendu.

Une seule échelle, fluide, du plus petit au plus grand :

```
--t-mention    0.75rem                                    mentions légales, surtitres
--t-petit      0.875rem                                   descriptions de plats
--t-corps      1rem                                       paragraphes
--t-lead       clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)    chapeaux
--t-h3         clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem)  titres de bloc
--t-h2         clamp(1.875rem, 1.4rem + 2.4vw, 3.25rem)   titres de section
--t-enseigne   clamp(3rem, 1.5rem + 7.5vw, 7rem)          le nom, en ouverture
```

---

## 4. Le motif

L’étoile à quatre branches, tirée du logo, est déclarée une fois en SVG dans
`--etoile-svg` et posée partout en **masque CSS** : elle prend donc la couleur du texte
qui l’entoure, sans qu’il faille en produire une variante par couleur.

Elle sert à quatre choses, toujours les mêmes :

- **marquer la page en cours** dans la navigation (sous le lien, en rouge) et dans le
  menu de téléphone (devant le lien, en jaune) ;
- **séparer les sections** — trois étoiles entre deux filets, c’est la « frise » ;
- **ponctuer** le pied de page entre l’adresse, le téléphone et le courriel ;
- **annoncer** un surtitre (« ✦ Cuisine italienne & brasserie »).

Elle ne sert jamais de puce de liste, ni de décor de fond, ni de curseur.

---

## 5. Le trait tracé à la main

```css
--trace:   255px 15px 225px 15px / 15px 225px 15px 255px;
--trace-2: 15px 225px 15px 255px / 255px 15px 225px 15px;
```

Quatre rayons dissymétriques, horizontaux et verticaux désaccordés : le contour ne se
referme jamais exactement. C’est le seul détail qui empêche un bouton d’avoir l’air
d’un composant de bibliothèque. `--trace-2` est le même trait retourné, à alterner sur
deux éléments voisins pour qu’ils ne soient pas jumeaux.

Il s’applique aux boutons, aux cadres photo, au plan et aux blocs de réponse.

**Ce qui est proscrit, et pourquoi.** Le client a nommé le vocabulaire qui lui faisait
dire « IA et cheap ». Il n’apparaît nulle part dans la feuille :

| Proscrit | À la place |
| --- | --- |
| Coins arrondis uniformes, pilules | `--trace` |
| Ombres portées, cartes flottantes | Un filet, un aplat, ou rien |
| Halos, lueurs, `backdrop-filter` | Rien |
| Dégradés décoratifs | Un seul voile sombre, sur la photo d’ouverture, pour la lisibilité |
| Bandeau de texte défilant | Supprimé |
| Barre d’onglets au-dessus de la carte | Supprimée |

---

## 6. Les composants

**L’en-tête** — 68 px, collante. Menu à gauche sur téléphone, logo au centre, appel à
droite. Sur grand écran : logo, navigation, pastille Ouvert/Fermé, bouton de réservation.
Elle ne se compacte pas : elle est déjà à sa taille minimale.

**L’ouverture de l’accueil** — trois vues en fondu croisé, plein écran, le logo au
centre sur un voile sombre. Trois vues plutôt qu’une parce qu’aucune photographie ne
tient seule un plein écran ; le fondu de 1,4 s laisse le temps de lire. **Aucune
commande** : elle tourne seule. Des pastilles à cliquer sous une image qui change déjà
d’elle-même ne servent personne — on ne clique pas sur une ouverture, on la regarde.

**Les portes** — deux blocs, Carte et Pizzas, chacun une photographie encadrée d’un
trait, un titre rouge, le compte réel des plats, un bouton. C’est le seul chemin
proposé depuis l’accueil : le site n’a que deux choses à vendre.

**La bande d’images** — neuf photographies qui défilent sans fin sur le vert, **et
qu’on peut attraper** : à la souris comme au doigt, on la fait tourner dans un sens ou
dans l’autre, et elle repart seule quand on la lâche, avec l’élan du geste. La boucle
n’a ni fin ni couture : la piste porte deux fois la même série, et le retour au départ
tombe pile sur la même image — mesuré, le pas d’un tour vaut 2,3 px contre 2,4 px en
marche normale.

C’est pour cette prise en main que le mouvement est calculé en JavaScript et non par
une animation CSS : une animation ne se laisse pas saisir en cours de route. Le doigt
garde le défilement vertical de la page (`touch-action: pan-y`) — on ne lui prend que
l’horizontale.

Ses tirages sont réduits à 560 × 420 (269 Ko en tout, contre 1,3 Mo pour les
originaux), et ils ne sont demandés qu’à l’approche de la bande : décalées par le
mouvement, ses images ne croisent jamais le cadre de l’écran, et le chargement
paresseux du navigateur les laisserait vides pour toujours. Une bande décorative ne
doit peser ni le poids d’une galerie, ni sur le premier affichage.

**Les en-têtes de page intérieure** — un aplat vert, un surtitre à l’étoile, le titre en
grand, une phrase, un bouton vers l’autre carte. **Pas de photographie** : il n’y en a
pas d’assez bonne pour ouvrir une page, et une page qui s’ouvre sur son titre ne ment
sur rien.

**La carte** — deux colonnes sur grand écran, comme une carte imprimée : le nom en
Bitter, un filet pointillé, le prix en rouge. Une colonne sur téléphone. Les 59 plats et
les 15 pizzas sont écrits dans les pages, jamais chargés.

À gauche, **un rail** : le nom de la famille en grand, et la photographie d’un de ses
plats. Il suit le défilement tant que la famille dure, pour qu’on sache toujours ce
qu’on est en train de lire. Sans lui, la carte était six mille pixels de texte
d’affilée — le reproche exact du client : « un énorme bloc ».

**Une photographie n’est posée que là où elle dit vrai.** Aucune des photographies
disponibles ne montre un risotto, une fondue ni une assiette d’enfant : ces trois
familles n’en ont pas, plutôt que d’en recevoir une qui mente. Un client qui commande
d’après l’image le verrait.

**Le trait à l’échelle du cadre.** Les rayons de `--trace` font 255 px : sur une
photographie de 300 px de côté, le navigateur les rabat tous ensemble et le cadre
devient un pétale. Les cadres de cette taille prennent donc `--trace-cadre`, le même
trait dessiné plus petit.

**Les horaires** — un vrai tableau : les jours en lignes, le midi et le soir en
colonnes, nommées une seule fois en en-tête. « 11h45 – 13h30 · 18h45 – 22h00 » sur une
seule ligne se lisait comme une référence de produit, et répéter « Midi » et « Soir » à
chaque jour faisait douze fois le même mot. La ligne du jour porte l’étoile de la maison
et son nom en rouge : c’est la seule qu’on cherche vraiment, et elle est calculée à
l’heure de Lausanne, donc jamais figée dans la page.

**Le pied de page** — le logo, une ligne pour venir et pour appeler, la navigation, les
mentions. Il ne réimprime ni les horaires ni l’adresse en colonnes : elles sont déjà
données en toutes lettres plus haut, et les répéter faisait un second pavé vert sous le
premier.

**La barre d’appel** — sur téléphone seulement, fixée en bas, apparue après 320 px de
défilement. La réservation se fait au téléphone : le bouton ne doit jamais être à plus
d’un pouce.

---

## 7. Les photographies

C’est le point faible du projet, et il est structurel.

- **Trois fichiers sources sont des captures d’écran**, pas des photographies :
  `IMG_2637`, `IMG_2638`, `IMG_2647` portent un avatar de profil incrusté dans l’image.
  Le recadrage l’écarte du cadre publié, mais la définition reste celle d’une capture.
  **Il faut demander les originaux au client.**
- Les plats sont photographiés sur fond noir, au flash, de haut. Ils passent en petit,
  encadrés ; ils ne passent pas en grand.
- Aucune photographie de salle ne tient un plein écran seule — d’où le diaporama.

`PHOTOS-A-FOURNIR.md` liste chaque emplacement, son format et sa taille. C’est le
document à remettre au photographe.

---

## 8. Le téléphone d’abord

Ce n’est pas une adaptation, c’est l’ordre de conception : tout est composé pour 390 px
puis élargi. Les règles qui en découlent :

- **Rien ne défile horizontalement**, sauf la bande d’images. Elle est décorative et se
  passe d’être lue : elle tourne de toute façon toute seule, et on ne perd rien à ne pas
  y toucher. C’est la différence avec une galerie qu’il *faut* faire défiler à la main
  pour en voir le contenu — celle-là n’a aucun sens sur un téléphone : on ne sait même
  pas qu’il y a autre chose.
- **Une seule colonne** partout en dessous de 700 px.
- **44 px de côté minimum** pour toute commande autonome — bouton, lien de
  navigation, logo. Les liens en pleine ligne de texte gardent leur taille de texte,
  comme partout ailleurs.
- **La navigation est un `<dialog>` plein écran** : la touche Échap, le piégeage du
  focus et le rôle de dialogue sont assurés par le navigateur, pas par du script.
- La barre d’appel réserve sa hauteur (`--barre-appel`) dans le pied, pour ne rien
  recouvrir.

---

## 9. Accessibilité et sobriété

- Contraste : le texte courant est à 4,5:1 au moins sur chacune des quatre surfaces.
- Le réglage système « réduire les animations » arrête le diaporama, la bande, et les
  apparitions au défilement.
- Le site est **entièrement lisible sans JavaScript** : les liens sont de vrais liens,
  la carte est dans les pages, le formulaire s’envoie tout seul, la première vue du
  diaporama est déjà affichée.
- Le plan ne contacte OpenStreetMap qu’au clic du visiteur.
- Les polices sont hébergées avec le site.
- Aucun traceur, aucune requête vers un tiers au chargement.
