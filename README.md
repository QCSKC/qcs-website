# Quality Cable Systems — Website

Static HTML website for [qualitycablesystems.com](https://www.qualitycablesystems.com).

---

## Stack

- Pure HTML5 / CSS3 / vanilla JavaScript — no build tools, no frameworks
- Google Fonts: Montserrat (400/600/700/800/900) as web fallback
- Deployment: GitHub Pages, Netlify, or any static host

---

## File Structure

```
qcs-website/
├── index.html                          # Home page
├── css/
│   └── main.css                        # Shared stylesheet (all components)
├── js/
│   └── main.js                         # Shared JS (nav, FAQ, form, scroll)
├── images/
│   ├── qcs_web_horizontal.png          # Horizontal logo (nav + footer)
│   ├── qcs_web_stacked.png             # Stacked logo (if needed)
│   └── og-image.jpg                    # Open Graph social share image (1200x630)
├── capabilities/
│   ├── index.html                      # Capabilities overview
│   ├── wire-harnesses/
│   │   └── index.html
│   ├── cable-assemblies/
│   │   └── index.html
│   └── box-builds/
│       └── index.html
├── quality/
│   ├── index.html                      # Quality overview
│   └── ipc-whma-a-620/
│       └── index.html                  # IPC/WHMA-A-620 authority page
├── about/
│   ├── index.html                      # About QCS
│   └── mission-vision-values/
│       └── index.html
├── resources/
│   └── index.html                      # Content hub
├── careers/
│   └── index.html
├── contact/
│   └── index.html                      # Quote request form
├── 404.html
├── sitemap.xml
├── robots.txt
├── _partials.html                      # Shared nav/footer reference (not served)
└── .gitignore
```

---

## Images Required

Before going live, add the following to `/images/`:

| File | Use | Notes |
|------|-----|-------|
| `qcs_web_horizontal.png` | Nav and footer logo | White/reversed version for dark backgrounds |
| `qcs_web_stacked.png` | Optional hero/print use | |
| `og-image.jpg` | Social share preview | 1200x630px, branded |
| `favicon.ico` | Browser tab icon | 32x32 and 16x16 |
| `favicon-180.png` | Apple touch icon | 180x180px |

Add to `<head>` of every page once favicon is ready:
```html
<link rel="icon" href="/images/favicon.ico">
<link rel="apple-touch-icon" href="/images/favicon-180.png">
```

---

## Before Going Live

- [ ] Replace `(816) XXX-XXXX` with actual phone number in all HTML files and `_partials.html`
- [ ] Add street address to footer `<address>` block in all files
- [ ] Update JSON-LD `"telephone"` field from `+18160000000` to actual number (all pages)
- [ ] Add actual address to JSON-LD `PostalAddress` block (street, zip)
- [ ] Add logo image files to `/images/`
- [ ] Create and add `og-image.jpg` (1200x630px branded image)
- [ ] Add favicon files
- [ ] Wire up contact form (Formspree, Netlify Forms, or similar) — replace `e.preventDefault()` in `main.js`
- [ ] Add Google Analytics or equivalent tracking
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Verify structured data with Google's Rich Results Test

---

## Brand Reference

| Element | Value |
|---------|-------|
| Navy | `#082D44` |
| Orange | `#F16E22` |
| Stone | `#DFDCD7` |
| White | `#FFFFFF` |
| Primary font | Aptos (system) / Montserrat (web) |
| Orange highlight | `<span class="hl">word</span>` — one per page, no border-radius |
| Tagline | Precision. Performance. Partnership. |

---

## SEO Notes

- Kansas City / Midwest references appear in: `<title>` tags, meta descriptions, JSON-LD schema, footer, trust bar
- Hero headlines and primary copy are geography-neutral to support national addressable market
- Each page has a unique title, meta description, canonical URL, OG tags, and JSON-LD schema
- `sitemap.xml` covers all pages with appropriate priorities
- IPC/WHMA-A-620 authority page (`/quality/ipc-whma-a-620/`) is designed for long-tail search capture

---

## Deployment (GitHub Pages)

1. Push repository to GitHub
2. Go to Settings > Pages
3. Set Source to `main` branch, root directory
4. Custom domain: add `CNAME` file with `www.qualitycablesystems.com`
5. Enable HTTPS enforcement

For Netlify: connect GitHub repo, publish directory is `/` (root), no build command needed.
