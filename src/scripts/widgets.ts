// Two web components with shadow DOM, so Bulma and Primer CSS can't clash with Tailwind.
import bulmaRaw from "../styles/widgets/bulma-toolbox.scss?inline";

// Bulma defines its variables on :root, which does not exist inside a shadow root.
const bulmaCss = bulmaRaw.replaceAll(":root", ":host");
import primerBox from "@primer/css/dist/box.css?inline";
import primerLabels from "@primer/css/dist/labels.css?inline";
import { toolbox, repos, profile } from "../data/site";
import { isLight } from "./lazy";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** <bulma-toolbox>: Bulma tabs + tags listing the tools I use. */
class BulmaToolbox extends HTMLElement {
  #root = this.attachShadow({ mode: "open" });
  #active = 0;
  connectedCallback() {
    this.render();
    window.addEventListener("themechange", () => this.render());
  }
  render() {
    const g = toolbox[this.#active];
    this.#root.innerHTML = `
      <style>${bulmaCss}
        :host{display:block;--bulma-link-h:35deg;--bulma-link-s:86%;--bulma-link-l:56%;--bulma-family-primary:inherit}
        a{text-decoration:none}
        .box{background:transparent;box-shadow:none;padding:0;margin:0}
        .tabs a{font-family:inherit}
        .tags .tag{font-size:.85rem}
      </style>
      <div class="box" data-theme="${isLight() ? "light" : "dark"}">
        <div class="tabs is-toggle is-small is-centered is-fullwidth" role="tablist">
          <ul>${toolbox.map((t, i) => `<li class="${i === this.#active ? "is-active" : ""}"><a role="tab" aria-selected="${i === this.#active}" data-i="${i}" href="#">${esc(t.group)}</a></li>`).join("")}</ul>
        </div>
        <div class="tags are-medium is-justify-content-center" style="justify-content:center">
          ${g.items.map((it) => `<span class="tag is-warning is-light is-rounded">${esc(it)}</span>`).join("")}
        </div>
      </div>`;
    this.#root.querySelectorAll<HTMLAnchorElement>("[data-i]").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        this.#active = Number(a.dataset.i);
        this.render();
      }),
    );
  }
}

/** <primer-repos>: GitHub-style repo cards using GitHub's own Primer CSS. Stars load live. */
const octRepo = `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>`;
const octStar = `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>`;
// Token values from @primer/primitives (dark + light themes).
const primerVars = (light: boolean) =>
  light
    ? "--bgColor-default:#ffffff;--bgColor-muted:#f6f8fa;--borderColor-default:#d1d9e0;--fgColor-muted:#59636e;--fgColor-default:#1f2328;--fgColor-accent:#0969da;"
    : "--bgColor-default:#0d1117;--bgColor-muted:#151b23;--borderColor-default:#3d444d;--fgColor-muted:#9198a1;--fgColor-default:#f0f6fc;--fgColor-accent:#4493f8;";

class PrimerRepos extends HTMLElement {
  #root = this.attachShadow({ mode: "open" });
  #stars: Record<string, number> = {};
  connectedCallback() {
    this.render();
    window.addEventListener("themechange", () => this.render());
    repos.forEach(async (r) => {
      try {
        const res = await fetch(`https://api.github.com/repos/CuriousKiwii/${r.name}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (res.ok) {
          this.#stars[r.name] = (await res.json()).stargazers_count;
          this.render();
        }
      } catch {}
    });
  }
  render() {
    this.#root.innerHTML = `
      <style>${primerBox}${primerLabels}
        :host{display:block;${primerVars(isLight())}--base-size-8:.5rem;--base-text-weight-medium:500;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif;color:var(--fgColor-default)}
        .grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
        .Box{background:var(--bgColor-default);padding:16px;display:flex;flex-direction:column;gap:8px;height:100%;box-sizing:border-box}
        a{color:var(--fgColor-accent);text-decoration:none;font-weight:600} a:hover{text-decoration:underline}
        .head{display:flex;align-items:center;gap:8px;color:var(--fgColor-muted)}
        p{margin:0;color:var(--fgColor-muted);font-size:13px;line-height:1.5;flex:1}
        .meta{display:flex;align-items:center;gap:16px;font-size:12px;color:var(--fgColor-muted)}
        .dot{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:4px;vertical-align:-1px}
        .meta span{display:inline-flex;align-items:center;gap:4px}
      </style>
      <div class="grid">
        ${repos
          .map(
            (r) => `
          <div class="Box">
            <div class="head">${octRepo}<a href="${profile.github}/${r.name}" target="_blank" rel="noopener">${esc(r.name)}</a><span class="Label Label--secondary">Public</span></div>
            <p>${esc(r.description)}</p>
            <div class="meta"><span><i class="dot" style="background:${r.color}"></i>${esc(r.language)}</span><span>${octStar}${this.#stars[r.name] ?? "–"}</span></div>
          </div>`,
          )
          .join("")}
      </div>`;
  }
}

customElements.define("bulma-toolbox", BulmaToolbox);
customElements.define("primer-repos", PrimerRepos);
