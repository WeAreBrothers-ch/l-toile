'use server';

import { RESTAURANT } from '@data/restaurant';

export type EtatEnvoi =
  | { readonly statut: 'repos' }
  | { readonly statut: 'succes'; readonly message: string }
  | { readonly statut: 'erreur'; readonly message: string; readonly champ?: string };

const LIMITES = { nom: 80, email: 120, sujet: 120, message: 2000 } as const;

/** Validation volontairement stricte : tout ce qui entre est traité comme hostile. */
function lireChamp(donnees: FormData, cle: string, maximum: number): string {
  const brut = donnees.get(cle);
  if (typeof brut !== 'string') return '';
  return brut.trim().slice(0, maximum);
}

function emailPlausible(valeur: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valeur);
}

/**
 * Reçoit un message du formulaire de contact.
 *
 * L'envoi passe par un point de réception externe défini côté serveur
 * (`CONTACT_WEBHOOK_URL`) : aucune clé, aucune adresse technique n'est exposée
 * au navigateur. Tant que ce point n'est pas configuré, le formulaire le dit
 * clairement et renvoie vers le téléphone plutôt que d'avaler le message.
 */
export async function envoyerMessage(_precedent: EtatEnvoi, donnees: FormData): Promise<EtatEnvoi> {
  // Piège à robots : un champ que seul un automate remplit.
  if (lireChamp(donnees, 'site', 200) !== '') {
    return { statut: 'succes', message: 'Message reçu. Merci !' };
  }

  const nom = lireChamp(donnees, 'nom', LIMITES.nom);
  const email = lireChamp(donnees, 'email', LIMITES.email);
  const sujet = lireChamp(donnees, 'sujet', LIMITES.sujet);
  const message = lireChamp(donnees, 'message', LIMITES.message);

  if (nom.length < 2) {
    return { statut: 'erreur', champ: 'nom', message: 'Merci d’indiquer votre nom.' };
  }
  if (!emailPlausible(email)) {
    return { statut: 'erreur', champ: 'email', message: 'Cette adresse e-mail semble incomplète.' };
  }
  if (message.length < 10) {
    return { statut: 'erreur', champ: 'message', message: 'Votre message est un peu court.' };
  }

  const reception = process.env['CONTACT_WEBHOOK_URL'];
  if (!reception) {
    return {
      statut: 'erreur',
      message: `Le formulaire n’est pas encore relié à la boîte du restaurant. Écrivez à ${RESTAURANT.email} ou appelez le ${RESTAURANT.telephoneAffiche}.`,
    };
  }

  try {
    const reponse = await fetch(reception, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, sujet: sujet || 'Message depuis le site', message }),
    });
    if (!reponse.ok) throw new Error(`Réception en erreur (${reponse.status})`);
  } catch {
    return {
      statut: 'erreur',
      message: `L’envoi n’a pas abouti. Appelez-nous au ${RESTAURANT.telephoneAffiche}, c’est le plus sûr.`,
    };
  }

  return { statut: 'succes', message: 'Message envoyé. Nous vous répondons au plus vite.' };
}
