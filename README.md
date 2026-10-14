# Latifa Alamin — Neon Engineering Portfolio

Source-only review: **not published**. This is the Neon Tech × Futuristic Digital Systems redesign of the existing React / TypeScript / Vite application.

## Run locally

Use Node.js 22. Extract this ZIP and open the `latifa-portfolio` folder:

```sh
npm ci
npm run dev
```

To test production output:

```sh
npm run build
npm run preview
```

## New visual experience

- Full-viewport cinematic hero with an original Canvas sphere: perspective-projected wireframe, orbital signal trails, interconnected nodes, pointer-responsive rotation, keyboard-accessible domain selectors, pause/resume, reduced-motion support, and offscreen/background suspension.
- Floating technical navigation with active-section tracking and mobile menu.
- Isometric About environment and an accurate education/training/university-events timeline.
- Interactive capability modules with custom SVG icons and contextual explanations.
- Project selector with keyboard navigation, large uncropped screenshots, animated transitions, interactive service/energy architecture, and future-project modules.
- Redesigned case studies with cinematic project intros, problem/solution sections, architecture stages, expandable engineering notes, and reusable full-resolution galleries.
- Communication-themed contact composition with the supplied LinkedIn and GitHub links.
- English/LTR and Arabic/RTL throughout. No added runtime dependencies.

## Design tokens

See `src/styles/tokens.css`: backgrounds #03070D / #07111F, surfaces #0D1B2A / #102335, cyan #00F5FF, turquoise #00E5C7, orange #FF713D, violet #A855F7; typography #F1F8FF / #9BB3C7. Low-contrast muted color is restricted to decorative marks.

## Changed source

| File | Purpose |
| --- | --- |
| `src/main.tsx` | New navigation and active-section tracking; existing hash routing retained |
| `src/components/Hero.tsx` | New cinematic hero composition |
| `src/components/Hologram.tsx` | Responsive Canvas lifecycle, pointer and accessible controls |
| `src/components/digital/hologram.ts` | Original 3D sphere projection and animated orbital geometry |
| `src/components/ProjectDeck.tsx` | Interactive project selection and evidence stage |
| `src/components/Toolkit.tsx` | Interactive skill modules |
| `src/components/Diagram.tsx` | Reusable interactive architecture with custom system icons |
| `src/components/ImageGallery.tsx` | Preserved viewer; corrected interface caption to avoid implying live data |
| `src/sections/Home.tsx` | Rebuilt About, Projects, Skills, Contact compositions |
| `src/pages/CaseStudy.tsx` | New cinematic case-study experience for both projects |
| `src/styles/` | Replaced old styling and tokens with the neon system, responsive and RTL rules |
| `src/i18n/ar.ts` | New Arabic text coverage |
| `index.html` | Theme color |

Removed obsolete `DigitalSystems.tsx`, `digital/field.ts`, and `ProjectExhibition.tsx`. The previous wave/grid visual is no longer used.

## Preserved content and assets

`src/data/projects.ts`, all three files in `public/images/`, package inputs, Vite configuration, and `.github/workflows/pages.yml` remain byte-identical to the previous source. All project claims and pending documentation remain intact. EcoPort's Energy Dashboard is its primary visual; the entire original academic poster remains available in the gallery and original-size viewer. Proposed features and illustrative values are not represented as validated outcomes.

Image paths and order are controlled in `src/data/projects.ts`. See `SCREENSHOTS_GUIDE.md` for English instructions and `دليل-الصور.md` for Arabic instructions.

## GitHub Pages

The unchanged workflow deploys on push to `main` or manual dispatch. Vite retains `base: './'`, and hash routes work without server rewrites. **Review before pushing to `main`.** No repository push or deployment was performed for this delivery.

## Verification and limits

Passed: production TypeScript/Vite build; server rendering of Home and both case studies in both languages; Arabic rendered-text review; original asset and project-data byte comparison; workflow/configuration/package comparison; actual Canvas rendering at 920×760 and 390×480; distinct Canvas output for pointer movement and domain selection. Canvas output was visually inspected at both sizes.

Responsive breakpoints, reduced-motion handling, dialog lifecycle, and routing were reviewed in source. **Full-page browser visual review, browser-driven interaction tests, native-dialog focus testing, and physical mobile testing were unavailable in this environment and remain to be done.** This is a review source delivery, not a claim of completed browser QA.

A separate futuristic reference image was not available among the inspected materials; the supplied written neon specification guided this implementation. The available reference screenshot depicted the rejected older design.
