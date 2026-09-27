import { tick } from 'svelte';
/** A decorative spring at section boundaries. It never captures scrolling or clicks. */
export function elasticEdges(node: HTMLElement) {
 const fine = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
 const ns = 'http://www.w3.org/2000/svg';
 type Edge = { section: HTMLElement; previous: HTMLElement; svg: SVGSVGElement; path: SVGPathElement; shade: SVGPathElement; crease: SVGPathElement; gradient: SVGLinearGradientElement; position: string };
 let edges: Edge[] = [];
 let active: Edge | undefined;
 let x = 0, depth = 0, target = 0, velocity = 0, frame = 0, engaged = 0;
 let disposed = false;
 const paused = () => !fine.matches || document.documentElement.classList.contains('motion-paused');
 function color(element: HTMLElement | null): string {
  while (element) {
   if (element.classList.contains('hero')) return '#e7d9c8';
   const bg = getComputedStyle(element).backgroundColor;
   if (bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') return bg;
   element = element.parentElement;
  }
  return '#ededed';
 }
 function render() {
  frame = 0;
  if (!active) return;
  if (paused() || performance.now() - engaged > 1400) { target = 0; node.style.removeProperty('cursor'); }
  velocity = (velocity + (target - depth) * .13) * .73;
  depth += velocity;
  const w = active.section.clientWidth;
  const radius = Math.min(440, w * .4);
  const left = Math.max(0, x-radius), right = Math.min(w,x+radius);
  const bend = Math.max(-210, Math.min(210,depth));
  active.svg.style.top = `${active.section.getBoundingClientRect().top - 240}px`;
  const curve = `M${left} 240 C${x-radius*.5} 240 ${x-radius*.34} ${240+bend} ${x} ${240+bend} C${x+radius*.34} ${240+bend} ${x+radius*.5} 240 ${right} 240`;
  const shape = `${curve} L${left} 240 Z`;
  active.path.setAttribute('fill',color(bend >= 0 ? active.previous : active.section));
  active.path.setAttribute('d',shape); active.shade.setAttribute('d',shape);
  active.gradient.setAttribute('y1',String(240));active.gradient.setAttribute('y2',String(240+bend));
  active.crease.setAttribute('d',curve);
  active.shade.style.opacity=String(Math.min(1,Math.abs(bend)/90));
  active.crease.style.opacity=String(Math.min(.6,Math.abs(bend)/150));
  if (Math.abs(depth) > .15 || Math.abs(velocity) > .15 || target !== 0) frame = requestAnimationFrame(render);
  else { active.svg.style.visibility = 'hidden'; active = undefined; depth = 0; velocity = 0; }
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(render);}
 function release(){target=0;node.style.removeProperty('cursor');schedule();}
 function move(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || paused()) return;
  if (active) {
   const box = active.section.getBoundingClientRect();
   const distance = event.clientY - box.top;
   if (Math.abs(distance)>260 || performance.now()-engaged>1400) { release(); return; }
   target = Math.max(-190,Math.min(190,distance*1.2));
   x += (event.clientX-box.left-x)*.2;
   schedule(); return;
  }
  const edge = edges.find(e=>Math.abs(e.section.getBoundingClientRect().top-event.clientY)<26);
  if (!edge || (event.target instanceof Element && event.target.closest('a,button,summary,input,header'))) return;
  active=edge;engaged=performance.now();x=event.clientX-edge.section.getBoundingClientRect().left;
  edge.path.setAttribute('fill',color(edge.previous));edge.svg.style.visibility='visible';target=event.clientY-edge.section.getBoundingClientRect().top < 0 ? -24 : 24;
  node.style.cursor='grab';schedule();
 }
 function preference(){if(paused()){release();edges.forEach(e=>e.svg.style.visibility='hidden');}}
 function setup(){
  if(disposed)return;
  cancelAnimationFrame(frame);frame=0;active=undefined;depth=0;velocity=0;target=0;node.style.removeProperty('cursor');
  edges.forEach(e=>{e.svg.remove();e.section.style.position=e.position;});edges=[];
  const sections=Array.from(node.querySelectorAll<HTMLElement>(':scope > section'));
  sections.forEach((section,i)=>{
   if(!i)return;
   const svg=document.createElementNS(ns,'svg');const path=document.createElementNS(ns,'path');
   const defs=document.createElementNS(ns,'defs');const gradient=document.createElementNS(ns,'linearGradient');
   const gradientId=`sheet-fold-${i}`;gradient.id=gradientId;gradient.setAttribute('gradientUnits','userSpaceOnUse');gradient.setAttribute('x1','0');gradient.setAttribute('x2','0');
   [['0%','#001a20','0'],['38%','#001a20','.18'],['76%','#ffffff','.12'],['100%','#ffffff','.55']].forEach(([offset,fill,opacity])=>{const stop=document.createElementNS(ns,'stop');stop.setAttribute('offset',offset);stop.setAttribute('stop-color',fill);stop.setAttribute('stop-opacity',opacity);gradient.append(stop);});defs.append(gradient);
   const shade=document.createElementNS(ns,'path');shade.setAttribute('fill',`url(#${gradientId})`);
   const crease=document.createElementNS(ns,'path');crease.setAttribute('fill','none');crease.setAttribute('stroke','#ffffff');crease.setAttribute('stroke-width','1.5');

   svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('elastic-edge');svg.append(defs,path,shade,crease);
   Object.assign(svg.style,{position:'fixed',top:'0',left:'0',width:'100%',height:'480px',overflow:'visible',pointerEvents:'none',zIndex:'25',filter:'drop-shadow(0 12px 12px #001d2526)',visibility:'hidden'});
   const position=section.style.position;
   if(getComputedStyle(section).position==='static')section.style.position='relative';
   document.body.append(svg);edges.push({section,previous:sections[i-1],svg,path,shade,crease,gradient,position});
  });
 }
 void tick().then(setup);
 const routes=new MutationObserver(()=>{void tick().then(setup);});routes.observe(node,{childList:true});
 const observer=new MutationObserver(preference);observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 node.addEventListener('pointermove',move);node.addEventListener('pointerleave',release);node.addEventListener('pointerup',release);addEventListener('scroll',release,{passive:true});fine.addEventListener('change',preference);
 return{destroy(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();routes.disconnect();node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',release);node.removeEventListener('pointerup',release);removeEventListener('scroll',release);fine.removeEventListener('change',preference);node.style.removeProperty('cursor');edges.forEach(e=>{e.svg.remove();e.section.style.position=e.position;});edges=[];}};
}
