import type { Pizza } from './types';

/**
 * Les quinze pizzas, cuites au four.
 * Pour changer un prix : modifier le nombre après `prix`.
 * Pour ajouter une pizza : recopier une ligne à l'endroit voulu.
 */
export const PIZZAS: readonly Pizza[] = [
  { nom: 'Margherita', garniture: 'Sauce tomate, mozzarella et origan', prix: 17 },
  { nom: 'Napoli', garniture: 'Sauce tomate, mozzarella, origan, anchois et câpres', prix: 18 },
  { nom: 'Romana', garniture: 'Sauce tomate, mozzarella, origan, jambon et champignons', prix: 19 },
  { nom: 'Végétarienne', garniture: 'Sauce tomate, mozzarella, origan et mélange de légumes frais', prix: 19 },
  { nom: 'Tonno', garniture: 'Sauce tomate, mozzarella, origan, thon, olives, oignon et câpres', prix: 20 },
  { nom: 'Quattro stagioni', garniture: 'Sauce tomate, mozzarella, poivrons, crevettes, jambon, champignons', prix: 21 },
  { nom: 'Vesuvio', garniture: 'Sauce tomate, basilic, parmesan, burrata, chorizo, champignons et cherry', prix: 23 },
  { nom: 'Saumon nordique', garniture: 'Base crème, saumon, câpres, oignon, tomate cherry et roquette', prix: 23 },
  { nom: 'Quattro formaggi', garniture: 'Base crème, mozzarella, gorgonzola, parmesan et emmental', prix: 23 },
  { nom: 'Marinara & burrata', garniture: 'Sauce tomate, basilic, ail, burrata, olives, pesto et grana', prix: 23 },
  { nom: 'Crudo e grana', garniture: 'Sauce tomate, mozzarella, jambon cru, copeaux de parmesan et tomate cherry', prix: 24 },
  { nom: 'Du Patron', garniture: 'Sauce tomate, mozzarella, origan, saucisse de bœuf fumée, champignons, poivrons, olives, oignons', prix: 24 },
  { nom: 'Frutti di mare', garniture: 'Sauce tomate, mozzarella, origan, mélange de fruits de mer et ail', prix: 25 },
  { nom: 'Capricciosa', garniture: 'Sauce tomate, mozzarella, jambon, œuf, artichaut, champignons et olives', prix: 25 },
  { nom: 'Bella Italia', garniture: 'Sauce tomate, mozzarella, origan, roquette, burrata, jambon cru (ou bœuf séché), huile de truffe', prix: 27 },
];

/** Suppléments applicables à toutes les pizzas. */
export const SUPPLEMENTS_PIZZA = 'Suppléments : burrata +5.— · œuf +2.— · crevettes +7.— · jambon de Parme +7.— · viande de bœuf séchée +7.—';
