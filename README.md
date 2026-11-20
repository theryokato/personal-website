# Personal Website

Personal space on the Internet.

Uses [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), and [MDX](https://mdxjs.com/).

## Writing project pages

Start with the [English/Japanese project-page templates](docs/templates/README.md).
They include research-based writing prompts, media guidance, and publication checks.

## Project media

Store project media in `public/assets/<PROJECT>/`.

`ProjectImage` requires full-image `width` and `height` props for PhotoSwipe zooming.

After adding or changing media, run `npm run previews`. It writes responsive WebP previews,
WebP zoom renders for SVG posters (which embed large rasters), and per-slide images that
`ProjectSlides` pages through (its PDF stays linked for download). Slides need poppler's `pdftoppm`.

`ProjectModel` renders GLB or glTF files. Export native CAD files to GLB first.
It accepts optional annotations with `name`, `label`, `position`, and `normal`.
Use Model Viewer’s annotation editor to obtain hotspot coordinates.
Use compressed meshes and a poster image for large models.

```mdx
import ProjectModel from '../../../components/ProjectModel.astro';

<ProjectModel
  src="/assets/DRON/drone.glb"
  poster="/assets/DRON/drone-poster.webp"
  alt="Interactive 3D model of DRON"
  caption="DRON V4 airframe assembly"
  annotations={[{
    name: 'camera-mount',
    label: 'Stereo camera mount',
    position: '0 0.12 0.31',
    normal: '0 1 0',
  }]}
/>
```

`src`, `alt`, and `caption` are required. The model slowly auto-rotates (except with reduced
motion), offers AR on supported phones, and links the GLB as a download.

## Localized 404 checks

Build and start the production preview:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4335
```

In another terminal, run `node --test tests/localized-404.test.mjs`.
Set `TEST_BASE_URL` to check a deployed preview instead. These checks verify
localized HTTP 404 responses, unchanged missing URLs, existing pages, and redirects.
