import type { MenuItem } from '@data/types';
import { formaterPrix } from '@/lib/format';
import styles from './LigneDePlat.module.css';

interface Props {
  readonly item: MenuItem;
}

/**
 * Une ligne de la carte. Le prix n'est jamais gros ni gras : c'est le filet de
 * rappel et l'alignement à droite qui font le travail de lecture.
 */
export function LigneDePlat({ item }: Props) {
  return (
    <li className={styles.plat}>
      <p className={styles.ligne}>
        <span className={styles.nom}>{item.nom}</span>
        <span className={styles.rappel} aria-hidden="true" />
        <span className={styles.prix}>
          {formaterPrix(item.prix)}
          {item.suffixePrix ? <span className={styles.parPersonne}> {item.suffixePrix}</span> : null}
        </span>
      </p>

      {item.description ? <p className={styles.description}>{item.description}</p> : null}

      {item.mention || item.prixPlat !== undefined ? (
        <p className={styles.meta}>
          {item.mention ? <span>{item.mention}</span> : null}
          {item.prixPlat !== undefined ? (
            <span>
              En plat <b>{formaterPrix(item.prixPlat)}</b>
            </span>
          ) : null}
        </p>
      ) : null}
    </li>
  );
}
