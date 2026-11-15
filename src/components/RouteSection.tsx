import { useState } from 'react';
import { Badge, Button } from '../design-system';
import { episode, legs, route } from '../content/episode';
import { RouteMap } from './RouteMap';
import gpxFile from '../assets/data/coffee-snob-250.gpx?url';
import styles from './RouteSection.module.css';

export function RouteSection() {
  /** Shared between the map and the list, so either can drive the highlight. */
  const [activeLeg, setActiveLeg] = useState<number | null>(null);

  return (
    <section id="route" className={`sectionPad ${styles.section}`} aria-label="The route">
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={`label ${styles.kicker}`}>{route.kicker}</span>
          <h2 className={styles.title}>{route.title}</h2>
          <p className={styles.blurb}>{route.body}</p>
        </div>

        <RouteMap activeLeg={activeLeg} onHoverLeg={setActiveLeg} />

        <ol className={styles.legs}>
          {legs.map((leg) => (
            <li
              key={leg.number}
              className={styles.leg}
              data-kind={leg.kind}
              data-standout={leg.standout === true}
              data-active={activeLeg === leg.number}
              onMouseEnter={() => setActiveLeg(leg.number)}
              onMouseLeave={() => setActiveLeg(null)}
            >
              <div className={styles.legHead}>
                <span className={styles.legNumber} aria-hidden="true">
                  {leg.number}
                </span>
                <h3 className={styles.legTitle}>{leg.title}</h3>
                <span className={`label ${styles.legMeta}`}>{leg.meta}</span>
              </div>
              <p className={styles.legBody}>{leg.body}</p>
              {leg.badges && (
                <div className={styles.badges}>
                  {leg.badges.map((badge) => (
                    <Badge key={badge} tone={leg.standout ? 'live' : 'neutral'}>
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className={styles.actions}>
          <Button
            href={episode.googleMapsUrl}
            target="_blank"
            rel="noopener"
            variant="primary"
            size="lg"
            fullWidth
            className={styles.action}
          >
            Open in Google Maps
          </Button>
          <Button
            href={gpxFile}
            download="Coffee Snob 250.gpx"
            variant="inverse"
            size="lg"
            fullWidth
            className={styles.action}
          >
            Download the GPX
          </Button>
        </div>
      </div>
    </section>
  );
}
