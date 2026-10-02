export function EyeLashes({
  x,
  rx,
  height,
  index,
  color,
}: {
  x: number;
  rx: number;
  height: number;
  index: number;
  color: string;
}) {
  const side = index === 0 ? -1 : 1;
  const upperX = x + side * rx * Math.sqrt(1 - 0.55 ** 2);
  const lowerX = x + side * rx * Math.sqrt(1 - 0.18 ** 2);
  const upperY = 36 - height * 0.55;
  const lowerY = 36 - height * 0.18;
  return (
    <path
      data-eye-lashes=""
      d={`M${upperX} ${upperY} Q${upperX + side * 3.5} ${upperY - 1.2} ${upperX + side * 5} ${upperY - 4.5} M${lowerX} ${lowerY} Q${lowerX + side * 3.5} ${lowerY} ${lowerX + side * 5.5} ${lowerY - 2}`}
      fill="none"
      stroke={color}
      strokeWidth={2.3}
      strokeLinecap="round"
    />
  );
}
