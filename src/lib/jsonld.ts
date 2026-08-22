import type { MenuSection, Plage } from '@data/types';
import { HORAIRES, RESTAURANT, SITE_URL } from '@data/restaurant';
import { IMAGE_PARTAGE, PHOTOS } from '@data/photos';
import { prixStructure } from './format';

/** Un nœud de données structurées. Volontairement ouvert : schema.org l'est aussi. */
export type NoeudStructure = Record<string, unknown>;

const ID_RESTAURANT = `${SITE_URL}/#restaurant`;
const ID_MENU = `${SITE_URL}/carte#menu`;

const JOURS_SCHEMA: readonly string[] = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

/** Regroupe les jours partageant exactement la même plage horaire. */
function grouperPlages(service: 'midi' | 'soir'): NoeudStructure[] {
  const groupes = new Map<string, { plage: Plage; jours: string[] }>();

  for (const jour of HORAIRES) {
    const plage = jour[service];
    const nomSchema = JOURS_SCHEMA[jour.indice];
    if (!plage || !nomSchema) continue;
    const cle = `${plage.debut}-${plage.fin}`;
    const groupe = groupes.get(cle);
    if (groupe) groupe.jours.push(nomSchema);
    else groupes.set(cle, { plage, jours: [nomSchema] });
  }

  return [...groupes.values()].map(({ plage, jours }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: jours,
    opens: plage.debut,
    closes: plage.fin,
  }));
}

function joursFermes(): NoeudStructure[] {
  return HORAIRES.filter((jour) => !jour.midi && !jour.soir)
    .map((jour) => JOURS_SCHEMA[jour.indice])
    .filter((nom): nom is string => Boolean(nom))
    .map((nom) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: nom,
      opens: '00:00',
      closes: '00:00',
    }));
}

/** Fiche du restaurant. Présente sur toutes les pages, toujours identique. */
export function ficheRestaurant(): NoeudStructure {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': ID_RESTAURANT,
    name: RESTAURANT.nom,
    alternateName: 'L’Étoile Lausanne',
    description: `Restaurant italien et brasserie à ${RESTAURANT.ville} : pizzas cuites au four, pâtes fraîches, viandes sur ardoise, poissons et fruits de mer. Réservation par téléphone.`,
    url: SITE_URL,
    image: [`${SITE_URL}${IMAGE_PARTAGE.src}`, `${SITE_URL}${PHOTOS.heroSalle.src}`],
    logo: `${SITE_URL}/images/logo-letoile.svg`,
    telephone: RESTAURANT.telephone,
    email: RESTAURANT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: RESTAURANT.rue,
      postalCode: RESTAURANT.codePostal,
      addressLocality: RESTAURANT.ville,
      addressRegion: RESTAURANT.canton,
      addressCountry: RESTAURANT.pays,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESTAURANT.latitude,
      longitude: RESTAURANT.longitude,
    },
    areaServed: { '@type': 'City', name: RESTAURANT.ville },
    servesCuisine: [...RESTAURANT.cuisines],
    priceRange: RESTAURANT.gammeDePrix,
    currenciesAccepted: 'CHF',
    paymentAccepted: 'Espèces, carte de crédit, carte de débit',
    acceptsReservations: 'Telephone',
    hasMenu: { '@id': ID_MENU },
    openingHoursSpecification: [
      ...grouperPlages('midi'),
      ...grouperPlages('soir'),
      ...joursFermes(),
    ],
  };
}

/** Une entrée de carte, avec son prix en francs. */
function plat(nom: string, description: string, prix: number, suffixe?: string): NoeudStructure {
  return {
    '@type': 'MenuItem',
    name: nom,
    ...(description ? { description } : {}),
    offers: {
      '@type': 'Offer',
      price: prixStructure(prix),
      priceCurrency: 'CHF',
      ...(suffixe ? { description: suffixe } : {}),
    },
  };
}

/** Carte complète, publiée sur /carte et référencée par la fiche du restaurant. */
export function ficheMenu(sections: readonly MenuSection[], nom: string, url: string): NoeudStructure {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': ID_MENU,
    name: nom,
    url,
    inLanguage: 'fr-CH',
    provider: { '@id': ID_RESTAURANT },
    hasMenuSection: sections.map((section) => ({
      '@type': 'MenuSection',
      name: section.titre,
      url: `${url}#${section.id}`,
      ...(section.note ? { description: section.note } : {}),
      hasMenuItem: section.items.map((item) =>
        plat(item.nom, item.description, item.prix, item.suffixePrix),
      ),
    })),
  };
}

/** Section « Pizzas », publiée sur /pizzas et rattachée à la même carte. */
export function fichePizzas(
  pizzas: readonly { readonly nom: string; readonly garniture: string; readonly prix: number }[],
  url: string,
): NoeudStructure {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuSection',
    '@id': `${url}#pizzas`,
    name: 'Pizzas',
    url,
    inLanguage: 'fr-CH',
    isPartOf: { '@id': ID_MENU },
    hasMenuItem: pizzas.map((pizza) => plat(pizza.nom, pizza.garniture, pizza.prix)),
  };
}

/** Fil d'Ariane. Aide Google à afficher le chemin sous le titre du résultat. */
export function filAriane(pages: readonly { readonly nom: string; readonly url: string }[]): NoeudStructure {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.nom,
      item: page.url,
    })),
  };
}
