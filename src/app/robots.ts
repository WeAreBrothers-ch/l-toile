/*
  Le site étant exporté en fichiers statiques, ce fichier doit être écrit une
  fois pour toutes à la génération. Sans cette mention, Next le considère comme
  une route calculée à la demande et refuse l'export.
*/
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@data/restaurant';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
