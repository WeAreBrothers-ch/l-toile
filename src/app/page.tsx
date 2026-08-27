import type { Metadata } from 'next';
import { CARTE } from '@data/menu';
import { PHOTOS } from '@data/photos';
import { PIZZAS } from '@data/pizzas';
import { RESTAURANT, SITE_URL } from '@data/restaurant';
import { Hero } from '@/components/accueil/Hero';
import { AccesDirect } from '@/components/accueil/AccesDirect';
import { PlatsSignature } from '@/components/accueil/PlatsSignature';
import { Galerie } from '@/components/accueil/Galerie';
import { ApercuCarte } from '@/components/accueil/ApercuCarte';
import { InfosPratiques } from '@/components/commun/InfosPratiques';
import { Plan } from '@/components/commun/Plan';
import { BoutonLien } from '@/components/ui/Bouton';
import { Duo } from '@/components/ui/Duo';
import { JsonLd } from '@/components/ui/JsonLd';
import { filAriane } from '@/lib/jsonld';
import { metadonneesPage } from '@/lib/metadonnees';

export const metadata: Metadata = metadonneesPage({
  titre: `${RESTAURANT.nom} — Restaurant italien et pizzeria à Lausanne`,
  description:
    'Restaurant italien à Lausanne-Malley : pizzas cuites au four, pâtes fraîches, viandes sur ardoise et poissons. Rue de Genève 102. Réservation au 021 625 15 44.',
  chemin: '/',
});

/** Les chiffres du texte sont ceux de la carte : ils ne peuvent pas dériver. */
const NOMBRE_PATES = CARTE.find((section) => section.id === 'pasta')?.items.length ?? 0;

export default function Accueil() {
  return (
    <>
      <JsonLd donnees={filAriane([{ nom: 'Accueil', url: SITE_URL }])} />

      <Hero />
      <AccesDirect />
      <PlatsSignature />

      {/* Le seul endroit du site qui ne vend rien : ce qu'est la maison, et
          pourquoi on y va plutôt qu'ailleurs. */}
      <section className="surfacePapier section" aria-labelledby="titre-maison">
        <Duo
          photo={PHOTOS.duoMaison}
          eyebrow="La maison"
          titre={
            <>
              Une cuisine <em className="italique">italienne</em>, et une brasserie
            </>
          }
          id="titre-maison"
          cote="droite"
        >
          <p className="chapo">
            {NOMBRE_PATES} pâtes fraîches, {PIZZAS.length} pizzas cuites au four, des poissons et
            des fruits de mer, des ardoises de 220 g et des fondues à discrétion.
          </p>
          <p>
            À midi, le service commence à 11h45 et va vite : le quartier travaille. Le soir, la
            salle se remplit à partir de 18h45, le bar s’allume, et plus personne ne regarde
            l’heure.
          </p>
          <div data-actions>
            <BoutonLien href="/carte" variante="secondaire">
              Voir toute la carte
            </BoutonLien>
          </div>
        </Duo>
      </section>

      <Galerie />
      <ApercuCarte />

      <InfosPratiques />
      <Plan />
    </>
  );
}
