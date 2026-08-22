'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RESTAURANT } from '@data/restaurant';
import { Icone } from '@/components/ui/Icone';
import styles from './BarreAction.module.css';

/** Distance après laquelle la barre d'action apparaît. */
const SEUIL = 320;

/**
 * Barre d'action fixe, mobile uniquement : voir la carte, ou appeler.
 * La réservation étant téléphonique, l'appel est le premier objectif du site.
 */
export function BarreAction() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const surDefilement = (): void => setVisible(window.scrollY > SEUIL);
    surDefilement();
    window.addEventListener('scroll', surDefilement, { passive: true });
    return () => window.removeEventListener('scroll', surDefilement);
  }, []);

  return (
    <div className={styles.barre} data-visible={visible} aria-hidden={!visible}>
      <Link className={`${styles.action} ${styles.carte}`} href="/carte" tabIndex={visible ? 0 : -1}>
        La carte
      </Link>
      <a
        className={`${styles.action} ${styles.appeler}`}
        href={`tel:${RESTAURANT.telephone}`}
        data-analytics="call"
        tabIndex={visible ? 0 : -1}
        aria-label={`Appeler le restaurant au ${RESTAURANT.telephoneInternational}`}
      >
        <Icone nom="telephone" taille={16} />
        Appeler
      </a>
    </div>
  );
}
