import type { JourOuverture } from './types';

/**
 * Fiche d'identité du restaurant.
 * Ces valeurs alimentent à la fois l'affichage et les données structurées :
 * elles doivent rester strictement identiques à la fiche Google Business,
 * à local.ch et à search.ch, sous peine d'affaiblir le référencement local.
 */
export const RESTAURANT = {
  nom: 'Restaurant L’Étoile',
  nomCourt: 'L’Étoile',
  baseline: 'Cuisine italienne et brasserie à Lausanne',
  rue: 'Rue de Genève 102',
  codePostal: '1004',
  ville: 'Lausanne',
  canton: 'Vaud',
  pays: 'CH',
  telephone: '+41216251544',
  telephoneAffiche: '021 625 15 44',
  telephoneInternational: '+41 21 625 15 44',
  email: 'etoile.restaurant@hotmail.com',
  latitude: 46.526147,
  longitude: 6.609841,
  gammeDePrix: 'CHF 17–55',
  cuisines: ['Italienne', 'Brasserie', 'Pizzeria'] as const,
  quartier: 'Lausanne-Malley',
  quartierCourt: 'Malley',
} as const;

/** URL de production. Sert de base aux canonicals, au sitemap et aux Open Graph. */
export const SITE_URL = 'https://www.restaurant-letoile.ch';

/** Adresse postale sur une ligne, pour les liens d'itinéraire et les résumés. */
export const ADRESSE_COMPLETE = `${RESTAURANT.rue}, ${RESTAURANT.codePostal} ${RESTAURANT.ville}`;

/** Lien d'itinéraire. Ouvre l'application de cartes du visiteur. */
export const LIEN_ITINERAIRE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${ADRESSE_COMPLETE}, Suisse`,
)}`;

/**
 * Horaires réels. Midi du lundi au samedi, soir prolongé le vendredi et le samedi,
 * fermé le dimanche.
 */
export const HORAIRES: readonly JourOuverture[] = [
  { indice: 1, nom: 'Lundi', midi: { debut: '11:45', fin: '13:30' }, soir: { debut: '18:45', fin: '22:00' } },
  { indice: 2, nom: 'Mardi', midi: { debut: '11:45', fin: '13:30' }, soir: { debut: '18:45', fin: '22:00' } },
  { indice: 3, nom: 'Mercredi', midi: { debut: '11:45', fin: '13:30' }, soir: { debut: '18:45', fin: '22:00' } },
  { indice: 4, nom: 'Jeudi', midi: { debut: '11:45', fin: '13:30' }, soir: { debut: '18:45', fin: '22:00' } },
  { indice: 5, nom: 'Vendredi', midi: { debut: '11:45', fin: '13:30' }, soir: { debut: '18:45', fin: '22:30' } },
  { indice: 6, nom: 'Samedi', midi: { debut: '11:45', fin: '13:30' }, soir: { debut: '18:45', fin: '22:30' } },
  { indice: 0, nom: 'Dimanche', midi: null, soir: null },
];

/** Regroupement lisible des horaires, pour l'affichage. */
export const HORAIRES_RESUME: readonly { readonly jours: string; readonly services: string }[] = [
  { jours: 'Lundi – jeudi', services: '11h45 – 13h30 · 18h45 – 22h00' },
  { jours: 'Vendredi – samedi', services: '11h45 – 13h30 · 18h45 – 22h30' },
  { jours: 'Dimanche', services: 'Fermé' },
];

/** Navigation principale. Cinq entrées au maximum, jamais plus. */
export const NAVIGATION: readonly { readonly libelle: string; readonly href: string }[] = [
  { libelle: 'La carte', href: '/carte' },
  { libelle: 'Pizzas', href: '/pizzas' },
  { libelle: 'Contact', href: '/contact' },
];
