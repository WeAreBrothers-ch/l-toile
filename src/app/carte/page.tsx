import type { Metadata } from 'next';
import { CARTE } from '@data/menu';
import { PHOTOS } from '@data/photos';
import { RESTAURANT, SITE_URL } from '@data/restaurant';
import { CategorieCarte } from '@/components/carte/CategorieCarte';
import { OngletsCategories, type Onglet } from '@/components/carte/OngletsCategories';
import { RespirationCarte } from '@/components/carte/RespirationCarte';
import { AppelReservation } from '@/components/carte/AppelReservation';
import { Garnitures } from '@/components/carte/Garnitures';
import { Duo } from '@/components/ui/Duo';
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

      {/* La page s'ouvre sur un duo : le titre d'un côté, une assiette de
          l'autre. Le lecteur voit ce qu'il vient chercher avant de lire. */}
      <section className="surfacePapier section">
        <Duo
          photo={PHOTOS.duoCarte}
          eyebrow="Cuisine italienne et brasserie"
          titre={
            <>
              La carte du Restaurant L’Étoile, <em className="italique">à Lausanne</em>
            </>
          }
          niveau="h1"
          cote="gauche"
          prioritaire
        >
          <p className="chapo">
            Entrées, pâtes fraîches, risottos, poissons, viandes sur ardoise et fondues.
            Tout est écrit ici, prix compris — il n’y a rien à télécharger.
          </p>
          <div data-actions>
            <BoutonLien href="/pizzas" variante="tertiaire">
              Voir aussi les 15 pizzas
            </BoutonLien>
          </div>
        </Duo>
      </section>

      <section className={`surfaceEncre ${styles.carte}`} aria-label="La carte">
        <OngletsCategories onglets={ONGLETS} ariaLabel="Catégories de la carte" />

        {PAQUETS.map((paquet, index) => (
          <div key={paquet[0]?.id ?? index}>
            <div className="wrap">
              <div className={styles.colonne}>
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
