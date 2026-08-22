/**
 * Types du contenu éditorial. Le restaurant modifie `menu.ts` et `pizzas.ts`
 * sans jamais toucher au balisage : ces types sont le contrat entre les deux.
 */

/** Un plat de la carte. Les prix sont exprimés en francs suisses. */
export interface MenuItem {
  /** Nom du plat, tel qu'il figure sur la carte imprimée. */
  readonly nom: string;
  /** Garniture ou préparation. Peut être vide si le nom se suffit. */
  readonly description: string;
  /** Prix en CHF. */
  readonly prix: number;
  /** Second prix, quand l'entrée existe aussi en plat principal. */
  readonly prixPlat?: number;
  /** Suffixe accolé au prix, par exemple « / pers. ». */
  readonly suffixePrix?: string;
  /** Condition de commande : « min. 2 personnes », « sur commande »… */
  readonly mention?: string;
}

/** Une catégorie de la carte : elle porte une ancre et un onglet. */
export interface MenuSection {
  /** Identifiant d'ancre, en minuscules et sans accent. */
  readonly id: string;
  /** Titre affiché en tête de catégorie. */
  readonly titre: string;
  /** Libellé court de l'onglet de navigation. */
  readonly onglet: string;
  /** Précision valable pour toute la catégorie (suppléments, sauces…). */
  readonly note?: string;
  readonly items: readonly MenuItem[];
}

/** Une pizza. Même structure qu'un plat, avec un vocabulaire propre. */
export interface Pizza {
  readonly nom: string;
  /** Liste des ingrédients, telle qu'annoncée sur la carte. */
  readonly garniture: string;
  readonly prix: number;
}

/** Une plage horaire d'un service. */
export interface Plage {
  /** Heure d'ouverture au format 24 h, « 11:45 ». */
  readonly debut: string;
  /** Heure de fermeture au format 24 h, « 13:30 ». */
  readonly fin: string;
}

/** Les services d'une journée. `null` signifie « fermé ». */
export interface JourOuverture {
  /** 0 = dimanche, 1 = lundi… conformément à `Date.getDay()`. */
  readonly indice: number;
  readonly nom: string;
  readonly midi: Plage | null;
  readonly soir: Plage | null;
}
