// Optimize oversized source images in /public for web delivery.
// Resizes down to a sensible max edge and re-encodes; only overwrites when the
// result is smaller. next/image still derives webp/avif variants at serve time —
// this just stops shipping 8K, multi-MB phone originals as the source.
//
// Usage: node scripts/optimize-images.mjs           (apply)
//        node scripts/optimize-images.mjs --dry-run  (report only)
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';

const DRY = process.argv.includes('--dry-run');

// folder -> max edge (px). Galleries can be viewed full-screen, so larger.
const TARGETS = [
  { dir: 'public/studio', maxEdge: 2560 },
  { dir: 'public/penthouse', maxEdge: 2560 },
  { dir: 'public/blog', maxEdge: 1920 },
];

const JPEG = new Set(['.jpg', '.jpeg']);
const PNG = new Set(['.png']);

const fmtMB = (b) => (b / 1024 / 1024).toFixed(2) + 'MB';

let totalBefore = 0;
let totalAfter = 0;
let changed = 0;

for (const { dir, maxEdge } of TARGETS) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    continue;
  }
  for (const name of entries) {
    const ext = path.extname(name).toLowerCase();
    if (!JPEG.has(ext) && !PNG.has(ext)) continue;
    const file = path.join(dir, name);
    const before = (await stat(file)).size;
    totalBefore += before;

    const meta = await sharp(file).metadata();
    // .rotate() bakes EXIF orientation so resizing never flips an image.
    let pipeline = sharp(file).rotate();
    if (Math.max(meta.width ?? 0, meta.height ?? 0) > maxEdge) {
      pipeline = pipeline.resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true });
    }
    pipeline = JPEG.has(ext)
      ? pipeline.jpeg({ quality: 82, mozjpeg: true })
      : pipeline.png({ compressionLevel: 9 }); // lossless: savings come from the resize, no color quantization / banding risk

    const buf = await pipeline.toBuffer();
    const after = buf.length;

    if (after < before) {
      totalAfter += after;
      changed++;
      const pct = (100 * (1 - after / before)).toFixed(0);
      console.log(`${DRY ? '[dry] ' : ''}${file}  ${fmtMB(before)} -> ${fmtMB(after)}  (-${pct}%)`);
      if (!DRY) {
        const tmp = file + '.opt-tmp';
        await sharp(buf).toFile(tmp);
        await unlink(file);
        await rename(tmp, file);
      }
    } else {
      totalAfter += before; // kept original
      console.log(`skip (already small): ${file}  ${fmtMB(before)}`);
    }
  }
}

console.log('\n----------------------------------------');
console.log(`Files re-encoded: ${changed}`);
console.log(`Total: ${fmtMB(totalBefore)} -> ${fmtMB(totalAfter)}  (saved ${fmtMB(totalBefore - totalAfter)})`);
if (DRY) console.log('(dry run — no files written)');
