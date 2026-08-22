import { HORAIRES_RESUME, LIEN_ITINERAIRE, RESTAURANT } from '@data/restaurant';
import { BoutonLien } from '@/components/ui/Bouton';
import { Icone } from '@/components/ui/Icone';
import styles from './InfosPratiques.module.css';

interface Props {
  /** Niveau de titre à utiliser selon la page qui accueille le bandeau. */
  readonly titre?: string;
}

/**
 * Horaires, adresse, téléphone. L'unique aplat rouge de la page : c'est le
 * repère qu'on cherche du regard quand on a fini de lire la carte.
 */
export function InfosPratiques({ titre = 'Venir chez nous' }: Props) {
  return (
    <section className={`surfaceRouge ${styles.bande}`} aria-labelledby="titre-infos">
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow">Infos pratiques</p>
          <h2 className="titreSection" id="titre-infos">
            {titre}
          </h2>
        </div>

        <div className={styles.colonnes} data-reveal>
          <div className={styles.colonne}>
            <h3>Horaires</h3>
            <dl>
              {HORAIRES_RESUME.map((ligne) => (
                <div key={ligne.jours} className={styles.horaire}>
                  <dt>{ligne.jours}</dt>
                  <dd>{ligne.services}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.colonne}>
            <h3>Adresse</h3>
            <address>
              {RESTAURANT.rue}
              <br />
              {RESTAURANT.codePostal} {RESTAURANT.ville}
              <br />
              Quartier de {RESTAURANT.quartierCourt}
            </address>
            <div className={styles.action}>
              <BoutonLien href={LIEN_ITINERAIRE} variante="secondaire">
                <Icone nom="epingle" taille={16} />
                Itinéraire
              </BoutonLien>
            </div>
          </div>

          <div className={styles.colonne}>
            <h3>Réservation</h3>
            <a
              className={styles.telephone}
              href={`tel:${RESTAURANT.telephone}`}
              data-analytics="call"
              aria-label={`Appeler le restaurant au ${RESTAURANT.telephoneInternational}`}
            >
              {RESTAURANT.telephoneInternational}
            </a>
            <p>
              Par téléphone uniquement.
              <br />
              <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
            </p>
            <div className={styles.action}>
              <BoutonLien href={`tel:${RESTAURANT.telephone}`} variante="primaire" analytics="call">
                <Icone nom="telephone" taille={16} />
                Appeler
              </BoutonLien>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
