/* ============================================================================
   Vérification des contrastes du site — palette de nuit.

   À lancer après toute retouche des couleurs dans `css/tokens.css` :

       node scripts/verifier-contraste.mjs

   Il compare chaque couple texte / fond réellement employé sur le site au
   seuil de la norme WCAG 2.1 niveau AA : 4,5 pour du texte courant, 3 pour un
   élément d'interface (bordure de champ, icône), 1,5 pour un simple filet.
   ============================================================================ */

const canal = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
};

const ratio = (a, b) => {
  const [clair, sombre] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (clair + 0.05) / (sombre + 0.05);
};

/* Les couleurs, recopiées de `css/tokens.css`. */
const P = {
  nuit: "#0a0908",
  nuitClaire: "#131110",
  nuitProfonde: "#050404",
  champ: "#141210",
  texte1: "#f5f1ea",
  texte2: "#b3a897",
  texte3: "#8b8172",
  filetTenu: "#25221f",
  filetChamp: "#635c53",
  rouge300: "#f76e75",
  rouge500: "#e9323c",
  rouge600: "#c11f28",
  rouge700: "#a1171e",
  blanc: "#ffffff",
  etatOuvert: "#34c17b",
  etatFerme: "#e0a24a",
};

const couples = [
  ["texte principal / nuit", P.texte1, P.nuit, 4.5],
  ["texte secondaire / nuit", P.texte2, P.nuit, 4.5],
  ["texte tertiaire / nuit", P.texte3, P.nuit, 4.5],
  ["texte principal / nuit claire", P.texte1, P.nuitClaire, 4.5],
  ["texte secondaire / nuit claire", P.texte2, P.nuitClaire, 4.5],
  ["texte tertiaire / nuit claire", P.texte3, P.nuitClaire, 4.5],
  ["texte principal / nuit profonde", P.texte1, P.nuitProfonde, 4.5],
  ["texte secondaire / nuit profonde", P.texte2, P.nuitProfonde, 4.5],
  ["texte saisi / champ", P.texte1, P.champ, 4.5],
  ["accent rouge / nuit", P.rouge300, P.nuit, 4.5],
  ["accent rouge / nuit claire", P.rouge300, P.nuitClaire, 4.5],
  ["accent rouge / nuit profonde", P.rouge300, P.nuitProfonde, 4.5],
  ["texte du bouton / rouge 600", P.blanc, P.rouge600, 4.5],
  ["texte du bouton / rouge 700", P.blanc, P.rouge700, 4.5],
  ["état ouvert / nuit", P.etatOuvert, P.nuit, 4.5],
  ["état fermé / nuit", P.etatFerme, P.nuit, 4.5],
  ["bordure de champ / nuit (interface)", P.filetChamp, P.nuit, 3.0],
  ["filet / nuit (décor)", P.filetTenu, P.nuit, 1.25],
  ["filet / nuit claire (décor)", "#292623", P.nuitClaire, 1.25],
];

let echecs = 0;
console.log("contraste  seuil  état   couple");
console.log("──────────────────────────────────────────────────────────────");
for (const [nom, avant, fond, seuil] of couples) {
  const r = ratio(avant, fond);
  const ok = r >= seuil;
  if (!ok) echecs++;
  console.log(
    `${r.toFixed(2).padStart(8)}  ${seuil.toFixed(1).padStart(5)}  ${ok ? "OK  " : "ÉCHEC"}  ${nom}`
  );
}
console.log("──────────────────────────────────────────────────────────────");
console.log(echecs === 0 ? "Tous les contrastes passent." : `${echecs} contraste(s) à corriger.`);
process.exit(echecs === 0 ? 0 : 1);
