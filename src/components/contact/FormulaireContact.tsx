'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { envoyerMessage, type EtatEnvoi } from '@/app/contact/actions';
import { Bouton } from '@/components/ui/Bouton';
import styles from './FormulaireContact.module.css';

const DEPART: EtatEnvoi = { statut: 'repos' };

function BoutonEnvoi() {
  const { pending } = useFormStatus();
  return (
    <Bouton type="submit" variante="primaire" grand disabled={pending} className={styles.envoi}>
      {pending ? 'Envoi en cours…' : 'Envoyer le message'}
    </Bouton>
  );
}

/**
 * Formulaire de contact — jamais de réservation : la réservation se fait au
 * téléphone, et un formulaire qui n'aboutit pas serait pire qu'un numéro visible.
 *
 * Le traitement a lieu côté serveur : le formulaire fonctionne même si le
 * script de la page n'a pas pu se charger.
 */
export function FormulaireContact() {
  const [etat, action] = useActionState(envoyerMessage, DEPART);
  const formulaire = useRef<HTMLFormElement>(null);
  const champEnErreur = etat.statut === 'erreur' ? etat.champ : undefined;

  // Au retour d'une erreur, le curseur se place dans le champ à corriger :
  // sans cela, la personne doit retrouver elle-même où le problème se situe.
  useEffect(() => {
    if (!champEnErreur) return;
    const champ = formulaire.current?.elements.namedItem(champEnErreur);
    if (champ instanceof HTMLElement) champ.focus();
  }, [champEnErreur, etat]);

  const messageDe = (champ: string): string | null =>
    etat.statut === 'erreur' && etat.champ === champ ? etat.message : null;

  return (
    <form className={styles.formulaire} action={action} ref={formulaire} noValidate>
      <div className={styles.duo}>
        <p className={styles.champ} data-erreur={champEnErreur === 'nom'}>
          <label htmlFor="nom">Votre nom</label>
          <input
            id="nom"
            name="nom"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={champEnErreur === 'nom'}
            aria-describedby={champEnErreur === 'nom' ? 'erreur-nom' : undefined}
          />
          {messageDe('nom') ? (
            <span className={styles.erreur} id="erreur-nom">
              {messageDe('nom')}
            </span>
          ) : null}
        </p>

        <p className={styles.champ} data-erreur={champEnErreur === 'email'}>
          <label htmlFor="email">Votre e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={120}
            aria-invalid={champEnErreur === 'email'}
            aria-describedby={champEnErreur === 'email' ? 'erreur-email' : undefined}
          />
          {messageDe('email') ? (
            <span className={styles.erreur} id="erreur-email">
              {messageDe('email')}
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
          maxLength={120}
          placeholder="Table de 12 le samedi soir…"
        />
      </p>

      <p className={styles.champ} data-erreur={champEnErreur === 'message'}>
        <label htmlFor="message">Votre message</label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          required
          maxLength={2000}
          aria-invalid={champEnErreur === 'message'}
          aria-describedby={champEnErreur === 'message' ? 'aide-message erreur-message' : 'aide-message'}
        />
        {messageDe('message') ? (
          <span className={styles.erreur} id="erreur-message">
            {messageDe('message')}
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
        {etat.statut !== 'repos' && !champEnErreur ? (
          <p className={styles.reponse} data-statut={etat.statut}>
            {etat.message}
          </p>
        ) : null}
      </div>

      <BoutonEnvoi />
    </form>
  );
}
