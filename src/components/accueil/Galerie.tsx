import { PHOTOS, type Photo as DonneesPhoto } from '@data/photos';
import { Photo } from '@/components/ui/Photo';
import styles from './Galerie.module.css';

/**
 * Cinq images de ce qui se passe autour de l'assiette : le bar, un verre, une
 * ardoise, une bouteille ouverte.
 *
 * C'est le seul endroit du site qui ne vend rien. Le reste répond à « qu'est-ce
 * qu'ils servent, à quel prix » ; il manquait la réponse à « à quoi ça ressemble
 * d'y être ». Une carte donne envie de comparer, une salle donne envie de venir.
 */
const IMAGES: readonly DonneesPhoto[] = [
  PHOTOS.galerie1,
  PHOTOS.galerie2,
  PHOTOS.galerie3,
  PHOTOS.galerie4,
  PHOTOS.galerie5,
];

/* Sur grand écran chaque image occupe un cinquième de la largeur ; au doigt,
   elle défile à un peu plus des deux tiers de l'écran. */
const TAILLES = '(min-width: 900px) 19vw, 68vw';

export function Galerie() {
  return (
    <section className={`surfaceEncre ${styles.galerie}`} aria-labelledby="titre-galerie">
      {/* Le titre à gauche, ce qu'il explique à droite : un chapeau seul sur une
          moitié de bande noire laisse l'autre moitié vide. */}
      <div className={`wrapLarge ${styles.entete}`} data-reveal>
        <div>
          <p className="eyebrow">Le lieu</p>
          <h2 className="titreSection" id="titre-galerie">
            Une salle, un bar, <em className="italique">et le temps qu’il faut</em>
          </h2>
        </div>
        <p className="chapo">
          On y vient à midi entre deux rendez-vous, et on y revient le soir pour rester.
          Rue de Genève 102, à Malley.
        </p>
      </div>

      <ul className={styles.bande}>
        {IMAGES.map((photo, index) => (
          <li
            key={photo.src}
            className={styles.vignette}
            data-reveal
            style={{ ['--reveal-delai' as string]: `${index * 70}ms` }}
          >
            <Photo photo={photo} sizes={TAILLES} />
          </li>
        ))}
      </ul>
    </section>
  );
}
