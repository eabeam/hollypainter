# Holly Painter - Hugo + Educenter

## Local development
- Install Hugo Extended (0.147.2 or newer).
- From the site root, run `hugo server -D`.
- Visit `http://localhost:1313`.
- Open the CMS at `http://localhost:1313/admin`.

## Netlify deployment
1. Push this folder to a Git repo.
2. Create a new Netlify site from the repo.
3. Build command: `hugo --gc --minify`.
4. Publish directory: `public`.
5. Set environment variables:
   - `HUGO_VERSION=0.147.2`
   - `HUGO_ENV=production`
   - `HUGO_ENABLEGITINFO=true`

## Netlify Identity + Git Gateway
1. In Netlify: enable **Identity**.
2. Set registration to **Invite only** (recommended).
3. Enable **Git Gateway** under Identity settings.
4. Invite editors from the Identity tab.
5. Editors can log in at `/admin` to edit content.

## CMS workflow (non-technical editor)
- Go to `/admin`, log in, and choose a collection.
- Add or edit entries, then click **Publish**.
- Uploaded images go to `static/uploads/` and are referenced as `/uploads/...`.

## Adding a new book (submenu behavior)
- In the CMS, choose **Books** and click **New**.
- Fill in title, cover image, pub date, buy links, and praise.
- Book pages automatically appear under the **Books** menu via the cascade in `content/books/_index.md`.
- Optional: add `weight` in a book's front matter to control submenu order.
