#!/usr/bin/env node
/**
 * Idempotent image optimizer for the `public/` folder.
 *
 * - Resizes oversized JPG/PNG source images and recompresses them in place.
 * - Logos (any path containing `/logo/`) are capped smaller since they render tiny.
 * - Skips files that are already small enough (so re-running is safe / cheap).
 * - Never touches videos, SVGs, posters, or `*-original.*` backups.
 *
 * Usage:  pnpm exec node scripts/optimize-media.mjs [--dry]
 *
 * Why this exists: even though next/image optimizes on delivery, multi-MB source
 * files bloat the deploy artifact and the optimizer's first pass. Run this after
 * adding new property/blog photos. See plan: Core Web Vitals remediation.
 */
import { readdir, stat, rename, writeFile } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname;
const DRY = process.argv.includes('--dry');

// Caps
const MAX_DIM_PHOTO = 2400; // property / blog photos
const MAX_DIM_LOGO = 768; // logos render <=300px even on retina
const JPEG_QUALITY = 80;
// Skip files already comfortably small to keep the run idempotent.
const SKIP_UNDER_BYTES = 300 * 1024;

const exts = new Set(['.jpg', '.jpeg', '.png']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function shouldSkip(path) {
  const name = basename(path);
  if (!exts.has(extname(path).toLowerCase())) return true;
  if (name.includes('-original.')) return true; // our video/image backups
  if (name.startsWith('.')) return true;
  return false;
}

let totalBefore = 0;
let totalAfter = 0;
let changed = 0;

for await (const path of walk(PUBLIC_DIR)) {
  if (shouldSkip(path)) continue;

  const isLogo = path.includes('/logo/');
  const cap = isLogo ? MAX_DIM_LOGO : MAX_DIM_PHOTO;

  const before = (await stat(path)).size;
  const meta = await sharp(path).metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

  // Idempotent guard: small AND within dimension cap -> leave it alone.
  if (before < SKIP_UNDER_BYTES && longest <= cap) continue;

  const isPng = extname(path).toLowerCase() === '.png';
  let pipeline = sharp(path).rotate(); // honour EXIF orientation
  if (longest > cap) {
    pipeline = pipeline.resize({ width: meta.width >= meta.height ? cap : null, height: meta.height > meta.width ? cap : null, withoutEnlargement: true });
  }
  if (isPng) {
    // Logos are brand assets: keep them lossless (downscale only), no palette
    // quantization which can band gradients. Other PNGs may be quantized.
    pipeline = isLogo
      ? pipeline.png({ compressionLevel: 9 })
      : pipeline.png({ compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();

  // Only adopt the result if it shaves off a meaningful chunk. This keeps the
  // script idempotent: a second run on an already-optimized file yields roughly
  // the same size (>90% of current), so it's left untouched — no generational loss.
  if (buf.length >= before * 0.9) {
    continue;
  }

  totalBefore += before;
  totalAfter += buf.length;
  changed++;
  const rel = path.replace(PUBLIC_DIR, '');
  console.log(
    `${rel}  ${(before / 1024 / 1024).toFixed(2)}MB -> ${(buf.length / 1024 / 1024).toFixed(2)}MB`,
  );

  if (!DRY) {
    // `buf` is already encoded; write the bytes directly (handles .JPEG/.jpeg/.png
    // alike without sharp re-inferring format from a `.tmp` extension).
    const tmp = `${path}.tmp`;
    await writeFile(tmp, buf);
    await rename(tmp, path);
  }
}

console.log(
  `\n${DRY ? '[dry] ' : ''}${changed} files optimized. ` +
    `${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB ` +
    `(saved ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)}MB).`,
);
