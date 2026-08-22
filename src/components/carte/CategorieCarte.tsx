import type { MenuSection } from '@data/types';
import { LigneDePlat } from './LigneDePlat';
import styles from './CategorieCarte.module.css';

interface Props {
  readonly section: MenuSection;
}

/**
 * Une catégorie de la carte, ancrée pour les onglets.
 * Tout le contenu est présent dans le HTML : un plat masqué est un plat que
 * Google n'indexe pas et qu'un lecteur d'écran ne lit pas.
 */
export function CategorieCarte({ section }: Props) {
  // Une catégorie vidée de ses plats ne doit pas laisser un titre orphelin.
  if (section.items.length === 0) return null;

  return (
    <section className={styles.categorie} id={section.id} aria-labelledby={`titre-${section.id}`}>
      <h2 className={styles.titre} id={`titre-${section.id}`}>
        {section.titre}
      </h2>
      {section.note ? <p className={styles.note}>{section.note}</p> : null}
      <ul className={styles.liste}>
        {section.items.map((item) => (
          <LigneDePlat key={item.nom} item={item} />
        ))}
      </ul>
    </section>
  );
}
