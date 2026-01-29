# Codex Build Instructions: Hugo + Netlify + Decap CMS (Two Themes)

## Objective
Build two versions of the same website for a poet (poetry-first identity), who is also a Senior Lecturer and Director of the Center for Research on Vermont (secondary identity).

The two versions should be identical in structure and content model, differing only by theme:

- Version A: Hugo + Kross theme
- Version B: Hugo + Educenter theme

Output two complete, deployable Hugo sites (either as two folders or two repos).

---

## Deployment & Platform Requirements
- Static site generator: Hugo
- Hosting: Netlify
- CMS: Decap CMS (formerly Netlify CMS), available at `/admin`
- Authentication: Netlify Identity + Git Gateway
- HTTPS: Netlify-managed SSL (no manual renewal)
- Include `netlify.toml` with:
  - Hugo build command
  - publish directory = `public`
  - pinned Hugo version

---

## Source Content
- Import content from `inputs/wordpress/*.xml` (WordPress export).
- Convert WordPress content as follows:
  - Portfolio / poetry publications → `content/poetry/*.md`
  - Pages (About, Contact) → `content/pages/`
  - Book / project pages → `content/books/<slug>/_index.md`
  - Events / readings → `content/events/*.md`
- Preserve titles, external links, publication names, and dates when available.
- Do NOT attempt to preserve WordPress styling or layout.
- If images are referenced:
  - Prefer importing book covers and hero images.
  - Use placeholders for other images if needed.

---

## Site Information Architecture

### Main Navigation
- Home
- Poetry
- Books
- Readings & Events
- About
- Contact

### Books Submenu
- Books landing page
- Individual book pages appear automatically as submenu items under “Books”

---

## Page & Section Requirements

### Home Page (section order is required)
1. Hero section: name, short poetic tagline, photo
2. Featured Poetry: 3–6 selected poetry publications
3. Books: cover grid
4. Upcoming Events: next 3 future events
5. Short Bio: poetry-forward; academic role limited to one sentence
6. Contact CTA

### Poetry Page
- Single page with a grid of poetry publications (portfolio-style).
- Each item links externally to the publisher site.
- Each card shows:
  - Title
  - Publisher
  - Optional image
  - Optional short excerpt
- No on-site poem text required.
- Optional filtering by tag or year if easy.

### Books
- Books landing page: grid of book covers.
- Individual book pages include:
  - Cover image
  - Description/body text
  - Praise blurbs
  - Buy links
- Books must populate a submenu automatically.

### Readings & Events
- Events page split into:
  - Upcoming events (date ≥ today, ascending)
  - Past events (descending)
- Events represent readings, talks, or workshops.

### About
- Poetry bio first.
- Academic role second (Senior Lecturer; Director, Center for Research on Vermont).

### Contact
- Email (mailto link).
- Optional Netlify contact form.

---

## Content Model (Markdown)

### Poetry Publications
Location: `content/poetry/<slug>.md`

Front matter fields:
- title (string)
- publisher (string)
- pub_date (date, optional)
- url (string; external link)
- image (string, optional)
- excerpt (string, optional; 1–2 lines)
- tags (list, optional)
- featured (bool, optional)

Body may be empty or minimal.

---

### Books
Books landing page:
- `content/books/_index.md`

Individual book pages:
- `content/books/<slug>/_index.md`

Front matter fields:
- title
- pub_date (optional)
- cover (image path)
- buy_links (list of {label, url})
- praise (list of strings)
- description (or use body)
- menu.main entry with parent = "Books"

---

### Events
Location: `content/events/<slug>.md`

Front matter fields:
- title
- date (datetime)
- location
- url (optional)
- type (reading | talk | workshop | other)
- featured (optional)

---

### Pages
- `content/pages/about.md`
- `content/pages/contact.md`

---

## Decap CMS Requirements

### Admin Setup
- Location: `static/admin/index.html`
- Config: `static/admin/config.yml`

### CMS Collections
- Poetry (folder: `content/poetry`)
- Books (folder: `content/books`)
- Events (folder: `content/events`)
- Pages (files: About, Contact)

### Media
- Upload directory: `static/uploads/` (or equivalent)
- Reference paths cleanly in front matter.

### Editor Constraints
- Poetry entries must include an external URL field.
- Preserve line breaks and formatting where applicable.
- Use placeholders where content or images are missing.

---

## Deliverables (for EACH theme version)

1. Fully working Hugo site
2. Sample content:
   - ≥ 8 poetry publication entries
   - ≥ 2 books
   - ≥ 5 events (mix of past and future)
   - About and Contact pages populated with placeholder copy
3. README.md including:
   - Local development instructions
   - Netlify deployment steps
   - Netlify Identity + Git Gateway setup
   - How the CMS workflow works for a non-technical editor
   - How to add a new book so it appears in the Books submenu

---

## Constraints
- Do not ask follow-up questions unless required content is missing.
- Use placeholders when necessary.
- Keep structure and content model identical between the two versions.