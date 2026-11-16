# Warm Graphite

`src/styles/global.css` owns the palette. `--palette-*` retains the supplied light/dark reference colors; semantic `--color-*` roles drive the UI. Existing utility aliases remain for compatibility and reference these roles rather than separate palettes.

- Background, surface, surface-secondary, and border remain neutral.
- Primary, secondary, and muted text use their corresponding text roles.
- Link and focus use Steel Blue; link hover uses primary neutral text.
- Success uses Forest Green; highlight uses Copper; achievement uses Muted Gold.
- Technical and technical-secondary use Plum and Indigo; info uses Teal; danger uses Rust Red, including the existing 404 code.
- Navigation, cards, language controls, and standard buttons retain neutral surfaces. Status colors are available for meaningful states, not applied as arbitrary decoration.
- Media controls and captions use the supplied dark Graphite background and light neutral text in either page theme, ensuring legibility over variable image/PDF content. Media errors use the supplied dark-mode Rust Red against that dark background.
- Zoom-viewer focus uses a light neutral outline with a dark Graphite backing halo, so its existing focus indicator stays visible over either light or dark images without shifting layout.

## Contrast

Normal text roles meet WCAG AA (at least 4.5:1) against all three supplied surfaces. Minimal tonal adjustments to the reference colors avoid changing typography or layout. Unmodified reference swatches remain available as palette variables.

| Text role | Light text shade | Dark text shade |
| --- | --- | --- |
| Secondary | `#706B65` | `#A9A39B` |
| Muted | `#6F6B66` | `#9A948D` |
| Link / focus | `#37709F` | `#80B5E1` |
| Success | `#247864` | `#75C5A6` |
| Highlight | `#9C5C2D` | `#DDA06E` |
| Achievement | `#856719` | `#E0BC65` |
| Technical | `#8055A0` | `#BEA0DD` |
| Technical secondary | `#5966A5` | `#A0ACE7` |
| Info | `#20767C` | `#73C6C9` |
| Danger | `#B54843` | `#E68B83` |

Light mode remains the first-visit default. The historical `nord-light`/`nord-dark` storage IDs are retained solely to preserve saved choices; they now select Warm Graphite. No layout, typography, motion, or component-structure changes are part of this palette update. Project imagery, documents, and branding inside media remain unmodified.
