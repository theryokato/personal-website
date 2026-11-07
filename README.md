# Personal Website

Personal space on the Internet.

Uses [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), and [MDX](https://mdxjs.com/).

## Project media

Store project media in `public/assets/<PROJECT>/`.

`ProjectImage` requires full-image `width` and `height` props for PhotoSwipe zooming.

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

`src`, `alt`, and `caption` are required. External model links open in a new tab.
