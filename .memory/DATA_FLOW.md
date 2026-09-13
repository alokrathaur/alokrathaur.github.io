# Data Flow — LegendPrix AI Web App

```text
Visitor Browser
      │
      ▼
GitHub Pages CDN (Serves static index.html, CSS, JS)
      │
      ├──► Three.js script initializes WebGL Earth Canvas
      │
      ▼
Interactive Cards (Handle local route clicks -> macmint.html, topbump.html, etc.)
```
