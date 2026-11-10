// Generates responsive variants, social-share images and the size manifest
// for everything under public/images.
//
//   npm run images
//
// Run it after adding or replacing a screenshot. It is safe to run repeatedly:
// existing variants are skipped unless the source file is newer.

import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "images");
const manifestPath = path.join(root, "src", "content", "image-manifest.json");
const coversPath = path.join(root, "src", "content", "covers.json");

const WIDTHS = [640, 1280];
const VARIANT = /\.w\d+\.webp$/;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

async function isFresh(source, target) {
  try {
    const [a, b] = await Promise.all([stat(source), stat(target)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

const manifest = {};
let created = 0;

const sources = (await walk(imagesDir))
  .filter((file) => file.endsWith(".webp") && !VARIANT.test(file))
  .sort();

for (const source of sources) {
  const { width, height } = await sharp(source).metadata();
  const key = "/" + path.relative(publicDir, source).split(path.sep).join("/");
  const variants = [];

  for (const w of WIDTHS) {
    if (width <= w * 1.15) continue; // not worth a variant
    const target = source.replace(/\.webp$/, `.w${w}.webp`);
    variants.push(w);
    if (await isFresh(source, target)) continue;
    await sharp(source).resize({ width: w }).webp({ quality: 80, effort: 6 }).toFile(target);
    created++;
  }

  manifest[key] = { w: width, h: height, v: variants };
}

// Social-share images: 1200x630 JPEG cut from the top of each project's cover.
const covers = JSON.parse(await readFile(coversPath, "utf8"));
const ogDir = path.join(publicDir, "og", "work");
await mkdir(ogDir, { recursive: true });

for (const [slug, file] of Object.entries(covers)) {
  const source = path.join(imagesDir, "work", slug, `${file}.webp`);
  const target = path.join(ogDir, `${slug}.jpg`);
  if (await isFresh(source, target)) continue;
  await sharp(source)
    .resize({ width: 1200, height: 630, fit: "cover", position: "top" })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(target);
  created++;
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`${sources.length} source images, ${created} files written, manifest updated.`);
