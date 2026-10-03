import { renderToStaticMarkup } from 'react-dom/server';
import { Eyebrows } from '../src/react/Eyebrows';
import { eyeAnchors } from '../src/react/eyes/anchors';
import { EYE_STRATEGIES } from '../src/react/eyes/registry';
import { Face } from '../src/react/Face';
import { FaceContext } from '../src/react/FaceContext';
import { Mouth } from '../src/react/Mouth';
import type { FaceConfig, FaceState } from '../src/react/types';

export {
  calculateBlink,
  calculateFrame,
  calculateGaze,
  calculateTalk,
} from '../src/react/animation/calculateFrame';
export { resolveCharacterAppearance } from '../src/react/resolvers/resolveCharacterAppearance';
export { resolveFaceGeometry } from '../src/react/resolvers/resolveFaceGeometry';

export function renderPose(face: FaceConfig, state: FaceState, wink = false) {
  const Eye = EYE_STRATEGIES[face.eyes].render;
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="240"
      viewBox="0 0 100 100"
    >
      <rect width="100" height="100" rx="24" fill="#89d9c3" />
      <FaceContext.Provider value={state}>
        {wink ? (
          <Face {...face}>
            <Eyebrows variant={face.eyebrows} />
            <Mouth variant={face.mouth} />
            {eyeAnchors(EYE_STRATEGIES[face.eyes], state.geometry).map(
              (anchor, index) => (
                <Eye
                  key={anchor.side}
                  face={{ ...state, blink: index === 0 ? 0 : 1 }}
                  x={anchor.x}
                  angle={0}
                  index={index}
                  id="wink"
                  dimensions={EYE_STRATEGIES[face.eyes].dimensions}
                  gaze="translate(0 0)"
                />
              ),
            )}
          </Face>
        ) : (
          <Face {...face} />
        )}
      </FaceContext.Provider>
    </svg>
  );
  return renderToStaticMarkup(svg).replace(/fs-(eye|mouth)-[^" )]+/g, (id) =>
    id.replace(/_R[^_]+_/g, 'stable'),
  );
}

export { Documentation } from '../demo/docs/Documentation';
export { DOC_SECTIONS } from '../demo/docs/navigation';
export { CUSTOM_SHAPES, device, heart, penguin, shark } from '../demo/shapes';
export { ValidationGallery } from '../demo/validation/ValidationGallery';
export { collectionJSON, parseCollection } from '../demo/workbench/collection';
export {
  configurationURL,
  parseConfiguration,
  readSavedCharacters,
} from '../demo/workbench/configuration';
export { sharkTeethPaths } from '../src/react/utils/sharkTeethGeometry';
export { toothyTeethPath } from '../src/react/utils/toothyTeethGeometry';
