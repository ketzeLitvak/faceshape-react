import type { SharkTeethProps } from '../types';
import { sharkTeethPaths } from '../utils/sharkTeethGeometry';

export function SharkTeeth({ geometry }: SharkTeethProps) {
  return (
    <g data-faceshape-shark-teeth="" fill="white">
      {sharkTeethPaths(geometry).map((path) => (
        <path key={path} d={path} />
      ))}
    </g>
  );
}
