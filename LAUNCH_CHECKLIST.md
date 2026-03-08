# Holly Painter Website Launch Checklist

This version assumes:
- The domain is already registered at GoDaddy
- The current live site is a GoDaddy-hosted WordPress site
- You want to keep the domain, move hosting to Netlify, and later cancel only the old hosting product
- You want an archive of the old WordPress site before shutdown

## Recommended setup

Use `site-educenter` + Netlify + Holly's existing domain.

Why this is the best low-cost option for this repo:
- `site-educenter` already has a working `netlify.toml`.
- The CMS in `site-educenter/static/admin/config.yml` uses `git-gateway`, which is designed for Netlify Identity.
- Netlify's current Free plan supports custom domains with SSL, so this is likely enough unless traffic or usage grows.

I would only choose a different host if you explicitly want to avoid Netlify.

## Before you start

You need:
- Access to Holly's domain registrar or DNS provider
- Access to Holly's GitHub repo
- A Netlify account
- A final decision that `site-educenter` is the version you want to launch
- Access to the current GoDaddy hosting account and WordPress admin

## Recommended sequence

Do the migration in this order:
1. Archive the old WordPress site
2. Finish and deploy the new Hugo site on a temporary Netlify URL
3. Change the domain DNS at GoDaddy to point to Netlify
4. Leave the old GoDaddy hosting active for a short buffer period
5. Cancel GoDaddy hosting only after the new site is stable

This is the lowest-risk path.

## Steps

### 1. Archive the existing WordPress site before touching DNS

I would make three separate archives.

#### Archive A: WordPress export

In WordPress admin:
1. Go to `Tools -> Export`
2. Export `All content`
3. Save the XML file locally

This preserves posts, pages, menus, and metadata in WordPress's export format.

#### Archive B: Full hosting backup

If the current GoDaddy product is Managed WordPress:
- Use any built-in backup/download option available in GoDaddy before deleting anything
- If SSH or file access is available, also save `wp-content` and a database export

If the current GoDaddy product is cPanel hosting:
- Download the site files
- Export the database from phpMyAdmin or WP-CLI

Minimum archive to keep:
- WordPress XML export
- `wp-content/uploads/`
- Theme/custom files if any
- Database export if available

#### Archive C: Static snapshot of the live site

Make a browseable static copy of the current site before cutover. This is useful even if the WordPress export exists.

Recommended command:

```bash
wget \
  --mirror \
  --convert-links \
  --adjust-extension \
  --page-requisites \
  --no-parent \
  https://hollypainter.com/
```

If `www.hollypainter.com` is the current live version, use that URL instead.

Save the resulting folder somewhere permanent, such as a dated archive folder.

Optional extra archive:
- Submit the current live site to the Wayback Machine's "Save Page Now"

### 2. Finalize the launch version

Work from:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter`

Check these items before launch:
- Homepage copy and images
- About page and CV file
- Books and poetry entries
- Contact email
- Social links
- Any remaining image choices noted in `HANDOFF.md`

### 3. Set the real site URL in Hugo

In:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/config/_default/hugo.toml`

Change:
- `baseURL = "/"`

To:
- `baseURL = "https://hollypainter.com/"`

If you want `www` to be primary instead, use:
- `baseURL = "https://www.hollypainter.com/"`

Pick one canonical version and stick to it.

### 4. Commit and push the repo to GitHub

The repo already has:
- `origin https://github.com/eabeam/hollypainter.git`
- branch `main`

Make sure the latest launch-ready version is pushed to `main`.

### 5. Create the Netlify site

In Netlify:
1. Click `Add new site` or `Import from Git`.
2. Connect GitHub.
3. Select the `eabeam/hollypainter` repo.
4. Set the **Base directory** to `site-educenter`.
5. Build command: `hugo --gc --minify`
6. Publish directory: `public`

Set these environment variables:
- `HUGO_VERSION = 0.147.2`
- `HUGO_ENV = production`
- `HUGO_ENABLEGITINFO = true`

