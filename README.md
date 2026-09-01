# coffee-snob-250

A 250 mile motorcycle route for coffee powered adventure — the episode page for
**The Coffee Snob 250** (Matt&Helen, Ep 04), built as a single page app.

Edinburgh → Isle of Bute → Edinburgh. Two ferries, three coffee stops, ten hours
door to door.

## Running it

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
```

Node 22 or newer.

## What is here

The page is a Claude Design export (`The_Coffee_Snob_250.zip`) rebuilt as a
React + TypeScript app on Vite. The design was a static artboard; the app keeps
its layout and copy exactly, and adds the behaviour a real page needs.

```
index.html                 document head — title, description, Open Graph
src/
  main.tsx                 mounts the app
  App.tsx                  section order
  content/episode.ts       every word and number on the page, typed
  components/              one module per section, plus Photo and the map
  design-system/           the MattHelenMoto design system
    tokens/                colours, type, space, effects, motion (from the export)
    Button|Badge|Card.tsx  the three components the page uses, ported to React
  assets/                  fonts, photos, the GPX file
  hooks/                   scroll spy and scroll position
scripts/optimise-images.mjs regenerates the responsive photo set
```

### Content lives in one file

`src/content/episode.ts` holds the copy, the stats, the seven route legs, the
three coffee stops and the practical notes. The sections render from it, so
changing the episode is a content edit, not a markup edit.

Two things there are worth knowing about:

- **`episode.youtubeId` is `null`.** The design left the player as a slot
  ("send the YouTube link and the embed drops in here"). Set the id and the
  watch section swaps its placeholder for a click-to-play
  `youtube-nocookie.com` embed — nothing loads from YouTube until someone
  presses play. Until then it shows the still with "The film goes live here".
- **The map coordinates.** Each leg carries its own `path` and `node`, in the
  SVG's coordinate space, taken from the export. They are a stylised
  projection, not a real projection of the GPX.

### What the app does that the artboard could not

- **Sticky header** that is transparent over the hero and solid once past it,
  with in-page nav and a scroll spy marking the section you are reading.
- **Linked route map.** Hovering a leg in the list lights its line and node on
  the map and dims the rest; hovering the map does the same in reverse. The
  list is the accessible control — the SVG is `role="img"` with a full
  description, so the map adds no second set of tab stops.
- **Click-to-play video**, as above.
- **Responsive photos.** `<picture>` with WebP and a JPEG fallback at three
  widths, chosen per viewport. The hero loads eagerly at high priority;
  everything below the fold is lazy.
- **Skip link, visible focus rings, and `prefers-reduced-motion` support.**
- Four stats go two-up below 560px, where four across wrapped the labels onto
  three lines.

## The design system

`src/design-system/` is the MattHelenMoto system as exported: warm charcoal and
warm paper ramps, yellow `#FBBF3C` and red `#DE4A3E`, Archivo Black for display
and Monocraft for everything else. Square corners everywhere, 3px borders, hard
offset shadows with no blur, and stepped motion (`steps(2,end)`, 120–200ms).

The token CSS files are copied from the export unchanged apart from the font
URLs, which point at `src/assets/fonts` so the bundler can hash them. `Button`,
`Badge` and `Card` are ports of the export's `_ds_bundle.js` sources, with one
change: `Button` renders an `<a>` when given an `href`, because the artboard
wrapped buttons in links, which is not valid markup.

## Images

`public/` holds only the Open Graph image. Everything else is imported, so Vite
hashes it and the site can be served from any path (`base` is `'./'`).

The responsive set in `src/assets/images` was generated from the original camera
files. Those are not in the repo; to regenerate, put them somewhere and run:

```bash
npm i --no-save sharp
SOURCE_DIR=/path/to/originals node scripts/optimise-images.mjs
```

## Deploying

`npm run build` writes a static `dist/` — any static host will do. Two things to
set for the domain it lands on:

- `og:image` in `index.html` is a relative path. Most crawlers resolve it, but
  an absolute `https://…` URL is safer once the domain is known.
- Ferry fares and frequencies on the page are approximate and dated; they are
  in `content/episode.ts` when they need refreshing.
