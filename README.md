# Professional Personal Website

This is a static, responsive portfolio site with an original visual system inspired by modern AI/product websites.

## Replace your content
Edit `index.html` directly. The page intentionally keeps profile/project copy easy to replace.

## Add your photo
Put your portrait at:

`assets/profile.png`

Then in `index.html`, replace the placeholder image source:

`assets/profile.png`

with:

`assets/profile.png`

## Run locally
From this folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Main files
- `index.html` — page content and semantic structure
- `styles.css` — design system, responsive layout, animation styles
- `script.js` — reveal motion, magnetic interactions, cursor, tilt, mobile nav
- `assets/profile.png` — temporary portrait placeholder
