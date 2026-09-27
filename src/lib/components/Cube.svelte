<script lang="ts">
 import { onMount } from 'svelte';
 let { size = 220, floating = true }: { size?: number; floating?: boolean } = $props();
 let host: HTMLDivElement;
 let ready = $state(false);
 onMount(() => {
  let stopped = false;
  let cleanup = () => {};
  let started = false;
  async function start() {
   if (started) return;
   started = true;
   try {
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
    if (stopped) return;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(0, .55, 6.2); camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x536b61, 2.8));
    const key = new THREE.DirectionalLight(0xffffff, 3.4); key.position.set(-3, 5, 5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xd7fff3, 1.6); fill.position.set(4, 2, -3); scene.add(fill);
    const group = new THREE.Group(); scene.add(group);
    let model: import('three').Group | undefined;
    let frame = 0;
    let visible = true;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    function draw(time = 0) {
     frame = 0;
     if (stopped) return;
     const animate = floating && visible && !document.hidden && !preference.matches && !document.documentElement.classList.contains('motion-paused');
     group.rotation.y = -.46 + (animate ? Math.sin(time / 3800) * .22 : 0);
     group.rotation.x = .1;
     group.position.y = animate ? Math.sin(time / 2200) * .055 : 0;
     renderer.render(scene, camera);
     if (animate) frame = requestAnimationFrame(draw);
    }
    function resume() { if (!frame) frame = requestAnimationFrame(draw); }
    const resize = new ResizeObserver(() => { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); resume(); });
    resize.observe(host);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) resume(); else { cancelAnimationFrame(frame); frame = 0; } }); observer.observe(host);
    const pause = new MutationObserver(resume); pause.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    preference.addEventListener('change', resume); document.addEventListener('visibilitychange', resume);
    cleanup = () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); pause.disconnect(); preference.removeEventListener('change', resume); document.removeEventListener('visibilitychange', resume); model?.traverse(obj => { if (obj instanceof THREE.Mesh) { obj.geometry.dispose(); const materials = Array.isArray(obj.material) ? obj.material : [obj.material]; materials.forEach(m => m.dispose()); } }); renderer.dispose(); renderer.domElement.remove(); };
    const gltf = await new GLTFLoader().loadAsync('/models/nex-playground.glb');
    model = gltf.scene;
    if (stopped) { model.traverse(obj => { if (obj instanceof THREE.Mesh) obj.geometry.dispose(); }); return; }
    model.traverse(obj => {
     if (!(obj instanceof THREE.Mesh)) return;
     const name = obj.name.toLowerCase();
     if (name === 'hit_box' || name === 'light_bloom') { obj.visible = false; return; }
     let color = 0xe8e9e6;
     if (name === 'top') color = 0x76cfc0;
     if (name === 'top_corner' || name === 'bottom') color = 0xf0e775;
     if (['camera_body','eye','lens','hdmi','usbc','inside_bottom'].includes(name)) color = 0x15191a;
     obj.material = new THREE.MeshStandardMaterial({ color, roughness: name === 'lens' ? .1 : .62, metalness: name === 'lens' ? .4 : .02, ...(name === 'light' ? { color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2 } : {}) });
    });
    group.add(model); ready = true; resume();
   } catch { /* The inline illustration remains available without WebGL. */ }
  }
  const lazy = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { void start(); lazy.disconnect(); } }, { rootMargin: '300px' }); lazy.observe(host);
  return () => { stopped = true; lazy.disconnect(); cleanup(); };
 });
</script>
<div class="scene" class:ready style={`--s:${size}px`} aria-label="Nex Playground console" role="img">
 <div class="model" bind:this={host}></div>
 <svg class="fallback" viewBox="0 0 240 240" aria-hidden="true"><path fill="#92d7ca" d="M35 60 150 35 211 63 101 89Z"/><path fill="#79cabb" d="M101 89 211 63v82l-110 28Z"/><path fill="#eee578" d="M35 60 101 89v84l-66-29Z"/><path fill="#eee" d="m35 144 66 29v59l-66-29Z"/><path fill="#d5d8d4" d="m101 173 110-28v59l-110 28Z"/><ellipse cx="65" cy="108" rx="15" ry="19" fill="#161a1c"/><ellipse cx="65" cy="108" rx="8" ry="11" fill="#303d47"/><path d="m135 116 20-5" stroke="white" stroke-width="5" stroke-linecap="round"/></svg>
 <div class="shadow"></div>
</div>
<style>
 .scene{width:var(--s);max-width:100%;height:calc(var(--s) * 1.35);position:relative;margin-inline:auto;isolation:isolate}.model{position:absolute;inset:0 0 12%;z-index:1}.model :global(canvas){width:100%;height:100%;display:block}.fallback{position:absolute;width:82%;inset:4% 9% 14%;height:76%}.ready .fallback{visibility:hidden}.shadow{position:absolute;bottom:9%;left:15%;width:70%;height:11%;background:radial-gradient(ellipse,#003c5045,transparent 70%);border-radius:50%}
</style>
