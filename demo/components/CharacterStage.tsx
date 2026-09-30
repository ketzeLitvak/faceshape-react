import { Character, type ExpressionName, type CharacterProps } from '../../src';
import type { DemoShape } from '../types';
type StageProps = Pick<CharacterProps, 'faceStyle' | 'face' | 'color' | 'seed' | 'motion'> & {
  expression: ExpressionName;
  selectedShape: CharacterProps['shape'];
  shape: DemoShape;
  reduced: boolean;
};
export function CharacterStage({ selectedShape, expression, faceStyle, face, color, seed, motion, reduced, shape }: StageProps) {
  return (<div className="stage">
    <div className="stage-top">
      <span className="live-dot" />PLAYGROUND EN VIVO<span className="stage-hint">Mové el cursor ↗</span>
    </div>
    <div className="character-wrap" data-testid="hero">
      <Character shape={selectedShape} expression={expression} faceStyle={faceStyle} face={face} color={color} seed={seed} motion={motion} reducedMotion={reduced} size={280} label="Personaje de demostración" />
    </div>
    <div className="character-meta">
      <span>{shape}
      </span>
      <span>·</span>
      <span>{expression}
      </span>
    </div>
    <div className="stage-bottom">Hecho con geometría, un poco de movimiento y mucha actitud.</div>
  </div>);
}
