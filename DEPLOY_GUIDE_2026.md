# Holly Painter Site Deployment Guide (2026)

## Recommendation

Use **Netlify** to host the new `site-educenter` Hugo site, keep the **domain registration at GoDaddy**, and cancel only the **old GoDaddy hosting** after the new site is live and stable.

Why this is the best fit:
- The repo already contains a working Netlify build config in `site-educenter/netlify.toml`.
- Netlify supports custom domains and SSL on its current Free plan.
- This is the lowest-friction path from the current repo to a live site.

Important caveat:
- The current CMS config in `site-educenter/static/admin/config.yml` uses **Netlify Identity + Git Gateway**.
- Netlify officially deprecated **Identity** on **February 28, 2025**, and its docs say **Git Gateway is deprecated** and new setups are not recommended.
- Conclusion: **Netlify is still a good host**, but I would separate the decision about **hosting** from the decision about **browser-based editing at `/admin`**.

## Recommended migration strategy

Do the move in this order:
1. Back up the old WordPress site completely.
2. Confirm the new Hugo site is launch-ready.
3. Deploy the new site on a temporary Netlify URL.
4. Test the temporary Netlify site.
5. Point the GoDaddy domain to Netlify.
6. Wait through a short buffer period while the old hosting stays active.
7. Cancel only the old GoDaddy hosting product.

This is the safest path because the domain cutover happens only after the new site already works.

## Part 1: Back up the current GoDaddy WordPress site

Do this **before** changing DNS, hosting, or subscriptions.

### A. Export WordPress content

In WordPress admin:
1. Go to `Tools > Export`.
2. Select `All content`.
3. Download the XML export file.
4. Save it somewhere permanent with the date in the filename.

What this gives you:
- Posts
- Pages
- Custom post types
- Menus
- Categories/tags
- Comments
- Metadata

What it does **not** fully preserve by itself:
- Themes
- Plugins
- The full media library as standalone files
- Server configuration

### B. Save a full hosting backup

You need a second backup beyond the WordPress XML.

If the current site is on **GoDaddy Managed Hosting for WordPress**:
1. Log in to GoDaddy.
2. Open the Managed Hosting for WordPress product.
3. Go to the site `Settings`.
4. Open `Backups`.
5. Create a manual backup.
6. If GoDaddy offers a way to download or restore from that backup, record exactly where it lives.

Important:
- GoDaddy says Managed WordPress keeps **30 days of backups** only while the hosting plan remains active.
- Do not rely on those backups after cancellation.

If the current site is on **GoDaddy cPanel hosting**:
1. Log in to GoDaddy.
2. Open the `Web Hosting (cPanel)` account.
3. Open `cPanel Admin`.
4. Download the site files.
5. Use `Backup Wizard` to export the MySQL database.

Minimum backup set to keep locally:
- WordPress XML export
- `wp-content/uploads/`
- Theme/custom files if any
- Database export

### C. Save a browseable static snapshot

This is optional but strongly recommended.

From Terminal:

```bash
wget \
  --mirror \
  --convert-links \
  --adjust-extension \
  --page-requisites \
  --no-parent \
  https://hollypainter.com/
```

If `www.hollypainter.com` is the live version, use that instead.

This gives you a quick reference copy of the old site even if WordPress becomes unavailable later.

### D. Save a quick systems note

Write down:
- GoDaddy account owner
- Domain renewal date
- Current hosting product name
- WordPress admin login email
- Where the backups are stored

## Part 2: Confirm the new launch version

Work from:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter`

Before deploying, confirm:
- Homepage content is final enough to launch
- About page is correct
- Contact page email is correct
- Books, poetry, events, and teaching pages render correctly
- PDFs and uploaded files open correctly
- Images display correctly

Also update the site URL:

File:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/config/_default/hugo.toml`

Set:

```toml
baseURL = "https://hollypainter.com/"
```

Use `https://www.hollypainter.com/` only if you want `www` to be the canonical domain.

## Part 3: Push the launch-ready repo

