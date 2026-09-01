import { legs, route } from '../content/episode';
import type { Leg } from '../content/episode';
import styles from './RouteMap.module.css';

type RouteMapProps = {
  activeLeg: number | null;
  onHoverLeg: (legNumber: number | null) => void;
};

function points(leg: Leg) {
  return leg.path.map(([x, y]) => `${x},${y}`).join(' ');
}

/**
 * The stylised map. Node positions are projected from the real coordinates;
 * each leg is its own group so the list and the map can highlight together.
 * The list below is the accessible control — this is `role="img"`, so the
 * nodes add pointer affordance without adding a second set of tab stops.
 */
export function RouteMap({ activeLeg, onHoverLeg }: RouteMapProps) {
  return (
    <figure className={styles.figure}>
      <svg
        viewBox={route.viewBox}
        role="img"
        aria-label={route.description}
        className={styles.map}
        data-has-active={activeLeg !== null}
      >
        {legs.map((leg) => {
          const [nodeX, nodeY] = leg.node;
          const active = activeLeg === leg.number;
          return (
            <g
              key={leg.number}
              className={styles.leg}
              data-kind={leg.kind}
              data-active={active}
              onMouseEnter={() => onHoverLeg(leg.number)}
              onMouseLeave={() => onHoverLeg(null)}
            >
              <polyline className={styles.line} points={points(leg)} />
              {active && (
                <rect className={styles.halo} x={nodeX - 14} y={nodeY - 14} width={28} height={28} />
              )}
              <rect className={styles.node} x={nodeX - 10} y={nodeY - 10} width={20} height={20} />
              <text className={styles.nodeLabel} x={nodeX} y={nodeY + 4}>
                {leg.number}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className={`label ${styles.legend}`}>
        <span className={styles.key}>
          <span className={styles.keyRidden} />
          Ridden
        </span>
        <span className={styles.key}>
          <span className={styles.keyFerry} />
          Ferry
        </span>
      </figcaption>
    </figure>
  );
}
