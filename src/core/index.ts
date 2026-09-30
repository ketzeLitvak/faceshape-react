/** Geometry uses a 0..100 face coordinate system. Shape faceBox uses 0..1. */
export type ExpressionName = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'sleepy';
export type ShapeName = 'circle' | 'blob' | 'square' | 'star';
export interface FaceBox { x: number; y: number; width: number; height: number }
export interface ShapeDefinition { path: string; viewBox?: string; faceBox: FaceBox }
export interface FaceGeometry {
 eyeOpen: number; eyeCurve: number; eyeAngle: number; eyeSpacing: number;
 pupilSize: number; mouthWidth: number; mouthCurve: number; mouthOpen: number;
 browAngle: number; browLift: number; browOpacity: number;
}
export type ExpressionDefinition = Partial<FaceGeometry>;
export const DEFAULT_FACE: Readonly<FaceGeometry> = Object.freeze({
 eyeOpen: 1, eyeCurve: 0, eyeAngle: 0, eyeSpacing: 24, pupilSize: 4.2,
 mouthWidth: 30, mouthCurve: 0, mouthOpen: 0, browAngle: 0, browLift: 0, browOpacity: 0,
});
export const EXPRESSIONS: Readonly<Record<ExpressionName, Readonly<FaceGeometry>>> = Object.freeze({
 neutral: Object.freeze({ ...DEFAULT_FACE }),
 happy: Object.freeze({ ...DEFAULT_FACE, eyeOpen: .88, mouthCurve: 1, mouthWidth: 36 }),
 sad: Object.freeze({ ...DEFAULT_FACE, eyeOpen: .75, mouthCurve: -.85, browAngle: -15, browLift: 2, browOpacity: 1 }),
 angry: Object.freeze({ ...DEFAULT_FACE, eyeOpen: .65, eyeAngle: 9, mouthCurve: -.25, mouthWidth: 26, browAngle: 20, browOpacity: 1 }),
 surprised: Object.freeze({ ...DEFAULT_FACE, eyeOpen: 1.2, mouthWidth: 20, mouthOpen: 1, browLift: -5, browOpacity: 1 }),
 sleepy: Object.freeze({ ...DEFAULT_FACE, eyeOpen: .12, mouthWidth: 18, mouthOpen: .12, browLift: 2 }),
});
export const SHAPES: Readonly<Record<ShapeName, Readonly<ShapeDefinition>>> = Object.freeze({
 circle: Object.freeze({ path: 'M50 6 A44 44 0 1 1 50 94 A44 44 0 1 1 50 6Z', faceBox: Object.freeze({x:.2,y:.28,width:.6,height:.48}) }),
 blob: Object.freeze({ path:'M50 7 C69 -1 94 18 92 43 C103 67 81 95 58 93 C34 103 6 87 9 62 C-1 37 22 4 50 7Z',faceBox:Object.freeze({x:.2,y:.28,width:.6,height:.48}) }),
 square: Object.freeze({path:'M24 8 H76 Q92 8 92 24 V76 Q92 92 76 92 H24 Q8 92 8 76 V24 Q8 8 24 8Z',faceBox:Object.freeze({x:.2,y:.27,width:.6,height:.5})}),
 star: Object.freeze({path:'M50 4 L63 33 L95 36 L71 58 L78 91 L50 74 L22 91 L29 58 L5 36 L37 33Z',faceBox:Object.freeze({x:.32,y:.34,width:.36,height:.3})}),
});
export function clamp(value: number, min: number, max: number): number {
 return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
}
const limits: Record<keyof FaceGeometry, [number,number]> = {
 eyeOpen:[0,1.5],eyeCurve:[-1,1],eyeAngle:[-30,30],eyeSpacing:[15,30],pupilSize:[1,6],
 mouthWidth:[8,50],mouthCurve:[-1,1],mouthOpen:[0,1],browAngle:[-35,35],browLift:[-10,10],browOpacity:[0,1],
};
export function resolveExpression(expression: ExpressionName | ExpressionDefinition = 'neutral'): FaceGeometry {
 const source = typeof expression === 'string' ? EXPRESSIONS[expression] : {...DEFAULT_FACE,...expression};
 if (!source) throw new Error(`Unknown expression: ${expression}`);
 const result = {...DEFAULT_FACE};
 for (const key of Object.keys(result) as (keyof FaceGeometry)[]) {
  const value = source[key];
  if (!Number.isFinite(value)) throw new Error(`Invalid expression parameter: ${key}`);
  result[key] = clamp(value, ...limits[key]);
 }
 return result;
}
export function interpolateFace(from: FaceGeometry, to: FaceGeometry, progress: number): FaceGeometry {
 const t=clamp(progress,0,1), result={...from};
 for (const key of Object.keys(result) as (keyof FaceGeometry)[]) result[key]=from[key]+(to[key]-from[key])*t;
 return result;
}
export function seededTraits(seed?: string | number): Pick<FaceGeometry,'eyeSpacing'|'pupilSize'> {
 if(seed===undefined) return {eyeSpacing:24,pupilSize:4.2};
 let hash=2166136261;
 for(const c of String(seed)) hash=Math.imul(hash ^ c.charCodeAt(0),16777619);
 const random=()=>{hash=(hash+0x6D2B79F5)|0;let t=hash;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
 return {eyeSpacing:22+random()*4,pupilSize:3.8+random()*.8};
}
export function parseViewBox(viewBox='0 0 100 100'): [number,number,number,number] {
 const parts=viewBox.trim().split(/[\s,]+/).map(Number);
 if(parts.length!==4 || parts.some(n=>!Number.isFinite(n)) || parts[2]<=0 || parts[3]<=0) throw new Error('viewBox must contain x y width height, with positive dimensions');
 return parts as [number,number,number,number];
}
export function validateFaceBox(box: FaceBox): FaceBox {
 if (![box.x,box.y,box.width,box.height].every(Number.isFinite) || box.x<0 || box.y<0 || box.width<=0 || box.height<=0 || box.x+box.width>1.000001 || box.y+box.height>1.000001) throw new Error('faceBox must be a positive rectangle within normalized 0..1 bounds');
 return box;
}
export function faceTransform(box: FaceBox, viewBox='0 0 100 100'): string {
 validateFaceBox(box);const [x,y,w,h]=parseViewBox(viewBox);
 return `translate(${x+box.x*w} ${y+box.y*h}) scale(${box.width*w/100} ${box.height*h/100})`;
}
export function defineShape<T extends ShapeDefinition>(shape: T): T {
 parseViewBox(shape.viewBox);validateFaceBox(shape.faceBox);
 if(!shape.path.trim()) throw new Error('Shape path must not be empty');
 return shape;
}
export function defineExpression(expression: ExpressionDefinition): FaceGeometry { return resolveExpression(expression); }
/** Compatible path topology for every expression and in-between state. */
export function mouthPath(face: FaceGeometry): string {
 const left=50-face.mouthWidth/2,right=50+face.mouthWidth/2;
 const curve=face.mouthCurve*13,open=face.mouthOpen*14;
 return `M${left} 68 Q50 ${68+curve-open} ${right} 68 Q50 ${68+curve+open} ${left} 68Z`;
}
export type Easing = 'linear' | 'ease-out' | 'ease-in-out';
export function ease(t: number, easing: Easing='ease-out'): number {
 t=clamp(t,0,1);return easing==='linear'?t:easing==='ease-in-out'?t*t*(3-2*t):1-Math.pow(1-t,3);
}
