import type { Route } from '../types'

/**
 * The coffee-snob-250: a 250 mile loop stitched together by great espresso.
 * `mileMarker` is the cumulative distance ridden from the start.
 */
export const route: Route = {
  name: 'coffee-snob-250',
  subtitle: 'A 250 mile motorcycle route for coffee powered adventure',
  stops: [
    {
      id: 'harbor-roasters',
      name: 'Harbor Roasters',
      town: 'Port Alden',
      mileMarker: 0,
      specialty: 'Flat white',
      note: 'Fuel up dockside before the coast road opens up. Kickstands up at sunrise.',
      kind: 'start',
      x: 120,
      y: 500,
    },
    {
      id: 'switchback-coffee',
      name: 'Switchback Coffee Co.',
      town: 'Cedar Bend',
      mileMarker: 42,
      specialty: 'Cortado',
      note: 'Reward for the first set of twisties. Shaded patio, cold water refills.',
      kind: 'coffee',
      x: 300,
      y: 300,
    },
    {
      id: 'summit-and-steam',
      name: 'Summit & Steam',
      town: 'Granite Pass',
      mileMarker: 96,
      specialty: 'Single-origin pour over',
      note: 'Highest point on the loop. Layer up — mornings are cold at the pass.',
      kind: 'coffee',
      x: 520,
      y: 140,
    },
    {
      id: 'high-desert-espresso',
      name: 'High Desert Espresso',
      town: 'Mirage Flats',
      mileMarker: 148,
      specialty: 'Iced shakerato',
      note: 'Long straight run out here. Watch fuel range and hydrate.',
      kind: 'coffee',
      x: 720,
      y: 260,
    },
    {
      id: 'riverside-grind',
      name: 'Riverside Grind',
      town: 'Willow Ford',
      mileMarker: 201,
      specialty: 'Cold brew',
      note: 'Last big coffee before the run home. Great pie, too.',
      kind: 'coffee',
      x: 640,
      y: 470,
    },
    {
      id: 'harbor-roasters-return',
      name: 'Harbor Roasters (Nightcap)',
      town: 'Port Alden',
      mileMarker: 250,
      specialty: 'Decaf cappuccino',
      note: 'Close the loop where it started. 250 miles, five cafés, zero regrets.',
      kind: 'finish',
      x: 120,
      y: 500,
    },
  ],
}
