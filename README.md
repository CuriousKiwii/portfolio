# Noah Thompson | Web & IT Portfolio

I build clean, fast websites and handle IT for small businesses, churches, and nonprofits. I also work in cybersecurity, so the sites I build are secure from the start.

**Live portfolio:** [curiouskiwii.github.io/portfolio](https://curiouskiwii.github.io/portfolio/)
**Hire me:** [Fiverr / goodgroundtech](https://www.fiverr.com/goodgroundtech)

---

## Featured Work

### Narcisse Triano Racing

**Live site:** [narcissetriano.com](https://narcissetriano.com)
**Type:** Sponsorship and fan site for an F4 driver working toward F1 Academy
**Stack:** Astro, Tailwind CSS, GitHub Pages, custom domain with HTTPS

Built January 2026, launched February 2026. A fast, mobile-first site that gives sponsors everything they need in one place: results, partner tiers, a deck request form, a fundraising meter, and a GoFundMe link. It replaced her old page builder site on the same domain.

### Fountain of Life Christian Fellowship

**Live site:** [fountainoflife.tv](https://fountainoflife.tv)
**Type:** Church website, full build
**Stack:** HTML, CSS, vanilla JavaScript, Netlify, Netlify Functions

A complete website for a church in Mesa, Arizona. It's hand-coded with no page builder. It has light and dark mode, sections that fade in as you scroll, and a newsletter signup that runs through a serverless function. It was built for phones first. The original case study is in [`legacy/fountain-of-life.md`](legacy/fountain-of-life.md).

---

## About this site

The portfolio itself is a showcase. It's an Astro static site that uses around 50 tools from [awesome-web-development](https://github.com/nepaul/awesome-web-development). Each heavy feature loads only when you scroll to it, so the first screen stays light.

### Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run images    # re-run the image pipeline after adding photos to assets-src/
npm run format    # Prettier
```

Every push to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`.

### What's inside

| Area                  | Tools                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Framework and styling | Astro, Tailwind CSS, daisyUI, sanitize.css, Sass, Bulma (in a shadow DOM widget), Primer CSS (in a shadow DOM widget)                 |
| CSS effects           | Hover.css, CSSFX, clay.css, neumorphism.io values, Animate.css, Instagram.css, CSS Loaders, SpinKit                                   |
| Animation             | anime.js, Motion, Rellax, three.js, tween.js, Theatre.js, Lottie, mo.js, Rough.js                                                     |
| Icons                 | Font Awesome, Ionicons, Feather, Iconify (Lucide and Simple Icons)                                                                    |
| Charts and diagrams   | Apache ECharts, Chartist, Mermaid                                                                                                     |
| UI and interaction    | PhotoSwipe, Spotlight.js, List.js, Popper, Toastr (with jQuery), SweetAlert2, intro.js, clipboard.js, NProgress, CountUp.js, Odometer |
| Media and data        | vanilla-lazyload, Compressor.js, QRious, Leaflet with OpenStreetMap, Shiki (Astro `<Code>`)                                           |
| Images and tooling    | sharp, Guetzli, Plaiceholder blur placeholders, Prettier, TypeScript, Playwright for device testing, jsDelivr CDN with SRI hashes     |

### Swapped out, and why

- **fancyBox** needs a paid commercial license for a business site, so the galleries use PhotoSwipe and Spotlight.js instead.
- **Sizzy** and **BrowserStack** are paid testing services. I ran Playwright tests at phone, tablet, laptop, and desktop sizes instead.

### Licenses to know

- intro.js is AGPL and QRious is GPL. That's fine here because this repo is public and open source. A closed-source client project would need the intro.js commercial license or a different tour library.
- Everything else is MIT, ISC, Apache 2.0, or BSD.

### Folder layout

```
src/            pages, components, scripts, styles, data
public/         optimized images, Lottie file, favicon, share image
assets-src/     original screenshots (input for npm run images)
scripts/        image pipeline
legacy/         the previous single-page portfolio
```

---

## Services

- **Website builds and redesigns** for small businesses, churches, and nonprofits
- **Finishing and fixing existing sites**, from quick updates to full cleanups
- **IT and security help:** email setup, account security, and Microsoft 365 / Google Workspace

## Background

- Associate NOC Analyst at Carvana (Tempe, AZ) since September 2025
- CompTIA Security+
- B.S. in Cybersecurity (in progress)
- Technical Lead at Fountain of Life Christian Fellowship since 2019 (IT infrastructure, AV and livestream production, security hardening)
