import { RESTAURANT } from '@data/restaurant';
import { BoutonLien } from '@/components/ui/Bouton';
import { Icone } from '@/components/ui/Icone';
import styles from './AppelReservation.module.css';

/** Fin de carte : le moment exact où l'on décide de venir. */
export function AppelReservation() {
  return (
    <div className={styles.bloc} data-reveal>
      <h2 className={styles.titre}>Une table ce soir ?</h2>
      <p className={styles.detail}>
        La réservation se fait par téléphone, du lundi au samedi.
        <br />
        Midi 11h45 – 13h30 · Soir 18h45 – 22h00 (22h30 vendredi et samedi).
      </p>
      <div className={styles.action}>
        <BoutonLien
          href={`tel:${RESTAURANT.telephone}`}
          variante="primaire"
          grand
          analytics="call"
          ariaLabel={`Appeler le restaurant au ${RESTAURANT.telephoneInternational}`}
        >
          <Icone nom="telephone" taille={16} />
          {RESTAURANT.telephoneAffiche}
        </BoutonLien>
      </div>
    </div>
  );
}
