# JThree Analytics Consulting — Website

A modern, four-page corporate website for **JThree Analytics Consulting**, built with plain HTML, CSS, and JavaScript (no build step, no framework, no dependencies). Ready to host on GitHub Pages, or to open straight from your computer.

## About the header/footer fix

Earlier versions of this site loaded the header and footer dynamically with JavaScript (`fetch()`), which only works when the page is served over `http://` — a real web server or hosting. If you open the file by double-clicking it (or certain preview tools try to view it), the browser can't fetch those partial files and the header/footer silently don't appear.

**This version fixes that for good:** the header and footer are now written directly into every page (`index.html`, `services.html`, `about.html`, `contact.html`) — nothing is loaded dynamically. This means the site now works correctly no matter how it's opened: double-click, GitHub Pages, any static host, or any other viewer. The tradeoff is that editing the nav or footer now means editing it in all four files instead of one — see "Editing content later" below for the quickest way to do that.

## Pages

```
index.html      Home — hero, philosophy quote, about/services/why-us/featured-work/sectors, CTA
services.html    Services — eight capability cards, each with an in-place "Learn More" (no page jump)
about.html       About — story, mission/vision/values, why clients trust us, stats
contact.html     Contact — the "Request a Service" form (Name, Email, Company, Phone, Service, Message), contact details, map
```

Nav is four items — **Home, Services, About, Contact** — on every page.

## What's different from the brief you pasted, and why

A couple of the requested stats (100+ Projects, 50+ Clients, Across Africa) aren't things your own company materials had established when this project started. I flagged that once already; since you've asked for them again here, they're included as requested. Just flagging so you can swap in real figures once you have them — the numbers live in the `stats-grid` block near the bottom of `index.html` and `about.html` (search for `data-target=`).

The "Learn More" buttons on service cards **expand in place** rather than linking to another page — this replaces an earlier version where they jumped to the Contact page, which you'd flagged as unwanted. Clicking a card's "Learn More" now just reveals a sentence or two right there, then collapses again on a second click.

## Service request form (sends to your Gmail)

The Contact page's **Request a Service** form uses the free service **Web3Forms** to deliver submissions straight to an email inbox — currently set to **mutua2687@gmail.com**.

**One-time setup (about 2 minutes, no account needed):**

1. Go to **https://web3forms.com**.
2. Enter `mutua2687@gmail.com` and click **Create Access Key**.
3. Confirm the email Web3Forms sends you.
4. Copy the access key.
5. Open **all four** HTML files and find this line (once per file — in the request form on `contact.html`, and in the newsletter form's identical block on all four files' footers):
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
   Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your real key everywhere it appears (5 places total: the request form once, the newsletter form once per page × 4 pages).
6. Save and redeploy.

Until the key is set, both forms show an on-page message saying they aren't connected yet, rather than failing silently — that's what you were seeing before.

## Map

The Contact page embeds an OpenStreetMap view of Nairobi (no API key required). Double-check it renders once the site is live — this sandbox's own preview tooling blocks third-party embeds that work fine in a normal browser, so it couldn't be visually confirmed from here.

## Files

```
index.html, services.html, about.html, contact.html
style.css        all styles — colors, fonts, and spacing tokens are set once at the top under :root
script.js        nav, reveal animations, stat counters, parallax hero, back-to-top, service-card accordion, both forms
assets/          logo files
assets/photos/   photography used across the site
```

## Host it on GitHub Pages (free)

1. **Create a new repository** on GitHub (e.g. `jthree-website`). Public repos get free Pages hosting.
2. **Upload these files**, keeping the folder structure as-is (all `.html` files at the root, `assets/` alongside them).
   - Easiest: on the repo page, **Add file → Upload files**, drag in everything from this folder, commit.
   - Or with git:
     ```bash
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/jthree-website.git
     git push -u origin main
     ```
3. **Settings → Pages** → Source: `Deploy from a branch` → branch `main`, folder `/ (root)` → Save.
4. Live in a minute or two at `https://<your-username>.github.io/jthree-website/`.
5. **Custom domain** (optional): add it under Pages settings, then point a `CNAME` record at your registrar to `<your-username>.github.io`.

## Brand guide

See `BRANDING.md` for the color palette (hex codes), typography, logo usage, and tone of voice.

## Photos

Photos in `assets/photos/` are the ones you originally supplied, resized and compressed for the web.

## Editing content later

Each page's copy is plain HTML in its own file. Because the header and footer are now duplicated across all four pages (see the fix explanation above), if you want to change something in the nav or footer, you'll need to make the same edit in `index.html`, `services.html`, `about.html`, and `contact.html`. A find-and-replace across all four files in any text editor (VS Code, Notepad++, etc.) makes this quick — search for the text you want to change and replace it everywhere in one go.

## Local preview

This version has **no dependency on a local server** — you can open `index.html` directly by double-clicking it and everything will work, including the header and footer. A local server is still a nice-to-have if you want the page to auto-refresh as you edit:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
