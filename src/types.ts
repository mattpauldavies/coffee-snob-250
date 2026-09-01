export type StopKind = 'start' | 'coffee' | 'finish'

export interface CoffeeStop {
  /** Stable identifier used for selection and keys. */
  id: string
  /** Café / landmark name. */
  name: string
  /** Town the stop sits in. */
  town: string
  /** Cumulative distance from the start of the loop, in miles. */
  mileMarker: number
  /** What to order when you get there. */
  specialty: string
  /** A short rider's note about the stop. */
  note: string
  kind: StopKind
  /** Position on the schematic 1000x620 SVG map. */
  x: number
  y: number
}

export interface Route {
  name: string
  subtitle: string
  stops: CoffeeStop[]
}
