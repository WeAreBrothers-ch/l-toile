import type { CSSProperties } from 'react';

/** Jeu d'icônes fermé : sept tracés, trait 1,5 px, angles vifs, jamais de remplissage. */
export type NomIcone = 'telephone' | 'epingle' | 'horloge' | 'chevron' | 'fleche' | 'croix' | 'menu';

const TRACES: Readonly<Record<NomIcone, string>> = {
  telephone: 'M6.5 3h-3v3a14.5 14.5 0 0 0 14.5 14.5h3v-3l-4-1.5-2.5 2.5a11.5 11.5 0 0 1-9-9L8 7z',
  epingle: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  horloge: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5.5l3.5 2',
  chevron: 'M9 5l7 7-7 7',
  fleche: 'M4 12h15 M13 6l6 6-6 6',
  croix: 'M5 5l14 14 M19 5L5 19',
  menu: 'M3 6h18 M3 12h18 M3 18h18',
};

interface Props {
  readonly nom: NomIcone;
  /** Taille en pixels. 20 par défaut, 24 pour les cibles tactiles isolées. */
  readonly taille?: number;
  readonly className?: string;
  readonly style?: CSSProperties;
}

export function Icone({ nom, taille = 20, className, style }: Props) {
  return (
    <svg
      className={className}
      style={style}
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d={TRACES[nom]} />
    </svg>
  );
}
