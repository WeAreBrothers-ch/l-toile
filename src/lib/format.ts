/**
 * Format suisse des prix : un montant rond s'écrit « 32.— », un montant avec
 * centimes s'écrit « 8.50 ». Jamais de symbole de devise dans la carte.
 */
export function formaterPrix(prix: number): string {
  if (!Number.isFinite(prix) || prix < 0) return '—';
  return Number.isInteger(prix) ? `${prix}.—` : prix.toFixed(2);
}

/** Prix au format attendu par schema.org : deux décimales, point décimal. */
export function prixStructure(prix: number): string {
  return Number.isFinite(prix) ? prix.toFixed(2) : '0.00';
}

/** « 11:45 » devient « 11h45 », la forme lue en Suisse romande. */
export function formaterHeure(heure: string): string {
  return heure.replace(':', 'h');
}
