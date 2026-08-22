import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Bouton.module.css';

export type VarianteBouton = 'primaire' | 'secondaire' | 'tertiaire' | 'rond';

interface BaseProps {
  readonly variante?: VarianteBouton;
  readonly grand?: boolean;
  readonly pleineLargeur?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

interface LienProps extends BaseProps {
  readonly href: string;
  /** Renseigné sur le bouton d'appel : la performance du site se mesure aux appels. */
  readonly analytics?: string;
  readonly ariaLabel?: string;
}

function classes({ variante = 'primaire', grand, pleineLargeur, className }: BaseProps): string {
  return [
    styles.base,
    styles[variante],
    grand ? styles.grand : '',
    pleineLargeur ? styles.pleineLargeur : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

/** Bouton de navigation. Utilise `next/link` pour les routes internes. */
export function BoutonLien({ href, analytics, ariaLabel, children, ...reste }: LienProps) {
  const commun = {
    className: classes({ ...reste, children }),
    'aria-label': ariaLabel,
    ...(analytics ? { 'data-analytics': analytics } : {}),
  } as const;

  const externe = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (externe) {
    return (
      <a href={href} {...commun} {...(href.startsWith('http') ? { rel: 'noopener', target: '_blank' } : {})}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...commun}>
      {children}
    </Link>
  );
}

interface ActionProps extends BaseProps {
  readonly type?: 'button' | 'submit';
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly ariaLabel?: string;
}

/** Bouton d'action. Réservé à ce qui n'est pas une navigation. */
export function Bouton({ type = 'button', onClick, disabled, ariaLabel, children, ...reste }: ActionProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes({ ...reste, children })}
    >
      {children}
    </button>
  );
}
