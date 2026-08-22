import { ADRESSE_COMPLETE, LIEN_ITINERAIRE, RESTAURANT } from '@data/restaurant';
import { Icone } from '@/components/ui/Icone';
import { EtatOuvertureLive } from './EtatOuvertureLive';
import styles from './BarreUtilitaire.module.css';

interface Props {
  /** Au défilement, la barre se replie pour laisser la navigation seule. */
  readonly compact: boolean;
}

/**
 * Adresse, état d'ouverture et téléphone, sur toutes les pages.
 * Ce sont exactement les trois informations qu'un moteur de recherche lit dans
 * les données structurées : les afficher en clair les confirme.
 */
export function BarreUtilitaire({ compact }: Props) {
  return (
    <div className={`${styles.utilitaire} surfaceEncre`} data-compact={compact}>
      <div className={`wrap ${styles.utilitaireContenu}`}>
        <a className={styles.adresse} href={LIEN_ITINERAIRE} target="_blank" rel="noopener">
          <Icone nom="epingle" taille={14} />
          {ADRESSE_COMPLETE}
        </a>

        <EtatOuvertureLive />

        <a className={styles.telUtilitaire} href={`tel:${RESTAURANT.telephone}`} data-analytics="call">
          <Icone nom="telephone" taille={14} />
          {RESTAURANT.telephoneInternational}
        </a>
      </div>
    </div>
  );
}
