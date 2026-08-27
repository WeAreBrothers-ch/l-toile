'use client';

import { useEffect, useRef, useState } from 'react';
import { RESTAURANT } from '@data/restaurant';
import { Bouton } from '@/components/ui/Bouton';
import {
  LIMITES,
  MESSAGE_ECHEC,
  MESSAGE_SANS_RECEPTION,
  MESSAGE_SUCCES,
  RECEPTION,
  verifier,
  type ChampContact,
} from '@/lib/contact';
import styles from './FormulaireContact.module.css';

type Statut = 'repos' | 'envoi' | 'succes' | 'echec';

/**
 * Formulaire de contact — jamais de réservation : la réservation se fait au
 * téléphone, et un formulaire qui n'aboutit pas serait pire qu'un numéro visible.
 *
 * Le site est exporté en fichiers statiques : il n'y a pas de serveur à nous
 * pour recevoir le message. Le formulaire s'adresse donc directement à un
 * service de réception (`NEXT_PUBLIC_CONTACT_ENDPOINT`).
 *
 * Il fonctionne sans JavaScript : `action` et `method` sont posés sur la
 * balise, donc un envoi ordinaire part quand même — le visiteur atterrit
 * simplement sur la page du service au lieu de rester ici. Quand le script est
 * là, il intercepte l'envoi pour afficher la réponse sur place.
 */
export function FormulaireContact() {
  const [statut, setStatut] = useState<Statut>('repos');
  const [probleme, setProbleme] = useState<{ champ: ChampContact; message: string } | null>(null);
  const formulaire = useRef<HTMLFormElement>(null);

  // Au retour d'une erreur, le curseur se place dans le champ à corriger :
  // sans cela, la personne doit retrouver elle-même où le problème se situe.
  useEffect(() => {
    if (!probleme) return;
    const champ = formulaire.current?.elements.namedItem(probleme.champ);
    if (champ instanceof HTMLElement) champ.focus();
  }, [probleme]);

  if (!RECEPTION) {
    return (
      <p className={styles.reponse} data-statut="echec">
        {MESSAGE_SANS_RECEPTION}{' '}
        <a href={`tel:${RESTAURANT.telephone}`} data-analytics="call">
          Appeler le restaurant
        </a>
      </p>
    );
  }

  async function envoyer(evenement: React.FormEvent<HTMLFormElement>): Promise<void> {
    const cible = evenement.currentTarget;
    const donnees = new FormData(cible);

    // Piège à robots : un champ que seul un automate remplit. On fait comme si
    // tout s'était bien passé plutôt que de lui apprendre ce qui l'a trahi.
    if ((donnees.get('site') as string | null)?.trim()) {
      evenement.preventDefault();
      setStatut('succes');
      return;
    }

    const trouve = verifier(donnees);
    if (trouve) {
      evenement.preventDefault();
      setProbleme(trouve);
      setStatut('repos');
      return;
    }

    // À partir d'ici le message est valide. Sans script, on laisse l'envoi
    // ordinaire se faire ; avec script, on le retient pour rester sur la page.
    evenement.preventDefault();
    setProbleme(null);
    setStatut('envoi');

    try {
      const reponse = await fetch(RECEPTION, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: donnees,
      });
      if (!reponse.ok) throw new Error(String(reponse.status));
      cible.reset();
      setStatut('succes');
    } catch {
      setStatut('echec');
    }
  }

  const erreurSur = (champ: ChampContact): string | null =>
    probleme?.champ === champ ? probleme.message : null;

  const reponse =
    statut === 'succes' ? MESSAGE_SUCCES : statut === 'echec' ? MESSAGE_ECHEC : null;

  return (
    <form
      className={styles.formulaire}
      ref={formulaire}
      action={RECEPTION}
      method="post"
      encType="multipart/form-data"
      onSubmit={envoyer}
      noValidate
    >
      <div className={styles.duo}>
        <p className={styles.champ} data-erreur={probleme?.champ === 'nom'}>
          <label htmlFor="nom">Votre nom</label>
          <input
            id="nom"
            name="nom"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITES.nom}
            aria-invalid={probleme?.champ === 'nom'}
            aria-describedby={probleme?.champ === 'nom' ? 'erreur-nom' : undefined}
          />
          {erreurSur('nom') ? (
            <span className={styles.erreur} id="erreur-nom">
              {erreurSur('nom')}
            </span>
          ) : null}
        </p>

        <p className={styles.champ} data-erreur={probleme?.champ === 'email'}>
          <label htmlFor="email">Votre e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={LIMITES.email}
            aria-invalid={probleme?.champ === 'email'}
            aria-describedby={probleme?.champ === 'email' ? 'erreur-email' : undefined}
          />
          {erreurSur('email') ? (
            <span className={styles.erreur} id="erreur-email">
              {erreurSur('email')}
            </span>
          ) : null}
        </p>
      </div>

      <p className={styles.champ}>
        <label htmlFor="sujet">Sujet</label>
        <input
          id="sujet"
          name="sujet"
          type="text"
          autoComplete="off"
          maxLength={LIMITES.sujet}
          placeholder="Table de 12 le samedi soir…"
        />
      </p>

      <p className={styles.champ} data-erreur={probleme?.champ === 'message'}>
        <label htmlFor="message">Votre message</label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          required
          maxLength={LIMITES.message}
          aria-invalid={probleme?.champ === 'message'}
          aria-describedby={
            probleme?.champ === 'message' ? 'aide-message erreur-message' : 'aide-message'
          }
        />
        {erreurSur('message') ? (
          <span className={styles.erreur} id="erreur-message">
            {erreurSur('message')}
          </span>
        ) : null}
        <span className={styles.aide} id="aide-message">
          Pour réserver une table, appelez-nous : c’est immédiat et confirmé.
        </span>
      </p>

      <p className={styles.piege} aria-hidden="true">
        <label htmlFor="site">Ne remplissez pas ce champ</label>
        <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </p>

      <div aria-live="polite">
        {reponse ? (
          <p className={styles.reponse} data-statut={statut}>
            {reponse}
          </p>
        ) : null}
      </div>

      <Bouton type="submit" variante="primaire" grand disabled={statut === 'envoi'} className={styles.envoi}>
        {statut === 'envoi' ? 'Envoi en cours…' : 'Envoyer le message'}
      </Bouton>
    </form>
  );
}
