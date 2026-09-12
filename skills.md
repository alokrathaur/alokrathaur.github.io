# Skills & Tooling Architecture (skills.md) — LegendPrix AI

## 1. Installed Skills Summary

### 1.1 `10k-websites` Skill
- **Installed Locations**:
  - Global Agent Config: `~/.gemini/config/skills/10k-websites/`
  - Local Repository: `/alokrathaur.github.io/.agents/skills/10k-websites/`
- **Purpose**:
  - Directs cinematic, high-conversion visual design standards, scroll choreography, asset processing pipeline, and deployment verification.
  - Implements the "no corporate stock filler" copywriting gate, clean architecture (zero build breakages, static asset reliability), and strict self-testing guidelines.

### 1.2 `shadcn-design-principles` Skill (Studio Craft Guide)
- **Rules & Principles Applied**:
  - Radix & Shadcn component aesthetic: clean borders (`1px solid rgba(255,255,255,0.1)`), deep slate-black canvases, crisp monospace badges, and micro-hover states.
  - Functional minimalism: high readability, well-spaced typography, subtle glow highlights rather than overwhelming neon.

### 1.3 `threejs-space-visuals` Skill (3D WebGL Engine)
- **Capabilities**:
  - Procedural starfield generation with depth perception and drift.
  - Procedural & texture-mapped rotating 3D Earth globe with atmospheric Fresnel rim shaders.
  - Device performance optimization: automatic resolution scaling, rAF throttling on idle, mobile touch support.

---

## 2. GitHub Pages Deployment Pipeline
- Static single-repo delivery hosted directly from root `alokrathaur.github.io`.
- Custom domain binding via `CNAME` (`legendprixai.lol`).
- Direct access support for both `/product.html` and `/product/index.html` static routes.
- Zero npm/Node build requirements at runtime, ensuring instant and 100% reliable GitHub Pages previews.
