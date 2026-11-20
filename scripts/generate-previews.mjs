import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { globSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
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
// Slide decks show their first page while PDF.js loads (requires poppler's pdftoppm).
const temp = mkdtempSync(join(tmpdir(), 'slide-covers-'));
try {
  for (const file of globSync('public/assets/**/*.pdf')) {
    const page = join(temp, 'cover');
    execFileSync('pdftoppm', ['-f', '1', '-l', '1', '-singlefile', '-png', '-scale-to-x', '1280', '-scale-to-y', '-1', file, page]);
    await sharp(`${page}.png`).webp({ quality: 82 }).toFile(file.replace(/\.pdf$/, '-preview.webp'));
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
