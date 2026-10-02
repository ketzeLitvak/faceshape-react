export interface GhostHem {
  left: number;
  right: number;
  bottom: number;
  depth: number;
  lobes: number;
}

const waves = ({ left, right, bottom, depth, lobes }: GhostHem) => {
  const step = (right - left) / lobes;
  return Array.from({ length: lobes }, (_, index) => {
    const x = right - step * index;
    return `Q${x - step * 0.25} ${bottom + depth} ${x - step * 0.5} ${bottom} Q${x - step * 0.75} ${bottom - depth} ${x - step} ${bottom}`;
  }).join(' ');
};
const points = ({ left, right, bottom, depth, lobes }: GhostHem) => {
  const step = (right - left) / lobes;
  return Array.from(
    { length: lobes },
    (_, index) =>
      `L${right - step * (index + 0.5)} ${bottom + depth} L${right - step * (index + 1)} ${bottom - depth * 0.3}`,
  ).join(' ');
};
const tails = ({ left, right, bottom, depth }: GhostHem) =>
  `Q${right - 5} ${bottom + depth} ${right - 12} ${bottom + depth} L50 ${bottom - 7} L${left + 12} ${bottom + depth} Q${left + 5} ${bottom + depth} ${left} ${bottom}`;
const swirl = ({ left, right, bottom, depth }: GhostHem) =>
  `Q${right + 4} ${bottom + depth} ${right + 18} ${bottom + depth - 2} Q${right + 5} ${bottom + depth + 7} ${left + 7} ${bottom + depth} Q${left} ${bottom + depth * 0.5} ${left} ${bottom}`;

export const ghostProfiles = [
  { kind: 'waves', hem: waves, flare: 1 },
  { kind: 'points', hem: points, flare: 0.9 },
  { kind: 'tails', hem: tails, flare: 1.12 },
  { kind: 'swirl', hem: swirl, flare: 0.72 },
] as const;
