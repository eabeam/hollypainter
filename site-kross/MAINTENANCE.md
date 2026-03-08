# Holly Painter Kross site maintenance notes

## Current structure

- `site-kross` is now a self-contained Hugo site.
- The active templates live in `layouts/`.
- The active asset pipeline lives in `assets/`.
- The active static files live in `static/`.
- The `themes/kross/` directory is a legacy placeholder and is not required for local rendering.

## Why this exists

The original site setup expected a separate Kross theme checkout. That checkout was no longer present locally, which left the site without its base template and theme assets. Under current Hugo, that failure mode produced broken or empty output, including a zero-byte homepage.

To reduce breakage, the required stock Kross scaffolding is now vendored directly into this site:

- `assets/js/`
- `assets/plugins/`
- `assets/scss/`
- `layouts/_default/baseof.html`
- `layouts/_default/list.html`
- `layouts/partials/components/page-title.html`
- `layouts/partials/essentials/`
- `static/images/favicon.png`
- `static/images/preloader.gif`
- `static/images/illustrations/`

## Local development

- Use Hugo Extended.
- From this directory, run `hugo server -D`.
- For a production build, run `hugo --gc --minify`.

## If rendering breaks again

1. Check whether `public/index.html` is empty or unexpectedly tiny.
2. Confirm `layouts/_default/baseof.html` and the `layouts/partials/essentials/` files are present.
3. Confirm the theme asset pipeline exists under `assets/`.
4. Vendor missing stock Kross files into this site rather than depending on a separate theme checkout.

## Hugo dependency

- The site renders with local Hugo `0.156.0` as of March 7, 2026.
- The module imports in `config/_default/module.toml` are still active and provide Hugo modules used by the site.
