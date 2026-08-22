"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ADRESSE_COMPLETE, NAVIGATION, RESTAURANT } from "@data/restaurant";
import { BoutonLien } from "@/components/ui/Bouton";
import { Icone } from "@/components/ui/Icone";
import styles from "./MenuMobile.module.css";

interface Props {
  readonly ouvert: boolean;
  readonly onFermer: () => void;
  readonly cheminActuel: string;
}

/**
 * Navigation mobile en plein écran. S'appuie sur `<dialog>` : le piégeage du
 * focus, la touche Échap et le rôle de dialogue sont assurés par le navigateur.
 */
export function MenuMobile({ ouvert, onFermer, cheminActuel }: Props) {
  const panneau = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = panneau.current;
    if (!element) return;
    try {
      if (ouvert && !element.open) element.showModal();
      if (!ouvert && element.open) element.close();
    } catch {
      // Un navigateur sans `showModal` reste utilisable : le menu ne s'ouvre pas,
      // mais la navigation existe dans le pied de page.
    }
  }, [ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedent;
    };
  }, [ouvert]);

  return (
    <dialog
      ref={panneau}
      id="menu-mobile"
      className={styles.panneau}
      aria-label="Navigation du site"
      onClose={onFermer}
    >
      {/* Le contenu n'existe qu'une fois le menu ouvert : sur grand écran, le
          logo clair et les liens n'ont pas à être chargés ni annoncés. */}
      {ouvert ? (
        <div className="wrap">
          <div className={styles.entete}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.logo}
              src="/images/logo-letoile-clair.svg"
              alt={RESTAURANT.nom}
              width={84}
              height={24}
            />
            <button
              type="button"
              className={styles.fermer}
              onClick={onFermer}
              aria-label="Fermer le menu"
            >
              <Icone nom="croix" taille={22} />
            </button>
          </div>

          <nav className={styles.liens} aria-label="Navigation principale">
            {NAVIGATION.map((entree, index) => (
              <Link
                key={entree.href}
                href={entree.href}
                className={styles.lien}
                style={{ ["--delai" as string]: `${index * 40}ms` }}
                aria-current={cheminActuel === entree.href ? "page" : undefined}
                onClick={onFermer}
              >
                {entree.libelle}
                <Icone nom="fleche" taille={20} />
              </Link>
            ))}
          </nav>

          <div className={styles.pied}>
            <BoutonLien
              href={`tel:${RESTAURANT.telephone}`}
              variante="primaire"
              grand
              pleineLargeur
              analytics="call"
            >
              <Icone nom="telephone" taille={16} />
              Réserver · {RESTAURANT.telephoneAffiche}
            </BoutonLien>
            <address>
              {ADRESSE_COMPLETE}
              <br />
              Fermé le dimanche
            </address>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
