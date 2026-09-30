import { forwardRef, useMemo, useRef } from 'react';
import { faceTransform, parseViewBox, resolveExpression, seededTraits, SHAPES } from '../core/index';
import { Face } from './Face';
import { FaceContext } from './FaceContext';
import { motionStyles } from './styles';
import { useLookAt } from './hooks/useLookAt';
import { useAnimatedFace, useReducedMotion } from './motion';
import type { CharacterProps } from './types';
export const Character = forwardRef<SVGSVGElement, CharacterProps>(function Character({ shape = 'blob', faceBox, expression = 'neutral', face = {}, faceStyle = 'soft', motion = {}, transition = {}, seed, color = '#388697', faceColor = '#182b35', size = 160, label, reducedMotion = false, children, style, ...svgProps }, forwardedRef) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reduced = useReducedMotion(reducedMotion);
  const definition = typeof shape === 'string' ? SHAPES[shape] : shape;
  if (!definition)
    throw new Error(`Unknown shape: ${shape}`);
  if (!definition.path && !('render' in definition && definition.render))
    throw new Error('Custom shape needs path or render');
  const viewBox = definition.viewBox ?? '0 0 100 100';
  const [vx, vy, vw, vh] = parseViewBox(viewBox);
  const transform = faceTransform(faceBox ?? definition.faceBox, viewBox);
  const traits = useMemo(() => seededTraits(seed), [seed]);
  const target = { ...resolveExpression(expression), ...traits };
  // A custom expression's explicit geometry takes precedence over seeded traits.
  if (typeof expression !== 'string') {
    if (expression.eyeSpacing !== undefined)
      target.eyeSpacing = resolveExpression(expression).eyeSpacing;
    if (expression.pupilSize !== undefined)
      target.pupilSize = resolveExpression(expression).pupilSize;
  }
  const frame = useAnimatedFace(target, { duration: Number.isFinite(transition.duration) ? Math.max(0, transition.duration!) : 300, easing: transition.easing ?? 'ease-out', blink: !!motion.blink, talking: !!motion.talking, reduced, seedPhase: traits.eyeSpacing * 93 });
  const look = useLookAt(svgRef, motion.lookAt, reduced);
  const state = { ...frame, look, color: faceColor, faceStyle };
  const named = !!(label || svgProps['aria-label'] || svgProps['aria-labelledby']);
  return <svg width={size} height={size} viewBox={`${vx - vw * .06} ${vy - vh * .06} ${vw * 1.12} ${vh * 1.12}`} role={named ? 'img' : undefined} aria-hidden={named ? undefined : true} aria-label={label} {...svgProps} style={{ overflow: 'visible', ...style }} ref={node => {
    svgRef.current = node; if (typeof forwardedRef === 'function')
      forwardedRef(node);
    else if (forwardedRef)
      forwardedRef.current = node;
  }}>
    <style>{motionStyles}
    </style>
    <g className={!reduced && motion.idle ? 'fs-idle' : undefined}>
      <g className={!reduced && motion.bounce ? 'fs-bounce' : undefined}>
        <g className={!reduced && motion.shake ? 'fs-shake' : undefined}>
          {'render' in definition && definition.render ? definition.render({ color }) : <path data-faceshape-shape="" d={definition.path} fill={color} />}
          <g transform={transform}>
            <FaceContext.Provider value={state}>{children ?? <Face {...face} />}
            </FaceContext.Provider>
          </g>
        </g>
      </g>
    </g>
  </svg>;
});
