/**
 * Prépare les visuels du site à partir des photographies fournies par le
 * restaurant, rangées dans `photos-source/2026-08-client/`.
 *
 *   node scripts/preparer-photos.mjs
 *
 * Recadre chaque original au ratio attendu par son emplacement, puis écrit un
 * JPEG de qualité dans `public/images/`. Next.js se charge ensuite de la
 * conversion AVIF / WebP et des largeurs responsives.
 *
 * Aucun prérequis : le recadrage passe par `sharp`, qui est déjà installé avec
 * Next.js. (La version précédente demandait ImageMagick, qu'il fallait poser à
 * la main sur chaque machine.)
 *
 * Les visuels de l'ancien site Wix restent dans `photos-source/` à la racine :
 * ils ne sont plus utilisés, ils sont conservés comme archive.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** `sharp` ne publie pas d'entrée ES : on le charge comme un module CommonJS. */
const sharp = createRequire(import.meta.url)('sharp');

/**
 * Le millésime vit dans `data/photos.ts`, qui est la référence du site. Il est
 * lu ici plutôt que recopié : deux valeurs à tenir à jour finiraient par
 * diverger, et le site chercherait des fichiers que ce script n'écrit pas.
 */
const FICHIER_PHOTOS = resolve(ROOT, 'data/photos.ts');
const VERSION_PHOTOS = (() => {
  const trouve = readFileSync(FICHIER_PHOTOS, 'utf8').match(
    /VERSION_PHOTOS\s*=\s*'([^']+)'/,
  );
  if (!trouve) throw new Error(`Millésime introuvable dans ${FICHIER_PHOTOS}`);
  return trouve[1];
})();
const SRC = resolve(ROOT, 'photos-source/2026-08-client');
const OUT = resolve(ROOT, 'public/images');

/**
 * Les photographies fournies sont déjà étalonnées par leur auteur : les
 * réchauffer et les contraster une seconde fois les abîmerait. Seule la netteté
 * est rendue, parce que toute réduction de taille en fait perdre.
 */
const NETTETE = { sigma: 0.7, m1: 0.35, m2: 0.02 };

/**
 * Où le recadrage prend sa matière quand le ratio demandé est plus large que
 * l'original. Sur une assiette vue de dessus, le centre est le sujet ; sur une
 * salle, le haut porte les lumières et le bas les nappes, donc on garde le
 * milieu haut.
 */
const CENTRE = 'centre';
const HAUT = 'haut';
const POSITIONS = { [CENTRE]: 'centre', [HAUT]: 'top' };

/**
 * @type {ReadonlyArray<{out: string, src: string, w: number, h: number, pos?: string}>}
 *
 * Les originaux sont tous cadrés en hauteur, en 1290 × ~1700. Deux conséquences
 * tenues dans cette table :
 *
 * 1. **Les emplacements verticaux sont servis à leur définition native.** Les
 *    duos éditoriaux et les plats signature sont en 4:5 : l'image y garde
 *    presque toute sa hauteur d'origine et reste nette.
 * 2. **Les emplacements horizontaux ne reçoivent que des plans larges** — une
 *    salle, un bar, une assiette avec de la marge autour. Un gros plan rogné en
 *    bandeau devient méconnaissable. Seule exception assumée : les respirations
 *    de la carte, où la matière (pâtes, fruits de mer) fait justement la bande.
 */
