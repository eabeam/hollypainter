---
type: plan
project: hollypainter
status: to-process
---

# Plan: Option B Hugo Site Build (Revised)

**Goal**: Replace site-educenter with a new Hugo site (`site-optionb/`) that uses the Option B dark theme design while preserving all existing content, features, and CMS configuration.

**Approach**: Create a new site directory with Option B's design system implemented as Hugo layouts + pure CSS/JS (no Bootstrap, jQuery, or other framework dependencies). All 161 content files transfer unchanged via symlinks during development. No external theme dependency — everything vendored.

**Decisions made**:
- Drop all plugins (Bootstrap, jQuery, Slick, Filterizr) → vanilla CSS/JS only
- Dark-only — no light mode toggle
- Retain the crossword poem widget on homepage (elaborate 3-column layout)
- Symlink `content/` and `static/uploads/` during dev; copy for production

---

## Phase 1: Scaffold, Base Template & Mobile Nav
**Estimated effort**: 1 session

### 1.1 Create directory structure

```
site-optionb/
├── config/_default/
│   ├── hugo.toml         (baseURL, title, timezone, pagination)
│   ├── params.toml       [NEW] (logo, email, social, copyright — consolidated from educenter root hugo.toml)
│   ├── menus.en.toml     (from educenter, unchanged)
│   └── languages.toml    (from educenter, unchanged)
├── content/              (symlink → ../site-educenter/content)
├── static/
│   ├── css/optionb.css   (new — full Option B design system)
│   ├── js/
│   │   ├── nav.js        [NEW] (hamburger toggle for mobile)
│   │   ├── bibliography.js (from educenter)
│   │   └── nav-dropdown.js (from educenter)
│   ├── admin/            (from educenter — config.yml + index.html)
│   ├── uploads/          (symlink → ../site-educenter/static/uploads)
│   └── images/           (favicon)
├── layouts/
│   ├── _default/
│   │   ├── baseof.html   (new — nav, footer, grid texture, fonts)
│   │   ├── list.html     (new — generic list fallback)
│   │   └── single.html   (new — generic single fallback)
│   └── partials/
│       ├── head.html     (fonts, CSS, meta, OG tags, canonical)
│       ├── nav.html      (sticky nav + hamburger menu)
│       ├── footer.html   (4-column footer)
│       ├── image.html    [NEW] (simple <img> wrapper — replaces 278-line module)
│       ├── page-header.html (breadcrumb + title + role tag)
│       └── section-header.html (numbered section headers)
├── .gitignore            (public/, resources/, .hugo_build.lock, .DS_Store)
└── (NO go.mod — pure layouts site, no Hugo modules)
```

### 1.2 Consolidate config [CHANGED — addresses R3]

Merge params from educenter's root `hugo.toml` into `config/_default/params.toml`:
- `logo`, `logo_text`
- `email` ("holly@hollypainter.com")
- `address` ("Burlington, Vermont")
- `social` (Facebook, LinkedIn URLs)
- `copyright` ("Holly Painter")
- `author`, `description`
- `contact_info` block

Do NOT create a root-level `hugo.toml`. Do NOT create a `go.mod`.

### 1.3 Write simple image partial [CHANGED — addresses R2]

`layouts/partials/image.html` — a simple wrapper:
```html
{{ $src := .src }}
{{ $alt := .alt | default "" }}
<img src="{{ $src }}" alt="{{ $alt }}" loading="lazy" decoding="async">
```

This replaces the 278-line gethugothemes image module. All images are in `static/uploads/` so no Hugo Pipes processing is needed.

### 1.4 Implement `baseof.html`

- Google Fonts: `Space Mono` (mono) + `Outfit` (sans) with `display=swap`
- Link to `optionb.css`
- Grid texture overlay (`body::before` with 60px grid)
- `{{ partial "nav.html" . }}` — fixed header
- `{{ block "main" . }}{{ end }}`
- `{{ partial "footer.html" . }}`
- Skip link for accessibility (`<a class="skip-link" href="#main-content">`)

### 1.5 Implement mobile navigation [CHANGED — addresses R1]

The mockup nav has 8 links in a horizontal row. On mobile this overflows.

