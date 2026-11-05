// three.js particle field behind the hero, with tween.js easing the camera toward the pointer.
import * as THREE from "three";
import { Tween, Group, Easing } from "@tweenjs/tween.js";
import { reducedMotion, isLight } from "./lazy";

export default function hero3d(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  // Points on a loose "ground" wave plus a drifting cloud.
  const count = window.innerWidth < 640 ? 900 : 1800;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const amber = new THREE.Color("#f0a23b");
  const cyan = new THREE.Color("#3bb6e8");
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 34;
    const z = (Math.random() - 0.5) * 20;
    const y = Math.sin(x * 0.35) * 1.2 + Math.cos(z * 0.4) * 1.1 - 3 + (Math.random() - 0.5) * (i % 4 === 0 ? 10 : 1.2);
    pos.set([x, y, z], i * 3);
    const c = Math.random() < 0.35 ? amber : cyan;
    col.set([c.r, c.g, c.b], i * 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.09,
    vertexColors: true,
    transparent: true,
    opacity: isLight() ? 0.55 : 0.85,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);
  window.addEventListener("themechange", () => (mat.opacity = isLight() ? 0.55 : 0.85));

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  // tween.js: intro dolly, then follow the pointer smoothly.
  const tweens = new Group();
  const target = { x: 0, y: 0, z: 22 };
  const cam = { x: 0, y: 4, z: 22 };
  new Tween(cam, tweens).to({ x: 0, y: 0, z: 14 }, 2200).easing(Easing.Cubic.Out).start();
  let follow: Tween<typeof target> | null = null;
  window.addEventListener("pointermove", (e) => {
    if (reducedMotion()) return;
    target.x = (e.clientX / window.innerWidth - 0.5) * 3;
    target.y = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    follow?.stop();
    follow = new Tween(cam, tweens).to({ x: target.x, y: target.y }, 900).easing(Easing.Quadratic.Out).start();
  });

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
  const clock = new THREE.Clock();
  const tick = (t: number) => {
    requestAnimationFrame(tick);
    if (!visible) return;
    tweens.update(t);
    if (!reducedMotion()) points.rotation.y = clock.getElapsedTime() * 0.03;
    camera.position.set(cam.x, cam.y, cam.z);
    camera.lookAt(0, -1, 0);
    renderer.render(scene, camera);
  };
  requestAnimationFrame(tick);
  canvas.classList.add("opacity-100");
}
