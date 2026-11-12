import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sparkles, Compass } from "lucide-react";

export default function FountainHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [interactiveNotice, setInteractiveNotice] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup with midnight architectural atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061414);
    scene.fog = new THREE.FogExp2(0x061414, 0.045);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    // Position camera on the right to frame nicely next to left text
    const isMobile = width < 768;
    camera.position.set(isMobile ? 0 : 3.2, 3.8, isMobile ? 8.2 : 6.8);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.target.set(isMobile ? 0 : 1.2, 0.6, 0);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xd4e4e1, 0.65);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xdcfce7, 1.8);
    moonLight.position.set(6, 12, 8);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    scene.add(moonLight);

    const warmAccentLight = new THREE.DirectionalLight(0xfef08a, 0.7);
    warmAccentLight.position.set(-6, 8, -5);
    scene.add(warmAccentLight);

    // Submersible cyan & emerald fountain glow
    const fountainCoreLight = new THREE.PointLight(0x38bdf8, 3.5, 9);
    fountainCoreLight.position.set(isMobile ? 0 : 1.2, 1.1, 0);
    scene.add(fountainCoreLight);

    const fountainRimLight = new THREE.PointLight(0x34d399, 2.2, 8);
    fountainRimLight.position.set(isMobile ? 0 : 1.2, 0.4, 0);
    scene.add(fountainRimLight);

    // Offset group for entire fountain
    const fountainGroup = new THREE.Group();
    fountainGroup.position.set(isMobile ? 0 : 1.2, 0, 0);
    scene.add(fountainGroup);

    // ==========================================
    // 6. ARCHITECTURAL FOUNTAIN BASIN TIERS
    // ==========================================
    const darkStoneMat = new THREE.MeshStandardMaterial({
      color: 0x162a28,
      roughness: 0.65,
      metalness: 0.15,
    });

    const honedLimestoneMat = new THREE.MeshStandardMaterial({
      color: 0x223d3a,
      roughness: 0.5,
      metalness: 0.1,
    });

    const marbleRimMat = new THREE.MeshStandardMaterial({
      color: 0x9bc4bd,
      roughness: 0.25,
      metalness: 0.2,
    });

    // Tier 1: Ground Basin (Large Octagonal / Fluted Cylinder)
    const baseGeo = new THREE.CylinderGeometry(2.8, 3.1, 0.45, 36);
    const baseMesh = new THREE.Mesh(baseGeo, darkStoneMat);
    baseMesh.position.y = 0.22;
    baseMesh.receiveShadow = true;
    fountainGroup.add(baseMesh);

    const baseRimGeo = new THREE.TorusGeometry(2.85, 0.1, 16, 48);
    const baseRimMesh = new THREE.Mesh(baseRimGeo, marbleRimMat);
    baseRimMesh.rotation.x = Math.PI / 2;
    baseRimMesh.position.y = 0.46;
    fountainGroup.add(baseRimMesh);

    // Pool water in base
    const baseWaterGeo = new THREE.CylinderGeometry(2.7, 2.7, 0.05, 32);
    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      transmission: 0.7,
      opacity: 0.85,
      transparent: true,
      roughness: 0.08,
      ior: 1.333,
    });
    const baseWaterMesh = new THREE.Mesh(baseWaterGeo, waterMat);
    baseWaterMesh.position.y = 0.42;
    fountainGroup.add(baseWaterMesh);

    // Tier 2: Pedestal Column
    const columnGeo = new THREE.CylinderGeometry(0.55, 0.75, 0.9, 24);
    const columnMesh = new THREE.Mesh(columnGeo, honedLimestoneMat);
    columnMesh.position.y = 0.9;
    fountainGroup.add(columnMesh);

    // Tier 3: Mid Basin Bowl
    const midBowlGeo = new THREE.CylinderGeometry(1.65, 0.85, 0.35, 32);
    const midBowlMesh = new THREE.Mesh(midBowlGeo, darkStoneMat);
    midBowlMesh.position.y = 1.45;
    fountainGroup.add(midBowlMesh);

    const midRimGeo = new THREE.TorusGeometry(1.68, 0.07, 16, 40);
    const midRimMesh = new THREE.Mesh(midRimGeo, marbleRimMat);
    midRimMesh.rotation.x = Math.PI / 2;
    midRimMesh.position.y = 1.63;
    fountainGroup.add(midRimMesh);

    // Tier 4: Upper Pedestal & Finial
    const upperColGeo = new THREE.CylinderGeometry(0.32, 0.45, 0.7, 20);
    const upperColMesh = new THREE.Mesh(upperColGeo, honedLimestoneMat);
    upperColMesh.position.y = 1.95;
    fountainGroup.add(upperColMesh);

    const topBowlGeo = new THREE.CylinderGeometry(0.85, 0.4, 0.24, 28);
    const topBowlMesh = new THREE.Mesh(topBowlGeo, darkStoneMat);
    topBowlMesh.position.y = 2.35;
    fountainGroup.add(topBowlMesh);

    // Top Crown Spire Nozzle
    const spireGeo = new THREE.ConeGeometry(0.2, 0.45, 16);
    const spireMesh = new THREE.Mesh(spireGeo, marbleRimMat);
    spireMesh.position.y = 2.65;
    fountainGroup.add(spireMesh);

    // Surrounding Paver Terrace Platform
    const terraceGeo = new THREE.CylinderGeometry(4.6, 4.8, 0.1, 40);
    const terraceMat = new THREE.MeshStandardMaterial({
      color: 0x0a1c1b,
      roughness: 0.9,
    });
    const terraceMesh = new THREE.Mesh(terraceGeo, terraceMat);
    terraceMesh.position.y = -0.05;
    terraceMesh.receiveShadow = true;
    fountainGroup.add(terraceMesh);

    // ==========================================
    // 7. DYNAMIC PARTICLES (Fountain Water Jets)
    // ==========================================
    // Central jet: Vertical rising & falling spray
    const centralCount = 450;
    const centralGeo = new THREE.BufferGeometry();
    const centralPositions = new Float32Array(centralCount * 3);
    const centralVelocities = new Float32Array(centralCount * 3);

    for (let i = 0; i < centralCount; i++) {
      const idx = i * 3;
      centralPositions[idx] = (Math.random() - 0.5) * 0.08;
      centralPositions[idx + 1] = 2.75 + Math.random() * 0.2;
      centralPositions[idx + 2] = (Math.random() - 0.5) * 0.08;

      centralVelocities[idx] = (Math.random() - 0.5) * 0.02;
      centralVelocities[idx + 1] = 0.045 + Math.random() * 0.035;
      centralVelocities[idx + 2] = (Math.random() - 0.5) * 0.02;
    }

    centralGeo.setAttribute("position", new THREE.BufferAttribute(centralPositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xbae6fd,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const centralJet = new THREE.Points(centralGeo, particleMat);
    fountainGroup.add(centralJet);

    // Perimeter Arching Jets (8 Arcs jumping outward into base)
    const arcCount = 650;
    const arcGeo = new THREE.BufferGeometry();
    const arcPositions = new Float32Array(arcCount * 3);
    const arcVelocities = new Float32Array(arcCount * 3);
    const arcLifetimes = new Float32Array(arcCount);

    for (let i = 0; i < arcCount; i++) {
      const idx = i * 3;
      const angle = (i % 8) * (Math.PI / 4) + (Math.random() - 0.5) * 0.15;
      const speed = 0.028 + Math.random() * 0.012;

      arcPositions[idx] = Math.cos(angle) * 0.7;
      arcPositions[idx + 1] = 2.3;
      arcPositions[idx + 2] = Math.sin(angle) * 0.7;

      arcVelocities[idx] = Math.cos(angle) * speed;
      arcVelocities[idx + 1] = 0.038 + Math.random() * 0.015;
      arcVelocities[idx + 2] = Math.sin(angle) * speed;

      arcLifetimes[i] = Math.random();
    }

    arcGeo.setAttribute("position", new THREE.BufferAttribute(arcPositions, 3));

    const arcMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.048,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
    });

    const arcJets = new THREE.Points(arcGeo, arcMat);
    fountainGroup.add(arcJets);

    // Mid-tier Overflow Droplets (Cascade Sheet)
    const cascadeCount = 500;
    const cascadeGeo = new THREE.BufferGeometry();
    const cascadePositions = new Float32Array(cascadeCount * 3);
    const cascadeVelocities = new Float32Array(cascadeCount * 3);

    for (let i = 0; i < cascadeCount; i++) {
      const idx = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.62 + (Math.random() - 0.5) * 0.05;

      cascadePositions[idx] = Math.cos(angle) * radius;
      cascadePositions[idx + 1] = 1.58 - Math.random() * 1.1;
      cascadePositions[idx + 2] = Math.sin(angle) * radius;

      cascadeVelocities[idx] = (Math.random() - 0.5) * 0.005;
      cascadeVelocities[idx + 1] = -0.02 - Math.random() * 0.025;
      cascadeVelocities[idx + 2] = (Math.random() - 0.5) * 0.005;
    }

    cascadeGeo.setAttribute("position", new THREE.BufferAttribute(cascadePositions, 3));
    const cascadePoints = new THREE.Points(cascadeGeo, particleMat);
    fountainGroup.add(cascadePoints);

    // Floating Ambient Light Orbs (Dreamy water shimmer)
    const orbsCount = 60;
    const orbsGeo = new THREE.BufferGeometry();
    const orbsPos = new Float32Array(orbsCount * 3);
    for (let i = 0; i < orbsCount; i++) {
      orbsPos[i * 3] = (Math.random() - 0.5) * 8;
      orbsPos[i * 3 + 1] = Math.random() * 4.5 + 0.2;
      orbsPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    orbsGeo.setAttribute("position", new THREE.BufferAttribute(orbsPos, 3));
    const orbsMat = new THREE.PointsMaterial({
      color: 0x9bc4bd,
      size: 0.09,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const orbsPoints = new THREE.Points(orbsGeo, orbsMat);
    scene.add(orbsPoints);

    // ==========================================
    // 8. ANIMATION LOOP
    // ==========================================
    let animFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      controls.update();

      const elapsed = clock.getElapsedTime();

      // Dynamic light pulsing
      fountainCoreLight.intensity = 3.2 + Math.sin(elapsed * 2.5) * 0.6;
      fountainRimLight.intensity = 2.0 + Math.cos(elapsed * 3.1) * 0.5;

      // Update central jet spray
      const cPos = centralGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < centralCount; i++) {
        const idx = i * 3;
        cPos[idx] += centralVelocities[idx];
        cPos[idx + 1] += centralVelocities[idx + 1];
        cPos[idx + 2] += centralVelocities[idx + 2];

        // gravity
        centralVelocities[idx + 1] -= 0.0016;

        // reset when falling below basin
        if (cPos[idx + 1] < 2.3) {
          cPos[idx] = (Math.random() - 0.5) * 0.06;
          cPos[idx + 1] = 2.75;
          cPos[idx + 2] = (Math.random() - 0.5) * 0.06;
          centralVelocities[idx + 1] = 0.045 + Math.random() * 0.032;
        }
      }
      centralGeo.attributes.position.needsUpdate = true;

      // Update perimeter arching jets
      const aPos = arcGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < arcCount; i++) {
        const idx = i * 3;
        const angle = (i % 8) * (Math.PI / 4);

        aPos[idx] += arcVelocities[idx];
        aPos[idx + 1] += arcVelocities[idx + 1];
        aPos[idx + 2] += arcVelocities[idx + 2];

        // gravity
        arcVelocities[idx + 1] -= 0.0014;

        // reset when hitting bottom basin
        if (aPos[idx + 1] < 0.45) {
          aPos[idx] = Math.cos(angle) * 0.75 + (Math.random() - 0.5) * 0.05;
          aPos[idx + 1] = 2.32;
          aPos[idx + 2] = Math.sin(angle) * 0.75 + (Math.random() - 0.5) * 0.05;

          const speed = 0.026 + Math.random() * 0.01;
          arcVelocities[idx] = Math.cos(angle) * speed;
          arcVelocities[idx + 1] = 0.036 + Math.random() * 0.012;
          arcVelocities[idx + 2] = Math.sin(angle) * speed;
        }
      }
      arcGeo.attributes.position.needsUpdate = true;

      // Update mid cascade
      const casPos = cascadeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < cascadeCount; i++) {
        const idx = i * 3;
        casPos[idx + 1] += cascadeVelocities[idx + 1];
        if (casPos[idx + 1] < 0.44) {
          const angle = Math.random() * Math.PI * 2;
          casPos[idx] = Math.cos(angle) * 1.63;
          casPos[idx + 1] = 1.58;
          casPos[idx + 2] = Math.sin(angle) * 1.63;
        }
      }
      cascadeGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {interactiveNotice && (
        <div className="absolute top-28 right-6 z-10 flex items-center gap-2 bg-stone-950/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/30 text-[11px] font-sans text-teal-200/90 shadow-lg pointer-events-auto">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Click & drag to rotate 3D fountain</span>
          <button
            onClick={() => setInteractiveNotice(false)}
            className="ml-1 text-stone-400 hover:text-white"
            aria-label="Dismiss 3D hint"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
