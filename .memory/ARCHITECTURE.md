# Architecture — LegendPrix AI Web App

## System Architecture Overview
```text
┌─────────────────────────────────────────────────────────────┐
│                 Browser Client (Desktop / Mobile)           │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP GET
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Pages CDN (legendprixai.lol)            │
│   ├── CNAME (Domain routing)                                │
│   ├── index.html (Main studio portal)                       │
│   ├── {macmint, topbump, dotmesh, tinyorbiturl}.html        │
│   ├── css/ (Dark theme, glassmorphism, responsive grid)     │
│   ├── js/ (Three.js 3D globe, interaction controllers)      │
│   └── images/ (Product graphics, logos, icons)              │
└─────────────────────────────────────────────────────────────┘
```

## UI & Design Architecture
- **Theme**: Deep space void (`#030712`, `#0B0F19`), translucent frosted cards (`rgba(17, 24, 39, 0.7)`), subtle 1px border glows (`rgba(255, 255, 255, 0.1)`).
- **Typography**: Inter / Outfit modern sans-serif typography hierarchy.
- **3D Canvas**: Hardware-accelerated WebGL canvas embedded in the hero section.
