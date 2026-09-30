import { FaceContext, useFace } from './FaceContext';
import { FACE_PRESETS } from './facePresets';
import type { FaceProps } from './types';
import { Eyes } from './Eyes';
import { Mouth } from './Mouth';
import { Eyebrows } from './Eyebrows';
export { Eyes, Mouth, Eyebrows };
export function Face({ eyes, mouth, eyebrows, children }: FaceProps) {
  const inherited = useFace();
  const { faceStyle } = inherited;
  const state = { ...inherited, eyeVariant: eyes ?? inherited.eyeVariant };
  return <FaceContext.Provider value={state}><g data-faceshape-face="">{children ?? <>
    {(FACE_PRESETS[faceStyle].cheeks || eyes === 'kawaii') && <g data-faceshape-cheeks="" fill="#f69bad">
      <ellipse cx={18} cy={52} rx={8} ry={5.5} />
      <ellipse cx={82} cy={52} rx={8} ry={5.5} />
    </g>}
    <Eyebrows variant={eyebrows ?? ((faceStyle === 'sly' || eyes === 'sly') && inherited.geometry.browOpacity === 0 ? 'soft' : undefined)} />
    <Eyes variant={eyes} />
    <Mouth variant={mouth} />
  </>}
  </g></FaceContext.Provider>;
}
