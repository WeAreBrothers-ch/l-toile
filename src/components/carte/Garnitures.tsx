import { GARNITURES, SAUCES } from '@data/accompagnements';
import { formaterPrix } from '@/lib/format';
import styles from './Garnitures.module.css';

/**
 * Garnitures et sauces. Bloc de référence : il vaut pour les viandes, les
 * fondues et le menu enfant, et évite de répéter la même mention dix fois.
 */
export function Garnitures() {
  return (
    <section className={styles.bloc} id="garnitures" aria-labelledby="titre-garnitures">
      <h2 className={styles.titre} id="titre-garnitures">
        Garnitures &amp; sauces
      </h2>
      <p className={styles.intro}>
        Valable sur les viandes, les fondues et le menu enfant. Garniture au choix, comprise :{' '}
        {GARNITURES.join(' · ').toLowerCase()}.
      </p>

      <h3 className={styles.sousTitre}>Sauces en supplément</h3>
      <ul className={styles.sauces}>
        {SAUCES.map((sauce) => (
          <li key={sauce.nom} className={styles.sauce}>
            <span>{sauce.nom}</span>
            <span className={styles.rappel} aria-hidden="true" />
            <span className={styles.prix}>{formaterPrix(sauce.prix)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
