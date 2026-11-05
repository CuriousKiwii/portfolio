/**
 * All portfolio content lives here. Add a project by adding an entry to `projects`
 * (and its images under assets-src/<slug>/, then run `npm run images`).
 */

export const profile = {
  name: "Noah Thompson",
  business: "Good Ground Technologies",
  location: "Gilbert, Arizona",
  tagline: "Web & IT for small organizations",
  fiverr: "https://www.fiverr.com/goodgroundtech",
  github: "https://github.com/CuriousKiwii",
  portfolioUrl: "https://curiouskiwii.github.io/portfolio/",
};

export const stats = [
  {
    id: "years",
    value: new Date().getFullYear() - 2019,
    suffix: "+",
    label: "Years as a church Technical Lead",
    engine: "countup",
  },
  { id: "sites", value: 2, suffix: "", label: "Client websites live", engine: "odometer" },
  { id: "cert", value: 1, suffix: "", label: "CompTIA Security+ certification", engine: "countup" },
  { id: "degrees", value: 2, suffix: "", label: "Degrees in progress (Cyber + AI)", engine: "countup" },
];

/** Short explanations shown in tooltips on tech badges. */
export const techNotes: Record<string, string> = {
  Astro: "A modern site framework that ships plain HTML, so pages load fast.",
  "Tailwind CSS": "Utility CSS that keeps the design consistent and the stylesheet small.",
  TypeScript: "JavaScript with type checking, which catches mistakes before they ship.",
  "GitHub Pages": "Free, fast hosting straight from the code repository.",
  "GitHub Actions": "Builds and deploys the site automatically on every update.",
  "Custom domain + HTTPS": "The client's own address with a free security certificate.",
  HTML: "The structure of every page, hand-written with no page builder.",
  CSS: "All styling written by hand, including light and dark mode.",
  JavaScript: "Lightweight interactivity with no heavy framework.",
  Netlify: "Hosting with a global CDN, HTTPS, and serverless functions.",
  "Netlify Functions": "A small server-side function that handles newsletter signups securely.",
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  type: string;
  category: "Sports" | "Church";
  when: string;
  url: string;
  urlLabel: string;
  repo?: string;
  summary: string;
  stack: string[];
  highlights: string[];
  cover: string;
  gallery: string[];
  lightbox: "photoswipe" | "spotlight";
};

export const projects: Project[] = [
  {
    slug: "narcissetriano",
    title: "Narcisse Triano Racing",
    client: "Narcisse Triano, F4 driver with Kiwi Motorsport",
    type: "Sponsor website · Full build + launch",
    category: "Sports",
    when: "Nov 2026",
    url: "https://narcissetriano.com",
    urlLabel: "narcissetriano.com",
    repo: "https://github.com/CuriousKiwii/NarciseTriano",
    summary:
      "A sponsor-focused website for a Formula 4 driver chasing F1 Academy. It shows real race results, tracks fundraising toward the next season, and gives brands a clear way to partner, all on a site that loads fast on phones.",
    stack: ["Astro", "Tailwind CSS", "TypeScript", "GitHub Pages", "GitHub Actions", "Custom domain + HTTPS"],
    highlights: [
      "Race-by-race results and a live fundraising progress bar",
      "Five sponsorship tiers with an inquiry form that preselects the tier a sponsor clicked",
      "Phones download smaller photos automatically, so pages stay fast",
      "Moved the domain off Canva with a full backup and HTTPS in about 15 minutes",
    ],
    cover: "narcisse/narcisse-1-cover",
    gallery: [
      "narcisse/narcisse-1-cover",
      "narcisse/narcisse-2-results",
      "narcisse/narcisse-3-sponsors",
      "narcisse/narcisse-4-story",
      "narcisse/narcisse-5-mobile",
    ],
    lightbox: "photoswipe",
  },
  {
    slug: "fountain-of-life",
    title: "Fountain of Life Christian Fellowship",
    client: "Fountain of Life Christian Fellowship, Mesa, AZ",
    type: "Church website · Full build",
    category: "Church",
    when: "Jan – Feb 2026",
    url: "https://fountainoflife.tv",
    urlLabel: "fountainoflife.tv",
    summary:
      "A complete website for a church in Mesa, Arizona, built to feel as welcoming as walking through the front doors. First-time visitors can plan a visit in seconds, and members can quickly find service times, ministries, and ways to get involved.",
    stack: ["HTML", "CSS", "JavaScript", "Netlify", "Netlify Functions"],
    highlights: [
      "Hand-coded with no page builder, so it's fast and has nothing extra to maintain",
      "Homepage background video with clear Plan Your Visit and Watch Online buttons",
      "Light and dark mode that follows the visitor's device and remembers their choice",
      "Newsletter signup that runs through a secure serverless function",
    ],
    cover: "fountain-of-life/showcase-desktop-mobile",
    gallery: [
      "fountain-of-life/showcase-desktop-mobile",
      "fountain-of-life/homepage",
      "fountain-of-life/showcase-pages",
      "fountain-of-life/ministries",
      "fountain-of-life/gallery-section",
      "fountain-of-life/showcase-mobile",
    ],
    lightbox: "spotlight",
  },
];

