import { useEffect, useRef } from "react";
import * as THREE from "three";

// Full-width interactive 3D scene: a layered wireframe icosahedron core
// surrounded by a drifting point field. The whole group tilts toward the
// cursor (parallax) and keeps a slow idle rotation so it never looks static.
export default function Hero3D({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.055);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---- Signature geometry: nested wireframe icosahedra ----
    const group = new THREE.Group();

    const outerGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x7b61ff,
      transparent: true,
      opacity: 0.55,
    });
    const outer = new THREE.LineSegments(outerEdges, outerMat);
    group.add(outer);

    const innerGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0x39d3c3,
      transparent: true,
      opacity: 0.4,
    });
    const inner = new THREE.LineSegments(innerEdges, innerMat);
    inner.rotation.set(0.6, 0.4, 0);
    group.add(inner);

    // faint filled core so the wireframe reads as solid, not just lines
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x12131a,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), coreMat);
    group.add(core);

    scene.add(group);

    // ---- Drifting particle field ----
    const PARTICLE_COUNT = 420;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 4 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x9c87ff,
      size: 0.028,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- Mouse-reactive parallax ----
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function handlePointerMove(e) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    function handleResize() {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", handleResize);

    let rafId;
    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();

      target.x += (pointer.y * 0.5 - target.x) * 0.04;
      target.y += (pointer.x * 0.6 - target.y) * 0.04;

      const idleSpin = prefersReducedMotion ? 0 : elapsed * 0.08;
      group.rotation.x = target.x + Math.sin(elapsed * 0.15) * 0.05;
      group.rotation.y = idleSpin + target.y;
      inner.rotation.x -= 0.0009;
      inner.rotation.y += 0.0013;

      particles.rotation.y = prefersReducedMotion ? 0 : elapsed * 0.015;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      outerGeo.dispose();
      outerEdges.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerEdges.dispose();
      innerMat.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
    />
  );
}
