# Case Study: Fountain of Life Christian Fellowship

**Live site:** [fountainoflife.tv](https://fountainoflife.tv)
**Location:** Mesa, Arizona
**Role:** Design, development, and deployment
**Stack:** HTML, CSS, vanilla JavaScript, Netlify, Netlify Functions

[← Back to portfolio](../README.md)

![Homepage](../assets/fountain-of-life/homepage.jpg)

## The Goal

The church needed a website that matched the energy of a Sunday service and made it simple for someone new to take the first step. Visitors should be able to find out when services are, what to expect, and how to get connected within a few seconds of landing on the page.

## What I Built

### A homepage that makes the first step easy
The homepage opens with full-screen video from a real service, a "Live every Sunday at 10:00 AM" badge, and two clear buttons: **Plan Your Visit** and **Watch Online**. People who can't make it in person go straight to the livestream.

### Information that's easy to find
Service times (Sunday School, Sunday Service, the Spanish-language congregation, and Wednesday night small groups) sit on clean cards with the address and a directions link. A "Your First Visit" section walks newcomers through what to expect, step by step.

![Page sections](../assets/fountain-of-life/showcase-pages.jpg)

### Ministries and community
A "Find Your Community" section highlights small groups, youth and kids, healing rooms, the worship team, the mission kitchen, and outreach, so people can see where they fit.

![Ministries section](../assets/fountain-of-life/ministries.jpg)

### Photos that show real life at the church
A photo gallery and a "See What God Is Doing" section show worship, outreach, and events, so visitors get a feel for the church before they visit.

![Gallery section](../assets/fountain-of-life/gallery-section.jpg)

### Built for phones first
Most visitors find a church on their phone, so every section was designed to work on small screens first and scale up to desktop.

![Mobile views](../assets/fountain-of-life/showcase-mobile.jpg)

## Technical Details

- **Hand-coded, no page builder.** Plain HTML, CSS, and JavaScript keep the site fast and free of plugins or monthly builder fees.
- **Light and dark mode.** It follows the visitor's device setting and saves their choice with `localStorage`.
- **Scroll animations.** Sections fade in using `IntersectionObserver`, which keeps them smooth without adding a heavy animation library.
- **Newsletter signup.** The form posts to a Netlify serverless function, so no subscriber data or API keys are exposed in the browser.
- **Hosting.** The site is deployed on Netlify with HTTPS and a custom domain.
- **Typography.** Montserrat for headings and Inter for body text, both loaded from Google Fonts.
- **SEO basics.** Descriptive page titles, meta descriptions, and canonical URLs.

## Results

- One central, modern home online for service times, ministries, events, giving, and the livestream
- First-time visitors can plan a visit straight from the homepage
- A newsletter list the church owns and controls
