import type { SharkTeethProps } from './types';

/** Three pointed upper teeth, clipped by the surrounding mouth. */
export function SharkTeeth({ width, openness }: SharkTeethProps) {
  const halfWidth = width * .09;
  const depth = 8 * openness;
  return <g data-faceshape-shark-teeth="" fill="white">
    {[-1, 0, 1].map(position => {
      const center = 50 + position * width * .24;
      return <path
        key={position}
        d={`M${center - halfWidth} 64 L${center + halfWidth} 64 L${center} ${64 + depth}Z`}
      />;
    })}
  </g>;
}
