import type { Photo as DonneesPhoto } from '@data/photos';
import { Photo } from '@/components/ui/Photo';
import styles from './RespirationCarte.module.css';

interface Props {
  readonly photo: DonneesPhoto;
}

export function RespirationCarte({ photo }: Props) {
  return (
    <div className={`wrapLarge ${styles.respiration}`}>
      <Photo photo={photo} sizes="(min-width: 1440px) 1344px, 92vw" className={styles.cadre} />
    </div>
  );
}
