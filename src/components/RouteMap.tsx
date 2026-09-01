import type { CoffeeStop, Route } from '../types'

interface RouteMapProps {
  route: Route
  selectedId: string
  onSelect: (id: string) => void
}

const VIEW_W = 1000
const VIEW_H = 620

/**
 * Spread markers that share the exact same coordinates (the loop's start and
 * finish sit in the same town) so both remain visible and clickable.
 */
function withRenderPositions(stops: CoffeeStop[]) {
  const seen = new Map<string, number>()
  return stops.map((stop) => {
    const key = `${stop.x},${stop.y}`
    const count = seen.get(key) ?? 0
    seen.set(key, count + 1)
    return { stop, rx: stop.x + count * 44, ry: stop.y - count * 4 }
  })
}

export function RouteMap({ route, selectedId, onSelect }: RouteMapProps) {
  const placed = withRenderPositions(route.stops)
  const linePoints = placed.map((p) => `${p.rx},${p.ry}`).join(' ')

  return (
    <svg
      className="map"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="group"
      aria-label={`Map of the ${route.name} route`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="road" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6c177" />
          <stop offset="100%" stopColor="#c77d38" />
        </linearGradient>
      </defs>

      {/* Road: soft shadow then the bright route line. */}
      <polyline
        className="map__road-shadow"
        points={linePoints}
        fill="none"
      />
      <polyline
        className="map__road"
        points={linePoints}
        fill="none"
        stroke="url(#road)"
      />

      {placed.map(({ stop, rx, ry }) => {
        const active = stop.id === selectedId
        return (
          <g
            key={stop.id}
            className={`map__stop map__stop--${stop.kind}${active ? ' is-active' : ''}`}
            transform={`translate(${rx}, ${ry})`}
            onClick={() => onSelect(stop.id)}
            role="button"
            tabIndex={0}
            aria-label={`${stop.name} — mile ${stop.mileMarker}`}
            aria-pressed={active}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(stop.id)
              }
            }}
          >
            {active && <circle className="map__pulse" r={26} />}
            <circle className="map__marker" r={active ? 16 : 12} />
            <text className="map__label" x={0} y={-26} textAnchor="middle">
              {stop.name}
            </text>
            <text className="map__mile" x={0} y={5} textAnchor="middle">
              {stop.mileMarker}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
