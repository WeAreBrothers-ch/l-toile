/* ============================================================================
   Restaurant L'Étoile — le script du site.

   Sept comportements, indépendants les uns des autres. Chacun commence par
   chercher ce dont il a besoin et s'arrête si la page ne le contient pas : on
   peut donc charger ce fichier sur n'importe laquelle des quatre pages.

   Règle générale : le site est entièrement lisible sans ce fichier. Les liens
   sont de vrais liens, la carte est écrite en entier dans la page, le
   formulaire s'envoie tout seul. Le script n'ajoute que du confort.
   ============================================================================ */
(function () {
  "use strict";

  var $ = function (selecteur, racine) {
    return (racine || document).querySelector(selecteur);
  };
  var $$ = function (selecteur, racine) {
    return Array.prototype.slice.call((racine || document).querySelectorAll(selecteur));
  };

  /* ==========================================================================
     1. L'EN-TÊTE
     Passé quarante pixels, les deux étages fusionnent en une seule barre.
     ========================================================================== */
  (function entete() {
    var entete = $(".header-entete");
    if (!entete) return;

    var SEUIL = 40;
    var surDefilement = function () {
      entete.setAttribute("data-compact", String(window.scrollY > SEUIL));
    };

    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
  })();

  /* ==========================================================================
     2. LA BARRE D'ACTION (téléphone)
     Elle apparaît une fois le bandeau d'ouverture passé : avant, le numéro est
     déjà à l'écran, elle ne ferait que masquer la photo.
     ========================================================================== */
  (function barreAction() {
    var barre = $(".barreaction-barre");
    if (!barre) return;

    var SEUIL = 320;
    var actions = $$("a", barre);

    var surDefilement = function () {
      var visible = window.scrollY > SEUIL;
      barre.setAttribute("data-visible", String(visible));
      barre.setAttribute("aria-hidden", String(!visible));
      // Une barre invisible ne doit pas être atteignable au clavier.
      actions.forEach(function (action) {
        action.setAttribute("tabindex", visible ? "0" : "-1");
      });
    };

    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
  })();

  /* ==========================================================================
     3. LE MENU MOBILE
     Il s'appuie sur <dialog> : le piégeage du focus, la touche Échap et le
     rôle de dialogue sont assurés par le navigateur, pas par nous.
     ========================================================================== */
  (function menuMobile() {
    var panneau = document.getElementById("menu-mobile");
    var bouton = $('[aria-controls="menu-mobile"]');
    if (!panneau || !bouton) return;

    var ouvrir = function () {
      try {
        panneau.showModal();
      } catch (e) {
        return; // Navigateur sans showModal : la navigation reste dans le pied de page.
      }
      bouton.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    var fermer = function () {
      if (panneau.open) panneau.close();
    };

    bouton.addEventListener("click", ouvrir);

    // Le bouton de fermeture, et tout lien du menu : on part, donc on ferme.
    $$(".menumobile-fermer, .menumobile-lien", panneau).forEach(function (element) {
      element.addEventListener("click", fermer);
    });

    // `close` couvre aussi la touche Échap, que le navigateur gère seul.
    panneau.addEventListener("close", function () {
      bouton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  })();

  /* ==========================================================================
     4. OUVERT / FERMÉ, EN DIRECT
     Le calcul a lieu chez le visiteur, à l'heure de Lausanne quel que soit le
     pays depuis lequel il consulte. Fait à la fabrication du site, il serait
     figé au jour de la mise en ligne.
     ========================================================================== */
  (function etatOuverture() {
    var cible = $(".etatouverturelive-etat");
    if (!cible) return;

    var FUSEAU = "Europe/Zurich";
    var JOURS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    /* Les horaires du restaurant. À modifier ici — et **à garder identiques**
       à ceux écrits dans les pages, dans le pied de page et sur la fiche
       Google. Une heure qui diffère d'un endroit à l'autre se voit. */
    var HORAIRES = [
      { indice: 1, nom: "Lundi", midi: ["11:45", "13:30"], soir: ["18:45", "22:00"] },
      { indice: 2, nom: "Mardi", midi: ["11:45", "13:30"], soir: ["18:45", "22:00"] },
      { indice: 3, nom: "Mercredi", midi: ["11:45", "13:30"], soir: ["18:45", "22:00"] },
      { indice: 4, nom: "Jeudi", midi: ["11:45", "13:30"], soir: ["18:45", "22:00"] },
      { indice: 5, nom: "Vendredi", midi: ["11:45", "13:30"], soir: ["18:45", "22:30"] },
      { indice: 6, nom: "Samedi", midi: ["11:45", "13:30"], soir: ["18:45", "22:30"] },
      { indice: 0, nom: "Dimanche", midi: null, soir: null },
    ];

    var enMinutes = function (heure) {
      var morceaux = heure.split(":");
      return Number(morceaux[0]) * 60 + Number(morceaux[1]);
    };
    var enFrancais = function (heure) {
      return heure.replace(":", "h");
    };

    /** Jour et heure à Lausanne, quel que soit le fuseau de l'appareil. */
    var instantLausannois = function (date) {
      try {
        var parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: FUSEAU,
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).formatToParts(date);
        var lire = function (type) {
          for (var i = 0; i < parts.length; i++) if (parts[i].type === type) return parts[i].value;
          return "";
        };
        var jour = JOURS[lire("weekday")];
        var heures = Number(lire("hour"));
        var minutes = Number(lire("minute"));
        if (jour === undefined || isNaN(heures) || isNaN(minutes)) throw new Error("illisible");
        return { jour: jour, minutes: (heures % 24) * 60 + minutes };
      } catch (e) {
        // Repli sur l'heure de l'appareil : moins juste, mais jamais de plantage.
        return { jour: date.getDay(), minutes: date.getHours() * 60 + date.getMinutes() };
      }
    };

    var dansLaPlage = function (minutes, plage) {
      return !!plage && minutes >= enMinutes(plage[0]) && minutes < enMinutes(plage[1]);
    };

    var calculer = function () {
      var instant = instantLausannois(new Date());
      var jour = HORAIRES[0];
      for (var i = 0; i < HORAIRES.length; i++) {
        if (HORAIRES[i].indice === instant.jour) jour = HORAIRES[i];
      }

      if (!jour.midi && !jour.soir) {
        return { ouvert: false, detail: "Fermé le " + jour.nom.toLowerCase() };
      }
      if (dansLaPlage(instant.minutes, jour.midi)) {
        return {
          ouvert: true,
          detail: enFrancais(jour.midi[0]) + " – " + enFrancais(jour.midi[1]),
        };
      }
      if (dansLaPlage(instant.minutes, jour.soir)) {
        return {
          ouvert: true,
          detail: enFrancais(jour.soir[0]) + " – " + enFrancais(jour.soir[1]),
        };
      }

      var plages = [jour.midi, jour.soir];
      for (var j = 0; j < plages.length; j++) {
        if (plages[j] && instant.minutes < enMinutes(plages[j][0])) {
          return { ouvert: false, detail: "Ouvre à " + enFrancais(plages[j][0]) };
        }
      }
      return { ouvert: false, detail: "Fermé pour aujourd’hui" };
    };

    var afficher = function () {
      var etat = calculer();
      cible.setAttribute("data-ouvert", String(etat.ouvert));
      cible.innerHTML =
        '<span class="etatouverturelive-pastille"></span>' +
        '<span class="etatouverturelive-libelle">' +
        (etat.ouvert ? "Ouvert" : "Fermé") +
        "</span>" +
        '<span class="etatouverturelive-detail">· ' +
        etat.detail +
        "</span>";
    };

    afficher();
    // Une minute suffit : les changements d'état sont à la minute près.
    window.setInterval(afficher, 60000);
  })();

  /* ==========================================================================
     5. LES ONGLETS DE LA CARTE
     Ce sont de vrais liens vers de vraies ancres : ils fonctionnent sans ce
     script, ils sont copiables et partageables. On n'ajoute qu'une chose :
     savoir où l'on est.
     ========================================================================== */
  (function onglets() {
    var piste = $(".ongletscategories-defilement");
    if (!piste) return;

    var liens = $$(".ongletscategories-onglet", piste);
    if (liens.length === 0) return;

    /* La hauteur à laquelle une ancre se pose est lue dans la feuille de style,
       jamais recopiée ici : c'est la même valeur qui positionne le titre et qui
       décide de l'onglet souligné. Régler l'une sans l'autre décalerait tout. */
    var pointDAtterrissage = function () {
      var valeur = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      return (isFinite(valeur) ? valeur : 116) + 8;
    };

    var attente = 0;

    var calculer = function () {
      attente = 0;
      var seuil = pointDAtterrissage();
      var actif = liens[0];

      liens.forEach(function (lien) {
        var section = document.getElementById(lien.getAttribute("href").slice(1));
        if (section && section.getBoundingClientRect().top <= seuil) actif = lien;
      });

      liens.forEach(function (lien) {
        if (lien === actif) lien.setAttribute("aria-current", "true");
        else lien.removeAttribute("aria-current");
      });

      // Garder l'onglet actif visible sans jamais déplacer la page elle-même.
      var debut = actif.offsetLeft;
      var fin = debut + actif.offsetWidth;
      if (debut < piste.scrollLeft) piste.scrollLeft = Math.max(0, debut - 16);
      else if (fin > piste.scrollLeft + piste.clientWidth) {
        piste.scrollLeft = fin - piste.clientWidth + 16;
      }
    };

    var surDefilement = function () {
      if (attente) return;
      attente = window.requestAnimationFrame(calculer);
    };

    calculer();
    window.addEventListener("scroll", surDefilement, { passive: true });
  })();

  /* ==========================================================================
     6. LE PLAN
     Le fond est une image : rien n'est demandé à OpenStreetMap tant que le
     visiteur ne l'a pas décidé. C'est meilleur pour la vitesse d'affichage
     comme pour sa vie privée.
     ========================================================================== */
  (function plan() {
    var bouton = $(".plan-ouvrir");
    var cadre = $(".plan-plan");
    if (!bouton || !cadre) return;

    bouton.addEventListener("click", function () {
      var adresse = cadre.getAttribute("data-carte");
      var titre = cadre.getAttribute("data-titre") || "Plan d’accès";
      if (!adresse) return;

      var iframe = document.createElement("iframe");
      iframe.className = "plan-cadre";
      iframe.src = adresse;
      iframe.title = titre;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";

      cadre.innerHTML = "";
      cadre.appendChild(iframe);
    });
  })();

  /* ==========================================================================
     7. LE FORMULAIRE DE CONTACT
     Il fonctionne sans ce script : `action` et `method` sont posés sur la
     balise, donc un envoi ordinaire part quand même — le visiteur atterrit
     simplement sur la page du service de réception au lieu de rester ici.
     Le script ne fait que retenir l'envoi pour afficher la réponse sur place.
     ========================================================================== */
  (function formulaire() {
    var form = $(".formulairecontact-formulaire");
    if (!form || !form.getAttribute("action")) return;

    var bouton = $(".formulairecontact-envoi", form);
    var zoneReponse = $("[data-reponse]", form);
    var TELEPHONE = form.getAttribute("data-telephone") || "";

    var champ = function (nom) {
      return form.elements.namedItem(nom);
    };

    var effacerErreurs = function () {
      $$(".formulairecontact-champ", form).forEach(function (bloc) {
        bloc.removeAttribute("data-erreur");
      });
      $$(".formulairecontact-erreur", form).forEach(function (message) {
        message.remove();
      });
      $$("[aria-invalid]", form).forEach(function (element) {
        element.removeAttribute("aria-invalid");
      });
    };

    var signaler = function (nom, texte) {
      var element = champ(nom);
      if (!element) return;
      var bloc = element.closest(".formulairecontact-champ");
      if (bloc) bloc.setAttribute("data-erreur", "true");
      element.setAttribute("aria-invalid", "true");

      var message = document.createElement("span");
      message.className = "formulairecontact-erreur";
      message.id = "erreur-" + nom;
      message.textContent = texte;
      element.setAttribute("aria-describedby", message.id);
      if (bloc) bloc.appendChild(message);

      // Le curseur se place dans le champ à corriger : sans cela, la personne
      // doit retrouver elle-même où le problème se situe.
      element.focus();
    };

    var repondre = function (texte, statut) {
      if (!zoneReponse) return;
      zoneReponse.innerHTML = "";
      if (!texte) return;
      var p = document.createElement("p");
      p.className = "formulairecontact-reponse";
      p.setAttribute("data-statut", statut);
      p.textContent = texte;
      zoneReponse.appendChild(p);
    };

    var emailPlausible = function (valeur) {
      return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valeur);
    };

    form.addEventListener("submit", function (evenement) {
      evenement.preventDefault();
      effacerErreurs();
      repondre("", "");

      var donnees = new FormData(form);
      var lire = function (nom) {
        var valeur = donnees.get(nom);
        return typeof valeur === "string" ? valeur.trim() : "";
      };

      // Piège à robots : un champ que seul un automate remplit. On fait comme si
      // tout s'était bien passé plutôt que de lui apprendre ce qui l'a trahi.
      if (lire("site")) {
        repondre("Message envoyé. Nous vous répondons au plus vite.", "succes");
        return;
      }

      if (lire("nom").length < 2) return signaler("nom", "Merci d’indiquer votre nom.");
      if (!emailPlausible(lire("email"))) {
        return signaler("email", "Cette adresse e-mail semble incomplète.");
      }
      if (lire("message").length < 10) {
        return signaler("message", "Votre message est un peu court.");
      }

      if (bouton) {
        bouton.disabled = true;
        bouton.textContent = "Envoi en cours…";
      }

      var rendreLeBouton = function () {
        if (!bouton) return;
        bouton.disabled = false;
        bouton.textContent = "Envoyer le message";
      };

      fetch(form.getAttribute("action"), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: donnees,
      })
        .then(function (reponse) {
          if (!reponse.ok) throw new Error(String(reponse.status));
          form.reset();
          repondre("Message envoyé. Nous vous répondons au plus vite.", "succes");
          rendreLeBouton();
        })
        .catch(function () {
          repondre(
            "L’envoi n’a pas abouti. Appelez-nous au " + TELEPHONE + ", c’est le plus sûr.",
            "echec",
          );
          rendreLeBouton();
        });
    });
  })();
})();
