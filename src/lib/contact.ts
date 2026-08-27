import { RESTAURANT } from '@data/restaurant';

/**
 * Règles du formulaire de contact.
 *
 * Elles vivaient dans une action serveur ; le site étant désormais exporté en
 * fichiers statiques, il n'y a plus de serveur à nous. La validation a donc lieu
 * dans le navigateur, et l'envoi s'adresse à un service de réception extérieur.
 *
 * Ce que cela change pour la sécurité : rien d'important. Une validation côté
 * navigateur n'a jamais protégé de quoi que ce soit — elle est là pour dire à
 * une personne qu'elle a oublié son nom, pas pour arrêter un robot. C'est le
 * service de réception qui filtre, comme c'était déjà le cas.
 */

export const LIMITES = { nom: 80, email: 120, sujet: 120, message: 2000 } as const;

/**
 * Où les messages sont reçus — un service de formulaire (Formspree, Basin,
 * Formcarry…) ou un script sur l'hébergement.
 *
 * La valeur est inscrite dans les fichiers au moment du build : c'est une
 * adresse d'envoi publique, pas un secret, exactement comme l'adresse e-mail
 * affichée juste à côté. Ne jamais y mettre de clé d'API.
 *
 * Non renseignée, le formulaire le dit et renvoie vers le téléphone : un
 * formulaire qui avale un message en silence est pire qu'un numéro visible.
 */
export const RECEPTION = process.env['NEXT_PUBLIC_CONTACT_ENDPOINT'] ?? '';

export type ChampContact = 'nom' | 'email' | 'message';

export interface Probleme {
  readonly champ: ChampContact;
  readonly message: string;
}

function emailPlausible(valeur: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valeur);
}

/** Le premier problème rencontré, ou `null` si le message peut partir. */
export function verifier(donnees: FormData): Probleme | null {
  const lire = (cle: string, maximum: number): string => {
    const brut = donnees.get(cle);
    return typeof brut === 'string' ? brut.trim().slice(0, maximum) : '';
  };

  if (lire('nom', LIMITES.nom).length < 2) {
    return { champ: 'nom', message: 'Merci d’indiquer votre nom.' };
  }
  if (!emailPlausible(lire('email', LIMITES.email))) {
    return { champ: 'email', message: 'Cette adresse e-mail semble incomplète.' };
  }
  if (lire('message', LIMITES.message).length < 10) {
    return { champ: 'message', message: 'Votre message est un peu court.' };
  }
  return null;
}

export const MESSAGE_SUCCES = 'Message envoyé. Nous vous répondons au plus vite.';

export const MESSAGE_ECHEC = `L’envoi n’a pas abouti. Appelez-nous au ${RESTAURANT.telephoneAffiche}, c’est le plus sûr.`;

export const MESSAGE_SANS_RECEPTION = `Le formulaire n’est pas encore relié à la boîte du restaurant. Écrivez à ${RESTAURANT.email} ou appelez le ${RESTAURANT.telephoneAffiche}.`;
