import type { Metadata } from 'next';
import { PHOTOS } from '@data/photos';
import { RESTAURANT, SITE_URL } from '@data/restaurant';
import { Hero } from '@/components/accueil/Hero';
import { AccesDirect } from '@/components/accueil/AccesDirect';
import { PlatsSignature } from '@/components/accueil/PlatsSignature';
import { ApercuCarte } from '@/components/accueil/ApercuCarte';
import { InfosPratiques } from '@/components/commun/InfosPratiques';
import { Plan } from '@/components/commun/Plan';
import { Charniere } from '@/components/ui/Charniere';
import { JsonLd } from '@/components/ui/JsonLd';
import { filAriane } from '@/lib/jsonld';
import { metadonneesPage } from '@/lib/metadonnees';

export const metadata: Metadata = metadonneesPage({
  titre: `${RESTAURANT.nom} — Restaurant italien et pizzeria à Lausanne`,
  description:
    'Restaurant italien à Lausanne-Malley : pizzas cuites au four, pâtes fraîches, viandes sur ardoise et poissons. Rue de Genève 102. Réservation au 021 625 15 44.',
  chemin: '/',
});

export default function Accueil() {
  return (
    <>
      <JsonLd donnees={filAriane([{ nom: 'Accueil', url: SITE_URL }])} />

      <Hero />
      <AccesDirect />
      <PlatsSignature />

      {/* La photo enjambe la frontière : c'est elle qui coud le blanc à l'encre. */}
      <Charniere photo={PHOTOS.charniereCarte} />
      <ApercuCarte />

      <InfosPratiques />
      <Plan />
    </>
  );
}
