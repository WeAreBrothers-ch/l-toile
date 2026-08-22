'use client';

import { useEffect, useState } from 'react';
import { etatOuverture, type EtatOuverture } from '@/lib/horaires';
import styles from './EtatOuvertureLive.module.css';

/**
 * Indique si le restaurant est ouvert à l'instant, à l'heure de Lausanne.
 *
 * Le calcul a lieu chez le visiteur : les pages étant générées une fois pour
 * toutes, un calcul au moment de la génération figerait l'information.
 * Avant ce calcul, on affiche les horaires du jour sous une forme neutre —
 * jamais de case vide, jamais de saut de mise en page.
 */
export function EtatOuvertureLive() {
  const [etat, setEtat] = useState<EtatOuverture | null>(null);

  useEffect(() => {
    const rafraichir = (): void => setEtat(etatOuverture(new Date()));
    rafraichir();
    // Une minute suffit : les changements d'état sont à la minute près.
    const minuterie = window.setInterval(rafraichir, 60_000);
    return () => window.clearInterval(minuterie);
  }, []);

  if (!etat) {
    return (
      <span className={styles.etat} suppressHydrationWarning>
        <span className={styles.pastille} />
        <span className={styles.detail}>Midi et soir, du lundi au samedi</span>
      </span>
    );
  }

  // Ouvert : on montre les services du jour. Fermé : on montre la prochaine
  // ouverture. Écrire les deux reviendrait à répéter la même heure.
  const libelle = etat.ouvert ? 'Ouvert' : 'Fermé';
  const detail = etat.ouvert ? etat.services : etat.message;

  return (
    <span className={styles.etat} data-ouvert={etat.ouvert} suppressHydrationWarning>
      <span className={styles.pastille} />
      <span className={styles.libelle}>{libelle}</span>
      <span className={styles.detail}>· {detail}</span>
    </span>
  );
}
