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
 * Prérequis : ImageMagick 7 (`brew install imagemagick`).
 *
 * Les visuels de l'ancien site Wix restent dans `photos-source/` à la racine :
 * ils ne sont plus utilisés, ils sont conservés comme archive.
 */
import { execFile } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { promisify } from 'node:util';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

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
 * (L'harmonisation complète du § 8.2 de la direction artistique servait à
 * rattraper les visuels ternes de l'ancien site ; elle n'a plus lieu d'être.)
 */
const GRADE = ['-colorspace', 'sRGB', '-unsharp', '0x0.7+0.35+0.02'];

/** @type {ReadonlyArray<{out: string, src: string, w: number, h: number, gravity?: string}>} */
const SLOTS = [
  // La salle. Les originaux font 1290 px de large : le bandeau d'ouverture des
  // grands écrans est donc au maximum de ce que la source permet.
  { out: 'hero-salle',          src: 'IMG_2653', w: 1290, h: 726 },
  { out: 'hero-salle-portrait', src: 'IMG_2637', w: 1280, h: 1600 },

  // Plats signature : quatre vues de dessus sur fond sombre, une seule famille
  // d'angle dans la même grille comme le demande la direction artistique.
  { out: 'plat-plateau-mer', src: 'IMG_2661', w: 1000, h: 1250 },
  { out: 'plat-carpaccio',   src: 'IMG_2657', w: 1000, h: 1250 },
  { out: 'plat-pizza',       src: 'IMG_2650', w: 1000, h: 1250 },
  { out: 'plat-linguine',    src: 'IMG_2640', w: 1000, h: 1250 },

  // Les images qui enjambent deux sections sont rangées le long d'un bord, sur
  // une colonne étroite : elles gardent donc le cadrage vertical des originaux
  // au lieu d'être rognées en bandeau.
  { out: 'charniere-carte',      src: 'IMG_2645', w: 1000, h: 1250 },
  { out: 'charniere-carte-page', src: 'IMG_2659', w: 1000, h: 1250 },
  { out: 'charniere-pizzas',     src: 'IMG_2650', w: 1000, h: 1250 },
  { out: 'charniere-contact',    src: 'IMG_2652', w: 1000, h: 1250 },

  // Les respirations de la carte sont calées sur la largeur de la colonne de
  // menu, en 3:2 : le 21:9 pleine largeur ne gardait qu'un tiers de la hauteur
  // d'origine et transformait chaque assiette en mur.
  { out: 'respiration-carte-1', src: 'IMG_2661', w: 1200, h: 800 },
  { out: 'respiration-carte-2', src: 'IMG_2667', w: 1200, h: 800 },

  { out: 'og', src: 'IMG_2650', w: 1200, h: 630 },
];

async function main() {
  if (!existsSync(SRC)) throw new Error(`Dossier introuvable : ${SRC}`);
  mkdirSync(OUT, { recursive: true });

  let ok = 0;
  for (const slot of SLOTS) {
    const input = resolve(SRC, `${slot.src}.jpg`);
    if (!existsSync(input)) {
      console.warn(`  manquant  ${slot.src}.jpg — emplacement "${slot.out}" ignoré`);
      continue;
    }
    const target = resolve(OUT, `${slot.out}-${VERSION_PHOTOS}.jpg`);
    await run('magick', [
      input,
      ...GRADE,
      '-resize', `${slot.w}x${slot.h}^`,
      '-gravity', slot.gravity ?? 'center',
      '-extent', `${slot.w}x${slot.h}`,
      '-strip',
      '-interlace', 'Plane',
      '-quality', '82',
      target,
    ]);
    ok += 1;
    console.log(`  ok        ${slot.out}-${VERSION_PHOTOS}.jpg  ${slot.w}×${slot.h}`);
  }

  // Les millésimes précédents ne sont plus servis : les garder ferait grossir le
  // dépôt et le déploiement sans que rien n'y renvoie.
  const attendus = new Set(SLOTS.map((slot) => `${slot.out}-${VERSION_PHOTOS}.jpg`));
  const noms = SLOTS.map((slot) => slot.out);
  let retires = 0;
  for (const fichier of readdirSync(OUT)) {
    if (!fichier.endsWith('.jpg') || attendus.has(fichier)) continue;
    if (!noms.some((nom) => fichier.startsWith(`${nom}-`))) continue;
    rmSync(resolve(OUT, fichier));
    retires += 1;
    console.log(`  retiré    ${fichier}  (millésime précédent)`);
  }

  console.log(
    `\n${ok}/${SLOTS.length} visuels générés dans public/images/ ` +
      `(millésime ${VERSION_PHOTOS}${retires ? `, ${retires} ancien(s) retiré(s)` : ''})`,
  );
}

main().catch((error) => {
  console.error('Échec de la préparation des photos :', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
