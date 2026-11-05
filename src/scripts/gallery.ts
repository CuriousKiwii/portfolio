// PhotoSwipe for the Narcisse gallery, Spotlight for the church gallery.
import "photoswipe/style.css";
import PhotoSwipeLightbox from "photoswipe/lightbox";

export default async function galleries(els: HTMLElement[]) {
  for (const el of els) {
    if (el.dataset.gallery === "photoswipe") {
      const lb = new PhotoSwipeLightbox({
        gallery: el,
        children: "a[data-pswp-width]",
        pswpModule: () => import("photoswipe"),
        bgOpacity: 0.92,
      });
      lb.init();
    } else {
      await Promise.all([import("spotlight.js"), import("spotlight.js/dist/css/spotlight.min.css")]);
      const Spotlight = (window as any).Spotlight;
      const links = [...el.querySelectorAll<HTMLAnchorElement>("a[data-spotlight]")];
      const items = links.map((a) => ({
        src: a.href,
        title: a.dataset.title || "",
        description: a.dataset.description || "",
      }));
      links.forEach((a, i) =>
        a.addEventListener("click", (e) => {
          e.preventDefault();
          Spotlight.show(items, { index: i + 1, theme: "dark", autohide: "all", download: false });
        }),
      );
    }
  }
}
