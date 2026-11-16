// Previews are generated from public assets; zoom links retain the originals.
export const preview = (src: string) => `/assets/previews/${src.split('/').pop()}.960.webp`;
export const previewSet = (src: string) => [480, 960, 1440].map(width => `/assets/previews/${src.split('/').pop()}.${width}.webp ${width}w`).join(', ');
