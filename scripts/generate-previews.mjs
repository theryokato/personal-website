import sharp from 'sharp';
import { globSync, mkdirSync } from 'node:fs';
mkdirSync('public/assets/previews', { recursive: true });
for (const file of globSync('public/assets/**/*.{png,svg}').filter(p => !p.includes('/previews/'))) {
  for (const width of [480, 960, 1440]) {
    await sharp(file).resize({ width }).webp({ quality: 80 }).toFile(`public/assets/previews/${file.split('/').pop()}.${width}.webp`);
  }
}
