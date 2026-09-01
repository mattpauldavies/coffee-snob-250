import { describe, expect, it } from 'vitest'
import { route } from '../data/route'
import type { Route } from '../types'
import {
  coffeeStopCount,
  findStop,
  formatMiles,
  legs,
  longestLeg,
  progressAt,
  totalMiles,
} from './route'

const empty: Route = { name: 'empty', subtitle: '', stops: [] }

describe('totalMiles', () => {
  it('is the advertised 250 mile loop', () => {
    expect(totalMiles(route)).toBe(250)
  })

  it('is 0 for a route with no stops', () => {
    expect(totalMiles(empty)).toBe(0)
  })
})

describe('legs', () => {
  it('produces one fewer leg than there are stops', () => {
    expect(legs(route)).toHaveLength(route.stops.length - 1)
  })

  it('leg mileage sums to the total distance', () => {
    const sum = legs(route).reduce((acc, leg) => acc + leg.miles, 0)
    expect(sum).toBe(totalMiles(route))
  })

  it('every leg moves forward along the route', () => {
    for (const leg of legs(route)) {
      expect(leg.miles).toBeGreaterThan(0)
    }
  })
})

describe('longestLeg', () => {
  it('finds the longest gap between coffee stops', () => {
    const leg = longestLeg(route)
    expect(leg).not.toBeNull()
    expect(leg?.from.id).toBe('switchback-coffee')
    expect(leg?.to.id).toBe('summit-and-steam')
    expect(leg?.miles).toBe(54)
  })

  it('returns null when there are no legs', () => {
    expect(longestLeg(empty)).toBeNull()
  })
})

describe('coffeeStopCount', () => {
  it('counts only the coffee stops, not start/finish', () => {
    expect(coffeeStopCount(route)).toBe(4)
  })
})

describe('findStop', () => {
  it('finds a stop by id', () => {
    expect(findStop(route, 'switchback-coffee')?.town).toBe('Cedar Bend')
  })

  it('returns undefined for an unknown id', () => {
    expect(findStop(route, 'nope')).toBeUndefined()
  })
})

describe('formatMiles', () => {
  it('rounds and adds a unit', () => {
    expect(formatMiles(41.6)).toBe('42 mi')
    expect(formatMiles(0)).toBe('0 mi')
  })
})

describe('progressAt', () => {
  it('is 0 at the start and 1 at the finish', () => {
    expect(progressAt(route, route.stops[0])).toBe(0)
    expect(progressAt(route, route.stops[route.stops.length - 1])).toBe(1)
  })

  it('is the halfway-ish fraction in the middle', () => {
    const summit = findStop(route, 'summit-and-steam')!
    expect(progressAt(route, summit)).toBeCloseTo(96 / 250)
  })
})
