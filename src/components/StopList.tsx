import type { Route } from '../types'
import { formatMiles } from '../lib/route'

interface StopListProps {
  route: Route
  selectedId: string
  onSelect: (id: string) => void
}

const kindLabel: Record<string, string> = {
  start: 'Start',
  coffee: 'Coffee',
  finish: 'Finish',
}

export function StopList({ route, selectedId, onSelect }: StopListProps) {
  return (
    <ol className="stop-list">
      {route.stops.map((stop) => {
        const active = stop.id === selectedId
        return (
          <li key={stop.id}>
            <button
              type="button"
              className={`stop-list__item${active ? ' is-active' : ''}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => onSelect(stop.id)}
            >
              <span className={`stop-list__dot stop-list__dot--${stop.kind}`} />
              <span className="stop-list__body">
                <span className="stop-list__name">{stop.name}</span>
                <span className="stop-list__town">{stop.town}</span>
              </span>
              <span className="stop-list__meta">
                <span className={`stop-list__tag stop-list__tag--${stop.kind}`}>
                  {kindLabel[stop.kind]}
                </span>
                <span className="stop-list__mile">{formatMiles(stop.mileMarker)}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
