# Headless CMS React — Starter Template

A Vite + React starter template for ISYS3004 Assessment 2. Provides the project structure, routing, and a complete blog implementation as a reference pattern. Your job is to connect it to your WordPress backend and build out the remaining components.

## What's included

| File | Status | Purpose |
|------|--------|---------|
| `src/pages/BlogList.jsx` | ✅ Complete | Reference implementation — study this |
| `src/pages/SinglePost.jsx` | ✅ Complete | Reference implementation — study this |
| `src/pages/WpPage.jsx` | ✅ Complete | Fetches WordPress pages by slug |
| `src/pages/Home.jsx` | 🔧 Your design | Placeholder only — build your home page |
| `src/pages/CptList.jsx` | 🔧 Your design | Scaffold with TODOs — build your CPT list |
| `src/pages/CptDetail.jsx` | 🔧 Your design | Scaffold with TODOs — build your CPT detail |
| `src/components/Header.jsx` | 🔧 Update | Update site name and nav links |
| `src/components/Footer.jsx` | 🔧 Update | Update with your site name |
| `src/index.css` | 🔧 Your design | Base styles with CSS variables — customise |

> **This is a template repository for ISYS3004 Assessment 2.**
> For submission requirements, marking criteria, and the Critical Incident Portfolio format,
> refer to the assignment specification on the unit LMS — not this README.

---

## Getting started

### Step 1 — Create your repository from this template

> ⚠️ **Do not fork. Do not clone this repository directly.**
> Forking or cloning the template puts your work in the wrong place and your instructor will not be able to access your submission.

1. Click the green **"Use this template"** button at the top of this page on GitHub
2. Select **"Create a new repository"**
3. Set visibility to **Private**
4. Name your repository (e.g. `isys3004-a2`)
5. Click **"Create repository"**

### Step 2 — Clone your repository and install

Clone **your new repository** — not this template.

```bash
git clone https://github.com/your-username/your-repo-name
cd your-repo-name
npm install
```

### Step 3 — Run the app

```bash
npm run dev
```

Open `http://localhost:5173`. The app will run immediately — navigation works, all routes render. Pages that need WordPress will show a setup message telling you exactly what to do next. You do not need WordPress running to get this far.

### Step 4 — Set up WordPress locally

Install [LocalWP](https://localwp.com) (free) and create a new site. Once it is running you will have a local URL like `http://your-site.local`.

You do not need any plugins at this stage. The default WordPress install is enough to see blog posts and pages in the React app.

### Step 5 — Configure your environment

```bash
cp .env.example .env
```

Open `.env` and update both values:

```
VITE_WP_API_URL=http://your-site.local/wp-json/wp/v2
VITE_CPT_SLUG=your-cpt-slug
```

`VITE_CPT_SLUG` must match the slug you register in WordPress exactly. You can leave it as a placeholder until you have created your Custom Post Type.

### Step 6 — Restart the dev server and verify

Stop the dev server (`Ctrl+C`) and start it again:

```bash
npm run dev
```

Visit `http://localhost:5173/blog` — you should see the Hello World post from your WordPress site. If you see an error message instead, it will tell you what to check.

You can also verify your WordPress API directly in the browser:

```
http://your-site.local/wp-json/wp/v2/posts
```

If that returns JSON, WordPress is working. If the React app still shows an error, double-check your `.env` URL matches exactly.

## Project structure

```
src/
├── components/
│   ├── Header.jsx       — navigation
│   ├── Footer.jsx       — footer
│   └── PostCard.jsx     — blog post card component
├── pages/
│   ├── Home.jsx         — home page (your design)
│   ├── BlogList.jsx     — blog list (complete reference)
│   ├── SinglePost.jsx   — single post (complete reference)
│   ├── CptList.jsx      — CPT list (scaffold — your design)
│   ├── CptDetail.jsx    — CPT detail (scaffold — your design)
│   └── WpPage.jsx       — WordPress pages (About, Contact)
├── App.jsx              — routes
├── main.jsx             — entry point
└── index.css            — base styles
```

## Routes

| URL | Component | What it shows |
|-----|-----------|---------------|
| `/` | Home | Your home page |
| `/blog` | BlogList | All blog posts |
| `/post/:id` | SinglePost | A single blog post |
| `/cpt` | CptList | All CPT entries |
| `/cpt/:id` | CptDetail | A single CPT entry |
| `/page/about` | WpPage | WordPress "about" page |
| `/page/contact` | WpPage | WordPress "contact" page |

## Deploying to Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will auto-detect the build settings from `netlify.toml`
4. Add your environment variables in Netlify: Site settings → Environment variables
   - `VITE_WP_API_URL` → your live InfinityFree WordPress URL
   - `VITE_CPT_SLUG` → your CPT slug
5. After deploying, update CORS on your WordPress to allow your Netlify URL

## What you need to build

- **Home page** — design and content entirely yours
- **CPT components** — adapt the scaffold to display your specific content type
- **Header** — update site name, nav links to match your scenario
- **CSS** — update the CSS custom properties and extend styles to match your visual identity
- **Content** — your WordPress content should feel like a real site for your chosen scenario

## Reference: WordPress REST API

```
GET /wp-json/wp/v2/posts          — all posts
GET /wp-json/wp/v2/posts/:id      — single post
GET /wp-json/wp/v2/pages          — all pages
GET /wp-json/wp/v2/pages?slug=about — page by slug
GET /wp-json/wp/v2/:cpt-slug      — all CPT entries
GET /wp-json/wp/v2/:cpt-slug/:id  — single CPT entry
```

Add `?_embed` to any endpoint to include featured images in the response.