Before Netlify import:
1. Make sure the launch-ready version is committed.
2. Push to the GitHub repo on `main`.

Repo:
- `https://github.com/eabeam/hollypainter`

## Part 4: Create the Netlify site

In Netlify:
1. Create a new site from Git.
2. Connect GitHub.
3. Select `eabeam/hollypainter`.
4. Set **Base directory** to `site-educenter`.
5. Set **Build command** to `hugo --gc --minify`.
6. Set **Publish directory** to `public`.

Environment variables:
- `HUGO_VERSION=0.147.2`
- `HUGO_ENV=production`
- `HUGO_ENABLEGITINFO=true`

These match:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/netlify.toml`

## Part 5: Test the temporary Netlify URL

Before touching DNS:
1. Wait for the first deploy to succeed.
2. Open the `*.netlify.app` URL.
3. Click through the major pages.
4. Test downloads, images, and menus.
5. Check the site on mobile.

Do **not** change the domain yet if any of these are broken.

## Part 6: Editing recommendation

Recommendation for launch:
- Use **Netlify for hosting now**.
- **Do not rely on Netlify Identity/Git Gateway** for the first launch.
- Launch the public site first.
- Decide on long-run editing after the site is live.

This means:
- Hosting decision: **made**
- Browser CMS decision: **deferred**

That is the lowest-risk setup for this launch.

## Part 7: Decide how Holly will edit the site later

This is a separate decision from hosting.

### Option A: Launch first, no browser CMS yet

This is my recommended default.

Use Netlify only for hosting, and make content changes through GitHub or with your help until the site is stable.

Why:
- Lowest risk
- Avoids building a workflow on deprecated Netlify Identity/Git Gateway
- Lets you get the public site live first

### Option B: Use the existing `/admin` setup for now

This is possible, but it is a **legacy path**.

The current Decap config uses:
- `backend: name: git-gateway`

That matches the current repo, but Netlify docs now say:
- **Identity is deprecated**
- **Git Gateway is deprecated**
- New setups are **not recommended**

I would only use this if:
- Holly strongly wants browser editing immediately
- You are comfortable treating it as transitional

### Option C: Migrate later to a non-deprecated auth workflow

Likely long-run better path:
- Keep Netlify hosting
- Later rework Decap auth to GitHub-based auth or another maintained auth layer

That is a second-phase task, not a launch blocker.

## Part 8: Attach the GoDaddy domain to Netlify

In Netlify:
1. Open the site dashboard.
2. Go to `Domain management`.
3. Add `hollypainter.com`.
4. Add `www.hollypainter.com`.
5. Choose the primary domain.

Recommendation:
- Primary: `hollypainter.com`
- Redirect alias: `www.hollypainter.com`

## Part 9: Change DNS at GoDaddy

You do **not** need to transfer the domain away from GoDaddy.

You only need to point the domain at Netlify.

Recommended approach:
- Keep the domain registered at GoDaddy.
- If the domain is already using GoDaddy nameservers, keep them there.
- Update the DNS records in GoDaddy using the exact values Netlify provides.

Do **not** guess DNS values from memory.

In practice:
1. In Netlify, open the domain setup screen.
2. Copy the DNS records Netlify tells you to use.
3. In GoDaddy, open the domain DNS manager.
4. Replace the website-related records with the Netlify values.
5. Save the changes.

Typical pattern:
- Root/apex domain: Netlify-provided A/ALIAS/ANAME-style target
- `www`: CNAME to the Netlify target

Important:
- DNS changes often apply within about an hour, but can take up to **48 hours** globally.
- Do **not** cancel the old GoDaddy hosting during this window.

## Part 10: Wait for verification and SSL

After DNS changes:
1. Wait for Netlify to verify the domain.
2. Wait for SSL provisioning to complete.
3. Test:
   - `https://hollypainter.com`
   - `https://www.hollypainter.com`

Launch is not complete until:
- HTTPS works
- The certificate is valid
- The redirect behavior is correct

## Part 11: Keep a buffer period before canceling GoDaddy hosting

