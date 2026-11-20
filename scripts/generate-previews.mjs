import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { globSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
mkdirSync('public/assets/previews', { recursive: true });
for (const file of globSync('public/assets/**/*.{png,svg}').filter(p => !p.includes('/previews/'))) {
  for (const width of [480, 960, 1440]) {
    await sharp(file).resize({ width }).webp({ quality: 80 }).toFile(`public/assets/previews/${file.split('/').pop()}.${width}.webp`);
  }
  // SVG posters embed multi-megabyte rasters; zoom into a WebP render instead (see utils/previews.ts).
  if (file.endsWith('.svg')) {
    await sharp(file).resize({ width: 3072 }).webp({ quality: 82 }).toFile(`public/assets/previews/${file.split('/').pop()}.zoom.webp`);
  }
}
// Slide decks page through per-slide images, e.g. slides/STR_CDR/1.webp (requires poppler's pdftoppm).
for (const file of globSync('public/assets/**/*.pdf')) {
  const output = `public/assets/slides/${file.split('/').pop().replace(/\.pdf$/, '')}`;
  const temp = mkdtempSync(join(tmpdir(), 'slides-'));
  try {
    execFileSync('pdftoppm', ['-png', '-scale-to-x', '1600', '-scale-to-y', '-1', file, join(temp, 'slide')]);
    rmSync(output, { recursive: true, force: true });
    mkdirSync(output, { recursive: true });
    const pages = readdirSync(temp).sort();
    for (const [index, page] of pages.entries()) {
      await sharp(join(temp, page)).webp({ quality: 80 }).toFile(`${output}/${index + 1}.webp`);
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
