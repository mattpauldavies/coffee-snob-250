import { episode, nav } from '../content/episode';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrolledPast } from '../hooks/useScrolledPast';
import styles from './SiteHeader.module.css';

const sectionIds = nav.map((item) => item.id);

export function SiteHeader() {
  // Roughly the height of the hero: past it, the bar earns a background.
  const scrolled = useScrolledPast(320);
  const active = useScrollSpy(sectionIds);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <a href="#top" className={styles.wordmark}>
        Matt<span className={styles.ampersand}>&amp;</span>Helen
      </a>

      {scrolled ? (
        <nav className={styles.nav} aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`label ${styles.navLink}`}
              aria-current={active === item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : (
        <span className={`label ${styles.episode}`}>{episode.number}</span>
      )}
    </header>
  );
}
