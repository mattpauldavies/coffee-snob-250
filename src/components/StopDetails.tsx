import type { CoffeeStop, Route } from '../types'
import { formatMiles, progressAt, totalMiles } from '../lib/route'

interface StopDetailsProps {
  route: Route
  stop: CoffeeStop
}

export function StopDetails({ route, stop }: StopDetailsProps) {
  const pct = Math.round(progressAt(route, stop) * 100)
  const remaining = totalMiles(route) - stop.mileMarker

  return (
    <article className="details">
      <p className="details__eyebrow">{stop.town}</p>
      <h2 className="details__title">{stop.name}</h2>

      <div className="details__order">
        <span className="details__order-label">Order the</span>
        <span className="details__order-value">{stop.specialty}</span>
      </div>

      <p className="details__note">{stop.note}</p>

      <div className="details__progress">
        <div className="details__progress-track">
          <div className="details__progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="details__progress-labels">
          <span>{formatMiles(stop.mileMarker)} in</span>
          <span>{formatMiles(remaining)} to go</span>
        </div>
      </div>
    </article>
  )
}
