// Chartist: what a phone actually downloads on the Narcisse homepage (measured with Playwright).
import { BarChart } from "chartist";
import "chartist/dist/index.css";
import metrics from "../data/narcisse-metrics.json";

export default function chartist(els: HTMLElement[]) {
  const load = metrics.mobileLoad as Record<string, number>;
  const entries = Object.entries(load).sort((a, b) => b[1] - a[1]);
  for (const el of els) {
    new BarChart(
      el,
      { labels: entries.map(([k]) => k), series: [entries.map(([, v]) => Math.round(v / 1024))] },
      {
        horizontalBars: true,
        reverseData: true,
        axisY: { offset: 80 },
        axisX: { labelInterpolationFnc: (v: number) => `${v} KB`, onlyInteger: true, scaleMinSpace: 80 },
        chartPadding: { right: 48 },
      },
    );
  }
}
