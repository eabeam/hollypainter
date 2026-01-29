Here’s a full handoff of everything completed so far, grouped by area, plus current state and known caveats.

**What’s been done (high level)**
- Two Hugo sites maintained in parallel: `site-kross` and `site-educenter`.
- Content model matched to WordPress export and updated requirements.
- Visual/layout tweaks across both themes (hero, typography, CTAs, footers, featured sections, buttons, etc.).
- Decap CMS installed for both sites with curated collections, descriptions, and local backend support.
- Bibliography page + search/sort UI added.
- Events page rebuilt with year subheaders + upcoming/past split.
- Books landing/subpages standardized + submenu behavior fixed.
- Research section added.
- Teaching page added with supplied copy.
- CV download integrated into About.
- PDFs and WordPress images mirrored locally where possible.
- Broken-link audit script + reports.
- Accessibility tweaks (skip link, contrast, nav behavior, etc.).
- Dark/light toggle added.

---

## 1) Structure + content changes
**Books**
- Books landing page is `content/books/_index.md` in both sites.
- Individual book pages are section bundles: `content/books/<slug>/_index.md`.
- Books landing content includes “available from” lines (internal book links).
- Books on home page show 4 covers (exclude `home_exclude: true`).
- Books subpages: restored and render full single-book layout even though they’re section bundles.

**Research**
- New top-level “Research” menu with subpages:
  - `content/research/_index.md`
  - `content/research/obsolete-jobs-project.md`
  - `content/research/crvt.md` (placeholder)

**Teaching**
- New top-level “Teaching” menu.
- Content:
  - `site-kross/content/teaching/_index.md`
  - `site-educenter/content/teaching/_index.md`
- Text includes course list + UVM teaching bio.

**About + CV**
- About page body updated, book titles link internally.
- CV download is `cv_file` in About front matter.
- `layouts/pages/single.html` renders CV link if present.

**Contact**
- Contact page email removed from front matter and template now only renders email block if a value exists.

---

## 2) CMS (Decap) setup
**Admin**
- `static/admin/index.html` exists for both sites.
- Custom “alien astronaut” welcome badge added.

**Config**
- `static/admin/config.yml` updated in both sites with:
  - Collections: Home, Poetry, Poetry Landing, Featured Poetry (filtered), Bibliography, Books, Books Landing, Events, Events Landing, Pages (About/Contact/Teaching).
  - `local_backend: true` for local CMS.
  - Field descriptions added to guide editors.

---

## 3) Bibliography feature
**Pages**
- `content/poetry/bibliography/_index.md` (both sites).
**Templates**
- `layouts/poetry/bibliography/list.html` (both sites).
**JS**
- `static/js/bibliography.js` (search + sort by title/publication/year).
- “Full Bibliography” CTA on poetry listing page.

---

## 4) Events
- `layouts/events/list.html` in both sites:
  - Upcoming vs Past split.
  - Year subheaders.
  - Renders `.Content` as notes.
- `content/events/_index.md` only has front matter + intro text.

---

## 5) Navigation + menu behavior
- Desktop dropdowns are hover-open; click navigates.
- `nav-dropdown.js` forces desktop click-through on dropdowns.
- Books submenu uses section-based items.

**Menus**
- `config/_default/menus.en.toml` includes: Poetry, Books, Research, Teaching, Events, About, Contact.

---

## 6) Hero & homepage styling
**Kross**
- Hero spacing adjusted to avoid overlap, updated subtitle, CTA hierarchy, framed hero image.
- Featured poetry thumbnails shrunk.
- “Poet and educator” subtitle set.

**Educenter**
- Split hero (solid teal + right media container).
- Bio moved below hero.
- Short bio text size increased.
- “Read Full Bio” text.
- Upcoming Events removed from homepage.
- Featured poetry images smaller.
- Footer text contrast improved and footer height reduced.

---

## 7) Buttons/hover + dark mode
- Educenter button hover fixed (text stays readable).
- Theme toggle added and subtle styled in both themes.
- Dark mode colors tuned for readability.

---

## 8) Books menu fix (section bundles)
- Book pages are section bundles, so list templates now use `.Sections`.
- For single book pages, list templates fall back to full single layout when there are no subsections.
- Home page now pulls books via `site.GetPage "section" "books"` so all section bundles appear.

---

## 9) Images + assets
**Local media**
- Most assets already in `site-kross/static/uploads/wp` and `site-educenter/static/uploads/wp`.
- Downloaded 97 missing WordPress images from hollypainter.com (SSL expired, fetched with verification disabled).

**Remaining**
- No missing WordPress image basenames referenced in book/obsolete-jobs pages.

---

## 10) Bugs + build
- Duplicate menu entry warning fixed by adding unique identifiers to:
  - `content/research/obsolete-jobs-project.md`
  - `content/books/obsolete-jobs-project/_index.md`
- Builds succeed in development mode:
  - `hugo -s site-kross --environment development`
  - `hugo -s site-educenter --environment development`
- Production build for Kross can hang due to PostCSS via `npx` (network). Development works reliably.

---

# Files changed (major list)

**Content**
- `site-kross/content/books/_index.md`
- `site-educenter/content/books/_index.md`
- `site-kross/content/books/*/_index.md`
- `site-educenter/content/books/*/_index.md`
- `site-kross/content/research/*.md`
- `site-educenter/content/research/*.md`
- `site-kross/content/teaching/_index.md`
- `site-educenter/content/teaching/_index.md`
- `site-kross/content/pages/about.md`
- `site-educenter/content/pages/about.md`
- `site-kross/content/pages/contact.md`
- `site-educenter/content/pages/contact.md`

**Layouts**
- `site-kross/layouts/index.html`
- `site-educenter/layouts/index.html`
- `site-kross/layouts/books/list.html`
- `site-educenter/layouts/books/list.html`
- `site-kross/layouts/books/single.html`
- `site-educenter/layouts/books/single.html`
- `site-kross/layouts/events/list.html`
- `site-educenter/layouts/events/list.html`
- `site-kross/layouts/pages/single.html`
- `site-educenter/layouts/pages/single.html`
- `site-kross/layouts/teaching/list.html`
- `site-educenter/layouts/teaching/list.html`
- `site-kross/layouts/poetry/bibliography/list.html`
- `site-educenter/layouts/poetry/bibliography/list.html`
- `site-kross/layouts/poetry/list.html`
- `site-educenter/layouts/poetry/list.html`

**Theme SCSS**
- `site-kross/themes/kross/assets/scss/_common.scss`
- `site-educenter/themes/educenter/assets/scss/_common.scss`

**CMS**
- `site-kross/static/admin/config.yml`
- `site-educenter/static/admin/config.yml`
- `site-kross/static/admin/index.html`
- `site-educenter/static/admin/index.html`

**JS**
- `site-kross/static/js/bibliography.js`
- `site-educenter/static/js/bibliography.js`
- `site-kross/static/js/nav-dropdown.js`
- `site-educenter/static/js/nav-dropdown.js`

**Scripts/Reports**
- `scripts/audit_links.py`
- `link-audit.csv`
- `link-audit-broken.csv`

---

# Open items / next steps
1) Confirm new book/obsolete-jobs images are the preferred ones (some are full-size now).
2) Decide if Kross production build should install PostCSS deps or disable PurgeCSS.
3) Any remaining visual tweaks after last Educenter changes.
