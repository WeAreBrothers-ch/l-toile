import type { JourOuverture, Plage } from '@data/types';
import { HORAIRES } from '@data/restaurant';
import { formaterHeure } from './format';

/** Fuseau du restaurant. L'état d'ouverture doit être juste où que soit le visiteur. */
const FUSEAU = 'Europe/Zurich';

const JOURS_INTL: Readonly<Record<string, number>> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

export interface EtatOuverture {
  readonly jour: JourOuverture;
  readonly ouvert: boolean;
  /** Phrase courte affichée à côté de la pastille d'état. */
  readonly message: string;
  /** Services du jour, ou « Fermé ». */
  readonly services: string;
}

/** Convertit « 11:45 » en minutes depuis minuit. Renvoie `null` si la valeur est invalide. */
function enMinutes(heure: string): number | null {
  const [h, m] = heure.split(':');
  const heures = Number(h);
  const minutes = Number(m);
  if (!Number.isInteger(heures) || !Number.isInteger(minutes)) return null;
  return heures * 60 + minutes;
}

/** Jour de la semaine et heure locale à Lausanne, quel que soit le fuseau du visiteur. */
function instantLausannois(date: Date): { jour: number; minutes: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: FUSEAU,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date);

    const lire = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find((part) => part.type === type)?.value ?? '';

    const jour = JOURS_INTL[lire('weekday')];
    const heures = Number(lire('hour'));
    const minutes = Number(lire('minute'));

    if (jour === undefined || !Number.isInteger(heures) || !Number.isInteger(minutes)) {
      throw new Error('Instant illisible');
    }
    return { jour, minutes: (heures % 24) * 60 + minutes };
  } catch {
    // Repli sur l'heure de l'appareil : moins juste, mais jamais de plantage.
    return { jour: date.getDay(), minutes: date.getHours() * 60 + date.getMinutes() };
  }
}

function dansLaPlage(minutes: number, plage: Plage | null): boolean {
  if (!plage) return false;
  const debut = enMinutes(plage.debut);
  const fin = enMinutes(plage.fin);
  if (debut === null || fin === null) return false;
  return minutes >= debut && minutes < fin;
}

/** Décrit les services d'une journée : « 11h45 – 13h30 · 18h45 – 22h00 ». */
export function decrireServices(jour: JourOuverture): string {
  const services = [jour.midi, jour.soir]
    .filter((plage): plage is Plage => plage !== null)
    .map((plage) => `${formaterHeure(plage.debut)} – ${formaterHeure(plage.fin)}`);
  return services.length > 0 ? services.join(' · ') : 'Fermé';
}

/** État d'ouverture à un instant donné. Fonction pure : testable et sans effet de bord. */
export function etatOuverture(maintenant: Date): EtatOuverture {
  const { jour: indice, minutes } = instantLausannois(maintenant);
  const jour = HORAIRES.find((entree) => entree.indice === indice) ?? HORAIRES[0];

  if (!jour) {
    return { jour: HORAIRES[0]!, ouvert: false, message: 'Horaires indisponibles', services: '—' };
  }

  const services = decrireServices(jour);

  if (!jour.midi && !jour.soir) {
    return { jour, ouvert: false, message: `Fermé le ${jour.nom.toLowerCase()}`, services };
  }

  const enCours = dansLaPlage(minutes, jour.midi) ? jour.midi : dansLaPlage(minutes, jour.soir) ? jour.soir : null;
  if (enCours) {
    return { jour, ouvert: true, message: `Ouvert jusqu’à ${formaterHeure(enCours.fin)}`, services };
  }

  const prochain = [jour.midi, jour.soir]
    .filter((plage): plage is Plage => plage !== null)
    .find((plage) => {
      const debut = enMinutes(plage.debut);
      return debut !== null && minutes < debut;
    });

  return {
    jour,
    ouvert: false,
    message: prochain ? `Ouvre à ${formaterHeure(prochain.debut)}` : 'Fermé pour aujourd’hui',
    services,
  };
}
