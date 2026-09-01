import type { Leg } from '../lib/route'
import { formatMiles } from '../lib/route'

interface StatsBarProps {
  total: number
  cafes: number
  longest: Leg | null
}

export function StatsBar({ total, cafes, longest }: StatsBarProps) {
  return (
    <dl className="stats">
      <div className="stats__item">
        <dt>Distance</dt>
        <dd>{formatMiles(total)}</dd>
      </div>
      <div className="stats__item">
        <dt>Cafés</dt>
        <dd>{cafes}</dd>
      </div>
      <div className="stats__item">
        <dt>Longest leg</dt>
        <dd>{longest ? formatMiles(longest.miles) : '—'}</dd>
      </div>
    </dl>
  )
}
