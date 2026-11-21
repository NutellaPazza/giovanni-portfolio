# Giovanni De Stasio — Portfolio

My personal portfolio and long-term archive covering experience, projects, research and education.

**Live:** https://giovanni-portfolio-rho.vercel.app/

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · React Router · deployed on Vercel

## How it's organised

All the content is **data-first**: experiences, projects, articles, education and skills are plain typed
objects in `src/data/`, and the pages render them. Entries link to each other: an article can point to the
project and the experience it came from. Adding new work therefore means adding data, not changing the
design.

```
src/
├── data/          # experiences, projects, articles, education, skills, profile
├── pages/         # Home, About, Experiences, Projects, Education + detail pages
├── components/    # Navbar, cards, tabs, media gallery, related-content links…
└── types.ts       # shared content types
public/            # images, research PDFs, CV
```

`PRODUCT.md` and `DESIGN.md` set out the audience, tone and design principles the site follows.

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build`.
