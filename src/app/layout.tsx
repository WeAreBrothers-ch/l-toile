import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { RESTAURANT, SITE_URL } from '@data/restaurant';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BarreAction } from '@/components/layout/BarreAction';
import { JsonLd } from '@/components/ui/JsonLd';
import { ficheRestaurant } from '@/lib/jsonld';
import { SCRIPT_APPARITIONS } from '@/lib/script-apparitions';
import '@/styles/global.css';

/* Les trois fichiers sont les sous-ensembles latins de Google Fonts, ramenés
   aux seules graisses employées par la direction artistique
   (voir scripts/preparer-polices.py). Ils pèsent 133 ko à eux trois. */
const newsreader = localFont({
  src: '../fonts/newsreader-roman.woff2',
  weight: '400 500',
  style: 'normal',
  variable: '--font-newsreader',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Times New Roman',
});

/* Fichier figé en graisse 400 (voir scripts/preparer-polices.py) : l'italique
   ne sert qu'à un mot par titre. Ne jamais lui demander une autre graisse —
   elle n'existe pas dans le fichier, et l'emphase disparaîtrait en silence.
   Il est préchargé malgré son emploi rare : ce mot est dans le titre principal,
   donc dans le plus grand texte de la page. Le laisser arriver après coup
   faisait sauter la ligne au moment du remplacement de la police de secours.
   Le fichier ne pèse que 24 ko, moins que les deux autres. */
const newsreaderItalique = localFont({
  src: '../fonts/newsreader-italic.woff2',
  weight: '400',
  style: 'italic',
  variable: '--font-newsreader-italique',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Times New Roman',
});

const archivo = localFont({
  src: '../fonts/archivo.woff2',
  weight: '400 600',
  style: 'normal',
  variable: '--font-archivo',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${RESTAURANT.nom} — Restaurant italien et pizzeria à Lausanne`,
    template: `%s — ${RESTAURANT.nom}`,
  },
  description: RESTAURANT.baseline,
  applicationName: RESTAURANT.nom,
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  icons: {
    icon: [{ url: '/images/logo-mono.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#121110',
};

export default function RacineLayout({ children }: { readonly children: ReactNode }) {
  const classes = [
    newsreader.variable,
    newsreaderItalique.variable,
    archivo.variable,
  ].join(' ');

  return (
    // `suppressHydrationWarning` : le script d'apparition pose une marque sur
    // <html> avant le premier affichage. C'est volontaire, et React doit
    // l'accepter au lieu de signaler un écart entre serveur et navigateur.
    // `data-scroll-behavior` dit à Next de couper le défilement doux le temps
    // d'un changement de page : sans lui, revenir en arrière fait défiler la
    // page au lieu de la restaurer instantanément à sa position.
    <html lang="fr-CH" className={classes} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* `suppressHydrationWarning` : certaines extensions de navigateur
            (bloqueurs de publicité) vident les scripts en clair avant que React
            ne démarre. Le site fonctionne alors très bien — le contenu reste
            visible, il n'est simplement plus animé — mais React signalerait un
            écart entre ce qu'il a envoyé et ce qu'il trouve. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: SCRIPT_APPARITIONS }}
        />
      </head>
      <body>
        <JsonLd donnees={ficheRestaurant()} />
        <a className="lienEvitement" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <BarreAction />
      </body>
    </html>
  );
}
