/**
 * Everything the page says, in one place. The sections read from here, so
 * updating the episode is a content edit rather than a markup edit.
 */

export type Stat = { value: string; label: string };

export type LegKind = 'ride' | 'ferry';

/** A point on the stylised map, in the SVG's own coordinate space. */
export type MapPoint = readonly [x: number, y: number];

export type Leg = {
  /** 1-based, and the number printed in the map node. */
  number: number;
  kind: LegKind;
  title: string;
  /** Distance and time, or the crossing length for a ferry. */
  meta: string;
  body: string;
  badges?: string[];
  /** Highlight the whole leg in yellow — the one bit worth riding twice. */
  standout?: boolean;
  /** The polyline this leg draws on the map, start point first. */
  path: MapPoint[];
  /** Where the numbered node sits. */
  node: MapPoint;
};

export type CoffeeStop = {
  index: string;
  place: string;
  name: string;
  body: string;
  href: string;
  linkLabel: string;
};

export type Note = {
  index: string;
  label: string;
  body: string;
  /** Red treatment — the one that costs you the day if you get it wrong. */
  warn?: boolean;
};

export type NavItem = { id: string; label: string };

export const episode = {
  series: 'S01',
  title: 'The Coffee Snob 250',
  kicker: 'Edinburgh → Isle of Bute → Edinburgh',
  standfirst:
    'How far would you ride for a good coffee?',
  runtime: '24 min',
  /**
   * The film's YouTube video id. With it set, the watch section shows a
   * click-to-play embed; null falls back to the "goes live here" placeholder.
   */
  youtubeId: 'padi2cHAwYg' as string | null,
  watchIntro:
    'We rode our Triumph Tiger Sports from Edinburgh to the Isle of Bute in search of amazing coffee! And you can watch the whole thing on YouTube or just ride the route yourself.',
  googleMapsUrl: 'https://maps.app.goo.gl/afijBv47iwPEdSez7',
  youtubeUrl: 'https://www.youtube.com/@matthelenmoto',
  subscribeUrl: 'https://www.youtube.com/@matthelenmoto?sub_confirmation=1',
} as const;

export const nav: NavItem[] = [
  { id: 'watch', label: 'Watch' },
  { id: 'route', label: 'Route' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'notes', label: 'Notes' },
];

export const stats: Stat[] = [
  { value: '250', label: 'Miles' },
  { value: '2', label: 'Ferries' },
  { value: '3', label: 'Coffee stops' },
  { value: '12', label: 'Hours door to door' },
];

export const route = {
  kicker: 'The route',
  title: 'A 250 mile loop',
  body: 'Anticlockwise out of Edinburgh, over to the Isle of Bute, and home the long way via Loch Lomond.',
  /** The map's viewBox, matched to the projected coordinates below. */
  viewBox: '-2 12 336 190',
  description:
    'Stylised map of the route: Edinburgh, Strathaven, Wemyss Bay, ferry to Rothesay, north to Rhubodach, ferry to Colintraive, the Kyles of Bute and Rest and Be Thankful, Loch Lomond, Stirling and back to Edinburgh',
};

