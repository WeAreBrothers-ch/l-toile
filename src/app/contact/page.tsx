import type { Metadata } from 'next';
import { PHOTOS } from '@data/photos';
import { HORAIRES, LIEN_ITINERAIRE, RESTAURANT, SITE_URL } from '@data/restaurant';
import { BandeauAppel } from '@/components/commun/BandeauAppel';
import { Plan } from '@/components/commun/Plan';
import { FormulaireContact } from '@/components/contact/FormulaireContact';
import { BoutonLien } from '@/components/ui/Bouton';
import { Charniere } from '@/components/ui/Charniere';
import { Icone } from '@/components/ui/Icone';
import { JsonLd } from '@/components/ui/JsonLd';
import { decrireServices } from '@/lib/horaires';
import { filAriane } from '@/lib/jsonld';
import { metadonneesPage } from '@/lib/metadonnees';
import styles from './page.module.css';

export const metadata: Metadata = metadonneesPage({
  titre: `Contact et accès — ${RESTAURANT.nom}, Lausanne`,
  description:
    'Restaurant L’Étoile, rue de Genève 102 à Lausanne-Malley. Horaires, plan d’accès, itinéraire et formulaire de contact. Réservation par téléphone au 021 625 15 44.',
  chemin: '/contact',
});

export default function PageContact() {
  return (
    <>
      <JsonLd
        donnees={filAriane([
          { nom: 'Accueil', url: SITE_URL },
          { nom: 'Contact', url: `${SITE_URL}/contact` },
        ])}
      />

      <section className="surfacePapier section">
        <div className="wrap">
          <p className="eyebrow">Nous trouver</p>
          <h1 className={styles.titre}>
            Contact et accès — L’Étoile, <em className="italique">Lausanne</em>
          </h1>
          <p className="chapo">
            Rue de Genève 102, à deux pas de la gare de Lausanne-Sébeillon et de Malley.
          </p>

          <div className={styles.duo}>
            <div className={styles.bloc}>
              <h2>Adresse</h2>
              <address>
                {RESTAURANT.nom}
                <br />
                {RESTAURANT.rue}
                <br />
                {RESTAURANT.codePostal} {RESTAURANT.ville}, Suisse
              </address>
              <p>
                <a href={`tel:${RESTAURANT.telephone}`} data-analytics="call">
                  {RESTAURANT.telephoneInternational}
                </a>
                <br />
                <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
              </p>
              <div className={styles.action}>
                <BoutonLien href={LIEN_ITINERAIRE} variante="secondaire">
                  <Icone nom="epingle" taille={16} />
                  Ouvrir l’itinéraire
                </BoutonLien>
              </div>
            </div>

            <div className={styles.bloc} id="horaires">
              <h2>Horaires d’ouverture</h2>
              <dl className={styles.semaine}>
                {HORAIRES.map((jour) => (
                  <div key={jour.nom} className={styles.jour} data-ferme={!jour.midi && !jour.soir}>
                    <dt>{jour.nom}</dt>
                    <dd>{decrireServices(jour)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <BandeauAppel />

      <section className="surfacePapier sectionSerree" aria-label="Plan d’accès">
        <Plan />
      </section>

      <section className="surfacePapier section" aria-labelledby="titre-message">
        <div className="wrap">
          <p className="eyebrow">Une question</p>
          <h2 className="titreSection" id="titre-message">
            Écrivez-nous
          </h2>
          <p className="chapo">
            Groupe, allergie, événement privé : posez votre question ici. Pour réserver une table,
            le téléphone reste le plus rapide.
          </p>
          <div className={styles.action}>
            <FormulaireContact />
          </div>
        </div>
      </section>

      {/* Dernière charnière du site : la photo verse dans l'encre du pied de page. */}
      <Charniere photo={PHOTOS.charniereContact} cote="gauche" versPied />
    </>
  );
}
