import { useId } from 'react';
import { EYE_STRATEGIES } from './eyes/registry';
import { useFace } from './FaceContext';
import type { EyeVariant } from './types';
import { getFaceGaze } from './utils/faceGaze';

export function Eyes({ variant }: { variant: EyeVariant }) {
  const face = useFace();
  const selected = variant;
  const strategy = EYE_STRATEGIES[selected];
  const RenderEye = strategy.render;
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gaze = getFaceGaze(selected, face.look, face.geometry.eyeOpen);

  if (strategy.hidden) {
    return null;
  }

  return (
    <g data-faceshape-eyes="" data-eye-variant={selected} fill={face.color}>
      {[-1, 1].map((side, index) => (
        <RenderEye
          key={side}
          face={face}
          x={50 + side * face.geometry.eyeSpacing}
          angle={-side * face.geometry.eyeAngle}
          index={index}
          id={id}
          dimensions={strategy.dimensions}
          gaze={gaze.eyes}
        />
      ))}
    </g>
  );
}