`partials/nav.html`:
- Desktop (>1024px): Horizontal `.nav-links` as in mockup
- Mobile (≤1024px): Hamburger button toggles a full-width dropdown panel
- HTML: Add `<button class="nav-toggle" aria-label="Menu">` with 3-line icon
- CSS: Hide `.nav-toggle` on desktop; hide `.nav-links` on mobile until `.nav-open`
- JS (`nav.js`): Toggle `.nav-open` class on click, close on ESC and outside click

### 1.6 Implement `optionb.css`

Extract from mockup `index.html` (the canonical CSS source):

**Design tokens:**
```css
--black: #0a0a0a;  --off-black: #1a1a1a;  --charcoal: #2c2c2c;
--white: #f8f8f6;  --off-white: #eeece8;
--vermillion: #e84530;  --vermillion-dark: #c73a28;
--teal: #1a8a7d;
--mid: #888;  --light: #bbb;
--grid-line: rgba(255,255,255,0.06);
```

**Components** (all from mockups):
- Nav (`.nav-*`), Footer (`.footer-*`)
- Bento grid (`.bento-grid`, `.bento-card`, `.full-width`)
- Buttons (`.btn-fill`, `.btn-ghost`, `.btn-teal`)
- Prominent link (`.prominent-link`)
- Page header (`.page-header`, `.page-breadcrumb`, `.page-title`, `.page-role-tag`)
- Section header (`.section-header`, `.section-number`, `.section-title`)
- Description block (`.description-block`)
- Events table (`.events-table`)
- Animations (`.anim-up`, `.d1`–`.d5`, `@keyframes slideUp`)
- Hamburger menu styles [NEW]
- YouTube embed dark-theme wrapper [NEW]
- Content-embedded classes (`book-sample-grid` from book markdown) [NEW]

**Responsive breakpoints:**
- ≤1024px: Single-column bento, 2-column grids, hamburger nav
- ≤640px: Reduced padding, smaller fonts, stacked footer

### 1.7 Implement `partials/footer.html`

4-column grid (from mockup):
1. Brand (`holly.painter` logo + description)
2. Navigate (menu links)
3. Academic (UVM profile, CRVT, Teaching, CV)
4. Projects (Obsolete Jobs, Bibliography)

Bottom bar: copyright + "All rights reserved"

**Checkpoint**: `hugo server` renders every page with correct nav (desktop + mobile), footer, fonts, and grid texture. Content is unstyled but visible.

---

## Phase 2: Homepage
**Estimated effort**: 1 session

### 2.1 Hero section

From mockup `index.html`:
- 2-column grid: text left, portrait right
- Name with filled + outlined text effect (`-webkit-text-stroke`)
- Subtitle: "Poet and educator based in Vermont"
- CTA: "Explore Books" (fill) + "Read Poems" (ghost)
- Portrait frame with aspect-ratio 3:4
- Crossword grid decoration (8×8, CSS grid, low opacity)

Data source: `content/_index.md` frontmatter (hero.name, hero.tagline, hero.image, hero.cta_label, hero.cta_link)

### 2.2 Crossword poem widget [DECISION: retain elaborate version]

From mockup — 3-column layout:
1. **Clue number column** (vermillion background, vertical text)
2. **Poem body** (excerpt text, title, publisher)
3. **Stats sidebar** (poem count, publication count, continents)

Implementation:
- Create `layouts/partials/poem-widget.html`
- JS: `showRandomPoem()` function cycling through featured poems
- **Data source challenge**: Most poetry content files lack `excerpt` field. Two approaches:
  - **Option A**: Populate excerpt in a handful of featured poems (content change — do now or leave placeholder)
  - **Option B**: Use Hugo's `.Summary` (auto-generated from body) — but poems have no body content, only frontmatter
  - **Recommend Option A**: Pick 6-12 poems and add excerpts. This is a small content task.

### 2.3 Books section

4-column grid with covers, number, title, publisher.
Query: `(site.GetPage "section" "books").Sections | first 4`

### 2.4 Academic roles bento

3-card bento grid:
- CRVT Director → links to `/research/crvt/`
- Teaching → links to `/teaching/`
- Obsolete Jobs → links to `/research/obsolete-jobs-project/`

