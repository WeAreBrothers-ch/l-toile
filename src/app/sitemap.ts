/*
  Le site étant exporté en fichiers statiques, ce fichier doit être écrit une
  fois pour toutes à la génération. Sans cette mention, Next le considère comme
  une route calculée à la demande et refuse l'export.
*/
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@data/restaurant';

/** Plan du site. Il se met à jour tout seul si une page est ajoutée ci-dessous. */
export default function sitemap(): MetadataRoute.Sitemap {
  const misAJour = new Date();

  return [
    { url: SITE_URL, lastModified: misAJour, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/carte`, lastModified: misAJour, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/pizzas`, lastModified: misAJour, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: misAJour, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
