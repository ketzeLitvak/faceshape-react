import { useId } from 'react';
import { eyeAnchors } from './eyes/anchors';
import { EYE_STRATEGIES } from './eyes/registry';
import { useFace } from './FaceContext';
import type { EyeVariant } from './types';
import { getFaceGaze } from './utils/faceGaze';
import { eyePlacement } from './utils/facePlacement';

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
      {eyeAnchors(strategy, face.geometry).map((anchor, index) => (
        <g key={anchor.side} transform={eyePlacement(face.layout, anchor.x)}>
          <RenderEye
            face={face}
            x={anchor.x}
            angle={anchor.angle}
            index={index}
            id={id}
            dimensions={strategy.dimensions}
            gaze={gaze.eyes}
          />
        </g>
      ))}
    </g>
  );
}
