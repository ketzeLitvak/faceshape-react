import { Eyebrows } from './Eyebrows';
import { Eyes } from './Eyes';
import { EYE_STRATEGIES } from './eyes/registry';
import { FaceContext, useFace } from './FaceContext';
import { FACE_PRESETS } from './facePresets';
import { Mouth } from './Mouth';
import type { FaceProps } from './types';

export { Eyebrows, Eyes, Mouth };

export function Face({ eyes, mouth, eyebrows, children }: FaceProps) {
  const inherited = useFace();
  const { faceStyle } = inherited;
  const state = { ...inherited, eyeVariant: eyes ?? inherited.eyeVariant };
  const eyeStrategy = EYE_STRATEGIES[state.eyeVariant];

  return (
    <FaceContext.Provider value={state}>
      <g data-faceshape-face="">
        {children ?? (
          <>
            {(FACE_PRESETS[faceStyle].cheeks || eyeStrategy.cheeks) && (
              <g data-faceshape-cheeks="" fill="#f69bad">
                <ellipse cx={18} cy={52} rx={8} ry={5.5} />
                <ellipse cx={82} cy={52} rx={8} ry={5.5} />
              </g>
            )}
            <Eyebrows
              variant={
                eyebrows ??
                (inherited.geometry.browOpacity === 0
                  ? (eyeStrategy.restingBrows ?? FACE_PRESETS[faceStyle].restingBrows)
                  : undefined)
              }
            />
            <Eyes variant={eyes} />
            <Mouth variant={mouth} />
          </>
        )}
      </g>
    </FaceContext.Provider>
  );
}
