import { useState } from 'react';
import { episode } from '../content/episode';
import { Photo } from './Photo';
import styles from './Watch.module.css';

/** Frame width at each breakpoint, for the still's `sizes`. */
const FRAME_SIZES = '(min-width: 1180px) 1052px, calc(100vw - 2 * clamp(20px, 5vw, 64px))';

export function Watch() {
  const [playing, setPlaying] = useState(false);
  const videoId = episode.youtubeId;

  return (
    <section id="watch" className={`sectionPad ${styles.section}`} aria-label="Watch the episode">
      <p className={styles.intro}>{episode.watchIntro}</p>

      <div className={styles.frame}>
        {playing && videoId ? (
          <iframe
            className={styles.embed}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`${episode.title} — full episode`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Photo
              name="a-road"
              alt="Still from the episode: two Triumphs on an empty A-road"
              sizes={FRAME_SIZES}
              className={styles.still}
            />
            <div className={styles.scanlines} />

            {videoId ? (
              <div className={styles.overlay}>
                <button
                  type="button"
                  className={styles.play}
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${episode.title}, ${episode.runtime}`}
                >
                  <span className={styles.pip} aria-hidden="true">
                    ▶
                  </span>
                </button>
                <span className={`label ${styles.caption}`}>
                  {episode.runtime} · Watch now
                </span>
              </div>
            ) : (
              <div className={styles.overlay}>
                <span className={styles.pip} aria-hidden="true">
                  ▶
                </span>
                <span className={`label ${styles.caption}`}>
                  Coming soon!
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
