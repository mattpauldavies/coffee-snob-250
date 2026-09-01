import type { CoffeeStop, Route } from '../types'

export interface Leg {
  from: CoffeeStop
  to: CoffeeStop
  miles: number
}

/** Distance in miles between each consecutive pair of stops. */
export function legs(route: Route): Leg[] {
  const { stops } = route
  const result: Leg[] = []
  for (let i = 1; i < stops.length; i++) {
    const from = stops[i - 1]
    const to = stops[i]
    result.push({ from, to, miles: to.mileMarker - from.mileMarker })
  }
  return result
}

/** Total distance of the loop, in miles. */
export function totalMiles(route: Route): number {
  const { stops } = route
  if (stops.length === 0) return 0
  return stops[stops.length - 1].mileMarker - stops[0].mileMarker
}

/** The single longest leg between two stops. */
export function longestLeg(route: Route): Leg | null {
  const all = legs(route)
  if (all.length === 0) return null
  return all.reduce((max, leg) => (leg.miles > max.miles ? leg : max))
}

/** Number of coffee stops (excludes the start and finish markers). */
export function coffeeStopCount(route: Route): number {
  return route.stops.filter((stop) => stop.kind === 'coffee').length
}

export function findStop(route: Route, id: string): CoffeeStop | undefined {
  return route.stops.find((stop) => stop.id === id)
}

/** Human-friendly mileage, e.g. `42 mi`. */
export function formatMiles(miles: number): string {
  return `${Math.round(miles)} mi`
}

/** Fraction (0–1) of the loop completed at a given stop. */
export function progressAt(route: Route, stop: CoffeeStop): number {
  const total = totalMiles(route)
  if (total === 0) return 0
  return (stop.mileMarker - route.stops[0].mileMarker) / total
}
