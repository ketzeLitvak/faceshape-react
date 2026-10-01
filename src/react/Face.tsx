import { Eyebrows } from './Eyebrows';
import { Eyes } from './Eyes';
import { FaceContext, useFace } from './FaceContext';
import { Mouth } from './Mouth';
import type { FaceProps } from './types';

export { Eyebrows, Eyes, Mouth };

export function Face({ eyes, mouth, eyebrows, children }: FaceProps) {
  const inherited = useFace();
  const state = { ...inherited, eyeVariant: eyes };

  return (
    <FaceContext.Provider value={state}>
      <g data-faceshape-face="">
        {children ?? (
          <>
            <Eyebrows variant={eyebrows} />
            <Eyes variant={eyes} />
            <Mouth variant={mouth} />
          </>
        )}
      </g>
    </FaceContext.Provider>
  );
}
