// lottie-web (light build) plays the shield + checkmark animation.
import lottie from "lottie-web/build/player/lottie_light";
import { reducedMotion } from "./lazy";

export default function playLottie(els: HTMLElement[]) {
  for (const el of els) {
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: !reducedMotion(),
      autoplay: true,
      path: el.dataset.lottie!,
    });
    if (reducedMotion()) anim.addEventListener("DOMLoaded", () => anim.goToAndStop(anim.totalFrames - 1, true));
  }
}
