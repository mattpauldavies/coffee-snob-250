import { stats } from '../content/episode';
import styles from './Numbers.module.css';

export function Numbers() {
  return (
    <section className={styles.strip} aria-label="The numbers">
      <dl className={styles.list}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={`label ${styles.label}`}>{stat.label}</dt>
            <dd className={styles.value}>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
