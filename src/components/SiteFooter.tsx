import { Button } from '../design-system';
import { episode, footer } from '../content/episode';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.pitch}>
          <h2 className={styles.title}>{footer.title}</h2>
          <Button
            href={episode.subscribeUrl}
            target="_blank"
            rel="noopener"
            variant="hot"
            size="lg"
            style={{ alignSelf: 'flex-start' }}
          >
            Subscribe on YouTube
          </Button>
        </div>

        <nav className={styles.nav} aria-label="Elsewhere">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener"
              className={styles.link}
            >
              {link.label}
              <br />
              <span className={styles.handle}>{link.handle}</span>
            </a>
          ))}
        </nav>

        <div className={`label ${styles.colophon}`}>
          <span className={styles.wordmark}>
            Matt<span className={styles.ampersand}>&amp;</span>Helen
          </span>
          <span>
            {episode.number} · {episode.title}
          </span>
        </div>
      </div>
    </footer>
  );
}
