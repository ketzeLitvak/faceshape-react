import { useId } from 'react';
import { Eyebrows, Face, type FaceConfig, type FaceGeometry, Mouth } from '../../src';
import { eyeAnchors } from '../../src/react/eyes/anchors';
import { EYE_STRATEGIES } from '../../src/react/eyes/registry';
import { FaceContext, useFace } from '../../src/react/FaceContext';
import { getFaceGaze } from '../../src/react/utils/faceGaze';

export interface PreviewPose {
  id: string;
  label: string;
  blink: number;
  wink?: number;
  geometry?: FaceGeometry;
  look?: { x: number; y: number };
}

/** Overrides the existing face context for inspection; uses the production strategies. */
export function PosePreview({ face, pose }: { face: FaceConfig; pose: PreviewPose }) {
  const inherited = useFace();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const state = {
    ...inherited,
    blink: pose.blink,
    geometry: pose.geometry ?? inherited.geometry,
    look: pose.look ?? inherited.look,
    eyeVariant: face.eyes,
  };
  const strategy = EYE_STRATEGIES[face.eyes];
  const RenderEye = strategy.render;
  const gaze = getFaceGaze(face.eyes, state.look, state.geometry.eyeOpen);
  return (
    <FaceContext.Provider value={state}>
      <Face {...face}>
        <Eyebrows variant={face.eyebrows} />
        {!strategy.hidden && (
          <g fill={state.color} data-validation-eyes="">
            {eyeAnchors(strategy, state.geometry).map((anchor, index) => (
              <RenderEye
                key={anchor.side}
                face={{
                  ...state,
                  blink:
                    pose.wink === undefined ? pose.blink : index === pose.wink ? 0 : 1,
                }}
                x={anchor.x}
                angle={anchor.angle}
                index={index}
                id={id}
                dimensions={strategy.dimensions}
                gaze={gaze.eyes}
              />
            ))}
          </g>
        )}
        <Mouth variant={face.mouth} />
      </Face>
    </FaceContext.Provider>
  );
}
