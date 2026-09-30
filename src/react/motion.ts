import { useEffect, useRef, useState } from 'react';
import { ease, interpolateFace, type Easing, type FaceGeometry } from '../core/index';
export function useReducedMotion(explicit=false): boolean {
 const [preferred,setPreferred]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setPreferred(media.matches);update();media.addEventListener('change',update);
  return ()=>media.removeEventListener('change',update);
 },[]);
 return explicit || preferred;
}
export function useAnimatedFace(target: FaceGeometry, options: {duration:number;easing:Easing;blink:boolean;talking:boolean;reduced:boolean;seedPhase:number}) {
 const [frame,setFrame]=useState({geometry:target,blink:1,talk:0});
 const current=useRef(target);
 const targetKey=JSON.stringify(target);
 useEffect(()=>{
  if(options.reduced){current.current=target;setFrame({geometry:target,blink:1,talk:0});return;}
  const from=current.current;
  const duration=Math.max(0,options.duration);
  let raf=0, start:number|undefined;
  const loop=(time:number)=>{
   if(start===undefined)start=time;
   const elapsed=time-start,t=duration===0?1:Math.min(1,elapsed/duration);
   const geometry=interpolateFace(from,target,ease(t,options.easing));current.current=geometry;
   const phase=(elapsed+options.seedPhase)%4200;
   const blink=options.blink && phase<170 ? Math.abs(phase-85)/85 : 1;
   const talk=options.talking?(.5+.5*Math.sin(elapsed/85))*.7:0;
   setFrame({geometry,blink,talk});
   if(t<1 || options.blink || options.talking)raf=requestAnimationFrame(loop);
  };
  raf=requestAnimationFrame(loop);
  return ()=>cancelAnimationFrame(raf);
 // Scalar key prevents restarts from inline expression objects.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[targetKey,options.duration,options.easing,options.blink,options.talking,options.reduced,options.seedPhase]);
 return frame;
}
