// QRious draws a QR code that links to this portfolio.
import QRious from "qrious";
import { profile } from "../data/site";
import { isLight } from "./lazy";

export default function qr(canvas: HTMLCanvasElement) {
  const draw = () =>
    new QRious({
      element: canvas,
      value: profile.portfolioUrl,
      size: 360,
      level: "M",
      background: "#ffffff",
      foreground: isLight() ? "#001f3f" : "#030f18",
      padding: 16,
    });
  draw();
  window.addEventListener("themechange", draw);
}
