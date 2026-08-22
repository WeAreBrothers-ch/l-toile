'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ADRESSE_COMPLETE, RESTAURANT } from '@data/restaurant';
import { Icone } from '@/components/ui/Icone';
import styles from './Plan.module.css';

const DELTA = 0.004;
const CADRE_OSM =
  `https://www.openstreetmap.org/export/embed.html?bbox=${RESTAURANT.longitude - DELTA}` +
  `%2C${RESTAURANT.latitude - DELTA / 2}%2C${RESTAURANT.longitude + DELTA}` +
  `%2C${RESTAURANT.latitude + DELTA / 2}&layer=mapnik&marker=${RESTAURANT.latitude}%2C${RESTAURANT.longitude}`;

/**
 * Plan d'accès. Le fond est une image : rien n'est demandé à un service tiers
 * tant que le visiteur ne l'a pas décidé — c'est meilleur pour la vitesse
 * d'affichage comme pour la vie privée.
 */
export function Plan() {
  const [interactif, setInteractif] = useState(false);

  return (
    <div className="wrapLarge">
      <div className={styles.plan}>
        {interactif ? (
          <iframe
            className={styles.cadre}
            src={CADRE_OSM}
            title={`Plan d’accès au ${RESTAURANT.nom}, ${ADRESSE_COMPLETE}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <>
            <Image
              className={styles.fond}
              src="/images/plan.jpg"
              alt={`Plan du quartier de ${RESTAURANT.quartierCourt} à ${RESTAURANT.ville}, situant le ${RESTAURANT.nom} au ${RESTAURANT.rue}`}
              width={1440}
              height={800}
              sizes="100vw"
              loading="lazy"
            />
            <span className={styles.marqueur} aria-hidden="true">
              <Icone nom="epingle" taille={22} />
            </span>
            <button type="button" className={styles.ouvrir} onClick={() => setInteractif(true)}>
              <span className={styles.etiquette}>Ouvrir le plan interactif</span>
            </button>
          </>
        )}
      </div>
      <p className={styles.credit}>
        Fond de plan{' '}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">
          © les contributeurs OpenStreetMap
        </a>
      </p>
    </div>
  );
}