export const legs: Leg[] = [
  {
    number: 1,
    kind: 'ride',
    title: 'Edinburgh to Strathaven',
    meta: '~60 miles · 1h 20m',
    body: 'Out through the city and onto the A70, which is dull for twenty minutes and then opens out across moorland with almost nothing on it. Coffee stop one is on Strathaven’s main street.',
    path: [
      [315, 107],
      [190, 179],
    ],
    node: [315, 107],
  },
  {
    number: 2,
    kind: 'ride',
    title: 'Strathaven to Wemyss Bay',
    meta: '~60 miles · 1h 20m',
    body: 'The functional leg. Round the south side of Glasgow on dual carriageway, then the Clyde opens up on your right for the last few miles into the terminal. Get there fifteen minutes early and you will ride straight on.',
    path: [
      [190, 179],
      [78, 120],
    ],
    node: [190, 179],
  },
  {
    number: 3,
    kind: 'ferry',
    title: 'Ferry: Wemyss Bay to Rothesay',
    meta: '35m crossing',
    body: 'Bikes go on first and get strapped down on the vehicle deck. Thirty-five minutes across the Firth, long enough for a cup of tea upstairs.',
    badges: ['Roughly hourly', 'Motorcycle ~£9 single'],
    path: [
      [78, 120],
      [22, 148],
    ],
    node: [50, 134],
  },
  {
    number: 4,
    kind: 'ride',
    title: 'Rothesay, and north to Rhubodach',
    meta: '~15 miles · 30m',
    body: 'Coffee stop two is a two minute ride from the pier. Then the road up the east side of the island, narrow, wooded and quiet, with the water beside you most of the way to the slipway at the top.',
    path: [
      [22, 148],
      [10, 104],
    ],
    node: [22, 148],
  },
  {
    number: 5,
    kind: 'ferry',
    title: 'Ferry: Rhubodach to Colintraive',
    meta: '5m crossing',
    body: 'Barely a ferry. You ride down the slip, they wave you on, and you are on the mainland again before you have got your gloves off.',
    badges: ['Every 30 min', 'Motorcycle ~£5 single'],
    path: [
      [10, 104],
      [42, 88],
    ],
    node: [26, 96],
  },
  {
    number: 6,
    kind: 'ride',
    title: 'Kyles of Bute to Loch Lomond',
    meta: '~55 miles · 2h',
    body: 'The best riding of the day. The A8003 climbs away from the Kyles to the viewpoint, which is worth stopping at even if the cloud is down. Then Loch Fyne, over the Rest and Be Thankful, and Loch Lomond on the way back east.',
    badges: ['Ride this bit twice'],
    standout: true,
    path: [
      [42, 88],
      [58, 58],
      [67, 32],
      [81, 32],
      [98, 40],
      [117, 93],
      [208, 61],
    ],
    node: [81, 32],
  },
  {
    number: 7,
    kind: 'ride',
    title: 'Loch Lomond to Stirling, then home',
    meta: '~30 + ~40 miles · 50m + 1h',
    body: 'Coffee stop three is in Stirling, which is the last excuse to get off the bike. After that it is motorway and the light going, and you are home.',
    path: [
      [208, 61],
      [315, 107],
    ],
    node: [208, 61],
  },
];

export const coffee = {
  kicker: 'The coffee',
  title: 'Three places worth the detour',
};

export const coffeeStops: CoffeeStop[] = [
  {
    index: '01',
    place: 'Strathaven',
    name: 'Roasted',
    body: 'We drank oat flat whites, had a pecan and maple cinnamon bun, and a red velvet cookie. All three were incredible. The staff are also the most friendly.',
    href: 'https://www.roastedstrathaven.co.uk/',
    linkLabel: 'roastedstrathaven.co.uk',
  },
  {
    index: '02',
    place: 'Rothesay',
    name: 'Isle of Bute Coffee',
    body: 'We only got there with seven minutes to spare, but we drank oat flat whites and they were amazing, smooth and velvety.',
    href: 'https://www.butecoffee.com/',
    linkLabel: 'butecoffee.com',
  },
  {
    index: '03',
    place: 'Stirling',
    name: 'Unorthodox',
    body: 'A latte is our go to. Buy their beans — Wee Stoater goes hard.',
    href: 'https://www.unorthodoxroasters.co.uk/',
    linkLabel: 'unorthodoxroasters.co.uk',
  },
];

export const notes = {
  kicker: 'Riding it yourself',
  title: 'Three things to get right',
  smallprint:
    'Ferry frequencies and fares above are approximate. Check current timetables before you go.',
  caption: 'Have fun and let us know what you think of the route.',
};

export const noteItems: Note[] = [
  {
    index: '01',
    label: 'Ferries',
    body: 'Both ferries are turn up and go for motorcycles. Pay at the terminal.',
  },
  {
    index: '02',
    label: 'Opening hours',
    body: 'Check the roastery’s opening hours before you set off. Getting this wrong means a 250 mile round trip to a locked door.',
    warn: true,
  },
  {
    index: '03',
    label: 'Daylight',
    body: 'The return leg needs light. Do this one on a good day.',
  },
];

export const footer = {
  title: 'Follow for more motorcycle adventures.',
  links: [
    { label: 'YouTube', handle: '@matthelenmoto', href: 'https://www.youtube.com/@matthelenmoto' },
    {
      label: 'Instagram',
      handle: '@matthelenmoto',
      href: 'https://www.instagram.com/matthelenmoto/',
    },
  ],
};
