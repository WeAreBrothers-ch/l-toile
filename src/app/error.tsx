'use client';

import { useEffect } from 'react';
import { RESTAURANT } from '@data/restaurant';
import { Bouton, BoutonLien } from '@/components/ui/Bouton';
import { Icone } from '@/components/ui/Icone';
import styles from './not-found.module.css';

interface Props {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

/**
 * Filet de sécurité : si une page échoue, le visiteur garde de quoi agir —
 * réessayer, revenir à la carte, ou simplement appeler.
 */
export default function Erreur({ error, reset }: Props) {
  useEffect(() => {
    // L'identifiant permet de retrouver l'incident côté hébergeur sans exposer
    // le détail technique au visiteur.
    if (typeof window !== 'undefined' && error.digest) {
      window.dispatchEvent(new CustomEvent('letoile:erreur', { detail: error.digest }));
    }
  }, [error]);

  return (
    <section className={`surfacePapier ${styles.page}`}>
      <div className="wrap">
        <p className={styles.code}>Incident technique</p>
        <h1 className={styles.titre}>
          Quelque chose n’a pas <em className="italique">abouti</em>
        </h1>
        <p className={styles.chapo}>
          La page n’a pas pu s’afficher. Réessayez dans un instant — et si cela persiste,
          un coup de téléphone reste le plus sûr.
        </p>
        <div className={styles.actions}>
          <Bouton variante="primaire" onClick={reset}>
            Réessayer
          </Bouton>
          <BoutonLien href="/carte" variante="secondaire">
            Voir la carte
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
