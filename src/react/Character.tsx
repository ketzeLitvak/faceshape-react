import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { clamp, faceTransform, parseViewBox, resolveExpression, seededTraits, SHAPES } from '../core/index';
import { Face, FaceContext } from './Face';
import { useAnimatedFace, useReducedMotion } from './motion';
import type { CharacterProps } from './types';
const css=`
.fs-idle,.fs-bounce,.fs-shake { transform-box:fill-box; transform-origin:center; }
.fs-idle { animation:fs-idle 3.6s ease-in-out infinite; }
.fs-bounce { animation:fs-bounce 1s ease-in-out infinite; }
.fs-shake { animation:fs-shake .45s ease-in-out infinite; }
@keyframes fs-idle {0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-1.2px) scale(1.014,.99)}}
@keyframes fs-bounce {0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-3px) scale(.98,1.02)}80%{transform:translateY(0) scale(1.02,.98)}}
@keyframes fs-shake {0%,100%{transform:rotate(0)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
@media (prefers-reduced-motion:reduce){.fs-idle,.fs-bounce,.fs-shake{animation:none!important}}
`;
export const Character=forwardRef<SVGSVGElement,CharacterProps>(function Character({
 shape='blob',faceBox,expression='neutral',face={},faceStyle='soft',motion={},transition={},seed,
 color='#388697',faceColor='#182b35',size=160,label,reducedMotion=false,children,style,...svgProps
}, forwardedRef){
 const svgRef=useRef<SVGSVGElement|null>(null);
 const reduced=useReducedMotion(reducedMotion);
 const definition=typeof shape==='string'?SHAPES[shape]:shape;
 if(!definition)throw new Error(`Unknown shape: ${shape}`);
 if(!definition.path && !('render' in definition && definition.render))throw new Error('Custom shape needs path or render');
 const viewBox=definition.viewBox??'0 0 100 100';
 const [vx,vy,vw,vh]=parseViewBox(viewBox);
 const transform=faceTransform(faceBox??definition.faceBox,viewBox);
 const traits=useMemo(()=>seededTraits(seed),[seed]);
 const target={...resolveExpression(expression),...traits};
 // A custom expression's explicit geometry takes precedence over seeded traits.
 if(typeof expression!=='string'){if(expression.eyeSpacing!==undefined)target.eyeSpacing=resolveExpression(expression).eyeSpacing;if(expression.pupilSize!==undefined)target.pupilSize=resolveExpression(expression).pupilSize;}
 const frame=useAnimatedFace(target,{duration:Number.isFinite(transition.duration)?Math.max(0,transition.duration!):300,easing:transition.easing??'ease-out',blink:!!motion.blink,talking:!!motion.talking,reduced,seedPhase:traits.eyeSpacing*93});
 const [cursor,setCursor]=useState({x:0,y:0});
 const cursorMode=motion.lookAt==='cursor';
 useEffect(()=>{
  if(!cursorMode||reduced)return;
  let raf=0;let latest={x:0,y:0};
  const update=(event:PointerEvent)=>{
   const rect=svgRef.current?.getBoundingClientRect();if(!rect||rect.width===0||rect.height===0)return;
   latest={x:clamp((event.clientX-(rect.left+rect.width/2))/(rect.width*.75),-1,1),y:clamp((event.clientY-(rect.top+rect.height/2))/(rect.height*.75),-1,1)};
   if(!raf)raf=requestAnimationFrame(()=>{raf=0;setCursor(latest);});
  };
  const reset=()=>setCursor({x:0,y:0});
  window.addEventListener('pointermove',update,{passive:true});window.addEventListener('blur',reset);
  return()=>{cancelAnimationFrame(raf);window.removeEventListener('pointermove',update);window.removeEventListener('blur',reset);};
 },[cursorMode,reduced]);
 let look={x:0,y:0};
 if(!reduced){if(cursorMode)look=cursor;else if(typeof motion.lookAt==='object')look={x:clamp(motion.lookAt.x,0,1)*2-1,y:clamp(motion.lookAt.y,0,1)*2-1};}
 const state={...frame,look,color:faceColor,faceStyle};
 const named=!!(label||svgProps['aria-label']||svgProps['aria-labelledby']);
 return <svg width={size} height={size} viewBox={`${vx-vw*.06} ${vy-vh*.06} ${vw*1.12} ${vh*1.12}`} role={named?'img':undefined} aria-hidden={named?undefined:true} aria-label={label} {...svgProps} style={{overflow:'visible',...style}} ref={node=>{svgRef.current=node;if(typeof forwardedRef==='function')forwardedRef(node);else if(forwardedRef)forwardedRef.current=node;}}>
  <style>{css}</style>
  <g className={!reduced&&motion.idle?'fs-idle':undefined}><g className={!reduced&&motion.bounce?'fs-bounce':undefined}><g className={!reduced&&motion.shake?'fs-shake':undefined}>
   {'render' in definition && definition.render?definition.render({color}):<path data-faceshape-shape="" d={definition.path} fill={color}/>}
   <g transform={transform}><FaceContext.Provider value={state}>{children??<Face {...face}/>}</FaceContext.Provider></g>
  </g></g></g>
 </svg>;
});
