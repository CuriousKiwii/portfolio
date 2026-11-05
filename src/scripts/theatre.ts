// Theatre.js plays a saved keyframe sequence that makes the hero status card float.
import { getProject, types } from "@theatre/core";
import state from "../data/theatre-state.json";
import { reducedMotion } from "./lazy";

export default function theatre(card: HTMLElement) {
  if (reducedMotion()) return;
  const project = getProject("Portfolio", { state });
  const sheet = project.sheet("Hero");
  const obj = sheet.object("Card", {
    y: types.number(0, { range: [-40, 40] }),
    rotate: types.number(0, { range: [-10, 10] }),
    glow: types.number(0.3, { range: [0, 1] }),
  });
  obj.onValuesChange((v) => {
    card.style.transform = `translateY(${v.y}px) rotate(${v.rotate}deg)`;
    card.style.setProperty("--glow", String(v.glow));
  });
  project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity, range: [0, 4] }));
}
