import { useId } from 'react';

/** Keep markings inside the same contour at every identity scale. */
export function FishBody({
  body,
  marking,
  color,
}: {
  body: string;
  marking: string;
  color: string;
}) {
  const clipId = `fish-body-${useId().replace(/:/g, '')}`;
  return (
    <g data-fish-body="">
      <defs>
        <clipPath id={clipId}>
          <path d={body} />
        </clipPath>
      </defs>
      <path d={body} fill={color} />
      <path
        data-fish-marking=""
        d={marking}
        fill="#f5f0e5"
        clipPath={`url(#${clipId})`}
      />
    </g>
  );
}
