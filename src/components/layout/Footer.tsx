import Link from 'next/link';
import {
  ADRESSE_COMPLETE,
  HORAIRES_RESUME,
  LIEN_ITINERAIRE,
  NAVIGATION,
  RESTAURANT,
} from '@data/restaurant';
import styles from './Footer.module.css';

const ANNEE = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={`surfaceEncre ${styles.pied}`}>
      <div className="wrap">
        <div className={styles.colonnes}>
          <div className={styles.colonne}>
            <h2>Adresse</h2>
            <address>
              {RESTAURANT.nom}
              <br />
              {RESTAURANT.rue}
              <br />
              {RESTAURANT.codePostal} {RESTAURANT.ville}
              <br />
              <a href={LIEN_ITINERAIRE} target="_blank" rel="noopener">
                Voir l’itinéraire
              </a>
            </address>
          </div>

          <div className={styles.colonne}>
            <h2>Horaires</h2>
            <dl>
              {HORAIRES_RESUME.map((ligne) => (
                <div key={ligne.jours} className={styles.horaire}>
                  <dt>{ligne.jours}</dt>
                  <dd className={ligne.services === 'Fermé' ? styles.fermeture : undefined}>
                    {ligne.services}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.colonne}>
            <h2>Réservation</h2>
            <p>
              <a href={`tel:${RESTAURANT.telephone}`} data-analytics="call">
                {RESTAURANT.telephoneInternational}
              </a>
              <br />
              <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
              <br />
              Réservation par téléphone
            </p>
          </div>

          <div className={styles.colonne}>
            <h2>Le site</h2>
            <nav className={styles.navPied} aria-label="Navigation de pied de page">
              <Link href="/">Accueil</Link>
              {NAVIGATION.map((entree) => (
                <Link key={entree.href} href={entree.href}>
                  {entree.libelle}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className={styles.filigrane} role="presentation" />

        <p className={styles.mentions}>
          <span>
            © {ANNEE} {RESTAURANT.nom}
          </span>
          <span>{ADRESSE_COMPLETE}</span>
          <span>Cuisine italienne, pizzeria et brasserie</span>
        </p>
      </div>
    </footer>
  );
}
