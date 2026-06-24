# KinMo Kids — Paint, Play & Learn

Production-ready landing page for KinMo Kids DIY painting kits.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Lucide React icons
- Fully responsive (mobile-first)

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production
```bash
npm run build
```
Output goes to the `dist/` folder.

### 4. Preview production build locally
```bash
npm run preview
```

---

## Deploy on Vercel

### Option A — GitHub Import (Recommended)

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel
```
Follow the prompts. Vercel will auto-detect Vite settings.

---

## Project Structure

```
kinmo-kids/
├── public/
│   └── assets/
│       ├── kinmo-kids-logo.png
│       ├── jungle-kit-combo-249.jpeg
│       ├── mega-combo-499.jpeg
│       ├── floral-kit-combo-199.jpeg
│       ├── before-after.png
│       ├── kids-activity.jpeg
│       └── product-shoot.jpeg
├── src/
│   ├── App.jsx          # Main landing page (all sections)
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind + custom styles
├── index.html           # HTML shell with SEO meta tags
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## WhatsApp Integration
All "Order on WhatsApp" buttons use pre-filled messages via:
```
https://wa.me/916353926280?text=<encoded-message>
```

---

## Customization

| Item | File | Where |
|------|------|--------|
| WhatsApp number | `src/App.jsx` | `WA_BASE` constant |
| Product prices | `src/App.jsx` | `WA_MSGS` + `products` array |
| Brand colors | `tailwind.config.js` | `theme.extend.colors` |
| Fonts | `index.html` | Google Fonts link |
| Images | `public/assets/` | Replace files, keep same names |
