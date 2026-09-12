# Design Specification (design.md) — LegendPrix AI

## 1. Visual Philosophy & Aesthetic Anchor
The visual direction of **LegendPrix AI** merges two complementary paradigms:
1. **The Cosmic Brand Presentation**: Directly derived from `Brand Identity Presentation-LegendPrix.png`, featuring a cinematic dark space vista, deep planetary horizon glow, starlight particles, and an electric cyan-to-violet orbital energy mark.
2. **Shadcn UI Design Language**: Renowned for minimalist restraint, clean border geometry (`border-zinc-800` / `border-white/10`), ultra-refined dark surfaces (`zinc-950` / `zinc-900`), subtle micro-interactions, monospace badges, crisp typography hierarchy, and purposeful accents.

---

## 2. Color Palette & Design Tokens

### 2.1 Surfaces & Depth
- **`--space-black`**: `#030712` (98% black with deep slate undertone)
- **`--surface-primary`**: `rgba(15, 23, 42, 0.65)` with `backdrop-filter: blur(16px)`
- **`--surface-card`**: `rgba(17, 24, 39, 0.75)` with 1px border `rgba(255, 255, 255, 0.08)`
- **`--surface-card-hover`**: `rgba(30, 41, 59, 0.85)` with border `rgba(56, 189, 248, 0.35)`
- **`--surface-secondary`**: `rgba(2, 6, 23, 0.8)`

### 2.2 Brand & Accents
- **`--brand-cyan`**: `#38BDF8` (Sky 400 - primary orbital glow)
- **`--brand-blue`**: `#0284C7` (Sky 600 - deep electric tone)
- **`--brand-violet`**: `#818CF8` (Indigo 400 - gradient transition)
- **`--brand-purple`**: `#A855F7` (Purple 500 - studio accent)
- **`--brand-glow`**: `rgba(56, 189, 248, 0.25)`

### 2.3 Typography & Foreground
- **`--text-primary`**: `#F8FAFC` (Slate 50 - high contrast headline text)
- **`--text-secondary`**: `#94A3B8` (Slate 400 - body description)
- **`--text-muted`**: `#64748B` (Slate 500 - meta labels & timestamps)
- **`--border-subtle`**: `rgba(255, 255, 255, 0.08)`
- **`--border-highlight`**: `rgba(56, 189, 248, 0.22)`

---

## 3. Typography System
1. **Display & Brand Headers**: `Plus Jakarta Sans` or `Inter`, font-weight 700 to 900, tight tracking (`-0.03em`), gradient fill option matching the brand deck.
2. **Body & UI Elements**: `Inter` / system-ui, font-weight 400 to 500, leading 1.6.
3. **Pills & Meta Indicators**: `JetBrains Mono` or `ui-monospace`, font-weight 600, uppercase with wide tracking (`0.12em`).

---

## 4. 3D Space Scene & Rotating Earth Globe Specification
Implemented via Three.js in a dedicated background `<canvas id="space-canvas">`:
- **Starfield**:
  - 1,200+ multi-depth particle points with subtle color distribution (ice blue, soft violet, starlight white).
  - Subtle mouse-parallax inertia on desktop.
- **3D Earth Globe**:
  - Sphere geometry with custom procedural atmospheric shaders or lightweight high-definition Earth landmass textures + night city lights.
  - Outer atmospheric haze (Fresnel glow shader in cyan-blue `#38bdf8`) replicating the planetary horizon in `Brand Identity Presentation-LegendPrix.png`.
  - Continuous axial rotation with slow realistic tilt (~23.5 degrees).
  - Interactive touch/drag rotation support for visitors.
  - Positioned slightly offset or centered beneath the hero typography with smooth depth-blending to guarantee 100% text readability.

---

## 5. Shadcn-Inspired UI Components

### 5.1 Studio Navigation Bar
- Fixed top, ultra-thin border (`border-b border-white/10`).
- Glassmorphic backdrop (`backdrop-blur-md bg-zinc-950/70`).
- Left: Updated `Logo.png` emblem with "LegendPrix AI" wordmark and "Ideas into Products" subtitle.
- Center/Right: Navigation links (Products, Studio Pillars, About, Developer Portfolio).
- Action Button: Sleek high-contrast pill button ("Explore Products").

### 5.2 Hero Section
- Studio Status Badge: `[ ✦ Studio Portfolio • 2026 Edition ]` with pulsing dot.
- Headline: "Transforming Ideas into Legendary Products."
- Subtitle: "A product studio for a brighter digital world. We engineer world-class Web Apps, Mobile Apps, and SaaS Platforms."
- Action Buttons: "View Flagship Suite" (Primary glow) & "Meet the Studio" (Ghost outline).

### 5.3 Flagship Product Cards (The 4 Showcases)
Each card employs a shadcn-card structure:
- **Card Container**: `rounded-2xl border border-white/10 bg-zinc-900/60 p-6 md:p-8 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 relative overflow-hidden`.
- **Top Bar**:
  - High-res product icon (rounded squircle with subtle inner border).
  - Live status / category badge (e.g., `macOS Utility`, `SaaS Platform`).
- **Typography**:
  - Title: Crisp h3 with subtle hover underline or glow.
  - Tagline: One-line punchy descriptor in muted slate.
  - Description: 2-3 lines explaining value and functionality.
- **Feature Pills**: 3-4 feature chips with checkmark or dot.
- **Interactive Action Footer**:
  - Primary "Learn More →" button: Opens dedicated subpage (`macmint.html`, `topbump.html`, `dotmesh.html`, `tinyorbiturl.html`).
  - Secondary direct launch button: Direct link with external arrow indicator (`getmacmint.store`, `topbump.lol`, etc.).

### 5.4 Dedicated Product Detail Pages
- Hero banner with oversized app branding and platform badges.
- Problem statement & core solution architecture.
- Detailed feature matrix with screenshot/mockup showcases.
- Tech specs table (frameworks, databases, platforms, protocols).
- Direct call-to-action to download/launch product.
- Navigation back to Studio Home.
