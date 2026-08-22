/**
 * Script d'apparition au défilement.
 *
 * Il doit s'exécuter AVANT le premier affichage, sinon les blocs se voient
 * puis disparaissent avant de réapparaître. Il est donc injecté en clair dans
 * le document plutôt que monté comme composant React.
 *
 * Garanties :
 * — sans JavaScript, la marque `data-js` n'est jamais posée et tout reste visible ;
 * — si l'observateur échoue, la marque est retirée et tout redevient visible ;
 * — il marque un attribut plutôt que la classe de `<html>` : React compare cette
 *   classe à l'hydratation, la modifier de l'extérieur provoquerait un écart ;
 * — il pose `data-vu`, un attribut que React ne rend JAMAIS, au lieu de réécrire
 *   `data-reveal` que React rend : React ne compare à l'hydratation que les
 *   attributs qu'il produit lui-même, donc écrire dans `data-reveal` avant que
 *   React ne s'hydrate provoquait une erreur d'hydratation ;
 * — le seuil est à zéro : un seuil en pourcentage n'est jamais atteint par un
 *   bloc plus haut que l'écran — une longue liste de plats, par exemple —, qui
 *   resterait alors invisible indéfiniment. C'est le recul en bas de fenêtre,
 *   pas le seuil, qui règle le moment de l'apparition ;
 * — un bloc situé au-dessus de l'écran est révélé aussi : au rechargement d'une
 *   page dont la position de défilement est restaurée, il ne recoupe plus la
 *   fenêtre et resterait masqué sans cette exception ;
 * — les blocs qui arrivent APRÈS le chargement sont pris en charge eux aussi.
 *   Passer d'une page à l'autre ne recharge pas le document : le contenu est
 *   remplacé dans le document existant. Sans surveillance des ajouts, les blocs
 *   des pages atteintes par un lien interne n'étaient jamais observés, donc
 *   jamais révélés — ils laissaient un grand vide à leur place ;
 * — un bloc déjà révélé ne se rejoue pas quand on remonte la page ;
 * — `prefers-reduced-motion` désactive le procédé entièrement.
 */
export const SCRIPT_APPARITIONS = `(function(){try{
var r=document.documentElement;
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
if(!('IntersectionObserver'in window))return;
r.setAttribute('data-js','on');
var demarrer=function(){try{
var o=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];
if(!e.isIntersecting&&e.boundingClientRect.top>0)continue;
e.target.setAttribute('data-vu','1');o.unobserve(e.target);}},
{threshold:0,rootMargin:'0px 0px -8% 0px'});
var brancher=function(n){if(n.nodeType!==1)return;
if(n.hasAttribute('data-reveal')&&!n.hasAttribute('data-vu'))o.observe(n);
var d=n.querySelectorAll('[data-reveal]:not([data-vu])');
for(var i=0;i<d.length;i++)o.observe(d[i]);};
brancher(document.body);
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){
var a=ms[i].addedNodes;for(var j=0;j<a.length;j++)brancher(a[j]);}})
.observe(document.body,{childList:true,subtree:true});
}catch(e){r.removeAttribute('data-js');}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',demarrer);else demarrer();
}catch(e){document.documentElement.removeAttribute('data-js');}})();`;
