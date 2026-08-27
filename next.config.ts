import type { NextConfig } from 'next';

/**
 * Le site est exporté en fichiers statiques.
 *
 * `npm run build` n'écrit pas une application à servir : il écrit un dossier
 * `out/` de `.html`, `.css`, `.js` et `.jpg`, à déposer tel quel sur n'importe
 * quel hébergement — un FTP Infomaniak, GitHub Pages, un simple dossier Apache.
 * Aucun Node, aucun serveur, aucune configuration côté hébergeur.
 *
 * Ce que cela interdit, en retour : pas de code exécuté à la visite. Le
 * formulaire de contact s'adresse donc à un service de réception extérieur
 * (voir `FormulaireContact.tsx`), et l'indication « ouvert / fermé » se calcule
 * dans le navigateur — elle le faisait déjà.
 */
const nextConfig: NextConfig = {
  output: 'export',

  /*
    Écrit `carte/index.html` plutôt que `carte.html`. Les deux fonctionnent sur
    un hébergement bien réglé ; seul le premier fonctionne partout, y compris
    sur un Apache qui ne devine pas les extensions.
  */
  trailingSlash: true,

  /*
    Le site vit à la racine du domaine. Il n'a besoin d'un préfixe que servi
    depuis un sous-dossier — l'aperçu GitHub Pages, qui répond sous
    `/l-toile/`. La variable est posée par le workflow, jamais à la main.
  */
  basePath: process.env['NEXT_PUBLIC_BASE_PATH'] ?? '',

  reactStrictMode: true,
  // Pas de fichiers d'instructions pour agents dans un projet client.
  agentRules: false,
  poweredByHeader: false,
  images: {
    /*
      L'optimiseur d'images de Next est un service : il recadre et convertit à
      la demande, ce qui suppose un serveur. Sur un hébergement de fichiers il
      n'existe pas, et les images sont servies telles qu'elles ont été écrites.

      C'est pour cela que `scripts/preparer-photos.mjs` les prépare déjà à la
      bonne taille et à la bonne qualité : chaque fichier fait entre 100 et
      250 ko, ce qui est le poids qu'un visiteur recevra vraiment.
    */
    unoptimized: true,
    deviceSizes: [400, 640, 800, 1080, 1200, 1600, 2000],
    imageSizes: [200, 300, 400, 600],
  },
};

export default nextConfig;
