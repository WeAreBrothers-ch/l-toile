import type { Metadata } from 'next';
import { CARTE } from '@data/menu';
import { PHOTOS } from '@data/photos';
import { RESTAURANT, SITE_URL } from '@data/restaurant';
import { CategorieCarte } from '@/components/carte/CategorieCarte';
import { OngletsCategories, type Onglet } from '@/components/carte/OngletsCategories';
import { RespirationCarte } from '@/components/carte/RespirationCarte';
import { AppelReservation } from '@/components/carte/AppelReservation';
import { Garnitures } from '@/components/carte/Garnitures';
import { Charniere, classeReception } from '@/components/ui/Charniere';
import { JsonLd } from '@/components/ui/JsonLd';
import { BoutonLien } from '@/components/ui/Bouton';
import { ficheMenu, filAriane } from '@/lib/jsonld';
import { metadonneesPage } from '@/lib/metadonnees';
import styles from './page.module.css';

const URL_CARTE = `${SITE_URL}/carte`;

const ONGLETS: readonly Onglet[] = CARTE.map((section) => ({
  id: section.id,
  libelle: section.onglet,
}));

/** Les catégories sont servies en trois paquets, séparés par une respiration. */
const PAQUETS = [CARTE.slice(0, 3), CARTE.slice(3, 6), CARTE.slice(6)];

export const metadata: Metadata = metadonneesPage({
  titre: `La carte — ${RESTAURANT.nom}, Lausanne-Malley`,
  description:
    'La carte complète du Restaurant L’Étoile à Lausanne : entrées, salades, 16 pâtes fraîches, risottos, poissons, viandes sur ardoise, fondues et menu enfant. Prix affichés.',
  chemin: '/carte',
});

export default function PageCarte() {
  return (
    <>
      <JsonLd
        donnees={[
          filAriane([
            { nom: 'Accueil', url: SITE_URL },
            { nom: 'La carte', url: URL_CARTE },
          ]),
          ficheMenu(CARTE, `Carte du ${RESTAURANT.nom}`, URL_CARTE),
        ]}
      />

      <section className="surfacePapier section">
        <div className="wrap">
          <div className="read">
            <p className="eyebrow">Cuisine italienne et brasserie</p>
            <h1 className={styles.titre}>
              La carte du Restaurant L’Étoile, <em className="italique">à Lausanne</em>
            </h1>
            <p className="chapo">
              Entrées, pâtes fraîches, risottos, poissons, viandes sur ardoise et fondues.
              Tout est écrit ici, prix compris — il n’y a rien à télécharger.
            </p>
            <p className={styles.raccourci}>
              <BoutonLien href="/pizzas" variante="tertiaire">
                Voir aussi les 15 pizzas
              </BoutonLien>
            </p>
          </div>
        </div>
      </section>

      <Charniere photo={PHOTOS.charniereCartePage} cote="gauche" />

      {/* La section recule le début de son contenu de la hauteur du débordement :
          rien de critique ne passe jamais sous la photo. */}
      <section className={`surfaceEncre ${classeReception} ${styles.carte}`} aria-label="La carte">
        <OngletsCategories onglets={ONGLETS} ariaLabel="Catégories de la carte" />

        {PAQUETS.map((paquet, index) => (
          <div key={paquet[0]?.id ?? index}>
            <div className="wrap">
              <div className={`read ${styles.colonne}`}>
                {paquet.map((section) => (
                  <CategorieCarte key={section.id} section={section} />
                ))}
                {index === PAQUETS.length - 1 ? (
                  <>
                    <Garnitures />
                    <AppelReservation />
                  </>
                ) : null}
              </div>
            </div>
            {index === 0 ? <RespirationCarte photo={PHOTOS.respirationCarte1} /> : null}
            {index === 1 ? <RespirationCarte photo={PHOTOS.respirationCarte2} /> : null}
          </div>
        ))}
      </section>
    </>
  );
}
