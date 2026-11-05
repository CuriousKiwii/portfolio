/** Prefix a root-relative path with the GitHub Pages base path (/portfolio). */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const u = (p: string) => (p.startsWith("/") ? `${base}${p}` : p);
