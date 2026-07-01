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

change something in the nav or footer, you'll need to make the same edit in `index.html`, `services.html`, `about.html`, and `contact.html`. A find-and-replace across all four files in any text editor (VS Code, Notepad++, etc.) makes this quick — search for the text you want to change and replace it everywhere in one go.

