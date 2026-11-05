// anime.js staggers the headline in word by word; rough.js sketches a circle around the key word.
import { animate, stagger } from "animejs";
import rough from "roughjs";
import { reducedMotion } from "./lazy";

export default function heroText(h: HTMLElement) {
  const words = h.querySelectorAll<HTMLElement>("[data-word]");
  if (!reducedMotion()) {
    animate(words, {
      opacity: [0, 1],
      translateY: ["0.6em", "0em"],
      rotate: [4, 0],
      delay: stagger(70),
      duration: 700,
      ease: "outExpo",
    });
  } else words.forEach((w) => (w.style.opacity = "1"));

  const key = h.querySelector<HTMLElement>("[data-sketch]");
  if (!key) return;
  const draw = () => {
    key.querySelector("svg")?.remove();
    const { width, height } = key.getBoundingClientRect();
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const pad = 14;
    svg.setAttribute("width", String(width + pad * 2));
    svg.setAttribute("height", String(height + pad * 2));
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = `position:absolute;left:${-pad}px;top:${-pad}px;pointer-events:none;overflow:visible`;
    const rc = rough.svg(svg);
    const node = rc.ellipse(width / 2 + pad, height / 2 + pad, width + pad * 1.4, height + pad * 0.9, {
      stroke: "var(--color-primary)",
      strokeWidth: 2.6,
      roughness: 1.6,
      bowing: 1.4,
    });
    svg.appendChild(node);
    key.appendChild(svg);
    if (reducedMotion()) return;
    node.querySelectorAll("path").forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      animate(p, { strokeDashoffset: [len, 0], duration: 900, delay: 900 + i * 250, ease: "inOutQuad" });
    });
  };
  draw();
  let t: number | undefined;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = window.setTimeout(draw, 200);
  });
}
