// Mermaid renders the process and architecture diagrams from plain text.
import mermaid from "mermaid";
import { isLight } from "./lazy";

export default async function diagrams(nodes: HTMLElement[]) {
  nodes.forEach((n) => (n.dataset.src ??= n.textContent || ""));
  const render = async () => {
    const light = isLight();
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      fontFamily: "Inter Variable, sans-serif",
      themeVariables: light
        ? {
            primaryColor: "#ffffff",
            primaryBorderColor: "#c97a12",
            primaryTextColor: "#0b1220",
            lineColor: "#1c8bbe",
            tertiaryColor: "#eef1f6",
          }
        : {
            primaryColor: "#141e33",
            primaryBorderColor: "#f0a23b",
            primaryTextColor: "#eef2f8",
            lineColor: "#3bb6e8",
            tertiaryColor: "#111a2e",
            edgeLabelBackground: "#0b1220",
          },
      flowchart: { curve: "basis", padding: 14 },
    });
    nodes.forEach((n) => {
      n.removeAttribute("data-processed");
      n.textContent = n.dataset.src!;
    });
    await mermaid.run({ nodes });
  };
  await render();
  window.addEventListener("themechange", render);
}
