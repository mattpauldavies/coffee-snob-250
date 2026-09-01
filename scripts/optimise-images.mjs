/**
 * Re-generates the responsive photo set in `public/images` from the original
 * camera files. The originals are not in the repo (they are large); point
 * SOURCE_DIR at wherever they live and run `node scripts/optimise-images.mjs`.
 *
 * Requires `sharp`, which is not a project dependency — install it ad hoc:
 *   npm i --no-save sharp
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = process.env.SOURCE_DIR ?? path.resolve('originals');
const OUT_DIR = path.resolve('public/images');

/** Each photo, and the widths the layout can ask for (1x and 2x). */
const PHOTOS = [
  { source: 'IMG_9054.jpg', name: 'kyles-of-bute', widths: [800, 1400, 1722] },
  { source: 'IMG_4953.jpeg', name: 'a-road', widths: [700, 1200, 1401] },
  { source: 'IMG_5054.jpeg', name: 'stop-three', widths: [600, 1200] },
];

await mkdir(OUT_DIR, { recursive: true });

for (const photo of PHOTOS) {
  for (const width of photo.widths) {
    const base = sharp(path.join(SOURCE_DIR, photo.source)).rotate().resize({ width, withoutEnlargement: true });
    await base.clone().webp({ quality: 74 }).toFile(path.join(OUT_DIR, `${photo.name}-${width}.webp`));
    await base.clone().jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(OUT_DIR, `${photo.name}-${width}.jpg`));
  }
  console.log(`${photo.name}: ${photo.widths.join(', ')}`);
}
