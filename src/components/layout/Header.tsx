'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAVIGATION, RESTAURANT } from '@data/restaurant';
import { BoutonLien } from '@/components/ui/Bouton';
import { Icone } from '@/components/ui/Icone';
import { BarreUtilitaire } from './BarreUtilitaire';
import { MenuMobile } from './MenuMobile';
import styles from './Header.module.css';

/** Au-delà de cette distance, les deux étages fusionnent en une seule barre. */
const SEUIL_COMPACT = 40;

export function Header() {
  const chemin = usePathname();
  const [compact, setCompact] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);

  useEffect(() => {
    const surDefilement = (): void => setCompact(window.scrollY > SEUIL_COMPACT);
    surDefilement();
    window.addEventListener('scroll', surDefilement, { passive: true });
    return () => window.removeEventListener('scroll', surDefilement);
  }, []);

  return (
    <>
      <header className={styles.entete} data-compact={compact}>
        <BarreUtilitaire compact={compact} />

        <div className={styles.barre}>
          <div className={`wrap ${styles.barreContenu}`}>
            <button
              type="button"
              className={`${styles.iconeSeule} ${styles.boutonMenu}`}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={menuOuvert}
              aria-controls="menu-mobile"
              onClick={() => setMenuOuvert(true)}
            >
              <Icone nom="menu" taille={22} />
            </button>

            <Link className={styles.logoLien} href="/" aria-label={`${RESTAURANT.nom}, accueil`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.logo}
                src="/images/logo-letoile.svg"
                alt={RESTAURANT.nom}
                width={113}
                height={32}
              />
            </Link>

            <nav className={styles.nav} aria-label="Navigation principale">
              {NAVIGATION.map((entree) => (
                <Link
                  key={entree.href}
                  href={entree.href}
                  className={styles.lienNav}
                  aria-current={chemin === entree.href ? 'page' : undefined}
                >
                  {entree.libelle}
                </Link>
              ))}
            </nav>

            <div className={styles.actions}>
              <a
                className={`${styles.iconeSeule} ${styles.telIcone}`}
                href={`tel:${RESTAURANT.telephone}`}
                aria-label={`Appeler le restaurant au ${RESTAURANT.telephoneInternational}`}
                data-analytics="call"
              >
                <Icone nom="telephone" taille={22} />
              </a>
              <BoutonLien
                href={`tel:${RESTAURANT.telephone}`}
                variante="primaire"
                className={styles.reserverLong}
                analytics="call"
                ariaLabel={`Réserver par téléphone au ${RESTAURANT.telephoneInternational}`}
              >
                <Icone nom="telephone" taille={16} />
                Réserver · {RESTAURANT.telephoneAffiche}
              </BoutonLien>
            </div>
          </div>
        </div>
      </header>

      <MenuMobile ouvert={menuOuvert} onFermer={() => setMenuOuvert(false)} cheminActuel={chemin} />
    </>
  );
}