### 2.5 Upcoming events table

Table with date (vermillion, monospace), title, type, location.
Query: `where .Site.RegularPages "Section" "events" | where "Date" "gt" now`

### 2.6 Bio + Contact CTA

Brief bio text from `_index.md` frontmatter. Contact button links to `/contact/`.

**Checkpoint**: Homepage renders with live content, poem widget cycles through poems, all sections match Option B mockup.

---

## Phase 3: Poetry, Bibliography & Writing
**Estimated effort**: 1 session

### 3.1 Poetry landing (`layouts/poetry/list.html`)

From mockup `option-b-poetry.html`:
- Page header with breadcrumb
- Intro text from `_index.md`
- Featured poems: 3-column card grid (`.poem-card`)
  - Image cover (4:3 aspect), title, journal name
  - Hover: lift + shadow + border color
- All poems section: same card grid, paginated or full list
- Tag filtering: Replace Filterizr with vanilla JS (CSS class toggle)

### 3.2 Poetry single (`layouts/poetry/single.html`)

- Cover image (if exists)
- Title, publisher
- "Read at publisher" link (from `params.url` or `pdf`)
- Excerpt if available

### 3.3 Bibliography (`layouts/poetry/bibliography/list.html`)

- Reuse `bibliography.js` from educenter (vanilla JS, no jQuery dependency)
- Style search input and sort dropdown to match Option B
- Data attributes on list items: `data-title`, `data-publisher`, `data-year`

### 3.4 Writing landing (`layouts/writing/list.html`)

The writing page content is markdown body (not structured frontmatter). Two approaches:
- **Simple**: Render `.Content` with Option B typography styles applied via CSS. Tables and headings will be styled by the base CSS.
- **Elaborate**: Parse markdown into sections (fragile)

**Recommend simple approach.** The markdown tables and headings will look good with Option B's typography. Add CSS for `table`, `th`, `td`, `h3`, `hr` within `.content` to match the mockup's writing table style.

**Checkpoint**: Poetry pages, bibliography, and writing page render with Option B styling.

---

## Phase 4: Books, Research & Teaching
**Estimated effort**: 1 session

### 4.1 Books landing (`layouts/books/list.html`)

From mockup `option-b-books-detail.html`:
- Alternating book layouts (cover + info, reversed every other)
- Cover: sticky sidebar, 2:3 aspect ratio
- Info: numbered section, title, publisher, description, buy links, praise

### 4.2 Book single (`layouts/books/single.html`)

Same alternating layout for individual book pages:
- Cover (sticky), title, publisher, description
- Buy links (`.btn-fill` buttons)
- Praise (blockquotes with left border accent)
- Sample poems grid (auto-fill responsive)
- Body content (handles `book-sample-grid` CSS class from markdown)

### 4.3 Research landing (`layouts/research/list.html`)

- Section header + intro
- Cards linking to CRVT and Obsolete Jobs (bento-card style)

### 4.4 Teaching landing (`layouts/teaching/list.html`)

From mockup `option-b-teaching.html`:
- K-M Award banner (star icon + award name + year)
- Course cards grid (responsive, numbered)
- Programs section (tag pills / program-tag spans)
- Writing Centers bento (UWC, GWC, AI research highlight)
- Service section
- UVM profile prominent link

**Note**: Teaching content is currently markdown body. Like writing page, render `.Content` with Option B typography. The mockup's elaborate card layouts are aspirational — start with styled markdown, iterate if Holly wants the card layout.

**Checkpoint**: All content sections render.

---

## Phase 5: Events, About, Contact & 404
**Estimated effort**: 1 session

### 5.1 Events (`layouts/events/list.html`)

From mockup homepage events table + educenter logic:
- Upcoming events: table sorted by date ascending
- Past events: grouped by year, sorted descending
- Columns: date (monospace, vermillion), title (linked if `params.url`), type (uppercase tag), location
- Responsive: hide location on mobile

Hugo logic (from educenter):
```
{{ $upcoming := where .Pages "Date" "gt" now }}
{{ $past := where .Pages "Date" "le" now }}
```

### 5.2 About (`layouts/pages/single.html`)

- Bio text (`.Content`)
- CV download: `{{ with .Params.cv_file }}` → prominent link block
- Styled with Option B description-block typography

