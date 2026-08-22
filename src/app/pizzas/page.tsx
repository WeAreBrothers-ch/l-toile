import type { Metadata } from 'next';
import { PIZZAS, SUPPLEMENTS_PIZZA } from '@data/pizzas';
import type { MenuItem } from '@data/types';
import { PHOTOS } from '@data/photos';
import { RESTAURANT, SITE_URL } from '@data/restaurant';
import { LigneDePlat } from '@/components/carte/LigneDePlat';
import { AppelReservation } from '@/components/carte/AppelReservation';
import { Charniere, classeReception } from '@/components/ui/Charniere';
import { BoutonLien } from '@/components/ui/Bouton';
import { JsonLd } from '@/components/ui/JsonLd';
import { fichePizzas, filAriane } from '@/lib/jsonld';
import { metadonneesPage } from '@/lib/metadonnees';
import styles from './page.module.css';

const URL_PIZZAS = `${SITE_URL}/pizzas`;

/** Une pizza se lit exactement comme un plat : même ligne, même filet, même prix. */
const LIGNES: readonly MenuItem[] = PIZZAS.map((pizza) => ({
  nom: pizza.nom,
  description: pizza.garniture,
  prix: pizza.prix,
}));

export const metadata: Metadata = metadonneesPage({
  titre: `Pizzas — ${RESTAURANT.nom}, Lausanne-Malley`,
  description:
    'Les 15 pizzas cuites au four du Restaurant L’Étoile à Lausanne : Margherita, Quattro formaggi, Frutti di mare, Bella Italia… Prix de 17.— à 27.—.',
  chemin: '/pizzas',
});

export default function PagePizzas() {
  return (
    <>
      <JsonLd
        donnees={[
          filAriane([
            { nom: 'Accueil', url: SITE_URL },
            { nom: 'Pizzas', url: URL_PIZZAS },
          ]),
          fichePizzas(PIZZAS, URL_PIZZAS),
        ]}
      />

      <section className="surfacePapier section">
        <div className="wrap">
          <div className="read">
            <p className="eyebrow">Cuites au four</p>
            <h1 className={styles.titre}>
              Les {PIZZAS.length} pizzas de L’Étoile, <em className="italique">à Lausanne</em>
            </h1>
            <p className="chapo">
              De la Margherita à la Bella Italia, de 17.— à 27.—. Pâte travaillée sur place,
              cuisson au four, à emporter ou sur place.
            </p>
            <p className={styles.raccourci}>
              <BoutonLien href="/carte" variante="tertiaire">
                Voir la carte complète
              </BoutonLien>
            </p>
          </div>
        </div>
      </section>

      <Charniere photo={PHOTOS.charnierePizzas} />

      <section className={`surfaceEncre ${classeReception} ${styles.pizzas}`} aria-labelledby="titre-pizzas">
        <div className="wrap">
          <div className="read">
            <div className={styles.entete} data-reveal>
              <h2 className="titreSection" id="titre-pizzas">
                Toutes les pizzas
              </h2>
              <p className={styles.supplements}>{SUPPLEMENTS_PIZZA}</p>
            </div>

            <ul className={styles.liste}>
              {LIGNES.map((pizza) => (
                <LigneDePlat key={pizza.nom} item={pizza} />
              ))}
            </ul>

            <AppelReservation />
          </div>
        </div>
      </section>
    </>
  );
}
