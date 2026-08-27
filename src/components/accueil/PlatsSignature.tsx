import Link from 'next/link';
import { PHOTOS, type Photo as DonneesPhoto } from '@data/photos';
import { Photo } from '@/components/ui/Photo';
import { BoutonLien } from '@/components/ui/Bouton';
import { formaterPrix } from '@/lib/format';
import styles from './PlatsSignature.module.css';

interface PlatSignature {
  readonly nom: string;
  readonly description: string;
  readonly prix: number;
  /** Précision accolée au prix quand il n'est pas celui d'une assiette seule. */
  readonly suffixePrix?: string;
  readonly photo: DonneesPhoto;
  /** Ancre exacte du plat dans la carte : la vignette est une porte d'entrée. */
  readonly href: string;
}

/**
 * Quatre plats, quatre univers : la spécialité de la maison, une entrée, une
 * pâte, une pizza. Chacun correspond exactement à sa photographie — un plat
 * illustré par une autre assiette est une promesse que le service ne tient pas.
 */
const SIGNATURES: readonly PlatSignature[] = [
  {
    nom: 'Plateau de fruits de mer grillés',
    description: 'Gambas, poulpes, calamars, moules et filet de loup de mer.',
    prix: 49,
    suffixePrix: '/ pers.',
    photo: PHOTOS.platPlateauMer,
    href: '/carte#poissons',
  },
  {
    nom: 'Carpaccio de bœuf',
    description: 'Roquette et écailles de Grana Padano.',
    prix: 16,
    photo: PHOTOS.platCarpaccio,
    href: '/carte#entrees',
  },
  {
    nom: 'Linguine aglio, olio e pepperoncino',
    description: 'Ail, tomate cherry et basilic.',
    prix: 19,
    photo: PHOTOS.platLinguine,
    href: '/carte#pasta',
  },
  {
    nom: 'Pizza Crudo e grana',
    description: 'Jambon cru, copeaux de parmesan et tomate cherry.',
    prix: 24,
    photo: PHOTOS.platPizza,
    href: '/pizzas',
  },
];

const TAILLES = '(min-width: 1024px) 24vw, 46vw';

export function PlatsSignature() {
  return (
    <section className="surfacePapier section" aria-labelledby="titre-signature">
      <div className="wrapLarge">
        <div className={styles.entete} data-reveal>
          <div>
            <p className="eyebrow">Ce qu’on commande le plus</p>
            <h2 className="titreSection" id="titre-signature">
              Quatre plats, quatre <em className="italique">envies</em>
            </h2>
          </div>
          <BoutonLien href="/carte" variante="tertiaire">
            Voir toute la carte
          </BoutonLien>
        </div>

        <div className={styles.grille}>
          {SIGNATURES.map((plat, index) => (
            <Link
              key={plat.nom}
              href={plat.href}
              className={styles.plat}
              data-reveal
              style={{ ['--reveal-delai' as string]: `${index * 60}ms` }}
            >
              <div className={styles.visuel}>
                <Photo photo={plat.photo} sizes={TAILLES} zoom />
                {/* Le prix est posé sur la photo, pas sous la description : c'est
                    la seule information qu'on cherche du regard avant de lire. */}
                <p className={styles.prix}>
                  {formaterPrix(plat.prix)}
                  {plat.suffixePrix ? (
                    <span className={styles.suffixePrix}> {plat.suffixePrix}</span>
                  ) : null}
                </p>
              </div>
              <h3 className={styles.nom}>{plat.nom}</h3>
              <p className={styles.description}>{plat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
