import { RESTAURANT } from '@data/restaurant';
import styles from './BandeauAppel.module.css';

/** Réservation : une seule voie, un seul numéro, en très grand. */
export function BandeauAppel() {
  return (
    <section className={`surfaceRouge ${styles.bande}`} aria-labelledby="titre-reserver">
      <div className="wrap">
        <p className="eyebrow">Réservation</p>
        <h2 className={styles.titre} id="titre-reserver">
          Une table se réserve <em className="italique">au téléphone</em>
        </h2>
        <a
          className={styles.numero}
          href={`tel:${RESTAURANT.telephone}`}
          data-analytics="call"
          aria-label={`Appeler le restaurant au ${RESTAURANT.telephoneInternational}`}
        >
          {RESTAURANT.telephoneInternational}
        </a>
        <p className={styles.detail}>
          Du lundi au samedi, midi et soir. Fermé le dimanche.
        </p>
      </div>
    </section>
  );
}
