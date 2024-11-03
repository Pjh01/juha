import Image from 'next/image';
import starEmpty from '@/public/star-empty.svg';
import starFilled from '@/public/star-filled.svg';
import styles from './StarRating.module.css';

const RATINGS = [1, 2, 3, 4, 5];

export default function StarRating({ value = 1 }) {
  return (
    <span className={styles.starRating}>
      {RATINGS.map((rating) =>
        value >= rating ? (
          <Image key={rating} src={starFilled} alt="★" />
        ) : (
          <Image key={rating} src={starEmpty} alt="✩" />
        )
      )}
    </span>
  );
}
6;
