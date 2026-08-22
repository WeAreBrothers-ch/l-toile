import Link from 'next/link';
import type { ReactNode } from 'react';
import { LIEN_ITINERAIRE, RESTAURANT } from '@data/restaurant';
import { Icone } from '@/components/ui/Icone';
import styles from './AccesDirect.module.css';

interface Acces {
  readonly libelle: string;
  readonly valeur: ReactNode;
  readonly href: string;
  readonly externe?: boolean;
  readonly analytics?: string;
  readonly ariaLabel?: string;
}

const ACCES: readonly Acces[] = [
  { libelle: 'La carte', valeur: 'Pâtes, viandes, poissons', href: '/carte' },
  {
    libelle: 'Réserver',
    valeur: RESTAURANT.telephoneAffiche,
    href: `tel:${RESTAURANT.telephone}`,
    externe: true,
    analytics: 'call',
    ariaLabel: `Réserver par téléphone au ${RESTAURANT.telephoneInternational}`,
  },
  { libelle: 'Horaires', valeur: 'Midi et soir, sauf dimanche', href: '/contact#horaires' },
  { libelle: 'Itinéraire', valeur: RESTAURANT.rue, href: LIEN_ITINERAIRE, externe: true },
];

/** Quatre accès directs, posés à cheval sur le bas du bandeau d'ouverture. */
export function AccesDirect() {
  return (
    <div className={styles.chevauchement}>
      <div className="wrap">
        <nav className={styles.grille} aria-label="Accès direct">
          {ACCES.map((acces) => {
            const contenu = (
              <>
                <span className={styles.libelle}>
                  {acces.libelle}
                  <Icone nom="chevron" taille={16} />
                </span>
                <span className={styles.valeur}>{acces.valeur}</span>
              </>
            );

            return acces.externe ? (
              <a
                key={acces.libelle}
                className={styles.cellule}
                href={acces.href}
                aria-label={acces.ariaLabel}
                {...(acces.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                {...(acces.analytics ? { 'data-analytics': acces.analytics } : {})}
              >
                {contenu}
              </a>
            ) : (
              <Link key={acces.libelle} className={styles.cellule} href={acces.href}>
                {contenu}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
