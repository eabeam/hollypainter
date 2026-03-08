# Holly Painter site maintenance notes

## Current structure

- `site-educenter` is a self-contained Hugo site.
- The active templates live in `layouts/`.
- The active styling and JS live in `static/css/`, `static/js/`, `static/plugins/`, and `static/images/`.
- The `themes/educenter/` directory is a legacy placeholder and is not required for local rendering.

## Why this exists

The original site setup expected an external Educenter theme checkout. That theme directory was no longer present locally, so newer local builds rendered with missing CSS and JS assets.

To reduce breakage, the required theme assets are now vendored directly into this site:

- `static/plugins/`
- `static/images/favicon.png`
- `static/images/preloader.gif`

## Local development

- Use Hugo Extended.
- From this directory, run `hugo server -D`.
- For a production build, run `hugo --gc --minify`.

## If styling breaks again

1. Check whether the generated HTML references `/plugins/...` and `/images/...`.
2. Confirm those files exist under `static/` and `public/`.
3. If a missing asset came from the stock Educenter theme, vendor it into this site instead of depending on a separate theme checkout.

## Hugo dependency

- The site works with local Hugo `0.156.0` as of March 7, 2026.
- The only module import still in use is `github.com/gethugothemes/hugo-modules/images` via `config/_default/module.toml`.
