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

  /* --------------------------------------------------------------------------
     MONTRER, CACHER
     -------------------------------------------------------------------------- */
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

  /* --------------------------------------------------------------------------
     ELLE SUIT LE BAS DE L'ÉCRAN, PAS CELUI DE LA PAGE

     Sur un téléphone, la barre d'outils du navigateur se rétracte quand on
     descend et revient quand on remonte. La fenêtre qu'on voit change alors de
     hauteur — mais pas celle qui sert à placer les éléments fixes. `bottom: 0`
     se règle sur la seconde : la barre se retrouve posée sous le bord de
     l'écran, ou décollée de lui, avec ce trait de vide qu'on voit passer.

     On mesure donc ce qui reste sous la fenêtre visible, et on le rattrape. Le
     rattrapage passe par `bottom` et non par `transform` : celui-ci porte déjà
     l'apparition de la barre, avec sa transition — le recalage y traînerait
     d'un tiers de seconde derrière le doigt.

     Rien de tout cela ne tourne en continu : le navigateur ne prévient qu'aux
     moments où la fenêtre visible change vraiment, et la mesure est reportée à
     l'image suivante pour ne jamais la faire deux fois pour rien.
     -------------------------------------------------------------------------- */
  var vue = window.visualViewport;
  if (!vue) return;

  /* Au-delà de ce quart d'écran disparu, ce n'est plus une barre d'outils qui
     se replie : c'est le clavier qui s'ouvre. */
  var PART_CLAVIER = 0.25;

  var ecartPose = -1;
  var saisiePosee = null;
  var demande = false;

  var poser = function () {
    demande = false;

    var hauteurPage = document.documentElement.clientHeight;
    if (!hauteurPage) return;

    /* Ce qui, dans la page, tombe sous le bas de la fenêtre visible. */
    var ecart = Math.max(0, Math.round(hauteurPage - (vue.height + vue.offsetTop)));
    var saisie = ecart > hauteurPage * PART_CLAVIER;

    if (saisie !== saisiePosee) {
      saisiePosee = saisie;
      barre.setAttribute("data-saisie", String(saisie));
    }

    /* Sous le clavier, la barre est déjà escamotée : inutile de la remonter. */
    if (saisie) ecart = 0;

    /* Un pixel de plus ou de moins, c'est l'arrondi du navigateur qui respire :
       on ne replace pas la barre pour si peu. Le retour à zéro, lui, est
       toujours posé — c'est la position au repos. */
    if (ecart === ecartPose) return;
    if (ecart !== 0 && Math.abs(ecart - ecartPose) < 2) return;
    ecartPose = ecart;
    barre.style.setProperty("--barreaction-ecart", ecart + "px");
  };

  var demander = function () {
    if (demande) return;
    demande = true;
    window.requestAnimationFrame(poser);
  };

  vue.addEventListener("resize", demander);
  vue.addEventListener("scroll", demander);
  window.addEventListener("orientationchange", demander);

  poser();
})();