After the domain points to Netlify:
- Keep the old GoDaddy hosting active for at least **3 to 7 days**

During that period:
- Test from multiple devices
- Test from multiple networks
- Recheck pages, images, PDFs, and contact info
- Make sure nothing is still depending on the old WordPress host

## Part 12: Cancel only the old hosting

Once the new site is stable:
1. Leave the GoDaddy **domain registration** active.
2. Cancel only the old **hosting** product.
3. Turn off hosting auto-renew if you want a safer intermediate step.
4. Save final confirmation emails and screenshots.

Important distinction:
- Keep: the domain
- Cancel: WordPress hosting / cPanel hosting

Do not click destructive options like `Remove site` until you are sure your backups are complete and stored locally.

## Part 13: Record the final setup

## Netlify setup values

Use these exact values in Netlify:
- Repository: `eabeam/hollypainter`
- Branch: `main`
- Base directory: `site-educenter`
- Build command: `hugo --gc --minify`
- Publish directory: `public`
- Production URL: `https://hollypainter.com/`

Environment variables:
- `HUGO_VERSION=0.147.2`
- `HUGO_ENV=production`
- `HUGO_ENABLEGITINFO=true`

## Day-of cutover checklist

Do these in order on launch day:
1. Confirm the WordPress XML export is saved locally.
2. Confirm the GoDaddy backup exists.
3. Confirm the new site is pushed to GitHub `main`.
4. Confirm Netlify deploy succeeds on the temporary `*.netlify.app` URL.
5. Test homepage, books, poetry, contact page, PDFs, and images on the Netlify URL.
6. Add `hollypainter.com` and `www.hollypainter.com` in Netlify domain settings.
7. Copy the exact DNS records from Netlify.
8. Paste those records into GoDaddy DNS.
9. Wait for Netlify domain verification and SSL.
10. Test `https://hollypainter.com`.
11. Test `https://www.hollypainter.com`.
12. Leave old GoDaddy hosting active for at least 3 to 7 days.
13. Cancel only the old hosting product after the new site is clearly stable.

Make a short note with:
- Where the domain is registered
- Where DNS is managed
- Where the site is hosted
- The Netlify site name
- The GitHub repo URL
- Whether `/admin` is enabled or intentionally deferred
- Where the WordPress backups are stored

## Short version

If you want the practical answer:
1. Back up the current WordPress site first.
2. Use **Netlify** for hosting the new `site-educenter` site.
3. Keep the domain at **GoDaddy** and just change DNS.
4. Do **not** cancel GoDaddy hosting until the Netlify site is live and stable.
5. Treat the `/admin` CMS login as a separate follow-up decision because the current Netlify Identity/Git Gateway path is deprecated.

## Sources checked

Local project files:
- `/Users/ebeam/Dropbox/GitHub/hollypainter/LAUNCH_CHECKLIST.md`
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/README.md`
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/netlify.toml`
- `/Users/ebeam/Dropbox/GitHub/hollypainter/site-educenter/static/admin/config.yml`

Official docs:
- Netlify pricing: https://www.netlify.com/pricing/
- Netlify custom domains: https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/
- Netlify Identity docs: https://docs.netlify.com/security/secure-access-to-sites/identity/
- Netlify Git Gateway docs: https://docs.netlify.com/security/secure-access-to-sites/git-gateway/
- Netlify Identity deprecation: https://www.netlify.com/changelog/deprecation-netlify-identity/
- Decap CMS Git Gateway backend: https://decapcms.org/docs/git-gateway-backend/
- WordPress export docs: https://wordpress.org/documentation/article/tools-export-screen/
- GoDaddy nameserver help: https://www.godaddy.com/help/change-nameservers-for-my-domains-664
- GoDaddy DNS hosting help: https://www.godaddy.com/help/access-domains-on-dns-hosting-20166
- GoDaddy Managed WordPress backups: https://www.godaddy.com/help/restore-your-site-9187
- GoDaddy cPanel database backup: https://www.godaddy.com/help/back-up-a-database-with-the-cpanel-backup-wizard-19976
