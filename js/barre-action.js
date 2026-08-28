/* ============================================================================
   LA BARRE D'APPEL DU TÉLÉPHONE

   Elle monte une fois la photographie d'ouverture passée. Avant, le numéro est
   déjà à l'écran : elle ne ferait que masquer l'image.

   Tant qu'elle est cachée, ses liens sortent de l'ordre de tabulation — une
   barre invisible ne doit pas être atteignable au clavier.
   ============================================================================ */
(function () {
  "use strict";

  var barre = document.querySelector(".barreaction-barre");
  if (!barre) return;

  var SEUIL = 480;
  var actions = Array.prototype.slice.call(barre.querySelectorAll("a"));
  var dernierEtat = null;

  var appliquer = function () {
    var visible = window.scrollY > SEUIL;
    if (visible === dernierEtat) return;
    dernierEtat = visible;

    barre.setAttribute("data-visible", String(visible));
    barre.setAttribute("aria-hidden", String(!visible));
    actions.forEach(function (action) {
      action.setAttribute("tabindex", visible ? "0" : "-1");
    });
  };

  appliquer();
  window.addEventListener("scroll", appliquer, { passive: true });
})();