export const services = [
  {
    icon: "globe-outline",
    title: "Website builds",
    body: "New websites and full redesigns that are clean, fast, and easy for visitors to use on any device.",
  },
  {
    icon: "construct-outline",
    title: "Finish & fix sites",
    body: "Already have a website that needs some work? I'll finish what's missing, fix what's broken, and get it looking sharp.",
  },
  {
    icon: "shield-checkmark-outline",
    title: "IT & security",
    body: "Email setup, account security, and Microsoft 365 or Google Workspace, explained in plain language.",
  },
];

/** Mermaid flowchart for "How a project works". */
export const processDiagram = `flowchart LR
  A([Intro call]) --> B[Client questionnaire]
  B --> C[Design + build]
  C --> D{Client review}
  D -- changes --> C
  D -- approved --> E[Backup + launch]
  E --> F([Handoff + updates])`;

/** Tools grouped for the Bulma "toolbox" widget. */
export const toolbox = [
  { group: "Web", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Astro", "Tailwind CSS"] },
  { group: "Hosting", items: ["Netlify", "GitHub Pages", "GitHub Actions", "Custom domains + DNS"] },
  { group: "IT", items: ["Microsoft 365", "Google Workspace", "Email deliverability", "Account security"] },
  { group: "Security", items: ["CompTIA Security+", "Splunk (home lab)", "Hardening", "MFA rollouts"] },
  { group: "Production", items: ["Livestream production", "AV systems", "Digital signage"] },
];

/** Public repos shown with GitHub's own Primer styles. Stars load live from the GitHub API. */
export const repos = [
  {
    name: "NarciseTriano",
    description: "Sponsor website for F4 driver Narcisse Triano. Astro + Tailwind, deployed with GitHub Actions.",
    language: "Astro",
    color: "#ff5a03",
  },
  {
    name: "portfolio",
    description: "This portfolio. Astro, Tailwind, daisyUI, and dozens of open-source web tools.",
    language: "Astro",
    color: "#ff5a03",
  },
];

export const mapPoints = [
  { name: "Home base", detail: "Gilbert, AZ", lat: 33.3528, lng: -111.789, primary: true },
  { name: "Fountain of Life", detail: "Mesa, AZ", lat: 33.4152, lng: -111.8315 },
  { name: "Narcisse Triano Racing", detail: "Phoenix, AZ", lat: 33.4484, lng: -112.074 },
];

export const credentials = [
  { title: "CompTIA Security+", detail: "Certified" },
  { title: "B.S. Cybersecurity", detail: "In progress" },
  { title: "M.S. Artificial Intelligence", detail: "In progress" },
  { title: "Technical Lead", detail: "Fountain of Life Christian Fellowship, since 2019" },
];

/** intro.js guided tour */
export const tourSteps = [
  {
    element: "#hero",
    intro: "Hi! I'm Noah. I build websites and handle IT for small businesses, churches, and nonprofits.",
  },
  { element: "#work", intro: "Real client sites. Search or filter them, and tap any image for a full-screen gallery." },
  { element: "#process", intro: "Every project follows the same simple path, from a quick call to launch." },
  { element: "#tool", intro: "A free tool: shrink a photo for your website right in your browser." },
  { element: "#contact", intro: "Ready to start? Message me on Fiverr or scan the QR code to share this page." },
];
