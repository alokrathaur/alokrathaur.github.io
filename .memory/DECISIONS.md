# Architectural Decision Records (ADRs) — LegendPrix AI Web App

## ADR-001: Zero Build-Step Static Architecture
- **Status**: ACCEPTED
- **Context**: Need instant, frictionless publishing on GitHub Pages without node build pipelines or hydration issues.
- **Decision**: Use pure HTML5, Vanilla CSS3, and standard CDN/local scripts for Three.js.
- **Consequences**: Instant load times, zero hosting costs, 100% uptime on GitHub Pages CDN.

## ADR-002: Dedicated Subpages for Flagship Products
- **Status**: ACCEPTED
- **Context**: Each product has unique branding, screenshots, and deep links that would overcrowd the homepage.
- **Decision**: Create dedicated `.html` showcase pages for each product alongside root cards.
- **Consequences**: Enhanced SEO rankings for individual product searches and clean homepage flow.
