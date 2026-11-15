import { Card } from '../design-system';
import { coffee, coffeeStops } from '../content/episode';
import styles from './CoffeeSection.module.css';

export function CoffeeSection() {
  return (
    <section id="coffee" className={`sectionPad ${styles.section}`} aria-label="The coffee">
      <div className={styles.head}>
        <span className={`label ${styles.kicker}`}>{coffee.kicker}</span>
        <h2 className={styles.title}>{coffee.title}</h2>
      </div>

      <div className={styles.grid}>
        {coffeeStops.map((stop) => (
          <Card key={stop.name} padding="clamp(20px,3vw,28px)" className={styles.card}>
            <article className={styles.stop}>
              <div className={styles.stopHead}>
                <span className={styles.index} aria-hidden="true">
                  {stop.index}
                </span>
                <span className={`label ${styles.place}`}>{stop.place}</span>
              </div>
              <h3 className={styles.name}>{stop.name}</h3>
              <p className={styles.body}>{stop.body}</p>
              <a
                href={stop.href}
                target="_blank"
                rel="noopener"
                className={`label ${styles.link}`}
              >
                {stop.linkLabel} →
              </a>
            </article>
          </Card>
        ))}
      </div>
    </section>
  );
}
