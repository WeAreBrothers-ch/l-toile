import type { Photo as DonneesPhoto } from '@data/photos';
import { Photo } from '@/components/ui/Photo';
import styles from './RespirationCarte.module.css';

interface Props {
  readonly photo: DonneesPhoto;
}

export function RespirationCarte({ photo }: Props) {
  return (
    <div className={`wrap ${styles.respiration}`}>
      <Photo photo={photo} sizes="(min-width: 800px) 720px, 92vw" />
    </div>
  );
}
