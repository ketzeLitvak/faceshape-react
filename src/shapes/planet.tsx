import { createNameRandom } from '../core/index';
import type { CustomShape } from '../react/types';
import { createNamedShape } from './createNamedShape';
import { centeredFaceBox } from './faceBox';

function planetFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'planet');
  const radius = 25 + random() * 9;
  const ringWidth = 40 + random() * 7;
  const ringHeight = 10 + random() * 7;
  const tilt = -35 + random() * 70;
  const thickness = 4 + random() * 4;
  const hasRing = random() > 0.4;
  const moonCount = Math.floor(random() * 3);
  const orbit = radius + 10 + random() * 3;
  const phase = random() * Math.PI * 2;
  const moons = Array.from({ length: moonCount }, (_, index) => {
    const angle = phase + index * Math.PI;
    return {
      x: 50 + Math.cos(angle) * orbit,
      y: 50 + Math.sin(angle) * orbit,
      radius: 3 + random() * 2,
    };
  });
  return {
    faceBox: centeredFaceBox(radius * 1.3, radius * 1.25),
    render: ({ color }) => (
      <g data-faceshape-planet="">
        {hasRing && (
          <ellipse
            data-planet-ring=""
            cx={50}
            cy={50}
            rx={ringWidth}
            ry={ringHeight}
            transform={`rotate(${tilt} 50 50)`}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            opacity={0.6}
          />
        )}
        <circle cx={50} cy={50} r={radius} fill={color} />
        {moons.map((moon) => (
          <g key={moon.x} data-planet-moon="">
            <circle cx={moon.x} cy={moon.y} r={moon.radius} fill={color} />
            <circle
              cx={moon.x - moon.radius * 0.25}
              cy={moon.y - moon.radius * 0.3}
              r={moon.radius * 0.35}
              fill="white"
              opacity={0.45}
            />
          </g>
        ))}
      </g>
    ),
  };
}

export const planet: CustomShape = /* @__PURE__ */ createNamedShape(planetFromName);
