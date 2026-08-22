/**
 * Garnitures et sauces, valables sur les viandes, les fondues et le menu enfant.
 * Bloc de référence affiché en fin de carte.
 */

export interface Supplement {
  readonly nom: string;
  readonly prix: number;
}

/** Garnitures comprises, sans supplément. */
export const GARNITURES: readonly string[] = [
  'Pâtes au beurre ou à l’ail',
  'Frites',
  'Riz',
  'Risotto',
  'Légumes',
];

/** Sauces en supplément. */
export const SAUCES: readonly Supplement[] = [
  { nom: 'Beurre maison', prix: 3 },
  { nom: 'Poivre vert', prix: 5 },
  { nom: 'Champignons', prix: 5 },
  { nom: 'Morilles', prix: 8 },
];
