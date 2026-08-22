import type { NoeudStructure } from '@/lib/jsonld';

interface Props {
  readonly donnees: NoeudStructure | readonly NoeudStructure[];
}

/**
 * Publie les données structurées lues par Google.
 * Les chevrons sont échappés : une description de plat contenant « < » ne doit
 * jamais pouvoir fermer la balise de script.
 */
export function JsonLd({ donnees }: Props) {
  const contenu = JSON.stringify(donnees).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contenu }} />;
}
