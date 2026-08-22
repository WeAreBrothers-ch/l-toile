import type { MenuSection } from './types';

/**
 * La carte complète du Restaurant L'Étoile.
 *
 * Pour changer un prix : modifier le nombre après `prix`.
 * Pour ajouter un plat : recopier une ligne existante à l'endroit voulu.
 * Pour retirer un plat : supprimer sa ligne.
 * Rien d'autre n'est à toucher — l'affichage, le plan du site et les données
 * envoyées à Google se mettent à jour tout seuls.
 */
export const CARTE: readonly MenuSection[] = [
  {
    id: 'entrees',
    titre: 'Les entrées',
    onglet: 'Entrées',
    items: [
      { nom: 'Salade verte', description: 'Salade de saison, sauce française maison', prix: 5 },
      { nom: 'Salade mêlée', description: 'Salade de saison et mélange de crudités, sauce française maison', prix: 8.5 },
      { nom: 'Assortiment de légumes grillés à l’italienne', description: 'Courgettes, aubergines, poivrons, oignon, ail et huile d’olive', prix: 12 },
      { nom: 'Focaccia à l’ail & mozzarella', description: 'Huile d’olive, gros sel, ail et romarin — idéal à partager', prix: 14 },
      { nom: 'Roulée d’aubergine & bufala', description: 'Aubergines grillées farcies à la bufala et tomate fraîche, gratinées au four', prix: 15 },
      { nom: 'Carpaccio de bœuf', description: 'Roquette, écailles de Grana Padano', prix: 16, prixPlat: 27 },
      { nom: 'Burrata façon caprese parfumée truffe', description: 'Burrata, tomate fraîche, basilic, câpres et roquette', prix: 17 },
      { nom: 'Crevettes à l’espagnole', description: 'Crevettes à l’ail et poivrons', prix: 17 },
      { nom: 'Assortiment de charcuterie et fromage', description: 'Sélection fromage et charcuterie', prix: 19, prixPlat: 34 },
    ],
  },
  {
    id: 'assiettes-froides',
    titre: 'Assiettes froides',
    onglet: 'Assiettes froides',
    items: [
      { nom: 'Assiette de crudités végétarienne', description: 'Mélange de crudités de saison', prix: 17 },
      { nom: 'Salade de chèvre chaud au miel', description: 'Salade de saison, œuf, cherry, figues, noix, chèvre et miel', prix: 22 },
      { nom: 'Salade César', description: 'Poulet grillé, œuf, croûtons, carottes, tomate, parmesan frais, sauce César', prix: 25 },
      { nom: 'Salade Fitness', description: 'Grande salade de crudités et légumes, fines tranches de bœuf grillé, vinaigrette', prix: 29 },
      { nom: 'Tartare de bœuf classique', description: 'Servi avec frites, beurre et toasts grillés', prix: 30 },
      { nom: 'Tartare de bœuf parfumé au gin', description: 'Servi avec frites, beurre et toasts grillés', prix: 32 },
      { nom: 'Tartare de bœuf saveur truffe', description: 'Servi avec frites, beurre et toasts grillés', prix: 34 },
    ],
  },
  {
    id: 'pasta',
    titre: 'Pasta',
    onglet: 'Pasta',
    note: 'Possibilité sans gluten. Suppléments : crevettes +7.— · poulet +7.— · burrata +5.—',
    items: [
      { nom: 'Linguine aglio, olio e pepperoncino à l’Étoile', description: 'Ail, tomate cherry, basilic', prix: 19 },
      { nom: 'Rigatoni Arrabbiata', description: 'Sauce tomate au basilic pimentée', prix: 19 },
      { nom: 'Gnocchi au gorgonzola', description: 'Sauce onctueuse au gorgonzola', prix: 22 },
      { nom: 'Tagliatelle fraîches alla carbonara', description: 'Carbonara façon française, à la crème, sans œuf', prix: 22 },
      { nom: 'Orecchiette à la bolognaise et parmesan frais', description: 'Mijoté de bœuf à la tomate et basilic', prix: 24 },
      { nom: 'Paccheri du Patron', description: 'Façon ottomane, saucisse de bœuf fumée (soudjouk) et crème fraîche', prix: 24 },
      { nom: 'Rigatoni alla vodka', description: 'Crème tomatée à l’origan et vodka', prix: 24 },
      { nom: 'Gnocchi au pesto & burrata', description: 'Pesto de basilic et roquette, burrata et fricassée de noix', prix: 25 },
      { nom: 'Fagottini à la truffe', description: 'Pâtes farcies à la truffe, crème de truffe noire', prix: 26 },
      { nom: 'Paccheri à la pistache & crevettes', description: 'Pesto de pistache maison (pistaches siciliennes), crevettes sautées', prix: 27 },
      { nom: 'Paccheri au saumon et aneth', description: 'Saumon fumé et saumon frais, citron et aneth', prix: 27 },
      { nom: 'Linguine alle vongole & cherry', description: 'Vongole, déglacé au vin blanc, ail, persil et piment', prix: 28 },
      { nom: 'Linguine du Chef façon péruvienne', description: 'Sauté de bœuf, oignons, poivrons, champignons, courgette, piment, sauce soja', prix: 28 },
      { nom: 'Tagliatelle aux pointes de morilles', description: 'Sauce crémeuse aux pointes de morilles et parmesan frais', prix: 28 },
      { nom: 'Linguine frutti di mare', description: 'Vin blanc, tomate cherry, ail et fruits de mer mixtes', prix: 30 },
      { nom: 'Paccheri à l’homard et fricassée de gambas', description: 'Demi-homard, gambas et vongole, sauce à l’armoricaine', prix: 34 },
    ],
  },
  {
    id: 'risotto',
    titre: 'Risotto',
    onglet: 'Risotto',
    items: [
      { nom: 'Risotto aux morilles', description: 'Crème fraîche, pointes de morilles', prix: 23 },
      { nom: 'Risotto au saumon fumé et gambas', description: 'Saumon gravlax et fricassée de gambas', prix: 26 },
      { nom: 'Risotto à la milanaise et jambon cru', description: 'Risotto au safran, jambon cru', prix: 29 },
      { nom: 'Risotto Chicken Alfredo', description: 'Crème fraîche, champignons et poulet', prix: 31 },
    ],
  },
  {
    id: 'poissons',
    titre: 'Poissons et fruits de mer',
    onglet: 'Poissons',
    items: [
      { nom: 'Moules marinières & frites', description: 'Salade en entrée, moules, céleri, persil, frites', prix: 28 },
      { nom: 'Filets de perche meunière', description: 'Sauce tartare et frites', prix: 31 },
      { nom: 'Filets de dorade à la crème citronnée', description: 'Filet sans arêtes, garniture au choix', prix: 36 },
      { nom: 'Gambas à l’ail mi-décortiquées et citron vert', description: 'Servi avec frites et légumes', prix: 38 },
      { nom: 'Gambas et calamars grillés à l’ail', description: 'Servi avec risotto au safran', prix: 42 },
      { nom: 'Plateau de fruits de mer grillés et poisson', description: 'Gambas, poulpes, calamars, moules, filet de loup de mer, sauce tartare. Salade en entrée, garniture au choix', prix: 49, suffixePrix: '/ pers.', mention: 'Spécialité de la maison · min. 2 personnes' },
    ],
  },
  {
    id: 'viandes',
    titre: 'Viandes',
    onglet: 'Viandes',
    items: [
      { nom: 'Émincé à la zurichoise de poulet', description: 'Poulet grillé, sauce aux champignons de Paris, riz et légumes', prix: 28 },
      { nom: 'Paillard de poulet à l’ail et citron', description: 'Marinade à l’ail maison, tagliatelle au beurre', prix: 29 },
      { nom: 'Tagliata de bœuf à l’italienne', description: 'Entrecôte suisse taillée, roquette, parmesan, crème balsamique, légumes et frites', prix: 36 },
      { nom: 'Entrecôte de bœuf', description: 'Garniture au choix, sauce en extra', prix: 38 },
      { nom: 'Entrecôte de bœuf sauce café de Paris', description: '250 g, garniture au choix', prix: 38 },
      { nom: 'Filet de bœuf', description: 'Garniture au choix, sauce en extra', prix: 48 },
      { nom: 'Grillade de viandes mixtes', description: 'Bœuf, cheval, poulet, agneau. 3 sauces et garniture au choix', prix: 55, suffixePrix: '/ pers.', mention: 'min. 2 personnes' },
      { nom: 'Côte de bœuf Tomahawk irlandaise', description: 'Maturée 2 mois minimum, environ 1,2 kg. 3 sauces et garniture au choix', prix: 130, mention: 'min. 2 personnes · sur commande' },
      { nom: 'Côte de bœuf maturée de Galice', description: 'Maturée 2 mois minimum, environ 1,2 kg. 3 sauces et garniture au choix', prix: 150, mention: 'min. 2 personnes · sur commande' },
    ],
  },
  {
    id: 'ardoises',
    titre: 'Nos ardoises',
    onglet: 'Ardoises',
    note: 'Sauces servies : beurre café de Paris, poivre vert, champignons.',
    items: [
      { nom: 'Entrecôte de bœuf sur ardoise', description: 'Salade en entrée, 220 g, garniture au choix et ses sauces', prix: 43 },
      { nom: 'Filet de bœuf sur ardoise', description: 'Salade en entrée, 220 g, garniture au choix et ses sauces', prix: 53 },
    ],
  },
  {
    id: 'fondues',
    titre: 'Fondues à discrétion',
    onglet: 'Fondues',
    note: 'Sauces à fondue : cocktail, ail, tartare, curry.',
    items: [
      { nom: 'Fondue bourguignonne', description: 'Cheval, bœuf, poulet, garniture au choix et sauces à fondue', prix: 38 },
      { nom: 'Fondue chinoise', description: 'Cheval, bœuf (crevettes et poulet sur demande), garniture au choix et sauces', prix: 38 },
    ],
  },
  {
    id: 'menu-enfant',
    titre: 'Menu enfant',
    onglet: 'Menu enfant',
    items: [
      { nom: 'Chicken nuggets', description: 'Poulet frit avec frites', prix: 10 },
      { nom: 'Mini pizza enfant', description: 'Margherita ou jambon', prix: 10 },
      { nom: 'Penne enfant', description: 'Sauce tomate, au beurre ou à la crème', prix: 10 },
      { nom: 'Steak frites enfant', description: 'Steak de bœuf avec frites', prix: 15 },
    ],
  },
];
