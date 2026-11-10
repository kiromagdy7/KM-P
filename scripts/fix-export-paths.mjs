// Runs after `next build`.
//
// Next.js names its prefetch files like `__next.work.$d$slug.__PAGE__.txt`.
// On Windows the export step leaves the path separators in place and writes
// `__next.work/$d$slug/__PAGE__.txt` instead, so the browser asks for a file
// that is not there and logs a 404. This puts those files where the browser
// looks for them. On Linux and macOS there is nothing to fix and it does nothing.

import { readdir, rename, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? filesUnder(full) : [full];
    }),
  );
  return nested.flat();
}

async function fix(dir) {
  let moved = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);

    if (entry.name.startsWith("__next.")) {
      for (const file of await filesUnder(full)) {
        const flatName = `${entry.name}.${path.relative(full, file).split(path.sep).join(".")}`;
        await rename(file, path.join(dir, flatName));
        moved++;
      }
      await rm(full, { recursive: true });
    } else if (entry.name !== "_next" && entry.name !== "images") {
      moved += await fix(full);
    }
  }
  return moved;
}

const moved = await fix(outDir);
if (moved > 0) console.log(`Moved ${moved} prefetch files to the names the browser requests.`);
