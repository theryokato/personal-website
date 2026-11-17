# Editorial Refinement Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans. The user approved this direction in conversation and authorized updating PR #5.

**Goal:** Give the existing minimalist portfolio clearer editorial hierarchy and meaningful persistent accents.
**Architecture:** Reuse the shared stylesheet and bilingual content/components. Keep the 42rem column, Warm Graphite palette, card content/order, media behavior and existing motion. Add no dependencies.
**Tech stack:** Astro, MDX, Tailwind CSS.
**Spec:** Approved conversation plan: green H2 rules; 24px homepage name,30px project titles,24px H2; compare Source Sans3; group existing bio into background/involvement/contact; copper ownership statements; light backing for transparent BLNC diagram.

## Tasks

- [x] Capture before home/project/figure screenshots in EN/JA, light/dark,390/1280px.
- [x] Compare Source Sans3 with system font on actual home/BLNC pages. If selected, self-host one Latin variable WOFF2 with OFL, retain platform Japanese fallback and monospace; preload locally and use optional display to avoid late swaps.
- [x] In global.css, map section-rule to existing Forest Green. H2:1.5rem/1.35,500weight,8px lower padding,1px full-width rule; remove noninteractive heading underlines. H3 remains1.125rem. Set homepage names1.5rem and project/Post titles1.875rem. Preserve root1rem/body16px,width and motion.
- [x] Split existing EN/JA home HTML at natural sentence boundaries into three paragraphs (background/current involvement/contact), preserving every claim/link and existing hover roles; render with existing paragraph styles.
- [x] Style only existing ownership statements in DRON/BLNC EN/JA with semantic Copper emphasis, preserving text. Leave general bold text neutral.
- [x] Add optional `paper?:boolean` to ProjectImage(defaultfalse), using the existing light surface white as a fixed diagram canvas token. Enable only for BLNC PID figure EN/JA. Pass this presentation hint to zoom so original stays readable there too; preserve original asset/href and photo behavior.
- [x] Build/check and run existing12route tests. Compare after screenshots and ensure no overflow across320/390/600/601/768/1280, both languages/themes; verify font success/failure, Japanese fallback, focus/reduced motion, name/language interactions, diagrams/zoom and media controls.
- [x] Fresh read-only review, commit conventionally, push existing branch and update PR5 description/preview.

## Review focus

- Font failure/slow delivery must leave all text visible and usable; no remote font CSS or runtime requests.
- Grouped bio must preserve inline link order and complete language reveal; no prose wording drift.
- Font metrics must not cause long social handles to shift name-row height on320px or enlarged text.
- Paper canvas must apply only to explicitly marked diagrams, including full-resolution zoom, without altering originals/photos.
- Japanese headings/line breaking, existing mono labels and the600/601px grid breakpoint must remain coherent.

## Review adjustment

A reproduced320px/20px-browser-font regression required fitting long social handles to the name width. Keep name size24px normally, fixed1.95rem lineheight, and measure/shrink only overflowing text; recheck on resize/font readiness. Verify loaded/blocked fonts, EN/JA, all handles and stable row height. Existing animation timings remain unchanged.
