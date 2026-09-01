import { useMemo, useState } from 'react'
import { route } from './data/route'
import { coffeeStopCount, longestLeg, totalMiles } from './lib/route'
import { RouteMap } from './components/RouteMap'
import { StopList } from './components/StopList'
import { StopDetails } from './components/StopDetails'
import { StatsBar } from './components/StatsBar'

export default function App() {
  const [selectedId, setSelectedId] = useState(route.stops[0].id)

  const selected = useMemo(
    () => route.stops.find((stop) => stop.id === selectedId) ?? route.stops[0],
    [selectedId],
  )

  const stats = useMemo(
    () => ({
      total: totalMiles(route),
      cafes: coffeeStopCount(route),
      longest: longestLeg(route),
    }),
    [],
  )

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__badge">☕ moto route</div>
        <h1 className="hero__title">{route.name}</h1>
        <p className="hero__subtitle">{route.subtitle}</p>
        <StatsBar
          total={stats.total}
          cafes={stats.cafes}
          longest={stats.longest}
        />
      </header>

      <main className="layout">
        <section className="panel panel--map" aria-label="Route map">
          <RouteMap
            route={route}
            selectedId={selected.id}
            onSelect={setSelectedId}
          />
        </section>

        <section className="panel panel--list" aria-label="Coffee stops">
          <h2 className="panel__heading">The stops</h2>
          <StopList
            route={route}
            selectedId={selected.id}
            onSelect={setSelectedId}
          />
        </section>

        <section className="panel panel--details" aria-label="Stop details">
          <StopDetails route={route} stop={selected} />
        </section>
      </main>

      <footer className="footer">
        <span>Ride safe. Caffeinate responsibly.</span>
      </footer>
    </div>
  )
}
