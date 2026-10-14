# Manage project screenshots

All screenshot configuration lives in `src/data/projects.ts`. Original image files live in `public/images/`. No layout edit is needed.

## 1. Add a screenshot

1. Copy the image into `public/images/`, for example `pingshield-incidents.png`. Use a unique filename without spaces.
2. Open `src/data/projects.ts` and find `projectImages`.
3. Add an object to the correct project's array:

```ts
export const projectImages: Record<string, ProjectImage[]> = {
  pingshield: [
    {
      src: 'images/pingshield-operations-center.png',
      alt: 'Esports-PingShield Operations Center monitoring dashboard',
      caption: 'Original project screenshot · Operations Center',
    },
    {
      src: 'images/pingshield-incidents.png',
      alt: 'PingShield incident history dashboard',
      caption: 'Original project screenshot · Incident history',
    },
  ],
  ecoport: [
    {
      src: 'images/ecoport-energy-dashboard.jpg',
      alt: 'EcoPort energy monitoring dashboard',
      caption: 'Original graduation project screenshot · Energy monitoring dashboard',
    },
  ],
};
```

4. In `src/i18n/ar.ts`, add Arabic translations for your new English alt text and caption:

```ts
'PingShield incident history dashboard': 'لوحة سجل الحوادث لمشروع PingShield',
'Original project screenshot · Incident history': 'الصورة الأصلية للمشروع · سجل الحوادث',
```

The new image appears in the case-study gallery. The enlargement viewer automatically supports previous/next buttons and Left/Right arrow keys when more than one image is present.

## 2. Replace a screenshot

1. Put the new original image in `public/images/`. A new filename avoids old browser caches.
2. Change the corresponding `src` value in `projectImages` to `images/your-new-file.png`.
3. Update `alt` and `caption` to describe the new image accurately, and update their Arabic translations.
4. Remove an old image file only when no other entry uses it.

Use `images/file.png`, not `/images/file.png` or `public/images/file.png`; relative URLs work on GitHub Pages repository paths.

## 3. Reorder screenshots or change the main visual

1. Move the entire image object up or down within its project's array.
2. The first object (index `0`) is the main homepage visual and the case-study introduction visual.
3. The gallery displays the same array in its configured order.

Existing project entries already connect automatically:

```ts
featuredImage: projectImages.pingshield[0],
gallery: projectImages.pingshield,
```

EcoPort uses the same pattern with `projectImages.ecoport`.

## 4. Remove a screenshot

Delete its object from the array. Keep at least one image for a main visual. You can leave `gallery: []` and omit `featuredImage` when no real visuals exist; an honest empty state and the existing conceptual home diagram are used instead.

## 5. Preview and publish

```sh
npm run dev
```

Check both languages, mobile layout, image enlargement, and the gallery order. Then:

```sh
npm run build
```

For GitHub Pages, commit and push to `main` after enabling GitHub Actions in Settings → Pages. The included workflow publishes the update. The hosted portfolio in this conversation is a separate deployment; ask for an update there when you want changes applied to that URL.

Screenshots retain their original contents and aspect ratios. Translations affect surrounding text and accessible descriptions, never the image pixels. Dashboard values shown in screenshots are captured interface content, not independently verified performance results. Projects 03 and 04 stay inactive until you deliberately update their content and `ready` flags.

## Supporting project documents

EcoPort's first image remains the Energy Dashboard. The official poster is the second item:

```ts
{
  src: 'images/ecoport-official-poster.jpeg',
  kind: 'document',
  alt: 'EcoPort official graduation project poster with university, contributor, and supervisor attribution',
  caption: 'Official project poster · King Khalid University · College of Computer Science',
  note: 'Supporting project document. ...',
}
```

Use `kind: 'document'` for posters or other image-based documents. Add an optional `note` to explain attribution or the status of illustrated content. Add Arabic translations for `alt`, `caption`, and `note` in `src/i18n/ar.ts`. Replace or extend document images through this same array. Keep the dashboard first if it should remain the main preview. The gallery shows the entire document and supports enlargement, original-size viewing, and opening the original file. No screenshot pixels are altered.
