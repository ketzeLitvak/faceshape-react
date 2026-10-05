import { Character, type CharacterProps, type ExpressionName } from '../../src';
import type { DemoShape } from '../types';

type StageProps = Pick<CharacterProps, 'face' | 'color' | 'name' | 'motion'> & {
  expression: ExpressionName;
  selectedShape: CharacterProps['shape'];
  shape: DemoShape;
  reduced: boolean;
};

export function CharacterStage({
  selectedShape,
  expression,
  face,
  color,
  name,
  motion,
  reduced,
  shape,
}: StageProps) {
  return (
    <div className="stage">
      <div className="stage-top">
        <span className="live-dot" />
        PLAYGROUND EN VIVO<span className="stage-hint">Mové el cursor o tocá ↗</span>
      </div>
      <div className="character-wrap" data-testid="hero">
        <Character
          shape={selectedShape}
          expression={expression}
          face={face}
          color={color}
          name={name}
          motion={motion}
          reducedMotion={reduced}
          size={280}
          label="Personaje de demostración"
        />
      </div>
      <div className="character-meta">
        <span>{name || shape}</span>
        <span>·</span>
        <span>{expression}</span>
      </div>
      <div className="stage-bottom">
        Hecho con geometría, un poco de movimiento y mucha actitud.
      </div>
    </div>
  );
}
