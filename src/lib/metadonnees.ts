import type { Metadata } from 'next';
import { RESTAURANT, SITE_URL } from '@data/restaurant';
import { IMAGE_PARTAGE } from '@data/photos';

interface OptionsPage {
  readonly titre: string;
  readonly description: string;
  /** Chemin relatif, « / » pour l'accueil. */
  readonly chemin: string;
}

/**
 * Construit les métadonnées d'une page : titre, description, canonique,
 * Open Graph et Twitter. Un seul endroit à corriger si l'URL du site change.
 */
export function metadonneesPage({ titre, description, chemin }: OptionsPage): Metadata {
  const url = new URL(chemin, SITE_URL).toString();
  const image = `${SITE_URL}${IMAGE_PARTAGE.src}`;

  return {
    // Titre exact : il ne passe pas par le gabarit global.
    title: { absolute: titre },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: RESTAURANT.nom,
      locale: 'fr_CH',
      title: titre,
      description,
      url,
      images: [
        {
          url: image,
          width: IMAGE_PARTAGE.largeur,
          height: IMAGE_PARTAGE.hauteur,
          alt: IMAGE_PARTAGE.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titre,
      description,
      images: [image],
    },
  };
}
