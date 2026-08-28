/* ============================================================================
   Restaurant L'Étoile — le script du site.

   Sept comportements, indépendants les uns des autres. Chacun commence par
   chercher ce dont il a besoin et s'arrête si la page ne le contient pas : on
   peut donc charger ce fichier sur n'importe laquelle des pages.

   Règle générale : le site est entièrement lisible sans ce fichier. Les liens
   sont de vrais liens, la carte est écrite en entier dans les pages, le
   formulaire s'envoie tout seul. Le script n'ajoute que du confort.
   ============================================================================ */
(function () {
  "use strict";

  var $ = function (selecteur, racine) {
    return (racine || document).querySelector(selecteur);
  };
  var $$ = function (selecteur, racine) {
    return Array.prototype.slice.call(
      (racine || document).querySelectorAll(selecteur),
    );
  };

  var animationsReduites = function () {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  };

  /* ==========================================================================
     1. LE DIAPORAMA D'OUVERTURE
     Trois vues qui se fondent l'une dans l'autre. Le restaurant n'a pas une
     photographie assez forte pour tenir seule un plein écran : trois qui
     défilent valent mieux qu'une qu'on regarde trop longtemps.
     ========================================================================== */
  (function diaporama() {
    var scene = $("[data-diaporama]");
    if (!scene) return;

    var vues = $$(".ouverture__vue", scene);
    if (vues.length < 2) return;

    var DUREE = 6000;

    /* Les vues suivantes portent leur adresse en attente : elles sont à l'écran,
       superposées et transparentes, donc rien ne les aurait différées toutes
       seules. On va les chercher une fois la première peinte — elles ne servent
       qu'au bout de six secondes. */
    var chargerLesSuivantes = function () {
      vues.forEach(function (vue) {
        var img = $("img[data-src]", vue);
        if (!img) return;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
      });
    };
    if (document.readyState === "complete") chargerLesSuivantes();
    else window.addEventListener("load", chargerLesSuivantes);

    var courante = 0;
    var minuterie = null;

    var afficher = function (indice) {
      courante = (indice + vues.length) % vues.length;
      vues.forEach(function (vue, i) {
        vue.setAttribute("data-visible", String(i === courante));
      });
    };

    var relancer = function () {
      window.clearInterval(minuterie);
      // On ne fait pas défiler des images chez qui a demandé moins d'animation.
      if (animationsReduites()) return;
      minuterie = window.setInterval(function () {
        afficher(courante + 1);
      }, DUREE);
    };

    // Rien ne tourne dans un onglet qu'on ne regarde pas.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) window.clearInterval(minuterie);
      else relancer();
    });

    afficher(0);
    relancer();
  })();

  /* ==========================================================================
     2. LA BANDE D'IMAGES
     Ses photographies sont décalées vers la droite par l'animation : elles ne
     croisent jamais le cadre de l'écran, et « loading=lazy » les laisserait
     vides pour toujours. On les charge donc nous-mêmes, quand la bande
     approche. Sans ce script, la bande n'est pas affichée du tout : elle est
     décorative, une rangée de cadres vides vaudrait moins que rien.
     ========================================================================== */
  (function bande() {
    var bande = $("[data-ruban]");
    if (!bande) return;
    var piste = $(".ruban__piste", bande);
    if (!piste) return;

    var images = $$("img", piste);
    if (!images.length) return;

    /* --- Les images ---------------------------------------------------------
       Décalées vers la droite par le mouvement, elles ne croisent jamais le
       cadre de l'écran : « loading=lazy » les laisserait vides pour toujours.
       On va les chercher quand la bande approche. */
    var charger = function () {
      images.forEach(function (img) {
        var attente = img.getAttribute("data-src");
        if (!attente) return;
        img.src = attente;
        img.removeAttribute("data-src");
      });
    };

    var guetteur = null;
    var chargee = false;
    var chargerUneFois = function () {
      if (chargee) return;
      chargee = true;
      if (guetteur) guetteur.disconnect();
      charger();
    };

    if ("IntersectionObserver" in window) {
      guetteur = new IntersectionObserver(
        function (entrees) {
          /* Le navigateur peut livrer plusieurs enregistrements d'un coup pour
             la même cible : ne regarder que le premier, c'est parfois lire un
             « non » périmé. */
          if (!entrees.some((e) => e.isIntersecting)) return;
          chargerUneFois();
        },
        { rootMargin: "400px" },
      );
      guetteur.observe(bande);

      /* Et une sécurité, parce qu'un observateur peut manquer son moment : qui
         parcourt la page d'un trait puis remonte d'un coup la fait défiler plus
         vite que le navigateur ne rend son verdict, et la bande resterait vide.
         Passé le premier affichage et un temps mort, on les charge de toute
         façon — 269 Ko, hors du chemin critique. */
      var filet = function () {
        window.setTimeout(function () {
          if (window.requestIdleCallback)
            window.requestIdleCallback(chargerUneFois, { timeout: 2000 });
          else chargerUneFois();
        }, 3500);
      };
      if (document.readyState === "complete") filet();
      else window.addEventListener("load", filet);
    } else {
      charger();
    }

    /* --- Le mouvement -------------------------------------------------------
       La piste porte deux fois la même série : dès qu'on a défilé d'une série
       entière, on revient au départ, et le saut ne se voit pas. Le calcul est
       fait ici plutôt que par une animation CSS, parce qu'une animation ne se
       laisse pas prendre en cours de route — or on veut pouvoir l'attraper. */
    var VITESSE = 0.035; // pixels par milliseconde, vers la gauche
    var FROTTEMENT = 0.94; // ce qui reste de l'élan à chaque image
    var position = 0;
    var serie = 0;
    var precedent = 0;
    var elan = 0;
    var tire = false;
    var pointeur = null;
    var departX = 0;
    var departPosition = 0;
    var dernierX = 0;
    var dernierTemps = 0;
    var aBouge = false;

    var calme = function () {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    var mesurer = function () {
      // La moitié de la piste : une série complète, sans le doublon.
      serie = piste.scrollWidth / 2;
    };

    var ramener = function () {
      if (!serie) return;
      // Un modulo qui reste positif, quel que soit le sens du geste.
      position = ((position % serie) + serie) % serie;
    };

    var poser = function () {
      piste.style.transform = "translate3d(" + -position + "px, 0, 0)";
    };

    var image = function (temps) {
      var ecart = precedent ? Math.min(temps - precedent, 64) : 0;
      precedent = temps;

      if (!serie) mesurer();

      if (tire) {
        // Rien à avancer : c'est la main qui décide.
      } else if (Math.abs(elan) > 0.002) {
        // L'élan du geste, qui s'éteint.
        position += elan * ecart;
        elan *= Math.pow(FROTTEMENT, ecart / 16);
      } else {
        elan = 0;
        if (!calme()) position += VITESSE * ecart;
      }

      ramener();
      poser();
      window.requestAnimationFrame(image);
    };

    /* --- La prise en main ---------------------------------------------------
       « touch-action: pan-y » sur la piste laisse le doigt faire défiler la
       page verticalement : on ne prend que l'horizontale. */
    piste.addEventListener("pointerdown", function (e) {
      if (pointeur !== null) return;
      pointeur = e.pointerId;
      tire = true;
      aBouge = false;
      elan = 0;
      departX = dernierX = e.clientX;
      departPosition = position;
      dernierTemps = e.timeStamp;
      piste.setAttribute("data-tire", "true");
      try {
        piste.setPointerCapture(pointeur);
      } catch (err) {
        /* Navigateur sans capture : le geste marche quand même, il se perd
           seulement si le curseur sort de la piste. */
      }
    });

    piste.addEventListener("pointermove", function (e) {
      if (!tire || e.pointerId !== pointeur) return;
      var deplacement = e.clientX - departX;
      if (Math.abs(deplacement) > 3) aBouge = true;
      position = departPosition - deplacement;
      ramener();
      poser();

      // La vitesse du geste, mesurée sur son dernier fragment.
      var duree = e.timeStamp - dernierTemps;
      if (duree > 0) elan = -(e.clientX - dernierX) / duree;
      dernierX = e.clientX;
      dernierTemps = e.timeStamp;
    });

    var lacher = function (e) {
      if (e.pointerId !== pointeur) return;
      tire = false;
      pointeur = null;
      piste.removeAttribute("data-tire");
      // Un élan démesuré est un artefact de mesure, pas une intention.
      elan = Math.max(-2.2, Math.min(2.2, elan));
    };
    piste.addEventListener("pointerup", lacher);
    piste.addEventListener("pointercancel", lacher);

    // Un geste ne doit pas déclencher le lien qu'il a survolé.
    piste.addEventListener(
      "click",
      function (e) {
        if (aBouge) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true,
    );

    // La largeur d'une série change avec celle des images : on remesure.
    window.addEventListener("resize", mesurer);
    images.forEach(function (img) {
      img.addEventListener("load", mesurer);
    });

    mesurer();
    poser();
    window.requestAnimationFrame(image);
  })();

  /* ==========================================================================
     3. LE MENU DE TÉLÉPHONE
     Il s'appuie sur <dialog> : le piégeage du focus, la touche Échap et le
     rôle de dialogue sont assurés par le navigateur, pas par nous.
     ========================================================================== */
  (function menu() {
    var panneau = document.getElementById("menu");
    var bouton = $('[aria-controls="menu"]');
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
    $$(".menu__fermer, .menu__lien", panneau).forEach(function (element) {
      element.addEventListener("click", fermer);
    });

    // Un clic sur le fond, hors du panneau, ferme aussi.
    panneau.addEventListener("click", function (evenement) {
      if (evenement.target === panneau) fermer();
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
    var cible = $("[data-etat]");
    if (!cible) return;

    var FUSEAU = "Europe/Zurich";
    var JOURS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    /* HORAIRES
       Les horaires du restaurant. À modifier ici — et **à garder identiques**
       à ceux écrits dans les pages, dans le pied de page et sur la fiche
       Google. Une heure qui diffère d'un endroit à l'autre se voit. */
    var HORAIRES = [
      {
        indice: 1,
        nom: "Lundi",
        midi: ["11:45", "13:30"],
        soir: ["18:45", "22:00"],
      },
      {
        indice: 2,
        nom: "Mardi",
        midi: ["11:45", "13:30"],
        soir: ["18:45", "22:00"],
      },
      {
        indice: 3,
        nom: "Mercredi",
        midi: ["11:45", "13:30"],
        soir: ["18:45", "22:00"],
      },
      {
        indice: 4,
        nom: "Jeudi",
        midi: ["11:45", "13:30"],
        soir: ["18:45", "22:00"],
      },
      {
        indice: 5,
        nom: "Vendredi",
        midi: ["11:45", "13:30"],
        soir: ["18:45", "22:30"],
      },
      {
        indice: 6,
        nom: "Samedi",
        midi: ["11:45", "13:30"],
        soir: ["18:45", "22:30"],
      },
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
          for (var i = 0; i < parts.length; i++)
            if (parts[i].type === type) return parts[i].value;
          return "";
        };
        var jour = JOURS[lire("weekday")];
        var heures = Number(lire("hour"));
        var minutes = Number(lire("minute"));
        if (jour === undefined || isNaN(heures) || isNaN(minutes))
          throw new Error("illisible");
        return { jour: jour, minutes: (heures % 24) * 60 + minutes };
      } catch (e) {
        // Repli sur l'heure de l'appareil : moins juste, mais jamais de plantage.
        return {
          jour: date.getDay(),
          minutes: date.getHours() * 60 + date.getMinutes(),
        };
      }
    };

    var dansLaPlage = function (minutes, plage) {
      return (
        !!plage &&
        minutes >= enMinutes(plage[0]) &&
        minutes < enMinutes(plage[1])
      );
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
        return { ouvert: true, detail: "jusqu’à " + enFrancais(jour.midi[1]) };
      }
      if (dansLaPlage(instant.minutes, jour.soir)) {
        return { ouvert: true, detail: "jusqu’à " + enFrancais(jour.soir[1]) };
      }

      var plages = [jour.midi, jour.soir];
      for (var j = 0; j < plages.length; j++) {
        if (plages[j] && instant.minutes < enMinutes(plages[j][0])) {
          return {
            ouvert: false,
            detail: "ouvre à " + enFrancais(plages[j][0]),
          };
        }
      }
      return { ouvert: false, detail: "à demain" };
    };

    /* Le tableau des horaires marque son jour. C'est la seule ligne qu'on y
       cherche vraiment, et elle dépend de l'heure de Lausanne, pas de celle de
       l'appareil : elle ne peut donc pas être écrite dans la page. */
    var marquerLeJour = function (jour) {
      $$("[data-semaine] .semaine__jour").forEach(function (ligne) {
        if (Number(ligne.getAttribute("data-jour")) === jour) {
          ligne.setAttribute("data-aujourdhui", "");
        } else {
          ligne.removeAttribute("data-aujourdhui");
        }
      });
    };

    var afficher = function () {
      var etat = calculer();
      marquerLeJour(instantLausannois(new Date()).jour);
      cible.setAttribute("data-ouvert", String(etat.ouvert));
      cible.innerHTML =
        '<span class="etat__pastille"></span>' +
        '<span class="etat__libelle">' +
        (etat.ouvert ? "Ouvert" : "Fermé") +
        "</span>" +
        '<span class="etat__detail">· ' +
        etat.detail +
        "</span>";
    };

    afficher();
    // Une minute suffit : les changements d'état sont à la minute près.
    window.setInterval(afficher, 60000);
  })();

  /* ==========================================================================
     5. LA BARRE D'APPEL (téléphone)
     Elle apparaît une fois l'ouverture passée : avant, le numéro est déjà à
     l'écran, elle ne ferait que masquer la photographie.
     ========================================================================== */
  (function barreAppel() {
    var barre = $("[data-barre-appel]");
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
     6. LE PLAN
     Le fond est une image : rien n'est demandé à OpenStreetMap tant que le
     visiteur ne l'a pas décidé. C'est meilleur pour la vitesse d'affichage
     comme pour sa vie privée.
     ========================================================================== */
  (function plan() {
    var cadre = $("[data-plan]");
    if (!cadre) return;
    var bouton = $(".plan__ouvrir", cadre);
    if (!bouton) return;

    bouton.addEventListener("click", function () {
      var adresse = cadre.getAttribute("data-carte");
      var titre = cadre.getAttribute("data-titre") || "Plan d’accès";
      if (!adresse) return;

      var iframe = document.createElement("iframe");
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
    var form = $("[data-formulaire]");
    if (!form || !form.getAttribute("action")) return;

    var bouton = $("[data-envoi]", form);
    var zoneReponse = $("[data-reponse]", form);
    var TELEPHONE = form.getAttribute("data-telephone") || "";

    var champ = function (nom) {
      return form.elements.namedItem(nom);
    };

    var effacerErreurs = function () {
      $$(".champ", form).forEach(function (bloc) {
        bloc.removeAttribute("data-erreur");
      });
      $$(".champ__erreur", form).forEach(function (message) {
        message.remove();
      });
      $$("[aria-invalid]", form).forEach(function (element) {
        element.removeAttribute("aria-invalid");
        element.removeAttribute("aria-describedby");
      });
    };

    var signaler = function (nom, texte) {
      var element = champ(nom);
      if (!element) return;
      var bloc = element.closest(".champ");
      if (bloc) bloc.setAttribute("data-erreur", "true");
      element.setAttribute("aria-invalid", "true");

      var message = document.createElement("span");
      message.className = "champ__erreur";
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
      p.className = "reponse";
      p.setAttribute("data-statut", statut);
      p.textContent = texte;
      if (statut === "echec" && TELEPHONE) {
        var lien = document.createElement("a");
        lien.href = "tel:" + TELEPHONE.replace(/\s/g, "");
        lien.textContent = TELEPHONE;
        p.appendChild(document.createTextNode(" "));
        p.appendChild(lien);
        p.appendChild(document.createTextNode("."));
      }
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

      if (lire("nom").length < 2)
        return signaler("nom", "Merci d’indiquer votre nom.");
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
          repondre(
            "Message envoyé. Nous vous répondons au plus vite.",
            "succes",
          );
          rendreLeBouton();
        })
        .catch(function () {
          repondre(
            "L’envoi n’a pas abouti. Le plus sûr reste de nous appeler au",
            "echec",
          );
          rendreLeBouton();
        });
    });
  })();
})();
