# Hitels — Desktop Home

Static build of the `Desktop - Home` frame from the [Hitels Website Figma file](https://www.figma.com/design/0bx3Si4ObEyKJ6XgLEETra/Hitels-Website?node-id=43-3671).

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>. No build step, no dependencies.

| File | What it holds |
|---|---|
| `index.html` | Every section, in frame order |
| `styles.css` | Figma variables as CSS custom properties, then section styles |
| `main.js` | Mobile nav, testimonial carousel |
| `checks.js` | Console-run assertions for the above (see the file header) |
| `assets/img/` | Artwork |

Rendered height is 7338px against the frame’s 7668px. The frame is hug-height and
includes a hidden `Add-ons` section; the rest is font substitution, see below.

## Fonts

The frame uses **Garnett Medium** for headings and **Inter** for body copy. Garnett is
a licensed face and is not bundled here, so `--font-head` falls back to
**Schibsted Grotesk** (Google Fonts), the closest free match. Drop Garnett into
`assets/fonts/`, add an `@font-face`, and the fallback stops applying — headings
that currently wrap to two lines will pull back onto one, as in the frame.

## Assets

Figma's MCP export quota (6 calls/month on a View seat) ran out partway through, so
these came out of the file directly and are the real artwork:

- hero display + phone mockups, background texture, `hitels.` logo, all UI icons
- all three customer-story photographs, at full resolution
- the hotel photography used inside the two product-offering composites

These are stand-ins, marked with `ponytail:` comments where they appear:

- **Testimonial portrait** — a CSS placeholder. Export the real image from Figma
  node `43:3883` and point `.testimonials__portrait` at it.
- **Product-offering composites** — the frame builds these from live Figma
  sub-frames rather than one flat image, so they are rebuilt in markup from the
  real photography. Visually equivalent, not pixel-identical.
- **Partner logos** — set as type (they are wordmarks in the frame). Swap in
  supplied SVGs if the partners have them.
- **Aurora Farm stat** — the caption is clipped by the frame edge in Figma, so the
  percentage is a guess. Confirm the real number.

The SEO chart and the performance heatmap are drawn in SVG/CSS rather than
exported, so they stay sharp and are editable.

## Notes

- The customer-stories row deliberately runs off the right edge, matching how the
  frame clips it. It scrolls horizontally and never widens the page.
- The `Add-ons` frame (`43:4037`) is hidden in Figma and is not built.
- Nav and footer links point at on-page anchors; wire them to real routes when
  the other pages exist.
