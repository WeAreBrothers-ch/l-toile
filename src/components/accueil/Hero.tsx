import { getImageProps } from 'next/image';
import { PHOTOS } from '@data/photos';
import styles from './Hero.module.css';

const PAYSAGE = PHOTOS.heroSalle;
const PORTRAIT = PHOTOS.heroSallePortrait;

/**
 * Bandeau d'ouverture.
 *
 * Deux cadrages, pas deux téléchargements : le navigateur ne charge que celui
 * qui correspond à son écran. En 4:5 sur mobile, la salle reste lisible ;
 * en 16:9 sur grand écran, elle respire. C'est aussi la plus grande image de
 * la page, donc celle qui décide du temps d'affichage perçu — elle est
 * préchargée, et elle seule : c'est `fetchPriority="high"` posé sur l'image et
 * sur sa source qui déclenche ce préchargement, une fois par cadrage.
 *
 * Pas de bouton ici : les actions vivent dans le bandeau juste en dessous.
 */
export function Hero() {
  // `priority` poserait un préchargement SANS condition d'écran pour chacun des
  // deux cadrages : le navigateur téléchargerait le paysage ET le portrait.
  const commun = { alt: PAYSAGE.alt, sizes: '100vw', priority: false } as const;

  const paysage = getImageProps({
    ...commun,
    src: PAYSAGE.src,
    width: PAYSAGE.largeur,
    height: PAYSAGE.hauteur,
  }).props;

  const { srcSet: srcSetPortrait, ...portrait } = getImageProps({
    ...commun,
    src: PORTRAIT.src,
    width: PORTRAIT.largeur,
    height: PORTRAIT.hauteur,
  }).props;

  return (
    <section className={styles.hero} aria-labelledby="titre-accueil">
      {/* Un préchargement par cadrage, chacun conditionné à sa largeur d'écran :
          le navigateur n'en télécharge donc qu'un seul, celui qu'il affichera. */}
      <link
        rel="preload"
        as="image"
        media="(min-width: 768px)"
        href={paysage.src}
        imageSrcSet={paysage.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media="(max-width: 767.98px)"
        href={portrait.src}
        imageSrcSet={srcSetPortrait}
        imageSizes="100vw"
        fetchPriority="high"
      />

      <picture>
        <source media="(min-width: 768px)" srcSet={paysage.srcSet} sizes="100vw" />
        <img {...portrait} srcSet={srcSetPortrait} alt={PAYSAGE.alt} loading="eager" fetchPriority="high" />
      </picture>

      <div className={styles.voile} />

      <div className={`wrap ${styles.contenu}`}>
        <p className={styles.eyebrow}>Restaurant · Lausanne-Malley</p>
        <h1 className={styles.titre} id="titre-accueil">
          L’Étoile, cuisine <em>italienne</em> à Lausanne
        </h1>
        <p className={styles.chapo}>
          Pizzas cuites au four, pâtes fraîches et viandes sur ardoise, rue de Genève 102.
        </p>
      </div>
    </section>
  );
}
