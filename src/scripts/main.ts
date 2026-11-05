import { animate, inView, stagger } from "motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import LazyLoad from "vanilla-lazyload";
import feather from "feather-icons";
import { createPopper, type Instance } from "@popperjs/core";
import { whenVisible, reducedMotion } from "./lazy";

// ---- Preloader (SpinKit) --------------------------------------------------
const hidePreloader = () => {
  const p = document.getElementById("preloader");
  if (!p) return;
  p.style.opacity = "0";
  setTimeout(() => p.remove(), 500);
};
if (document.readyState === "complete") hidePreloader();
else window.addEventListener("load", hidePreloader);
setTimeout(hidePreloader, 2500);

// ---- Feather icons ------------------------------------------------------
feather.replace({ "stroke-width": 2, width: 18, height: 18 });

// ---- Theme toggle (daisyUI themes) --------------------------------------
const toggle = document.getElementById("theme-toggle") as HTMLInputElement | null;
if (toggle) {
  toggle.checked = document.documentElement.dataset.theme === "goodground-light";
  toggle.addEventListener("change", () => {
    const theme = toggle.checked ? "goodground-light" : "goodground";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("gg-theme", theme);
    } catch {}
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  });
}

// ---- nprogress on page-to-page navigation --------------------------------
NProgress.configure({ showSpinner: false, trickleSpeed: 120 });
document.addEventListener("click", (e) => {
  const a = (e.target as HTMLElement).closest("a");
  if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
  const url = new URL(a.href, location.href);
  if (url.origin === location.origin && url.pathname !== location.pathname) NProgress.start();
});
window.addEventListener("pageshow", () => NProgress.done());

// ---- vanilla-lazyload (blur-up images) -----------------------------------
new LazyLoad({ elements_selector: "img.lazy", class_loaded: "loaded" });

// ---- Motion: reveal on scroll ---------------------------------------------
if (!reducedMotion()) {
  inView(
    "[data-reveal]",
    (el) => {
      const kids = el.querySelectorAll(":scope > [data-stagger]");
      animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
      if (kids.length)
        animate(kids, { opacity: [0, 1], y: [18, 0] }, { delay: stagger(0.08, { startDelay: 0.15 }), duration: 0.5 });
    },
    { margin: "0px 0px -8% 0px" },
  );
}

// ---- Popper tooltips ---------------------------------------------------------
const tip = document.getElementById("tooltip")!;
const tipText = document.getElementById("tooltip-text")!;
let popper: Instance | null = null;
const showTip = (el: HTMLElement) => {
  tipText.textContent = el.dataset.tip || "";
  popper?.destroy();
  popper = createPopper(el, tip, { placement: "top", modifiers: [{ name: "offset", options: { offset: [0, 10] } }] });
  tip.setAttribute("data-show", "");
};
const hideTip = () => {
  tip.removeAttribute("data-show");
  popper?.destroy();
  popper = null;
};
document.querySelectorAll<HTMLElement>("[data-tip]").forEach((el) => {
  el.addEventListener("mouseenter", () => showTip(el));
  el.addEventListener("focus", () => showTip(el));
  el.addEventListener("mouseleave", hideTip);
  el.addEventListener("blur", hideTip);
});

// ---- toastr (needs jQuery, loaded on first use) ------------------------------
export async function toast(message: string, type: "success" | "info" = "success") {
  const { default: $ } = await import("jquery");
  (window as any).jQuery = (window as any).$ = $;
  const [{ default: toastr }] = await Promise.all([import("toastr"), import("toastr/build/toastr.min.css")]);
  toastr.options = { positionClass: "toast-bottom-right", timeOut: 2500, progressBar: true };
  toastr[type](message);
}

// ---- clipboard.js -----------------------------------------------------------
if (document.querySelector("[data-clipboard-text]")) {
  import("clipboard").then(({ default: ClipboardJS }) => {
    const cb = new ClipboardJS("[data-clipboard-text]");
    cb.on("success", (e) => {
      toast((e.trigger as HTMLElement).dataset.copied || "Copied!");
      e.clearSelection();
    });
  });
}

