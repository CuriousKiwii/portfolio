// List.js: live search and category filters for the project cards.
import List from "list.js";

export default function projects(root: HTMLElement) {
  const list = new List(root, { valueNames: ["title", "client", "category", "stack"], listClass: "list" });
  const empty = root.querySelector<HTMLElement>("[data-empty]");
  const sync = () => empty?.classList.toggle("hidden", list.matchingItems.length > 0);
  list.on("updated", sync);
  const search = root.querySelector<HTMLInputElement>("input.search");
  search?.addEventListener("input", () => list.search(search.value));
  root.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      root.querySelectorAll("[data-filter]").forEach((x) => x.classList.remove("btn-active"));
      b.classList.add("btn-active");
      const f = b.dataset.filter;
      if (f === "all") list.filter();
      else list.filter((item) => item.values().category === f);
    }),
  );
}
