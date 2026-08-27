/**
 * Inventaire des visuels du site.
 *
 * Remplacer une photo = déposer un fichier dans `public/images/` sous exactement
 * le même nom, millésime compris, et au même ratio. Aucun code n'est à modifier.
 * Si un fichier manque, le site n'affiche pas une image cassée : il affiche un
 * cadre sombre portant le ratio attendu (voir `src/components/ui/Photo.tsx`).
 */

export interface Photo {
  /** Chemin public du fichier. */
  readonly src: string;
  /** Texte alternatif, descriptif et orienté référencement local. */
  readonly alt: string;
  readonly largeur: number;
  readonly hauteur: number;
  /** Ratio attendu, en clair, pour le brief photo du restaurant. */
  readonly ratio: string;
  /** Où la photo apparaît sur le site. */
  readonly emplacement: string;
}

/**
 * Millésime du jeu de photographies. Il fait partie du nom de chaque fichier :
 * `hero-salle` devient `hero-salle-2026-08c.jpg`.
 *
 * Les navigateurs gardent les images en mémoire d'après leur adresse. Remplacer
 * un fichier sans changer son nom laisse donc les visiteurs déjà venus sur
 * l'ancienne image, parfois pendant des semaines. Changer le millésime change
 * toutes les adresses d'un coup : tout le monde reçoit les nouvelles.
 *
 * **À changer à chaque remplacement de visuels**, puis relancer
 * `node scripts/preparer-photos.mjs`, qui renomme les fichiers en conséquence.
 */
export const VERSION_PHOTOS = '2026-08d';

const p = (
  nom: string,
  largeur: number,
  hauteur: number,
  ratio: string,
  emplacement: string,
  alt: string,
): Photo => ({
  src: `/images/${nom}-${VERSION_PHOTOS}.jpg`,
  alt,
  largeur,
  hauteur,
  ratio,
  emplacement,
});

export const PHOTOS = {
  heroSalle: p('hero-salle', 1290, 726, '16:9', 'Accueil — bandeau d’ouverture (grand écran)',
    'La salle du Restaurant L’Étoile, rue de Genève à Lausanne, tables dressées avant le service'),
  heroSallePortrait: p('hero-salle-portrait', 1180, 1475, '4:5', 'Accueil — bandeau d’ouverture (mobile)',
    'Table dressée du Restaurant L’Étoile à Lausanne, verres alignés et lumière tamisée'),

  platPlateauMer: p('plat-plateau-mer', 1000, 1250, '4:5', 'Accueil — plats signature',
    'Plateau de fruits de mer grillés et poisson du Restaurant L’Étoile à Lausanne : gambas, calamars, moules et filet de loup de mer'),
  platCarpaccio: p('plat-carpaccio', 1000, 1250, '4:5', 'Accueil — plats signature',
    'Carpaccio de bœuf, roquette et écailles de Grana Padano, servi au Restaurant L’Étoile à Lausanne'),
  platPizza: p('plat-pizza', 1000, 1250, '4:5', 'Accueil — plats signature',
    'Pizza au jambon cru, copeaux de parmesan, roquette et tomates cerises, cuite au four au Restaurant L’Étoile à Lausanne'),
  platLinguine: p('plat-linguine', 1000, 1250, '4:5', 'Accueil — plats signature',
    'Linguine à l’ail, tomates cerises et basilic, servies au Restaurant L’Étoile, restaurant italien à Lausanne'),

  duoMaison: p('duo-maison', 1100, 1375, '4:5', 'Accueil — duo « la maison »',
    'Le bar du Restaurant L’Étoile à Lausanne, verres suspendus et bougies allumées en soirée'),
  duoCarte: p('duo-carte', 1100, 1375, '4:5', 'Carte — duo d’ouverture',
    'Gambas à l’ail et riz safrané servis en salle au Restaurant L’Étoile à Lausanne'),
  duoPizzas: p('duo-pizzas', 1100, 1375, '4:5', 'Pizzas — duo d’ouverture',
    'Pizza au jambon cru, roquette et tomates cerises, cuite au four au Restaurant L’Étoile à Lausanne'),
  duoContact: p('duo-contact', 1100, 1375, '4:5', 'Contact — duo d’ouverture',
    'La salle du Restaurant L’Étoile, rue de Genève 102 à Lausanne, vue depuis l’entrée'),

  galerie1: p('galerie-1', 900, 1125, '4:5', 'Accueil — galerie d’ambiance',
    'Cocktail servi au bar du Restaurant L’Étoile à Lausanne'),
  galerie2: p('galerie-2', 900, 900, '1:1', 'Accueil — galerie d’ambiance',
    'La salle du Restaurant L’Étoile à Lausanne, tables dressées et lumière du jour'),
  galerie3: p('galerie-3', 900, 1125, '4:5', 'Accueil — galerie d’ambiance',
    'Bouteille de vin rouge et verres dressés en salle au Restaurant L’Étoile à Lausanne'),
  galerie4: p('galerie-4', 900, 900, '1:1', 'Accueil — galerie d’ambiance',
    'Viande grillée au romarin, servie sur ardoise au Restaurant L’Étoile à Lausanne'),
  galerie5: p('galerie-5', 900, 1125, '4:5', 'Accueil — galerie d’ambiance',
    'Bouteilles de vin blanc de la carte des vins du Restaurant L’Étoile à Lausanne'),

  respirationCarte1: p('respiration-carte-1', 1290, 645, '2:1', 'Carte — respiration entre catégories',
    'Fruits de mer grillés, spécialité du Restaurant L’Étoile à Lausanne'),
  respirationCarte2: p('respiration-carte-2', 1290, 645, '2:1', 'Carte — respiration entre catégories',
    'Paccheri à la burrata et aux tomates cerises, dressés au Restaurant L’Étoile à Lausanne'),
} as const satisfies Record<string, Photo>;

/** Visuel de partage sur les réseaux sociaux et les messageries. */
export const IMAGE_PARTAGE = {
  src: `/images/og-${VERSION_PHOTOS}.jpg`,
  largeur: 1200,
  hauteur: 630,
  alt: 'Pizza au jambon cru du Restaurant L’Étoile, cuisine italienne et pizzeria à Lausanne',
} as const;
