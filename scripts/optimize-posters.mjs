// One-off: downscale + recompress the full-screen video posters.
// These are single `poster="..."` attributes (no srcset possible), so we shrink
// the file itself. They sit behind a dark overlay, so quality 70 is plenty.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const posters = ['public/hero-poster.webp', 'public/events-poster.webp'];

for (const path of posters) {
  const src = await readFile(path); // read first so the resize source isn't the file we overwrite
  const out = await sharp(src)
    .resize(960, 540, { fit: 'cover' })
    .webp({ quality: 64, effort: 6, smartSubsample: true })
    .toBuffer();
  await writeFile(path, out);
  console.log(`${path}: ${src.length} -> ${out.length} bytes`);
}
