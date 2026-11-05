// countUp.js and Odometer animate the stat numbers when they scroll into view.
import { CountUp } from "countup.js";
import "odometer/themes/odometer-theme-minimal.css";
import { reducedMotion } from "./lazy";

export default async function stats(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-countup]").forEach((el) => {
    const end = Number(el.dataset.countup);
    if (reducedMotion()) return void (el.textContent = `${end}${el.dataset.suffix || ""}`);
    new CountUp(el, end, { duration: 2.2, suffix: el.dataset.suffix || "" }).start();
  });
  const odos = root.querySelectorAll<HTMLElement>("[data-odometer]");
  if (!odos.length) return;
  const { default: Odometer } = await import("odometer");
  odos.forEach((el) => {
    const od = new Odometer({ el, value: 0, theme: "minimal", format: "d", duration: 1800 });
    setTimeout(() => od.update(Number(el.dataset.odometer)), reducedMotion() ? 0 : 150);
  });
}
