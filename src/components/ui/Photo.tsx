import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import type { Photo as DonneesPhoto } from '@data/photos';
import styles from './Photo.module.css';

interface Props {
  readonly photo: DonneesPhoto;
  /** Largeurs d'affichage réelles, pour que le navigateur choisisse le bon fichier. */
  readonly sizes: string;
  /** À réserver au visuel le plus grand du haut de page : il déclenche le préchargement. */
  readonly prioritaire?: boolean;
  /** Active le léger zoom au survol. Uniquement sur un cadre cliquable. */
  readonly zoom?: boolean;
  readonly className?: string;
}

/**
 * Le fichier est-il réellement présent dans `public/` ?
 * La vérification a lieu à la génération du site : elle ne coûte rien au visiteur,
 * et elle évite qu'une photo manquante produise une image cassée en production.
 */
function fichierPresent(src: string): boolean {
  try {
    return existsSync(join(process.cwd(), 'public', src));
  } catch {
    return false;
  }
}

/**
 * Un visuel du site. Le cadre impose toujours son ratio : la mise en page décide
 * de la place, jamais le poids du fichier. Le décalage de mise en page est donc nul.
 */
export function Photo({ photo, sizes, prioritaire = false, zoom = false, className }: Props) {
  const cadre = [styles.cadre, zoom ? styles.zoom : '', className ?? ''].filter(Boolean).join(' ');
  /* Le ratio passe par une variable plutôt que par `aspect-ratio` en clair :
     posé en style en ligne, il l'emporterait sur toute règle de feuille, et un
     emplacement ne pourrait plus demander un autre cadrage que celui du fichier
     (le bandeau des respirations de la carte, par exemple). */
  const ratio = { ['--ratio' as string]: `${photo.largeur} / ${photo.hauteur}` } as const;

  if (!fichierPresent(photo.src)) {
    return (
      <div className={`${cadre} ${styles.attente}`} style={ratio} role="img" aria-label={photo.alt}>
        <span className={styles.attenteRatio}>Photo {photo.ratio} à fournir</span>
        <span className={styles.attenteLieu}>{photo.emplacement}</span>
      </div>
    );
  }

  return (
    <div className={cadre} style={ratio}>
      <Image
        className={styles.image}
        src={photo.src}
        alt={photo.alt}
        width={photo.largeur}
        height={photo.hauteur}
        sizes={sizes}
        priority={prioritaire}
        {...(prioritaire ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      />
    </div>
  );
}
