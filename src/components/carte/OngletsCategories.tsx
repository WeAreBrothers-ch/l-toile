'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './OngletsCategories.module.css';

export interface Onglet {
  readonly id: string;
  readonly libelle: string;
}

interface Props {
  readonly onglets: readonly Onglet[];
  readonly ariaLabel: string;
}

/** Tolérance sous le point d'atterrissage d'une ancre, en pixels. */
const TOLERANCE = 8;

/**
 * Hauteur à laquelle une ancre se pose, lue dans la feuille de style.
 * La valeur n'est pas recopiée ici : elle vit dans `--ancre-haut`, et c'est la
 * même qui positionne le titre et qui décide de l'onglet souligné.
 */
function pointDAtterrissage(): number {
  const valeur = getComputedStyle(document.documentElement).scrollPaddingTop;
  const px = Number.parseFloat(valeur);
  return Number.isFinite(px) ? px + TOLERANCE : 124;
}

/**
 * Onglets de catégories collants.
 *
 * Ce sont de vrais liens vers de vraies ancres : ils fonctionnent sans
 * JavaScript, ils sont copiables et partageables, et tout le contenu reste
 * présent dans la page. Le script n'ajoute qu'une chose : savoir où l'on est.
 */
export function OngletsCategories({ onglets, ariaLabel }: Props) {
  const [actif, setActif] = useState<string>(onglets[0]?.id ?? '');
  const defilement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let attente = 0;

    const calculer = (): void => {
      attente = 0;
      const seuil = pointDAtterrissage();
      let courant = onglets[0]?.id ?? '';
      for (const onglet of onglets) {
        const section = document.getElementById(onglet.id);
        if (section && section.getBoundingClientRect().top <= seuil) courant = onglet.id;
      }
      setActif(courant);
    };

    const surDefilement = (): void => {
      if (attente) return;
      attente = window.requestAnimationFrame(calculer);
    };

    calculer();
    window.addEventListener('scroll', surDefilement, { passive: true });
    return () => {
      window.removeEventListener('scroll', surDefilement);
      if (attente) window.cancelAnimationFrame(attente);
    };
  }, [onglets]);

  // Garder l'onglet actif visible sans jamais déplacer la page elle-même.
  useEffect(() => {
    const piste = defilement.current;
    const onglet = piste?.querySelector<HTMLElement>(`[data-onglet="${actif}"]`);
    if (!piste || !onglet) return;

    const debut = onglet.offsetLeft;
    const fin = debut + onglet.offsetWidth;
    if (debut < piste.scrollLeft) piste.scrollLeft = Math.max(0, debut - 16);
    else if (fin > piste.scrollLeft + piste.clientWidth) piste.scrollLeft = fin - piste.clientWidth + 16;
  }, [actif]);

  return (
    <div className={styles.barre}>
      <div className="wrap">
        <nav className={styles.defilement} ref={defilement} aria-label={ariaLabel}>
          {onglets.map((onglet) => (
            <a
              key={onglet.id}
              href={`#${onglet.id}`}
              data-onglet={onglet.id}
              className={styles.onglet}
              aria-current={actif === onglet.id ? 'true' : undefined}
            >
              {onglet.libelle}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
