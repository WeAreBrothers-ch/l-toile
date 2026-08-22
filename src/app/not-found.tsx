import type { Metadata } from 'next';
import { RESTAURANT } from '@data/restaurant';
import { BoutonLien } from '@/components/ui/Bouton';
import { Icone } from '@/components/ui/Icone';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
};

export default function Introuvable() {
  return (
    <section className={`surfacePapier ${styles.page}`}>
      <div className="wrap">
        <p className={styles.code}>Erreur 404</p>
        <h1 className={styles.titre}>
          Cette page n’est plus <em className="italique">à la carte</em>
        </h1>
        <p className={styles.chapo}>
          Le lien a peut-être changé. La carte complète, elle, est toujours au même endroit.
        </p>
        <div className={styles.actions}>
          <BoutonLien href="/carte" variante="primaire">
            Voir la carte
          </BoutonLien>
          <BoutonLien href="/" variante="secondaire">
            Retour à l’accueil
          </BoutonLien>
          <BoutonLien href={`tel:${RESTAURANT.telephone}`} variante="tertiaire" analytics="call">
            <Icone nom="telephone" taille={16} />
            {RESTAURANT.telephoneAffiche}
          </BoutonLien>
        </div>
      </div>
    </section>
  );
}
