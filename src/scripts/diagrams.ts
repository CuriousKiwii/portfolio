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
            primaryBorderColor: "#001f3f",
            primaryTextColor: "#0a1a2a",
            lineColor: "#1a8fd8",
            tertiaryColor: "#edf3f9",
          }
        : {
            primaryColor: "#0a1d2c",
            primaryBorderColor: "#43b7ff",
            primaryTextColor: "#fafbfc",
            lineColor: "#9fd8ff",
            tertiaryColor: "#071a2a",
            edgeLabelBackground: "#030f18",
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
