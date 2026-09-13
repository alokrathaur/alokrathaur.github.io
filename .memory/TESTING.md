# Testing Guide — LegendPrix AI Web App

## Verification Checklist
1. **Local Preview**:
   ```bash
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in browser.
2. **WebGL Test**: Verify 3D globe renders and rotates smoothly without console errors.
3. **Link Integrity**: Click each product card CTA and verify navigation to `/macmint.html`, `/topbump.html`, `/dotmesh.html`, and `/tinyorbiturl.html`.
4. **Mobile Responsiveness**: Verify layout displays correctly at 375px viewport width.
