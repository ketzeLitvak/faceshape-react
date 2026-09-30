import { createContext, useContext, useId, type ReactNode } from 'react';
import { mouthPath, type FaceGeometry } from '../core/index';
import type { EyeVariant, MouthVariant, EyebrowVariant, FaceConfig, FaceStyle } from './types';
export interface FaceState { geometry:FaceGeometry; blink:number; talk:number; look:{x:number;y:number}; color:string; faceStyle:FaceStyle }
export const FaceContext=createContext<FaceState|null>(null);
function useFace(){const context=useContext(FaceContext);if(!context)throw new Error('Face parts must be inside Character');return context;}
export function Eyes({variant='round'}:{variant?:EyeVariant}) {
 const {geometry:g,blink,look,color,faceStyle}=useFace();
 const id=useId().replace(/[^a-zA-Z0-9_-]/g,'');
 const open=g.eyeOpen*blink,rx=variant==='oval'?7.5:faceStyle==='soft'?6.5:10.5,ry=variant==='cute'?14:faceStyle==='soft'?13:12;
 const closed=variant==='closed'||variant==='happy';
 return <g data-faceshape-eyes="" data-face-style={faceStyle} fill={color}>{[-1,1].map((side,index)=>{
  const x=50+side*g.eyeSpacing,angle=-side*g.eyeAngle;
  if(closed)return <path key={side} d={`M${x-8} 36 Q${x} ${variant==='happy'?23:39} ${x+8} 36`} fill="none" stroke={color} strokeWidth={3.6} strokeLinecap="round" transform={`rotate(${angle} ${x} 36) scale(1 1)`}/>;
  if(open<.065)return <path key={side} d={`M${x-8} 36 Q${x} ${36+g.eyeCurve*6} ${x+8} 36`} fill="none" stroke={color} strokeWidth={3.6} strokeLinecap="round"/>;
  if(faceStyle==='soft')return <g key={side} transform={`translate(${look.x*1.8} ${look.y*1.8}) rotate(${angle} ${x} 36)`}>
   <ellipse cx={x} cy={36} rx={rx} ry={ry*open}/>
   <ellipse cx={x-1.4} cy={36-ry*open*.42} rx={1.65} ry={1.65*Math.min(1,open)} fill="white" opacity={Math.min(1,open*3)}/>
  </g>;
  const clip=`fs-eye-${id}-${index}`;
  return <g key={side} transform={`rotate(${angle} ${x} 36)`}>
   <defs><clipPath id={clip}><ellipse cx={x} cy={36} rx={rx} ry={ry*open}/></clipPath></defs>
   <ellipse cx={x} cy={36} rx={rx} ry={ry*open} fill="white"/>
   <g clipPath={`url(#${clip})`}>
    <circle cx={x+look.x*3} cy={36+look.y*3} r={g.pupilSize*1.85}/>
    <circle cx={x+look.x*3-1.4} cy={32.4+look.y*3} r={2} fill="white"/>
   </g>
  </g>;
 })}</g>;
}
export function Mouth({variant}:{variant?:MouthVariant}) {
 const {geometry, talk,color,faceStyle}=useFace();const mouthId='fs-mouth-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');let g={...geometry};
 if(variant==='smile')g={...g,mouthCurve:1,mouthOpen:0};
 if(variant==='frown')g={...g,mouthCurve:-1,mouthOpen:0};
 if(variant==='neutral')g={...g,mouthCurve:0,mouthOpen:0};
 if(variant==='open')g={...g,mouthCurve:0,mouthOpen:1,mouthWidth:20};
 if(variant==='grin')g={...g,mouthCurve:.6,mouthOpen:.55,mouthWidth:38};
 if(variant==='small')g={...g,mouthWidth:15,mouthOpen:0};
 g.mouthOpen=Math.max(g.mouthOpen,talk);
 const path=mouthPath(g),opened=g.mouthOpen>.015;
 const curve=g.mouthCurve*13,depth=g.mouthOpen*14;
 const bottom=68+(curve+depth)/2;
 return <g data-faceshape-mouth="" data-face-style={faceStyle}>
  <defs><clipPath id={mouthId}><path d={path}/></clipPath></defs>
  <path d={path} fill={opened?color:'none'} stroke={color} strokeWidth={faceStyle==='soft'?2.8:3.4} strokeLinejoin="round" strokeLinecap="round"/>
  {opened&&<g clipPath={`url(#${mouthId})`}>
   <ellipse cx={50} cy={bottom-1} rx={g.mouthWidth*.28} ry={Math.max(1,depth*.3)} fill="#f18da3"/>
   {faceStyle==='cartoon'&&g.mouthOpen>.25&&<path d={`M${50-g.mouthWidth*.36} 67 L${50+g.mouthWidth*.36} 67 L${50+g.mouthWidth*.25} 71 Q50 73 ${50-g.mouthWidth*.25} 71Z`} fill="white"/>}
  </g>}
 </g>;
}
export function Eyebrows({variant}:{variant?:EyebrowVariant}) {
 const {geometry:g,color}=useFace();let angle=g.browAngle,lift=g.browLift,opacity=g.browOpacity;
 if(variant==='none')opacity=0;
 if(variant==='raised'){opacity=1;lift=-5;angle=0;}
 if(variant==='angry'){opacity=1;angle=20;}
 if(variant==='sad'){opacity=1;angle=-15;}
 if(variant==='soft'){opacity=1;angle=0;}
 return <g data-faceshape-eyebrows="" opacity={opacity} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round">{[-1,1].map(side=>{const x=50+side*g.eyeSpacing,y=16+lift;return <path key={side} d={`M${x-8} ${y} Q${x} ${y-3} ${x+8} ${y}`} transform={`rotate(${-side*angle} ${x} ${y})`}/>;})}</g>;
}
export function Face({eyes,mouth,eyebrows,children}:FaceConfig & {children?:ReactNode}) {
 return <g data-faceshape-face="">{children??<><Eyebrows variant={eyebrows}/><Eyes variant={eyes}/><Mouth variant={mouth}/></>}</g>;
}
