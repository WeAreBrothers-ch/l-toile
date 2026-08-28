/* ============================================================================
   L'EN-TÊTE

   Un seul attribut, `data-compact`, que la feuille de style interprète :
   — sur la page d'accueil, il fait passer l'en-tête de transparent (posé sur la
     photographie d'ouverture) à une barre crème ordinaire ;
   — sur les autres pages, il resserre simplement sa hauteur.

   Le seuil est bas exprès : dès qu'on a commencé à lire, la barre doit être
   lisible.
   ============================================================================ */
(function () {
  "use strict";

  var entete = document.querySelector(".header-entete");
  if (!entete) return;

  var SEUIL = 40;
  var dernierEtat = null;

  var appliquer = function () {
    var compact = window.scrollY > SEUIL;
    // On n'écrit dans le DOM que si l'état a vraiment changé : sinon c'est une
    // écriture par image à l'écran, pour rien.
    if (compact === dernierEtat) return;
    dernierEtat = compact;
    entete.setAttribute("data-compact", String(compact));
  };

  appliquer();
  window.addEventListener("scroll", appliquer, { passive: true });
})();
