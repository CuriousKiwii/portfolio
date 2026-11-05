/** Run `load` once, the first time any element matching `selector` comes near the viewport. */
export function whenVisible(selector: string, load: (els: HTMLElement[]) => unknown, rootMargin = "300px") {
  const els = [...document.querySelectorAll<HTMLElement>(selector)];
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) return void load(els);
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        load(els);
      }
    },
    { rootMargin },
  );
  els.forEach((el) => io.observe(el));
}

export const reducedMotion = () => document.documentElement.classList.contains("reduced");
export const isLight = () => document.documentElement.dataset.theme === "goodground-light";
export const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
