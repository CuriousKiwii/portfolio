// Free tool: Compressor.js shrinks a photo in the browser; Instagram.css previews filters.
import Compressor from "compressorjs";

const fmt = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${Math.round(b / 1024)} KB`);

export default function tool(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>("input[type=file]")!;
  const quality = root.querySelector<HTMLInputElement>("[name=quality]")!;
  const qOut = root.querySelector<HTMLElement>("[data-quality]")!;
  const result = root.querySelector<HTMLElement>("[data-result]")!;
  const preview = root.querySelector<HTMLImageElement>("[data-preview]")!;
  const frame = root.querySelector<HTMLElement>("[data-frame]")!;
  const before = root.querySelector<HTMLElement>("[data-before]")!;
  const after = root.querySelector<HTMLElement>("[data-after]")!;
  const saved = root.querySelector<HTMLElement>("[data-saved]")!;
  const dl = root.querySelector<HTMLAnchorElement>("[data-download]")!;
  const filter = root.querySelector<HTMLSelectElement>("[name=filter]")!;
  const loader = root.querySelector<HTMLElement>("[data-loading]")!;
  let file: File | null = null;
  let url = "";

  const run = () => {
    if (!file) return;
    loader.classList.remove("hidden");
    new Compressor(file, {
      quality: Number(quality.value),
      maxWidth: 1920,
      maxHeight: 1920,
      convertSize: 500000,
      success(out) {
        URL.revokeObjectURL(url);
        url = URL.createObjectURL(out);
        preview.src = url;
        dl.href = url;
        dl.download = file!.name.replace(/\.[^.]+$/, "") + "-web" + (out.type === "image/png" ? ".png" : ".jpg");
        before.textContent = fmt(file!.size);
        after.textContent = fmt(out.size);
        saved.textContent = `${Math.max(0, Math.round((1 - out.size / file!.size) * 100))}% smaller`;
        result.classList.remove("hidden");
        loader.classList.add("hidden");
      },
      error(err) {
        loader.classList.add("hidden");
        saved.textContent = err.message;
      },
    });
  };
  input.addEventListener("change", () => {
    file = input.files?.[0] || null;
    run();
  });
  quality.addEventListener("input", () => (qOut.textContent = `${Math.round(Number(quality.value) * 100)}%`));
  quality.addEventListener("change", run);
  filter.addEventListener("change", () => (frame.className = `relative overflow-hidden rounded-box ${filter.value}`));
}
