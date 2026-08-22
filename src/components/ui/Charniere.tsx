import type { Photo as DonneesPhoto } from '@data/photos';
import { Photo } from './Photo';
import styles from './Charniere.module.css';

interface Props {
  readonly photo: DonneesPhoto;
  readonly sizes?: string;
  /** Bord du conteneur contre lequel la photo se range. Alterné d'une page à l'autre. */
  readonly cote?: 'gauche' | 'droite';
  /** La bande qui reçoit le débordement est le pied de page, pas une section. */
  readonly versPied?: boolean;
}

/**
 * Photo ancrée dans la bande blanche et débordant sur la bande d'encre qui suit.
 * La profondeur vient du décalage de la frontière : jamais d'ombre, jamais de
 * bordure, jamais d'arrondi. La section suivante doit porter `classeReception`.
 *
 * Elle occupe une colonne étroite le long d'un bord, pas toute la largeur : une
 * photo étalée d'un bord à l'autre écrase la page au lieu de la coudre, et elle
 * oblige à recadrer un original vertical en bandeau, ce qui n'en garde qu'un
 * tiers. Rangée sur le côté, la photo garde son cadrage d'origine et l'espace
 * resté libre en face fait respirer la bascule vers la section suivante.
 */
export function Charniere({
  photo,
  sizes = '(min-width: 1024px) 420px, (min-width: 700px) 40vw, 62vw',
  cote = 'droite',
  versPied = false,
}: Props) {
  return (
    <div className={`${styles.pont}${versPied ? ' pontFinal' : ''}`}>
      <div className="wrap">
        <div className={`${styles.charniere} ${styles[cote]}`}>
          <Photo photo={photo} sizes={sizes} />
        </div>
      </div>
    </div>
  );
}

/** Classe à poser sur la section qui reçoit le débordement d'une charnière. */
export const classeReception = styles.recoit;
