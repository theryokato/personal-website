// Previews are generated from public assets; zoom links retain the originals.
export const preview = (src: string) => `/assets/previews/${src.split('/').pop()}.960.webp`;
export const previewSet = (src: string) => [480, 960, 1440].map(width => `/assets/previews/${src.split('/').pop()}.${width}.webp ${width}w`).join(', ');

// SVG posters embed multi-megabyte rasters, so zoom into their generated WebP render.
const zoomWidth = 3072;
export const zoom = (src: string, width: number, height: number) =>
  src.endsWith('.svg')
    ? { src: `/assets/previews/${src.split('/').pop()}.zoom.webp`, width: zoomWidth, height: Math.round(height * zoomWidth / width) }
    : { src, width, height };

// `npm run previews` exports each PDF page to /assets/slides/<file name>/<page>.webp.
export const slides = (pdf: string) =>
  `/assets/slides/${pdf.split('/').pop()!.replace(/\.pdf$/, '')}/`;