// ---- mo.js burst on call-to-action clicks ---------------------------------------
document.querySelectorAll<HTMLElement>("[data-burst]").forEach((el) =>
  el.addEventListener("click", async (e) => {
    if (reducedMotion()) return;
    const { default: mojs } = await import("@mojs/core");
    const burst = new mojs.Burst({
      left: 0,
      top: 0,
      radius: { 8: 70 },
      count: 12,
      children: {
        shape: ["circle", "polygon"],
        fill: ["#f0a23b", "#3bb6e8", "#eef2f8"],
        radius: { 7: 0 },
        duration: 800,
      },
    });
    burst.tune({ x: (e as MouseEvent).pageX, y: (e as MouseEvent).pageY }).replay();
  }),
);

// ---- SweetAlert2: "Start a project" ----------------------------------------------
document.querySelectorAll<HTMLElement>("[data-start-project]").forEach((el) =>
  el.addEventListener("click", async () => {
    const { default: Swal } = await import("sweetalert2");
    const res = await Swal.fire({
      title: "Let's build something",
      html: "Projects are booked through Fiverr, so you get a clear scope, milestones, and buyer protection.<br><br>Want to message me there now?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Open Fiverr",
      cancelButtonText: "Not yet",
      background: getComputedStyle(document.body).backgroundColor,
      color: getComputedStyle(document.body).color,
      confirmButtonColor: "#f0a23b",
    });
    if (res.isConfirmed) window.open(el.dataset.startProject, "_blank", "noopener");
  }),
);

// ---- intro.js guided tour -------------------------------------------------------
const tourBtn = document.getElementById("tour-btn");
tourBtn?.addEventListener("click", async () => {
  const [{ default: introJs }, { tourSteps }] = await Promise.all([
    import("intro.js"),
    import("../data/site"),
    import("intro.js/minified/introjs.min.css"),
  ]);
  const steps = tourSteps
    .filter((s) => document.querySelector(s.element))
    .map((s) => ({ ...s, element: document.querySelector(s.element) as HTMLElement }));
  if (!steps.length) return (location.href = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/#hero`);
  introJs.tour().setOptions({ steps, showProgress: true, exitOnOverlayClick: true }).start();
});
if (tourBtn && !reducedMotion())
  setTimeout(() => tourBtn.classList.add("animate__animated", "animate__headShake"), 4000);

// ---- Lazy feature modules (loaded only when their section is near the screen) ------
whenVisible("#hero-canvas", ([c]) => import("./hero3d").then((m) => m.default(c as HTMLCanvasElement)), "0px");
whenVisible("[data-hero-title]", ([h]) => import("./heroText").then((m) => m.default(h)), "0px");
whenVisible("#status-card", ([c]) => import("./theatre").then((m) => m.default(c)), "0px");
whenVisible(
  "[data-rellax]",
  () =>
    import("rellax").then(({ default: Rellax }) => !reducedMotion() && new Rellax("[data-rellax]", { center: true })),
  "0px",
);
whenVisible("[data-lottie]", (els) => import("./lottie").then((m) => m.default(els)));
whenVisible("#stats", ([s]) => import("./stats").then((m) => m.default(s)), "-10% 0px");
whenVisible("[data-gallery]", (els) => import("./gallery").then((m) => m.default(els)));
whenVisible("#projects-list", ([l]) => import("./projects").then((m) => m.default(l)));
whenVisible(".mermaid", (els) => import("./diagrams").then((m) => m.default(els)));
whenVisible("[data-echart]", (els) => import("./echarts").then((m) => m.default(els)));
whenVisible("[data-chartist]", (els) => import("./chartist").then((m) => m.default(els)));
whenVisible("#map", ([m]) => import("./map").then((mod) => mod.default(m)));
whenVisible("#tool", ([t]) => import("./tool").then((m) => m.default(t)));
whenVisible("#qr", ([q]) => import("./qr").then((m) => m.default(q as HTMLCanvasElement)));
whenVisible("bulma-toolbox, primer-repos", () => import("./widgets"));
