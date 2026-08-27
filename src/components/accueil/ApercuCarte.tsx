import Link from 'next/link';
import { CARTE } from '@data/menu';
import { PIZZAS } from '@data/pizzas';
import { BoutonLien } from '@/components/ui/Bouton';
import { formaterPrix } from '@/lib/format';
import styles from './ApercuCarte.module.css';

interface Rang {
  readonly titre: string;
  readonly href: string;
  readonly nombre: number;
  readonly unite: string;
  readonly prixMini: number;
}

function prixLePlusBas(prix: readonly number[]): number {
  return prix.reduce((mini, valeur) => (valeur < mini ? valeur : mini), prix[0] ?? 0);
}

/** L'index se construit à partir des données : ajouter un plat le met à jour. */
const RANGS: readonly Rang[] = [
  ...CARTE.map((section) => ({
    titre: section.titre,
    href: `/carte#${section.id}`,
    nombre: section.items.length,
    unite: section.items.length > 1 ? 'plats' : 'plat',
    prixMini: prixLePlusBas(section.items.map((item) => item.prix)),
  })),
  {
    titre: 'Pizzas',
    href: '/pizzas',
    nombre: PIZZAS.length,
    unite: 'pizzas',
    prixMini: prixLePlusBas(PIZZAS.map((pizza) => pizza.prix)),
  },
];

/**
 * La carte en un coup d'œil : ce qu'il y a, combien il y en a, à partir de
 * combien. C'est la vraie question qu'on se pose avant de pousser la porte.
 */
export function ApercuCarte() {
  return (
    <section className={`surfaceEncre section ${styles.apercu}`} aria-labelledby="titre-carte">
      <div className={`wrapLarge ${styles.duo}`}>
        {/* La colonne de gauche ne défile pas avec la liste : elle reste en face
            d'elle sur un grand écran, comme le chapeau d'un article. */}
        <div className={styles.entete} data-reveal>
          <p className="eyebrow">La carte</p>
          <h2 className="titreSection" id="titre-carte">
            Tout est <em className="italique">là</em>, rien n’est caché
          </h2>
          <p className="chapo">
            Dix familles de plats, des entrées aux pizzas. Les prix sont affichés en entier :
            vous savez avant d’entrer.
          </p>

          <div className={styles.actions}>
            <BoutonLien href="/carte" variante="secondaire">
              Voir toute la carte
            </BoutonLien>
            <BoutonLien href="/pizzas" variante="tertiaire">
              Les {PIZZAS.length} pizzas
            </BoutonLien>
          </div>
        </div>

        <nav className={styles.index} aria-label="Les catégories de la carte" data-reveal>
          {RANGS.map((rang) => (
            <Link key={rang.href} href={rang.href} className={styles.rang}>
              <span className={styles.categorie}>{rang.titre}</span>
              <span className={styles.rappel} aria-hidden="true" />
              <span className={styles.chiffres}>
                {rang.nombre} {rang.unite} · dès <b>{formaterPrix(rang.prixMini)}</b>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
