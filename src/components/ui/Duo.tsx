import type { ReactNode } from 'react';
import type { Photo as DonneesPhoto } from '@data/photos';
import { Photo } from './Photo';
import styles from './Duo.module.css';

interface Props {
  readonly photo: DonneesPhoto;
  readonly eyebrow?: string;
  readonly titre: ReactNode;
  readonly children: ReactNode;
  /** Côté où se range la photo sur grand écran. Alterné d'un duo à l'autre. */
  readonly cote?: 'gauche' | 'droite';
  /** Un duo qui ouvre une page porte le titre de la page. */
  readonly niveau?: 'h1' | 'h2';
  readonly id?: string;
  /** À réserver au duo qui ouvre une page : il déclenche le préchargement. */
  readonly prioritaire?: boolean;
}

const TAILLES = '(min-width: 1200px) 620px, (min-width: 900px) 48vw, 92vw';

/**
 * Le bloc de composition du site : une photographie et un texte, à parts égales,
 * côte à côte.
 *
 * Il remplace l'ancienne « charnière », qui rangeait une photo verticale contre
 * un bord et laissait la moitié de l'écran vide en face. Le vide se voulait une
 * respiration ; sur un grand écran il se lisait comme un trou. Ici les deux
 * moitiés portent quelque chose, et le format vertical des photographies — qui
 * était la contrainte — devient exactement ce que la colonne demande.
 *
 * La photo est légèrement plus haute que le texte n'en a besoin : c'est elle qui
 * donne sa hauteur au bloc, et le texte se centre en face.
 */
export function Duo({
  photo,
  eyebrow,
  titre,
  children,
  cote = 'droite',
  niveau = 'h2',
  id,
  prioritaire = false,
}: Props) {
  const Titre = niveau;

  /* Un duo qui ouvre une page est déjà à l'écran au premier affichage : le faire
     apparaître en fondu le ferait clignoter, et le script poserait sa marque
     avant que React ne s'hydrate — ce que React signale comme un écart. Ce qui
     est visible d'emblée n'a rien à révéler. */
  const apparition = prioritaire ? {} : { 'data-reveal': true };

  return (
    <div className={`wrapLarge ${styles.duo} ${styles[cote]}`}>
      <div className={styles.visuel} {...apparition}>
        <Photo photo={photo} sizes={TAILLES} prioritaire={prioritaire} />
      </div>

      <div
        className={styles.texte}
        {...apparition}
        style={{ ['--reveal-delai' as string]: '90ms' }}
      >
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Titre className={niveau === 'h1' ? styles.titrePage : 'titreSection'} id={id}>
          {titre}
        </Titre>
        {children}
      </div>
    </div>
  );
}
