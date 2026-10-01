/** Both contours collapse onto the same baseline during a blink. */
export function getSlyEyePaths(center: number, openness: number, blink: number) {
  const top = 36 - 2 * blink;
  const lidCurve = 36 - 7 * blink;
  const bottom = 36 + 10 * openness;
  return {
    eye: `M${center - 8} ${top} Q${center} ${lidCurve} ${center + 8} ${top} Q${center + 6} ${bottom} ${center} ${bottom} Q${center - 7} ${bottom} ${center - 8} ${top}Z`,
    lid: `M${center - 10} ${top} Q${center} ${lidCurve} ${center + 8} ${top}`,
  };
}
