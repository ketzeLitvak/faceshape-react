import { forwardRef, useMemo, useRef } from 'react';
import { AnimatedFace } from './AnimatedFace';
import { useReducedMotion } from './hooks/useReducedMotion';
import { resolveCharacterAppearance } from './resolvers/resolveCharacterAppearance';
import { resolveFaceGeometry } from './resolvers/resolveFaceGeometry';
import { validateFaceConfig } from './resolvers/validateFaceConfig';
import { motionStyles } from './styles';
import type { CharacterProps } from './types';

export const Character = forwardRef<SVGSVGElement, CharacterProps>(function Character(
  {
    shape = 'blob',
    faceBox,
    expression = 'neutral',
    face,
    motion = {},
    transition = {},
    name,
    seed,
    color: fixedColor,
    faceColor = '#182b35',
    size = 160,
    label,
    reducedMotion = false,
    children,
    style,
    ...svgProps
  },
  forwardedRef,
) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reduced = useReducedMotion(reducedMotion);
  const identity = name ?? seed;
  validateFaceConfig(face);
  const appearance = useMemo(
    () => resolveCharacterAppearance({ shape, faceBox, identity, color: fixedColor }),
    [shape, faceBox, identity, fixedColor],
  );
  const expressionKey = JSON.stringify(expression);
  const geometry = useMemo(
    () => resolveFaceGeometry(JSON.parse(expressionKey), identity),
    [expressionKey, identity],
  );
  const { definition, color, viewBox, transform } = appearance;
  const named = !!(label || svgProps['aria-label'] || svgProps['aria-labelledby']);
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      role={named ? 'img' : undefined}
      aria-hidden={named ? undefined : true}
      aria-label={label}
      {...svgProps}
      style={{ overflow: 'visible', ...style }}
      ref={(node) => {
        svgRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
    >
      <style>{motionStyles}</style>
      <g className={!reduced && motion.idle ? 'fs-idle' : undefined}>
        <g className={!reduced && motion.bounce ? 'fs-bounce' : undefined}>
          <g className={!reduced && motion.shake ? 'fs-shake' : undefined}>
            {'render' in definition && definition.render ? (
              definition.render({ color })
            ) : (
              <path
                data-faceshape-shape=""
                d={definition.path}
                fill={color}
                transform={definition.transform}
              />
            )}
            <g transform={transform}>
              <AnimatedFace
                geometry={geometry}
                face={face}
                motion={motion}
                transition={transition}
                reduced={reduced}
                svgRef={svgRef}
                color={faceColor}
              >
                {children}
              </AnimatedFace>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
});