const SLOTS = [
  // ---- Bandeau d'ouverture -------------------------------------------------
  // Les originaux font 1290 px de large : le bandeau des grands écrans est donc
  // au maximum de ce que la source permet.
  { out: 'hero-salle', src: 'IMG_2653', w: 1290, h: 726, pos: HAUT },
  { out: 'hero-salle-portrait', src: 'IMG_2637', w: 1180, h: 1475 },

  // ---- Plats signature (accueil) — 4:5 ------------------------------------
  { out: 'plat-plateau-mer', src: 'IMG_2661', w: 1000, h: 1250 },
  { out: 'plat-carpaccio', src: 'IMG_2657', w: 1000, h: 1250 },
  { out: 'plat-pizza', src: 'IMG_2650', w: 1000, h: 1250 },
  { out: 'plat-linguine', src: 'IMG_2640', w: 1000, h: 1250 },

  // ---- Duos éditoriaux — 4:5, une pleine colonne de la grille --------------
  // Ces images remplacent les anciennes « charnières » posées le long d'un bord.
  // Elles occupent désormais la moitié de la page en face d'un texte : le
  // cadrage vertical d'origine devient un avantage au lieu d'une contrainte.
  { out: 'duo-maison', src: 'IMG_2645', w: 1100, h: 1375 },
  { out: 'duo-carte', src: 'IMG_2659', w: 1100, h: 1375 },
  { out: 'duo-pizzas', src: 'IMG_2650', w: 1100, h: 1375 },
  { out: 'duo-contact', src: 'IMG_2652', w: 1100, h: 1375 },

  // ---- Galerie d'ambiance (accueil) ---------------------------------------
  // Cinq images en quinconce : le bar, la salle, une bouteille ouverte, une
  // ardoise, les vins. C'est le seul endroit du site qui montre le lieu plutôt
  // que la carte — les assiettes ont déjà les leurs, plus haut.
  { out: 'galerie-1', src: 'IMG_2656', w: 900, h: 1125 },
  { out: 'galerie-2', src: 'IMG_2652', w: 900, h: 900 },
  { out: 'galerie-3', src: 'IMG_2666', w: 900, h: 1125 },
  { out: 'galerie-4', src: 'IMG_2664', w: 900, h: 900 },
  { out: 'galerie-5', src: 'IMG_2654', w: 900, h: 1125 },

  // ---- Respirations de la carte — bandeau large ---------------------------
  // Un gros plan rogné en bande ne montre plus un plat mais une matière : c'est
  // exactement ce qu'on demande à une respiration entre deux listes de prix.
  { out: 'respiration-carte-1', src: 'IMG_2663', w: 1290, h: 645 },
  { out: 'respiration-carte-2', src: 'IMG_2667', w: 1290, h: 645 },

  // ---- Partage sur les réseaux --------------------------------------------
  { out: 'og', src: 'IMG_2650', w: 1200, h: 630 },
];

/** Nom du fichier écrit dans `public/images/`, millésime compris. */
const nomSortie = (slot) => `${slot.out}-${VERSION_PHOTOS}.jpg`;

async function preparer(slot) {
  const entree = resolve(SRC, `${slot.src}.jpg`);
  if (!existsSync(entree)) {
    throw new Error(`Original manquant : ${entree}`);
  }

  await sharp(entree)
    .resize(slot.w, slot.h, { fit: 'cover', position: POSITIONS[slot.pos ?? CENTRE] })
    .sharpen(NETTETE)
    .toColorspace('srgb')
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(resolve(OUT, nomSortie(slot)));

  return nomSortie(slot);
}

/**
 * Les fichiers d'un millésime précédent ne servent plus à rien : le site ne les
 * demande plus, et les laisser ferait grossir le dépôt à chaque séance photo.
 */
function nettoyerAnciensMillesimes(gardes) {
  const aGarder = new Set(gardes);
  for (const fichier of readdirSync(OUT)) {
    if (!fichier.endsWith('.jpg')) continue;
    if (fichier === 'plan.jpg') continue; // le fond de plan n'a pas de millésime
    if (aGarder.has(fichier)) continue;
    rmSync(resolve(OUT, fichier));
    console.log(`  supprimé  ${fichier}`);
  }
}

mkdirSync(OUT, { recursive: true });

const ecrits = [];
for (const slot of SLOTS) {
  ecrits.push(await preparer(slot));
  console.log(`  écrit     ${ecrits.at(-1)}`);
}
nettoyerAnciensMillesimes(ecrits);

console.log(`\n${ecrits.length} visuels préparés au millésime ${VERSION_PHOTOS}.`);