These match:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/netlify.toml`

### 6. Test the Netlify preview URL first

Before touching DNS:
- Wait for the first deploy to succeed
- Open the temporary `*.netlify.app` URL
- Click through the main pages
- Test `/admin`
- Confirm images, PDFs, and book pages work

This catches build or asset issues before the domain cutover.

### 7. Attach Holly's domain in Netlify

In Netlify:
1. Go to `Domain management`
2. Click `Add domain`
3. Add `hollypainter.com`
4. Also add `www.hollypainter.com`
5. Set one as the primary domain

My recommendation:
- Primary: `hollypainter.com`
- Alias/redirect: `www.hollypainter.com`

### 8. Change DNS in GoDaddy so the domain points to Netlify

You do not need to transfer the domain away from GoDaddy. You only need to change where the website points.

Use the exact DNS instructions Netlify shows in the domain setup screen.

Most likely you will do one of these:
- Keep GoDaddy nameservers and edit DNS records in GoDaddy
- Or switch nameservers away from GoDaddy to a DNS provider Netlify tells you to use

My recommendation:
- If the domain is already using GoDaddy nameservers, keep nameservers at GoDaddy and only update the DNS records unless Netlify clearly requires something else

Typical pattern:
- Apex/root domain (`hollypainter.com`): A record(s), ALIAS, or ANAME as Netlify specifies
- `www`: CNAME to the Netlify target Netlify provides

Important:
- Do not guess the DNS values from memory
- Copy the current values directly from Netlify's domain setup page
- DNS changes can take up to 48 hours to fully propagate
- Do not cancel the old hosting yet

### 9. Wait for SSL and domain verification

After DNS is correct:
- Netlify should verify the domain
- Netlify should provision SSL automatically

Do not treat launch as done until:
- `https://hollypainter.com` loads
- `https://www.hollypainter.com` redirects correctly
- The browser shows a valid secure connection

### 10. Turn on CMS editing for Holly

If Holly wants browser-based editing at `/admin`:
1. In Netlify, enable `Identity`
2. Set registration to `Invite only`
3. Enable `Git Gateway`
4. Invite Holly as an editor
5. Have her test logging in at `/admin`

This matches the current CMS config and is the main reason Netlify is the best fit here.

### 11. Run a post-cutover buffer period

After DNS is switched:
- Leave the old GoDaddy hosting active for at least 3 to 7 days
- Recheck the site from multiple devices or networks
- Confirm no important pages or files are still being pulled from the old WordPress host

This buffer reduces the chance of breaking something while DNS caches are still updating.

### 12. Do a post-launch sweep

Check:
- Home, Books, Poetry, Research, Teaching, Events, About, Contact
- PDF downloads
- Mobile view
- Contact form behavior if enabled
- Social links
- `/admin` login
- Redirect behavior between `www` and non-`www`

### 13. Cancel the old GoDaddy hosting only after the new site is stable

Important distinction:
- Keep the GoDaddy domain registration
- Cancel only the old hosting product

Before canceling:
- Confirm `hollypainter.com` and `www.hollypainter.com` both load the Netlify site
- Confirm SSL works
- Confirm your archive copies are saved locally
- Confirm Holly has anything she still needs from old WordPress admin
- Turn off auto-renew first if you want a safer intermediate step

If the current product is Managed Hosting for WordPress:
- Do not use "Remove site" as your first step unless you are certain you no longer need anything there
- First cancel renewal or the hosting subscription
- Only remove/delete the site after your archives are safe

If the current product is cPanel hosting:
- Cancel the hosting subscription, not the domain

### 14. Record the setup details somewhere easy to find

Save:
- Which domain is primary
- Where DNS is managed
- Netlify login owner
- GitHub repo owner
- How Holly logs into `/admin`

This will save time later.

## Cheapest alternatives

### Option A: GitHub Pages

Cheapest in cash terms:
- Usually $0 for hosting

Why I do not recommend it for this repo:
- The current CMS setup is for Netlify Git Gateway, not GitHub Pages
- You would need a GitHub Actions deploy workflow or commit built files
- You would likely lose the easiest nontechnical editing path

Choose this only if:
- Holly will not use `/admin`
- You want the absolute lowest-cost static hosting
- You are willing to do extra setup work

### Option B: Cloudflare Pages

Also very low cost:
- Static hosting can be free

Why I still would not pick it first here:
- The current repo is already wired toward Netlify
- The CMS/auth flow would need rework
- It adds migration work without a clear benefit for this project

## My recommendation

Follow this path:
1. Archive the current GoDaddy WordPress site
2. Launch `site-educenter` on Netlify
3. Point `hollypainter.com` and `www.hollypainter.com` to Netlify through GoDaddy DNS
4. Wait a few days
5. Cancel only the old GoDaddy hosting product
6. Keep the domain at GoDaddy unless you have a separate reason to move it
7. Enable Netlify Identity + Git Gateway only if Holly wants to edit through `/admin`

That is the lowest-friction path and likely the best low-cost path for this specific repo.

## Source notes

Repo evidence used:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/README.md`
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/netlify.toml`
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/static/admin/config.yml`
- `/Users/ebeam/Dropbox/GitHub/hollypainter/HANDOFF.md`

Current official docs checked:
- Netlify pricing: custom domains with SSL are included on the Free plan
- Netlify domain setup docs
- GoDaddy domain nameserver/DNS help
- GoDaddy WordPress export help
- GoDaddy Managed WordPress removal/cancellation guidance
- GitHub Pages custom-domain docs
- Cloudflare Pages custom-domain and limits docs
