import { Button } from '../design-system';
import { episode } from '../content/episode';
import { Photo } from './Photo';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="The Coffee Snob 250">
      <Photo
        name="kyles-of-bute"
        alt="Matt watching the Waverley cross the Kyles of Bute"
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className={styles.photo}
      />
      <div className={styles.wash} />

      <div className={styles.body}>
        <span className={`label ${styles.kicker}`}>{episode.kicker}</span>
        <h1 className={styles.title}>{episode.title}</h1>
        <p className={styles.standfirst}>{episode.standfirst}</p>
        <Button href="#watch" variant="ghost" size="lg" style={{ alignSelf: 'flex-start' }}>
          ▶ Watch the episode
        </Button>
      </div>
    </section>
  );
}
