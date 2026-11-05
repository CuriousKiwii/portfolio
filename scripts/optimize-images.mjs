// Image pipeline: sharp (resize + mozjpeg) -> Guetzli (thumbnails) -> Plaiceholder (blur previews).
// Run: npm run images   (writes public/images/* and src/data/images.json)
import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";
import { getPlaiceholder } from "plaiceholder";

const run = promisify(execFile);
const SRC = "assets-src";
const OUT = "public/images";
const guetzli = path.resolve("node_modules/.bin/guetzli");
const manifest = {};

for (const project of await fs.readdir(SRC)) {
  const dir = path.join(SRC, project);
  await fs.mkdir(path.join(OUT, project), { recursive: true });
  for (const file of (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
    const name = file.replace(/\.(jpe?g|png)$/i, "");
    const input = await fs.readFile(path.join(dir, file));
    const meta = await sharp(input).metadata();

    // Full size for lightboxes (mozjpeg).
    const full = path.join(OUT, project, `${name}.jpg`);
    const fullInfo = await sharp(input)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(full);

    // Card thumbnail, re-encoded with Guetzli for the smallest high-quality JPEG.
    const tmp = path.join(OUT, project, `${name}-thumb.tmp.png`);
    const thumb = path.join(OUT, project, `${name}-thumb.jpg`);
    await sharp(input).resize({ width: 800, withoutEnlargement: true }).png().toFile(tmp);
    await run(guetzli, ["--quality", "84", tmp, thumb]);
    await fs.unlink(tmp);

    const { base64 } = await getPlaiceholder(input, { size: 10 });
    manifest[`${project}/${name}`] = {
      src: `/images/${project}/${name}.jpg`,
      thumb: `/images/${project}/${name}-thumb.jpg`,
      width: fullInfo.width,
      height: fullInfo.height,
      blur: base64,
      originalBytes: input.length,
      fullBytes: fullInfo.size,
      thumbBytes: (await fs.stat(thumb)).size,
    };
    console.log(
      `${project}/${name}: ${meta.width}x${meta.height} ${(input.length / 1024) | 0}KB -> full ${(fullInfo.size / 1024) | 0}KB, thumb ${(manifest[`${project}/${name}`].thumbBytes / 1024) | 0}KB`,
    );
  }
}
await fs.writeFile("src/data/images.json", JSON.stringify(manifest, null, 2));
