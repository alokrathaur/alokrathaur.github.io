# Product Requirements Document (PRD) — LegendPrix AI Web App

## 1. Executive Summary
**LegendPrix AI** (`legendprixai.lol`) is an elite digital product studio dedicated to transforming "Ideas into Products." The studio designs, engineers, and scales cutting-edge Web Apps, Mobile Apps, and SaaS Platforms. 

This project entails redesigning and modernizing the studio's primary web portal to feature:
1. A sleek, minimalist **shadcn-inspired** dark UI design system.
2. A cinematic **3D Space Environment** with interactive starfield and a glowing, rotating **3D Earth Globe**.
3. Integration of the new brand identity, brand typography, and logo from `Brand Identity Presentation-LegendPrix.png` and `Logo.png`.
4. Highlighting **only four core flagship studio products**:
   - **MacMint** (macOS Utility / Productivity — `getmacMint.store`)
   - **TopBump** (Growth & Community Platform — `topbump.lol`)
   - **DotMesh** (Mobile Strategy Game — iOS & Android)
   - **TinyOrbit URL** (Developer / SaaS Link Management — `tiny-orbit-url.vercel.app`)
5. Interactive product cards with "Learn More" / "Explore Product" actions that navigate to dedicated, comprehensive showcase pages for each product (`macmint.html`, `topbump.html`, `dotmesh.html`, `tinyorbiturl.html`).
6. Zero build friction: 100% static hosting compatibility on **GitHub Pages** (via custom domain `legendprixai.lol` / `alokrathaur.github.io`).

---

## 2. Core Pillars & Brand Positioning
From the Brand Identity Reference (`Brand Identity Presentation-LegendPrix.png`):
- **Studio Mission**: *"A product studio for a brighter digital world."*
- **Slogan / Tagline**: *"Ideas into Products."*
- **Four Methodological Pillars**:
  1. **IDEA**: Identifying user friction and conceptualizing ambitious digital solutions.
  2. **BUILD**: Rapid prototyping, robust architecture, and pixel-perfect engineering.
  3. **PRODUCT**: Delivering intuitive UX, high reliability, and polished tactile interfaces.
  4. **GROWTH**: Data-driven scaling, user acquisition, and iterative product evolution.

---

## 3. Product Matrix (The 4 Flagship Creations)

| Product | Category | Primary URL | Page Route | Key Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **MacMint** | macOS Utility / System Optimization | `https://getmacMint.store` | `/macmint.html` (and `/macmint/`) | Smart cleanup, memory boost, app uninstaller, disk visualizer, native swift performance. |
| **TopBump** | SaaS / Community Visibility Platform | `https://topbump.lol` | `/topbump.html` (and `/topbump/`) | Community discovery, server bumping, real-time leaderboard, algorithmic engagement booster. |
| **DotMesh** | Mobile Strategy Game (iOS & Android) | [App Store](https://apps.apple.com/in/app/dotmesh-dots-boxes-game/id6761758144) & [Google Play](https://play.google.com/store/apps/details?id=com.legendprixai.dotmesh&hl=en_IN) | `/dotmesh.html` (and `/dotmesh/`) | Reimagined Dots & Boxes, 2-4P local multiplayer, smart AI bots, neon cyber visual themes. |
| **TinyOrbit URL** | Developer & Marketing SaaS | `https://tiny-orbit-url.vercel.app/` | `/tinyorbiturl.html` (and `/tinyorbiturl/`) | Instant link shortener, custom aliases, QR code engine, geo & device analytics tracking. |

---

## 4. User Journeys & Interaction Flow

### 4.1 Home Page Journey (`/index.html`)
1. **Hero Entry**: Visitor is greeted by a deep cosmic void with drifting stars, subtle blue rim lighting, and a photorealistic, rotating 3D Earth globe. The headline announces *"LegendPrix AI — Ideas into Products"*, accompanied by the updated LP glowing emblem and studio badge.
2. **Value Proposition & Philosophy**: Highlights the studio's 4 pillars (*Idea, Build, Product, Growth*).
3. **The 4 Flagship Products**: Clean shadcn-styled card grid presenting the 4 products. Each card showcases:
   - Official high-res app icon.
   - Category badge (e.g. *macOS Utility*, *SaaS Platform*, *Mobile Game*).
   - Crisp one-liner tagline and description.
   - Key feature pills.
   - Two distinct CTA buttons:
     - **"Learn More →"** / Card click: Navigates to the dedicated product detail page.
     - **"Visit Website / Get App ↗"**: Direct outbound link to the live deployment.
4. **Studio Story & Developer Section**: Brief bio of developer Alok Kumar Rathaur with link to portfolio.
5. **Footer**: Clean copyright, quick links, and branding mark.

### 4.2 Dedicated Product Detail Pages
Each dedicated page (`macmint.html`, `topbump.html`, `dotmesh.html`, `tinyorbiturl.html`) contains:
- **Sticky Top Bar**: Back button / Breadcrumbs to LegendPrix AI home, brand logo, and direct launch button.
- **Product Hero Section**: Large product icon/mockup, official title, category badge, release status, and primary action buttons.
- **Deep Overview & Problem/Solution**: Why this product was created and the specific user pain points it solves.
- **Core Feature Grid**: 4-6 in-depth capability cards with custom iconography.
- **Technical Architecture / Specs**: Tech stack (e.g. Swift / SwiftUI, Next.js, Node.js, Vercel, Supabase, Tailwind, Three.js).
- **Interactive Preview / Showcase Mockup**: Visual representation of the app interface.
- **Outbound Launch Actions**: Direct buttons to download, open web app, or join community.
- **Other Studio Products Carousel/Links**: Cross-promotion to keep visitors exploring the ecosystem.

---

## 5. Technical & Deployment Constraints (GitHub Pages)
- **Deployment Platform**: GitHub Pages (`https://legendprixai.lol` / `alokrathaur.github.io`).
- **Static Integrity**: Must run with zero Node.js server dependencies or server-side routing (no dynamic SSR routes that fail on reload).
- **Dual-Path Routing Support**:
  - Direct HTML files: `macmint.html`, `topbump.html`, `dotmesh.html`, `tinyorbiturl.html`.
  - Directory-based index files: `macmint/index.html`, `topbump/index.html`, `dotmesh/index.html`, `tinyorbiturl/index.html` to support both `/macmint` and `/macmint.html` cleanly without 404 errors.
- **Performance & Asset Standards**:
  - Three.js loaded asynchronously via CDN (e.g. unpkg / cdnjs) with graceful WebGL fallback.
  - Highly optimized assets, SVG icons, and responsive layouts for mobile, tablet, and ultra-wide displays.
  - Modern SEO meta tags, OpenGraph preview cards, and favicon configuration using `Logo.png`.