### 5.3 Contact (same template, conditional)

- Contact intro text
- Netlify form (name, email, message) styled with Option B form CSS
- Honeypot field for spam

### 5.4 404 page (`layouts/404.html`)

- Option B styled: centered text, "Page not found", link back to homepage
- Grid texture background

**Checkpoint**: All pages render. Full navigation works on desktop and mobile.

---

## Phase 6: Polish & Integration
**Split into sub-phases [CHANGED per review]**

### Phase 6a: Responsive & Accessibility (0.5 session)

- Test all pages at 1024px, 768px, 640px, 375px breakpoints
- Fix any layout breaks
- Hamburger nav works correctly
- Add skip link, ARIA labels on nav, focus management [NEW — addresses Y7]
- Verify font loading (no FOUT/FOIT issues)

### Phase 6b: Interactive JS (0.5 session)

- Bibliography search + sort (port `bibliography.js`)
- Poetry tag filtering (vanilla JS replacement for Filterizr)
- Poem widget randomization (homepage)
- Nav dropdown behavior (desktop click-through on dropdowns)

### Phase 6c: SEO, CMS & Deploy Prep (0.5 session)

- SEO: canonical URLs, OG tags, Twitter cards in `head.html`
- `robots.txt`, `sitemap.xml` (Hugo built-in)
- Decap CMS: copy `static/admin/` from educenter
  - Verify `media_folder: "static/uploads"` resolves correctly [NEW — addresses Y6]
  - Test local backend: `npx decap-server`
- YouTube embed: add dark-theme CSS wrapper (dark background around iframe) [NEW — addresses Y2]
- Netlify `_headers` or `_redirects` if needed

**Checkpoint**: All interactive features work. CMS accessible at `/admin/`. Accessible on mobile.

---

## Phase 7: Deployment & Cutover
**Estimated effort**: 30 min

### 7.1 Pre-deploy

- Replace symlinks with actual copies of `content/` and `static/uploads/`
- Verify `hugo --gc --minify` builds successfully with copies (not symlinks)

### 7.2 Update Netlify config

```toml
[build]
base = "site-optionb"
command = "hugo --gc --minify"
publish = "public"

[build.environment]
HUGO_VERSION = "0.156.0"
HUGO_ENV = "production"
HUGO_ENABLEGITINFO = "true"
```

### 7.3 Verify Netlify build succeeds

### 7.4 Archive old sites

Move `site-educenter/` and `site-preview/` to `zz_archive/` (preserve, don't delete).

### 7.5 Update Makefile

```makefile
build:
	$(HUGO) -s site-optionb --gc --minify
serve:
	$(HUGO) server -s site-optionb
```

**Checkpoint**: Live site at hollypainter.com shows Option B Hugo site with all content.

---

## Content Tasks (parallel, not blocking build)

These can happen alongside the build phases:

- [ ] Add `excerpt` field to 6-12 featured poems (needed for poem widget — Phase 2)
- [ ] Mark ~28 poems as `featured: true` (content decision #6)
- [ ] Fix poetry landing text (content decision #7)
- [ ] Review and clean up poetry inventory CSV

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| CSS doesn't match mockups | Medium | Low | Mockup HTML is the pixel reference |
| Mobile nav feels awkward | Medium | Medium | Test early (Phase 1), iterate |
| Poem widget lacks excerpt data | High | Medium | Add excerpts to 6-12 poems (small task) |
| Writing/Teaching pages look plain | Medium | Low | Styled markdown is fine for launch; elaborate later |
| Content frontmatter incompatible | Low | High | Content unchanged; only layouts change |
| CMS media uploads break with symlinks | Medium | Medium | Verify in Phase 6c; copy for production |
| Scope creep | High | Medium | Strict phase gates; content changes are parallel, not blocking |

---

## What's NOT in Scope

- Poetry page content redesign (#6 from CONTENT_DECISIONS.md) — do after build
- Broken link fixes (#8) — do after build
- New content from Holly's remaining decisions — do after build
- Domain setup (hollypainter.com DNS) — separate task
- Analytics (Google Analytics) — post-launch
- Light mode toggle — dark-only for launch
