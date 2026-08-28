/* ============================================================================
   LE RUBAN DE PHOTOGRAPHIES DU LIEU

   Le ruban glisse déjà tout seul : au doigt, à la molette horizontale, et au
   clavier — la feuille de style en fait une zone défilante, et le balisage lui
   donne un `tabindex`. Ce fichier n'ajoute que les deux flèches, pour ceux qui
   sont à la souris et à qui rien n'indiquerait sinon que le ruban continue.

   Les flèches s'éteignent quand on est arrivé au bout : un bouton qui ne fait
   rien mais qui reste allumé est un bouton cassé.
   ============================================================================ */
(function () {
  "use strict";

  var ruban = document.querySelector(".lieu-ruban");
  if (!ruban) return;

  var precedent = document.querySelector("[data-lieu-precedent]");
  var suivant = document.querySelector("[data-lieu-suivant]");
  if (!precedent || !suivant) return;

  /** De combien on avance : la largeur d'une vignette, gouttière comprise. */
  var pas = function () {
    var vignettes = ruban.querySelectorAll(".lieu-vignette");
    if (vignettes.length > 1) {
      var ecart = vignettes[1].offsetLeft - vignettes[0].offsetLeft;
      if (ecart > 0) return ecart;
    }
    if (vignettes.length === 1) return vignettes[0].offsetWidth;
    return Math.round(ruban.clientWidth * 0.8);
  };

  /* La marge d'un pixel absorbe les arrondis de calcul du navigateur : sans
     elle, une flèche peut rester allumée alors qu'on est déjà au bout. */
  var MARGE = 1;

  var rafraichir = function () {
    var debut = ruban.scrollLeft <= MARGE;
    var fin = ruban.scrollLeft >= ruban.scrollWidth - ruban.clientWidth - MARGE;
    precedent.disabled = debut;
    suivant.disabled = fin;
  };

  var glisser = function (sens) {
    ruban.scrollBy({ left: sens * pas(), behavior: "smooth" });
  };

  precedent.addEventListener("click", function () {
    glisser(-1);
  });

  suivant.addEventListener("click", function () {
    glisser(1);
  });

  ruban.addEventListener("scroll", rafraichir, { passive: true });
  window.addEventListener("resize", rafraichir, { passive: true });

  rafraichir();
})();
