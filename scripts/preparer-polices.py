"""
Allège les deux familles du site en restreignant leurs axes variables aux
graisses réellement utilisées par la direction artistique.

    python3 scripts/preparer-polices.py

Les fichiers d'origine sont les sous-ensembles latins de Google Fonts
(Newsreader et Archivo). La direction artistique plafonne Newsreader à la
graisse 500 et n'emploie l'italique que pour un mot par titre : conserver
l'intégralité des axes ferait télécharger environ 170 ko pour rien.

  Newsreader romain  : graisses 400 à 500, axe optique conservé (le serif doit
                       tenir aussi bien en 80 px qu'en 17 px).
  Newsreader italique: figé en 400, taille optique 40 — c'est un ornement de
                       titre, il ne sert jamais en petit ni en gras.
  Archivo            : graisses 400 à 600.

Prérequis : pip3 install fonttools brotli
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
except ImportError:  # pragma: no cover
    sys.exit("Installez d'abord les outils : pip3 install fonttools brotli")

RACINE = Path(__file__).resolve().parent.parent
DOSSIER = RACINE / "src" / "fonts"

REGLAGES: dict[str, dict[str, object]] = {
    "newsreader-roman": {"wght": (400, 500)},
    "newsreader-italic": {"wght": 400, "opsz": 40},
    "archivo": {"wght": (400, 600)},
}


def alleger(nom: str, limites: dict[str, object]) -> None:
    chemin = DOSSIER / f"{nom}.woff2"
    if not chemin.exists():
        print(f"  absent    {chemin.name}")
        return
    avant = chemin.stat().st_size
    police = instancer.instantiateVariableFont(TTFont(chemin), limites, inplace=False)
    police.flavor = "woff2"
    police.save(chemin)
    apres = chemin.stat().st_size
    print(f"  ok        {chemin.name}  {avant / 1024:.0f} ko -> {apres / 1024:.0f} ko")


def main() -> None:
    print("Allègement des polices :")
    for nom, limites in REGLAGES.items():
        alleger(nom, limites)


if __name__ == "__main__":
    main()
