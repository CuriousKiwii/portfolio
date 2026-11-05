// ECharts (tree-shaken): image weight before and after optimization, from real build data.
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import metrics from "../data/narcisse-metrics.json";
import { isLight } from "./lazy";

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, SVGRenderer]);
const kb = (b: number) => Math.round(b / 1024);

export default function charts(els: HTMLElement[]) {
  for (const el of els) {
    const chart = echarts.init(el, null, { renderer: "svg" });
    const draw = () => {
      const fg = isLight() ? "#0b1220" : "#eef2f8";
      const muted = isLight() ? "#5b6478" : "#a3aec4";
      const rows = metrics.images;
      chart.setOption(
        {
          backgroundColor: "transparent",
          textStyle: { fontFamily: "Inter Variable, sans-serif", color: fg },
          tooltip: { trigger: "axis", valueFormatter: (v: number) => `${v.toLocaleString()} KB` },
          legend: { top: 0, textStyle: { color: muted } },
          grid: { left: 8, right: 16, top: 40, bottom: 8, containLabel: true },
          xAxis: {
            type: "value",
            axisLabel: { color: muted, formatter: "{value} KB" },
            splitLine: { lineStyle: { color: isLight() ? "#e2e7ef" : "#1a2540" } },
          },
          yAxis: { type: "category", data: rows.map((r) => r.name), axisLabel: { color: muted }, inverse: true },
          series: [
            {
              name: "Original photo",
              type: "bar",
              data: rows.map((r) => kb(r.original)),
              itemStyle: { color: muted, borderRadius: 4 },
            },
            {
              name: "Desktop version",
              type: "bar",
              data: rows.map((r) => kb(r.desktop)),
              itemStyle: { color: "#f0a23b", borderRadius: 4 },
            },
            {
              name: "Phone version",
              type: "bar",
              data: rows.map((r) => kb(r.mobile)),
              itemStyle: { color: "#3bb6e8", borderRadius: 4 },
            },
          ],
        },
        true,
      );
    };
    draw();
    window.addEventListener("themechange", draw);
    new ResizeObserver(() => chart.resize()).observe(el);
  }
}
