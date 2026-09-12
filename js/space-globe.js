/**
 * LegendPrix AI — Photorealistic Solar System & Scroll-Driven Cosmic Engine
 * Built with Three.js (WebGL)
 * 
 * Features:
 * 1. Photorealistic Earth (Half size, NASA Blue Marble textures, real cloud layer, ocean specular map, subtle atmospheric haze).
 * 2. Complete Solar System:
 *    - Sun (radiant glowing star, point light + corona)
 *    - Mercury
 *    - Venus
 *    - Earth (with Moon)
 *    - Mars (red planet)
 *    - Jupiter (banded gas giant)
 *    - Saturn (with authentic rings!)
 *    - Uranus (cyan ice giant)
 *    - (Neptune & Pluto excluded as requested)
 * 3. Scroll-Driven Cinematic Journey:
 *    - As user scrolls down, Earth recedes and camera glides through the planets in order:
 *      Earth -> Mars -> Jupiter -> Saturn (with rings) -> Uranus!
 * 4. Interactive touch/drag rotation and starfield depth parallax.
 */

(function () {
  function initSolarSystem() {
    const container = document.getElementById('space-container');
    if (!container || typeof THREE === 'undefined') return;

    // Remove any previous canvas if reloaded
    const existing = document.getElementById('space-canvas');
    if (existing) existing.remove();

    // ─── SCENE, CAMERA, RENDERER ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.set(0, 0, 210);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.id = 'space-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    container.appendChild(canvas);

    // ─── TEXTURE LOADER ───
    const textureLoader = new THREE.TextureLoader();
    
    // Fallback texture helper if an image is loading
    function getSafeTexture(url) {
      return textureLoader.load(url, undefined, undefined, () => {
        console.warn('Could not load texture from ' + url);
      });
    }

    // ─── SOLAR SYSTEM GROUP ───
    const solarSystemGroup = new THREE.Group();
    scene.add(solarSystemGroup);

    // ─── LIGHTING & SUN ───
    // Ambient cosmic starlight
    const ambientLight = new THREE.AmbientLight(0x182030, 0.95);
    scene.add(ambientLight);

    // Primary Sun Light (PointLight radiating from Sun position)
    const sunLight = new THREE.PointLight(0xfff8e7, 3.8, 2500, 0.5);
    solarSystemGroup.add(sunLight);

    // Directional Sun Keylight for sharp planet terminator lines
    const sunDirLight = new THREE.DirectionalLight(0xfff3d6, 2.2);
    solarSystemGroup.add(sunDirLight);

    // 1. THE SUN (Ultra-Realistic 2K Solar Surface & Multi-Layer Corona)
    const sunRadius = 42;
    const sunGeo = new THREE.SphereGeometry(sunRadius, 64, 64);
    const sunTex = getSafeTexture('images/planets/sunmap.jpg');
    sunTex.wrapS = THREE.RepeatWrapping;
    sunTex.wrapT = THREE.ClampToEdgeWrapping;
    
    // Pure white multiplication ensures authentic 2K NASA granules and magnetic flares shine through
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      color: 0xffffff
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    const sunPos = new THREE.Vector3(-220, 110, -140);
    sunMesh.position.copy(sunPos);
    sunLight.position.copy(sunPos);
    sunDirLight.position.copy(sunPos);
    solarSystemGroup.add(sunMesh);

    // Inner Chromosphere Layer (Fiery Solar Limb Glow)
    const chromoGeo = new THREE.SphereGeometry(sunRadius * 1.05, 48, 48);
    const chromoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          // Fiery gold-orange solar rim
          gl_FragColor = vec4(1.0, 0.48, 0.08, 1.0) * intensity * 1.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const chromoMesh = new THREE.Mesh(chromoGeo, chromoMat);
    chromoMesh.position.copy(sunPos);
    solarSystemGroup.add(chromoMesh);

    // Outer Coronal Atmosphere (Ethereal Expanding Plasma Haze)
    const coronaGeo = new THREE.SphereGeometry(sunRadius * 1.38, 48, 48);
    const coronaMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
          gl_FragColor = vec4(1.0, 0.75, 0.28, 1.0) * intensity * 1.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.position.copy(sunPos);
    solarSystemGroup.add(coronaMesh);

    // Solar Radiant Lens Flare (Billboard Sprite for Cinematic Star Luminosity)
    function createSunFlareTexture() {
      const cvs = document.createElement('canvas');
      cvs.width = 256;
      cvs.height = 256;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.15, 'rgba(255, 220, 120, 0.85)');
      grad.addColorStop(0.4, 'rgba(255, 140, 30, 0.35)');
      grad.addColorStop(0.7, 'rgba(255, 80, 10, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(cvs);
    }
    const flareMat = new THREE.SpriteMaterial({
      map: createSunFlareTexture(),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });
    const flareSprite = new THREE.Sprite(flareMat);
    flareSprite.position.copy(sunPos);
    flareSprite.scale.set(sunRadius * 4.2, sunRadius * 4.2, 1);
    solarSystemGroup.add(flareSprite);

    // 2. MERCURY
    const mercuryRadius = 7;
    const mercuryGeo = new THREE.SphereGeometry(mercuryRadius, 32, 32);
    const mercuryTex = getSafeTexture('images/planets/mercurymap.jpg');
    const mercuryMat = new THREE.MeshStandardMaterial({
      map: mercuryTex,
      roughness: 0.9,
      metalness: 0.1
    });
    const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
    mercuryMesh.position.set(-130, 65, -80);
    solarSystemGroup.add(mercuryMesh);

    // 3. VENUS
    const venusRadius = 14;
    const venusGeo = new THREE.SphereGeometry(venusRadius, 32, 32);
    const venusTex = getSafeTexture('images/planets/venusmap.jpg');
    const venusMat = new THREE.MeshStandardMaterial({
      map: venusTex,
      roughness: 0.7,
      metalness: 0.05
    });
    const venusMesh = new THREE.Mesh(venusGeo, venusMat);
    venusMesh.position.set(-65, 35, -20);
    solarSystemGroup.add(venusMesh);

    // 4. EARTH (Photorealistic, Half Size: Radius 26)
    const earthGroup = new THREE.Group();
    // 23.5° axial tilt
    earthGroup.rotation.z = (23.5 * Math.PI) / 180;
    solarSystemGroup.add(earthGroup);

    const earthRadius = 26; // Half size as requested (was 54)
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTex = getSafeTexture('images/planets/earth_atmos_2048.jpg');
    const earthSpecTex = getSafeTexture('images/planets/earth_specular_2048.jpg');

    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTex,
      specularMap: earthSpecTex,
      specular: new THREE.Color(0x284868), // Soft realistic ocean specular reflection
      shininess: 24,
      bumpScale: 0.05
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Earth Realistic Cloud Layer
    const cloudRadius = earthRadius + 0.35;
    const cloudGeo = new THREE.SphereGeometry(cloudRadius, 64, 64);
    const cloudTex = getSafeTexture('images/planets/earth_clouds_1024.png');
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    // Delicate Atmospheric Rim Glow (Subtle & Photorealistic)
    const atmoGeo = new THREE.SphereGeometry(earthRadius + 1.8, 48, 48);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float intensity = pow(0.68 - dot(vNormal, viewDir), 3.2);
          vec3 atmosphereColor = vec3(0.24, 0.62, 0.98); // soft cyan blue
          gl_FragColor = vec4(atmosphereColor, intensity * 0.75);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    earthGroup.add(atmoMesh);

    // 5. MARS (Red Planet)
    const marsRadius = 16;
    const marsGeo = new THREE.SphereGeometry(marsRadius, 48, 48);
    const marsTex = getSafeTexture('images/planets/marsmap1k.jpg');
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex,
      roughness: 0.82,
      metalness: 0.1
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.rotation.z = (25.2 * Math.PI) / 180; // Mars axial tilt
    solarSystemGroup.add(marsMesh);

    // 6. JUPITER (King of Planets)
    const jupiterRadius = 38;
    const jupiterGeo = new THREE.SphereGeometry(jupiterRadius, 64, 64);
    const jupiterTex = getSafeTexture('images/planets/jupitermap.jpg');
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterTex,
      roughness: 0.75,
      metalness: 0.05
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.rotation.z = (3.1 * Math.PI) / 180;
    solarSystemGroup.add(jupiterMesh);

    // 7. SATURN WITH AUTHENTIC RINGS
    const saturnGroup = new THREE.Group();
    saturnGroup.rotation.z = (26.7 * Math.PI) / 180; // Saturn axial tilt
    solarSystemGroup.add(saturnGroup);

    const saturnRadius = 30;
    const saturnGeo = new THREE.SphereGeometry(saturnRadius, 64, 64);
    const saturnTex = getSafeTexture('images/planets/saturnmap.jpg');
    const saturnMat = new THREE.MeshStandardMaterial({
      map: saturnTex,
      roughness: 0.8,
      metalness: 0.05
    });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnGroup.add(saturnMesh);

    // Saturn's Rings
    const ringInnerR = saturnRadius * 1.35;
    const ringOuterR = saturnRadius * 2.35;
    const ringGeo = new THREE.RingGeometry(ringInnerR, ringOuterR, 64);

    // Map the radial ring pattern UVs properly across RingGeometry
    const pos = ringGeo.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      const u = (v3.length() - ringInnerR) / (ringOuterR - ringInnerR);
      ringGeo.attributes.uv.setXY(i, u, 0.5);
    }

    const ringTex = getSafeTexture('images/planets/saturnringpattern.png');
    ringTex.rotation = 0;
    const ringMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92
    });
    const saturnRing = new THREE.Mesh(ringGeo, ringMat);
    saturnRing.rotation.x = Math.PI / 2 + 0.35; // Tilts ring plane
    saturnGroup.add(saturnRing);

    // 8. URANUS (Cyan Ice Giant)
    const uranusRadius = 22;
    const uranusGeo = new THREE.SphereGeometry(uranusRadius, 48, 48);
    const uranusTex = getSafeTexture('images/planets/uranusmap.jpg');
    const uranusMat = new THREE.MeshStandardMaterial({
      map: uranusTex,
      color: 0x88e2f8, // Crisp cyan glow
      roughness: 0.65,
      metalness: 0.1
    });
    const uranusMesh = new THREE.Mesh(uranusGeo, uranusMat);
    // Uranus famous 98° tilt
    uranusMesh.rotation.z = (97.8 * Math.PI) / 180;
    solarSystemGroup.add(uranusMesh);

    // (Note: Neptune & Pluto deliberately excluded as requested)

    // ─── 3D DEEP SPACE STARFIELD ───
    const starCount = 1600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPositions[idx] = (Math.random() - 0.5) * 2200;
      starPositions[idx + 1] = (Math.random() - 0.5) * 1600;
      starPositions[idx + 2] = (Math.random() - 0.5) * 1200 - 150;

      const choice = Math.random();
      if (choice > 0.82) {
        starColors[idx] = 0.22; starColors[idx + 1] = 0.74; starColors[idx + 2] = 0.97;
      } else if (choice > 0.65) {
        starColors[idx] = 0.65; starColors[idx + 1] = 0.55; starColors[idx + 2] = 0.98;
      } else {
        starColors[idx] = 0.96; starColors[idx + 1] = 0.96; starColors[idx + 2] = 1.0;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starCvs = document.createElement('canvas');
    starCvs.width = 32;
    starCvs.height = 32;
    const sctx = starCvs.getContext('2d');
    const sgrad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    sgrad.addColorStop(0, 'rgba(255,255,255,1)');
    sgrad.addColorStop(0.35, 'rgba(255,255,255,0.7)');
    sgrad.addColorStop(1, 'rgba(255,255,255,0)');
    sctx.fillStyle = sgrad;
    sctx.fillRect(0, 0, 32, 32);
    const starTex = new THREE.CanvasTexture(starCvs);

    const starMat = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      map: starTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ─── SCROLL CHOREOGRAPHY ENGINE ───
    // Controls position of Earth and discovery of other planets as user scrolls down
    let scrollProgress = 0;
    let smoothScroll = 0;

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Helper: Linear interpolation
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    // Interactive Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedY = 0.002;
    let rotSpeedX = 0;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    window.addEventListener('mousedown', (e) => {
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      mouseParallaxX = (e.clientX / window.innerWidth - 0.5) * 10;
      mouseParallaxY = (e.clientY / window.innerHeight - 0.5) * 6;

      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      rotSpeedY = dx * 0.003;
      rotSpeedX = dy * 0.002;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch support for mobile
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1 && !['A', 'BUTTON'].includes(e.target.tagName)) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevMouseX;
        const dy = e.touches[0].clientY - prevMouseY;
        rotSpeedY = dx * 0.004;
        rotSpeedX = dy * 0.003;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    // Responsive Canvas Resizing
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ─── RENDER & ANIMATION LOOP ───
    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      // Smooth scroll interpolation (eased)
      smoothScroll += (scrollProgress - smoothScroll) * 0.06;

      // Rotate planets on their respective axes
      sunMesh.rotation.y += 0.0012;
      if (sunTex) sunTex.offset.x += 0.00015; // Dynamic churn of solar granules
      if (typeof coronaMesh !== 'undefined') coronaMesh.rotation.z -= 0.0006;
      mercuryMesh.rotation.y += 0.0018;
      venusMesh.rotation.y -= 0.0014;
      earthMesh.rotation.y += rotSpeedY;
      cloudMesh.rotation.y += rotSpeedY * 1.18; // Clouds drift faster than land
      marsMesh.rotation.y += 0.0022;
      jupiterMesh.rotation.y += 0.0035; // Jupiter rotates fast
      saturnMesh.rotation.y += 0.003;
      uranusMesh.rotation.x += 0.002; // Uranus rolls on side

      // Drag inertia return to gentle constant drift
      if (!isDragging) {
        rotSpeedY += (0.0016 - rotSpeedY) * 0.04;
        rotSpeedX *= 0.93;
      }
      earthMesh.rotation.x += rotSpeedX;

      // Starfield subtle slow drift
      starField.rotation.y -= 0.0002;

      // ─── DYNAMIC SOLAR SYSTEM SCROLL CHOREOGRAPHY ───
      // Desktop vs mobile viewport layout
      const isDesktop = window.innerWidth > 960;
      const baseEarthX = isDesktop ? 38 : 0;
      const baseEarthY = isDesktop ? 4 : 22;

      // 1. Earth:
      // At Hero (scroll 0.0): crisp half-size Earth on right-hand side.
      // As scroll proceeds to 0.4+: Earth moves back in Z and shifts left into its orbit.
      const earthScrollFactor = Math.min(smoothScroll * 2.2, 1);
      earthGroup.position.x = lerp(baseEarthX, -65, earthScrollFactor);
      earthGroup.position.y = lerp(baseEarthY, 45, earthScrollFactor);
      earthGroup.position.z = lerp(90, -110, earthScrollFactor);
      const earthScale = lerp(1, 0.42, earthScrollFactor);
      earthGroup.scale.set(earthScale, earthScale, earthScale);

      // 2. Mars:
      // Starts behind, swings into prime view between scroll 0.20 and 0.50
      const marsProgress = Math.min(Math.max((smoothScroll - 0.12) / 0.35, 0), 1);
      const marsExit = Math.min(Math.max((smoothScroll - 0.47) / 0.3, 0), 1);
      marsMesh.position.x = lerp(130, isDesktop ? 35 : 0, marsProgress) - (marsExit * 70);
      marsMesh.position.y = lerp(-40, isDesktop ? -4 : 15, marsProgress) + (marsExit * 30);
      marsMesh.position.z = lerp(-80, 80, marsProgress) - (marsExit * 140);
      const marsScale = lerp(0.3, 1.1, marsProgress) * (1 - marsExit * 0.4);
      marsMesh.scale.set(marsScale, marsScale, marsScale);

      // 3. Jupiter:
      // Enters during Products section (scroll 0.40 to 0.72)
      const jupProgress = Math.min(Math.max((smoothScroll - 0.38) / 0.32, 0), 1);
      const jupExit = Math.min(Math.max((smoothScroll - 0.70) / 0.25, 0), 1);
      jupiterMesh.position.x = lerp(160, isDesktop ? 42 : 0, jupProgress) - (jupExit * 80);
      jupiterMesh.position.y = lerp(-60, isDesktop ? 0 : 10, jupProgress) + (jupExit * 25);
      jupiterMesh.position.z = lerp(-120, 60, jupProgress) - (jupExit * 150);
      const jupScale = lerp(0.2, 1.0, jupProgress) * (1 - jupExit * 0.35);
      jupiterMesh.scale.set(jupScale, jupScale, jupScale);

      // 4. Saturn (with rings!):
      // Emerges gloriously during scroll 0.65 to 0.90
      const saturnProgress = Math.min(Math.max((smoothScroll - 0.62) / 0.28, 0), 1);
      const saturnExit = Math.min(Math.max((smoothScroll - 0.88) / 0.2, 0), 1);
      saturnGroup.position.x = lerp(170, isDesktop ? 36 : 0, saturnProgress) - (saturnExit * 50);
      saturnGroup.position.y = lerp(-50, isDesktop ? 6 : 8, saturnProgress) + (saturnExit * 20);
      saturnGroup.position.z = lerp(-140, 65, saturnProgress) - (saturnExit * 100);
      const saturnScale = lerp(0.15, 1.05, saturnProgress) * (1 - saturnExit * 0.3);
      saturnGroup.scale.set(saturnScale, saturnScale, saturnScale);

      // 5. Uranus:
      // Emerges at the bottom/footer (scroll 0.82 to 1.0)
      const uranusProgress = Math.min(Math.max((smoothScroll - 0.78) / 0.22, 0), 1);
      uranusMesh.position.x = lerp(140, isDesktop ? 40 : 0, uranusProgress);
      uranusMesh.position.y = lerp(-40, isDesktop ? -2 : 12, uranusProgress);
      uranusMesh.position.z = lerp(-120, 75, uranusProgress);
      const uranusScale = lerp(0.2, 1.1, uranusProgress);
      uranusMesh.scale.set(uranusScale, uranusScale, uranusScale);

      // Camera parallax
      camera.position.x += (mouseParallaxX - camera.position.x) * 0.04;
      camera.position.y += (-mouseParallaxY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();
  }

  // Ensure Three.js is loaded
  if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = initSolarSystem;
    document.head.appendChild(script);
  } else {
    initSolarSystem();
  }
})();
